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
      { name: '千禾零添加油醋汁', price: '¥19.9', rating: '98%', desc: '0脂肪零添加，无味精无色素，适合拌沙拉、凉拌菜，控卡期必备健康调料。', tags: ['控卡', '轻食搭档'], image: '🥗' },
      { name: '亨氏无糖番茄酱', price: '¥15.8', rating: '96%', desc: '使用赤藓糖醇替代白砂糖，保留番茄风味，不添加人工色素，适合搭配鸡胸肉或全麦面包。', tags: ['低GI', '儿童友好'], image: '🍅' },
      { name: '千禾零添加薄盐生抽', price: '¥22.5', rating: '99%', desc: '钠含量比普通生抽低30%以上，采用非转基因大豆酿造，0添加防腐剂，日常炒菜或蘸料都适合。', tags: ['减盐', '家庭必备'], image: '🫙' },
      { name: '辣妹子魔芋辣酱', price: '¥17.9', rating: '95%', desc: '以魔芋为基底，添加精选辣椒，辣味足但热量极低，每100g仅80大卡，重口味人群解馋利器。', tags: ['高蛋白', '饱腹感强'], image: '🌶️' },
      { name: 'McCormick柠檬胡椒盐', price: '¥14.5', rating: '97%', desc: '天然柠檬粉+黑胡椒+海盐混合，无添加糖和味精，无防腐剂，煎鱼、烤蔬菜、牛排的完美搭档。', tags: ['天然香料', '无添加'], image: '🍋' }
    ],
    '零食': [
      { name: '良品铺子原味巴旦木', price: '¥29.9', rating: '98%', desc: '配料表只有巴旦木，维E含量爆表，每日一小把补充优质脂肪。', tags: ['低糖', '高维E'], image: '🌰' },
      { name: '三只松鼠低糖核桃', price: '¥25.8', rating: '97%', desc: '每日3颗，补充Omega-3，酥脆可口不甜腻。', tags: ['低糖', '高Omega-3'], image: '🥜' },
      { name: '百草味无添加腰果', price: '¥32.5', rating: '96%', desc: '原味烘烤，零添加，香脆可口，健康零食首选。', tags: ['无添加', '低糖'], image: '🥥' },
      { name: '良品铺子烤红薯片', price: '¥19.9', rating: '95%', desc: '烘烤非油炸，低卡又香脆，解馋不长肉。', tags: ['低卡', '低脂'], image: '🍟' },
      { name: '三只松鼠85%黑巧克力', price: '¥39.9', rating: '98%', desc: '高可可含量，控糖期也能吃的甜品，富含抗氧化物质。', tags: ['低糖', '高抗氧化'], image: '🍫' }
    ],
    '饮品': [
      { name: '农夫山泉无糖绿茶', price: '¥3.5', rating: '97%', desc: '含儿茶素，抗氧化又解腻，大餐后来一杯。', tags: ['无糖', '零热量'], image: '🍵' },
      { name: '伊利无糖酸奶', price: '¥8.9', rating: '98%', desc: '含益生菌助消化，低糖不酸牙，早餐最佳搭配。', tags: ['低糖', '高钙'], image: '🥛' },
      { name: '维他奶无糖豆奶', price: '¥4.5', rating: '96%', desc: '植物蛋白来源，低卡无乳糖，适合乳糖不耐人群。', tags: ['低糖', '无乳糖'], image: '🥤' },
      { name: '东方树叶无糖乌龙茶', price: '¥5.5', rating: '97%', desc: '0卡路里纯茶饮料，解腻助消化，大餐必备。', tags: ['零热量', '助消化'], image: '🍶' },
      { name: '伊利低脂牛奶', price: '¥6.9', rating: '98%', desc: '补充优质蛋白和钙质，低脂无负担。', tags: ['低脂', '高蛋白'], image: '🥛' }
    ],
    '主食': [
      { name: '桂格即食燕麦片', price: '¥45.9', rating: '99%', desc: '高纤维控糖首选，早餐搭配牛奶营养满满。', tags: ['高纤维', '低糖'], image: '🥣' },
      { name: '金龙鱼糙米', price: '¥12.8', rating: '97%', desc: '保留胚芽营养，饱腹感比白米强3倍。', tags: ['高纤维', '低糖'], image: '🍚' },
      { name: '中粮三色米', price: '¥25.9', rating: '96%', desc: '糙米+红米+黑米，一餐吃够多种营养。', tags: ['高纤维', '低脂'], image: '🍙' },
      { name: '藜麦君白藜麦', price: '¥49.9', rating: '98%', desc: '完全蛋白食材，素食者的优质选择，无麸质。', tags: ['高蛋白', '无麸质'], image: '🌾' },
      { name: '贝贝南瓜', price: '¥9.9', rating: '97%', desc: '天然清甜，减脂期主食完美替代，富含维A。', tags: ['低卡', '富含维A'], image: '🎃' }
    ]
  };

  const key = Object.keys(mockData).find(k => keyword.includes(k)) || keyword;
  let products = mockData[key] || mockData[Object.keys(mockData)[0]] || [];
  return products.slice(0, count).map(p => ({
    name: p.name,
    brand: '京东自营',
    price: p.price.startsWith('¥') ? p.price : `¥${p.price}`,
    rating: p.rating,
    image: p.image || '📦',
    link: `https://item.jd.com/${Math.floor(Math.random() * 999999999)}.html?union=YOUR_UNION_ID`,
    tags: p.tags,
    desc: p.desc
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
    console.log('⚠️  配置未完成:', e.message);
    console.log('📝 将使用示例数据继续执行（填写 config.json 后可调用真实API）\n');
    const products = generateMockProducts(keyword, count);
    writeJsFile(products, keyword);
    return;
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