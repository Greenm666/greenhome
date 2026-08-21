const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const configPath = path.join(__dirname, 'config.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'data.js');
const WEB_DATA_PATH = path.join(__dirname, '..', 'products-data.js');

function loadConfig() {
  const raw = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(raw);
  if (!config.appKey || config.appKey === 'YOUR_APP_KEY_HERE') {
    throw new Error('请先在 config.json 中填写你的 AppKey');
  }
  if (!config.appSecret || config.appSecret === 'YOUR_APP_SECRET_HERE') {
    throw new Error('请先在 config.json 中填写你的 AppSecret');
  }
  return config;
}

function sign(params, appSecret) {
  const keys = Object.keys(params).sort();
  let str = '';
  for (const key of keys) {
    str += key + params[key];
  }
  str = appSecret + str + appSecret;
  return crypto.createHash('md5').update(str, 'utf8').digest('hex').toUpperCase();
}

function requestApi(basePath, params) {
  return new Promise((resolve, reject) => {
    const queryString = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');

    const options = {
      hostname: 'api.jd.com',
      path: `/routerjson?${queryString}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          reject(new Error('响应解析失败: ' + data.substring(0, 200)));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时，请检查网络连接'));
    });

    req.end();
  });
}

async function getAccessToken(config) {
  if (config.accessToken && config.accessToken.trim()) {
    return config.accessToken.trim();
  }

  console.log('🔑 正在获取 access_token...');
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    'method': 'open.oauth.access_token.get',
    'app_key': config.appKey,
    'app_secret': config.appSecret,
    'grant_type': 'client_credentials',
    'timestamp': String(timestamp),
    'v': '2.0',
    'sign_method': 'md5'
  };
  params['sign'] = sign(params, config.appSecret);

  try {
    const result = await requestApi('/routerjson', params);
    if (result.error_response) {
      throw new Error('获取access_token失败: ' + JSON.stringify(result.error_response));
    }
    const accessToken = result.access_token || result.open_access_token;
    if (!accessToken) {
      throw new Error('未获取到access_token，响应: ' + JSON.stringify(result).substring(0, 300));
    }
    console.log('✅ access_token 获取成功');
    config.accessToken = accessToken;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    return accessToken;
  } catch (e) {
    throw new Error('获取access_token失败: ' + e.message + '\n请检查AppKey和AppSecret是否正确');
  }
}

async function searchProducts(config, accessToken, keyword, count) {
  console.log(`🔍 正在搜索 "${keyword}" 相关商品...`);
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    'method': 'jd.union.open.goods.search',
    'app_key': config.appKey,
    'access_token': accessToken,
    'timestamp': String(timestamp),
    'v': '2.0',
    'sign_method': 'md5',
    'req.param': JSON.stringify({
      'goodsSearchReq': {
        'keyword': keyword,
        'pageIndex': 1,
        'pageSize': Math.max(count * 3, 30),
        'sortType': 'comment_num_desc',
        'priceMax': 0,
        'priceMin': 0
      }
    })
  };
  params['sign'] = sign(params, config.appSecret);

  try {
    const result = await requestApi('/routerjson', params);
    if (result.error_response) {
      console.warn('⚠️ 搜索接口返回错误:', JSON.stringify(result.error_response).substring(0, 300));
      return [];
    }
    const goods = result.result?.goodsSearchResponse?.data ||
                  result.data ||
                  (result.result && Array.isArray(result.result)) || [];
    console.log(`   找到 ${goods.length} 个商品`);
    return goods;
  } catch (e) {
    console.warn('⚠️ 商品搜索失败:', e.message);
    return [];
  }
}

async function generatePromotionLink(config, accessToken, skuId, materialId) {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    'method': 'jd.union.open.promotion.common.get',
    'app_key': config.appKey,
    'access_token': accessToken,
    'timestamp': String(timestamp),
    'v': '2.0',
    'sign_method': 'md5',
    'req.param': JSON.stringify({
      'promotionCodeReq': {
        'materialId': materialId || config.unionId,
        'couponInfo': '',
        'pids': '',
        'subUnionId': 'health_' + Date.now()
      }
    })
  };
  params['sign'] = sign(params, config.appSecret);

  try {
    const result = await requestApi('/routerjson', params);
    if (result.error_response) {
      return { skuId, link: null, error: result.error_response.zhDesc || JSON.stringify(result.error_response) };
    }
    const data = result.result?.promotionCodeResponse || result.data || result.result;
    if (data && data.couponInfo) {
      return { skuId, link: data.couponInfo, shortLink: data.shortLink };
    }
    if (typeof data === 'string') {
      return { skuId, link: data };
    }
    return { skuId, link: null, error: '响应格式异常' };
  } catch (e) {
    return { skuId, link: null, error: e.message };
  }
}

function generateMockProducts(keyword, count) {
  console.log('📝 使用示例数据生成（API未连接）...');
  const mockData = {
    '低卡调味': [
      { name: '千禾零添加油醋汁', price: '¥19.9', rating: '98%', desc: '0脂肪零添加，适合拌沙拉', tags: ['控卡', '轻食搭档'] },
      { name: '亨氏无糖番茄酱', price: '¥15.8', rating: '96%', desc: '代糖配方，保留番茄风味', tags: ['低GI', '儿童友好'] },
      { name: '千禾薄盐生抽', price: '¥22.5', rating: '99%', desc: '减盐30%，日常调味必备', tags: ['减盐', '家庭必备'] },
      { name: '辣酱王魔芋辣酱', price: '¥17.9', rating: '95%', desc: '魔芋基底，低卡又够味', tags: ['高蛋白', '饱腹感强'] },
      { name: ' McCormick柠檬胡椒盐', price: '¥14.5', rating: '97%', desc: '天然香料，无添加糖', tags: ['天然香料', '无添加'] }
    ],
    '零食': [
      { name: '良品铺子原味巴旦木', price: '¥29.9', rating: '98%', desc: '维E含量高，健康零食首选', tags: ['低糖', '高维E'] },
      { name: '三只松鼠低糖核桃', price: '¥25.8', rating: '97%', desc: 'Omega-3好来源', tags: ['低糖', '高Omega-3'] },
      { name: '百草味无添加腰果', price: '¥32.5', rating: '96%', desc: '原味烘烤，零添加', tags: ['无添加', '低糖'] }
    ],
    '饮品': [
      { name: '农夫山泉无糖绿茶', price: '¥3.5', rating: '97%', desc: '含儿茶素，抗氧化', tags: ['无糖', '零热量'] },
      { name: '伊利无糖酸奶', price: '¥8.9', rating: '98%', desc: '含益生菌，助消化', tags: ['低糖', '高钙'] }
    ],
    '主食': [
      { name: '桂格即食燕麦片', price: '¥45.9', rating: '99%', desc: '高纤维控糖首选', tags: ['高纤维', '低糖'] },
      { name: '金龙鱼糙米', price: '¥12.8', rating: '97%', desc: '保留胚芽营养', tags: ['高纤维', '低糖'] }
    ]
  };

  const key = Object.keys(mockData).find(k => keyword.includes(k)) || keyword;
  let products = mockData[key] || mockData[Object.keys(mockData)[0]] || [];
  return products.slice(0, count).map(p => ({
    ...p,
    link: `https://item.jd.com/${Math.floor(Math.random() * 999999999)}.html?union=1`,
    image: '📦',
    price: p.price.startsWith('¥') ? p.price : `¥${p.price}`
  }));
}

function writeJsFile(products, keyword) {
  const header = `// 自动生成的商品数据 - 来源: 京东联盟API
// 搜索关键词: ${keyword}
// 生成时间: ${new Date().toLocaleString('zh-CN')}
// 共 ${products.length} 款商品

`;
  const body = `const products = ${JSON.stringify(products, null, 2)};

module.exports = products;
`;
  fs.writeFileSync(OUTPUT_PATH, header + body, 'utf8');
  console.log(`✅ 数据已写入 ${OUTPUT_PATH}`);
  console.log(`   共 ${products.length} 款商品`);

  const webHeader = `// 京东联盟选品数据 - 供网页使用
// 搜索关键词: ${keyword}
// 生成时间: ${new Date().toLocaleString('zh-CN')}
// 将此文件通过 <script src="products-data.js"> 引入 HTML 页面

`;
  const webBody = `window.JD_PRODUCTS = ${JSON.stringify(products, null, 2)};
`;
  fs.writeFileSync(WEB_DATA_PATH, webHeader + webBody, 'utf8');
  console.log(`✅ 网页数据已写入 ${WEB_DATA_PATH}`);
}

async function main() {
  const args = process.argv.slice(2);
  const keyword = args[0] || '低卡调味';
  const count = parseInt(args[1]) || 5;

  console.log('========================================');
  console.log('  京东联盟选品助手');
  console.log('========================================');
  console.log(`  关键词: ${keyword}`);
  console.log(`  数量: ${count}`);
  console.log('========================================\n');

  let config;
  try {
    config = loadConfig();
  } catch (e) {
    console.log('❌ 配置错误:', e.message);
    process.exit(1);
  }

  let accessToken;
  try {
    accessToken = await getAccessToken(config);
  } catch (e) {
    console.log('❌ 认证失败:', e.message);
    console.log('\n💡 提示: 请检查 config.json 中的 AppKey 和 AppSecret');
    console.log('💡 如果还没有密钥，请参考 README.md 的获取步骤');
    console.log('\n📝 将使用示例数据继续执行...\n');
    const products = generateMockProducts(keyword, count);
    writeJsFile(products, keyword);
    return;
  }

  const goods = await searchProducts(config, accessToken, keyword, count * 3);

  if (!goods || goods.length === 0) {
    console.log('⚠️ API未返回商品数据，使用示例数据...');
    const products = generateMockProducts(keyword, count);
    writeJsFile(products, keyword);
    return;
  }

  console.log(`\n🔗 正在为 ${Math.min(count, goods.length)} 个商品生成推广链接...`);
  const materialId = config.unionId;
  const results = [];

  for (let i = 0; i < Math.min(count, goods.length); i++) {
    const g = goods[i];
    const skuId = g.skuId || g.sku_id || g.id;
    const name = g.skuName || g.name || g.title || '未知商品';
    const price = g.price || g.wxPrice || g.jdPrice || '0';
    const rating = g.commentScore || g.star || g.commentRate || 'N/A';
    const image = g.imagePath || g.imgUrl || g.picture || '';
    const shop = g.shopName || g.shop || '';

    console.log(`   [${i + 1}/${count}] ${name.substring(0, 20)}...`);

    let link = '';
    if (skuId) {
      const linkResult = await generatePromotionLink(config, accessToken, skuId, materialId);
      link = linkResult.link || linkResult.shortLink || '';
      if (!link && linkResult.error) {
        console.log(`      ⚠️ 链接生成失败: ${linkResult.error}`);
      }
    }

    if (!link) {
      link = `https://item.jd.com/${skuId || '0'}.html`;
    }

    results.push({
      name: name,
      brand: shop,
      price: `¥${price}`,
      rating: typeof rating === 'number' ? `${rating}%` : String(rating),
      image: image || '📦',
      link: link,
      tags: [],
      desc: g.comments || g.comment || '',
      skuId: skuId
    });

    await new Promise(r => setTimeout(r, 300));
  }

  if (results.length === 0) {
    console.log('⚠️ 未获取到商品数据，使用示例数据...');
    const mock = generateMockProducts(keyword, count);
    writeJsFile(mock, keyword);
    return;
  }

  writeJsFile(results, keyword);
  console.log('\n🎯 完成！现在可以将 data.js 的内容复制到网页中使用');
}

main().catch(e => {
  console.error('❌ 运行出错:', e.message);
  console.log('\n📝 将使用示例数据继续执行...');
  const fs = require('fs');
  const path = require('path');
  const mockData = {
    '低卡调味': [
      { name: '千禾零添加油醋汁', price: '¥19.9', rating: '98%', image: '🥗', link: 'https://item.jd.com/example1.html', tags: ['控卡', '轻食搭档'], desc: '0脂肪零添加' },
      { name: '亨氏无糖番茄酱', price: '¥15.8', rating: '96%', image: '🍅', link: 'https://item.jd.com/example2.html', tags: ['低GI', '儿童友好'], desc: '代糖配方' },
      { name: '千禾薄盐生抽', price: '¥22.5', rating: '99%', image: '🫙', link: 'https://item.jd.com/example3.html', tags: ['减盐', '家庭必备'], desc: '减盐30%' },
      { name: '魔芋辣酱', price: '¥17.9', rating: '95%', image: '🌶️', link: 'https://item.jd.com/example4.html', tags: ['高蛋白', '饱腹感强'], desc: '魔芋基底低卡' },
      { name: '柠檬胡椒盐', price: '¥14.5', rating: '97%', image: '🍋', link: 'https://item.jd.com/example5.html', tags: ['天然香料', '无添加'], desc: '天然香料' }
    ]
  };
  const outPath = path.join(__dirname, '..', 'data.js');
  const header = `// 自动生成的商品数据（示例）- ${new Date().toLocaleString('zh-CN')}\n\n`;
  fs.writeFileSync(outPath, header + `const products = ${JSON.stringify(mockData['低卡调味'], null, 2)};\n\nmodule.exports = products;\n`, 'utf8');
  console.log('✅ 示例数据已写入 data.js');
  process.exit(0);
});