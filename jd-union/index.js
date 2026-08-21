const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const configPath = path.join(__dirname, 'config.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'data.js');
const WEB_DATA_PATH = path.join(__dirname, '..', 'products-data.js');
const API_HOST = 'api.jd.com';
const API_PATH = '/routerjson';

function loadConfig() {
  const raw = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(raw);
  if (!config.appKey || config.appKey === 'YOUR_APP_KEY_HERE') {
    throw new Error('请先在 config.json 中填写 AppKey');
  }
  if (!config.appSecret || config.appSecret === 'YOUR_APP_SECRET_HERE') {
    throw new Error('请先在 config.json 中填写 AppSecret');
  }
  if (!config.unionId || config.unionId === 'YOUR_UNION_ID_HERE') {
    throw new Error('请先在 config.json 中填写 unionId（在 union.jd.com 个人中心获取）');
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

function requestApi(params) {
  return new Promise((resolve, reject) => {
    const queryString = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');

    const options = {
      hostname: API_HOST,
      path: `${API_PATH}?${queryString}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          reject(new Error(`响应解析失败，原始响应前200字符: ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时，请检查网络连接或 API 是否可达'));
    });

    req.end();
  });
}

async function getAccessToken(config) {
  if (config.accessToken && config.accessToken.trim()) {
    const expiresAt = config.tokenExpiresAt || 0;
    if (Date.now() < expiresAt) {
      console.log(`🔑 使用缓存的 access_token（有效期至 ${new Date(expiresAt).toLocaleString('zh-CN')}）`);
      return config.accessToken.trim();
    }
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
    const result = await requestApi(params);
    if (result.error_response) {
      const err = result.error_response;
      throw new Error(`获取access_token失败 [code=${err.code}]: ${err.zhDesc || err.msg || JSON.stringify(err)}`);
    }

    const accessToken = result.access_token || result.open_access_token;
    const expiresIn = result.expires_in || result.expires || 86400;

    if (!accessToken) {
      throw new Error(`未获取到access_token，响应: ${JSON.stringify(result).substring(0, 300)}`);
    }

    config.accessToken = accessToken;
    config.tokenExpiresAt = Date.now() + (expiresIn - 60) * 1000;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    console.log(`✅ access_token 获取成功（有效期 ${expiresIn} 秒）`);
    return accessToken;
  } catch (e) {
    throw new Error(`获取access_token失败: ${e.message}\n请检查 config.json 中的 AppKey 和 AppSecret 是否正确`);
  }
}

async function callUnionApi(config, accessToken, method, bizParams) {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    'method': method,
    'app_key': config.appKey,
    'access_token': accessToken,
    'timestamp': String(timestamp),
    'v': '2.0',
    'sign_method': 'md5',
    'req.param': JSON.stringify(bizParams)
  };
  params['sign'] = sign(params, config.appSecret);
  return requestApi(params);
}

async function searchProducts(config, accessToken, keyword, count) {
  console.log(`🔍 正在搜索 "${keyword}" 相关商品（京东联盟API）...`);

  const req = {
    goodsSearchReq: {
      keyword: keyword,
      pageIndex: 1,
      pageSize: Math.max(count * 3, 30),
      sortType: 'comment_num_desc'
    }
  };

  try {
    const result = await callUnionApi(config, accessToken, 'jd.union.open.goods.search', req);

    if (result.error_response) {
      const err = result.error_response;
      console.warn(`⚠️  搜索接口返回错误 [code=${err.code}]: ${err.zhDesc || err.msg || JSON.stringify(err)}`);
      return [];
    }

    let goods = [];
    if (result.result) {
      if (result.result.goodsSearchResponse && result.result.goodsSearchResponse.data) {
        goods = result.result.goodsSearchResponse.data;
      } else if (Array.isArray(result.result)) {
        goods = result.result;
      } else if (result.result.data) {
        goods = result.result.data;
      }
    }

    console.log(`   找到 ${goods.length} 个商品`);
    if (goods.length > 0) {
      const sample = goods[0];
      console.log(`   字段示例: ${Object.keys(sample).slice(0, 10).join(', ')}`);
    }
    return goods;
  } catch (e) {
    console.warn(`⚠️  商品搜索失败: ${e.message}`);
    return [];
  }
}

async function generatePromotionLink(config, accessToken, skuId) {
  const req = {
    promotionCodeReq: {
      materialId: config.unionId,
      couponInfo: '',
      subUnionId: 'health_' + Date.now()
    }
  };

  try {
    const result = await callUnionApi(config, accessToken, 'jd.union.open.promotion.common.get', req);

    if (result.error_response) {
      const err = result.error_response;
      return { skuId, link: null, error: `[code=${err.code}] ${err.zhDesc || err.msg || JSON.stringify(err).substring(0, 100)}` };
    }

    let data = null;
    if (result.result) {
      if (result.result.promotionCodeResponse) {
        data = result.result.promotionCodeResponse;
      } else if (typeof result.result === 'object' && !Array.isArray(result.result)) {
        data = result.result;
      }
    } else if (result.data) {
      data = result.data;
    }

    if (data) {
      const clickUrl = data.clickUrl || data.couponInfo || data.shortLink || data.url;
      if (clickUrl) {
        return { skuId, link: clickUrl, shortLink: data.shortLink };
      }
      if (typeof data === 'string') {
        return { skuId, link: data };
      }
    }

    return { skuId, link: null, error: `响应格式异常: ${JSON.stringify(result).substring(0, 200)}` };
  } catch (e) {
    return { skuId, link: null, error: e.message };
  }
}

function extractField(obj, keys, defaultValue) {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== '') {
      return obj[k];
    }
  }
  return defaultValue;
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
  const products = mockData[key] || mockData[Object.keys(mockData)[0]] || [];
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
  const header = `// 自动生成的商品数据 - 来源: 京东联盟API (union.jd.com)
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

  console.log('==============================================');
  console.log('  京东联盟选品助手 (union.jd.com)');
  console.log('==============================================');
  console.log(`  关键词: ${keyword}`);
  console.log(`  数量: ${count}`);
  console.log('==============================================\n');

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
    console.log('\n💡 请检查 config.json 中的 AppKey / AppSecret / unionId');
    console.log('💡 密钥获取地址: union.jd.com → 应用管理 → 我的应用');
    console.log('\n📝 将使用示例数据继续执行...\n');
    const products = generateMockProducts(keyword, count);
    writeJsFile(products, keyword);
    return;
  }

  const goods = await searchProducts(config, accessToken, keyword, count * 3);

  if (!goods || goods.length === 0) {
    console.log('⚠️  API未返回商品数据，使用示例数据...');
    const products = generateMockProducts(keyword, count);
    writeJsFile(products, keyword);
    return;
  }

  console.log(`\n🔗 正在为 ${Math.min(count, goods.length)} 个商品生成推广链接...`);
  console.log(`   推广位ID (materialId): ${config.unionId}`);
  const results = [];

  for (let i = 0; i < Math.min(count, goods.length); i++) {
    const g = goods[i];

    const skuId = extractField(g, ['skuId', 'sku_id', 'skuIdStr', 'id'], '');
    const name = extractField(g, ['skuName', 'name', 'title', 'skuName'], '未知商品');
    const price = extractField(g, ['price', 'wxPrice', 'jdPrice', 'salePrice'], '0');
    const rating = extractField(g, ['commentScore', 'star', 'commentRate', 'goodsComment'], 'N/A');
    const image = extractField(g, ['imagePath', 'imgUrl', 'picture', 'image', 'skuImg'], '');
    const shop = extractField(g, ['shopName', 'shop', 'shopNameStr'], '');
    const comments = extractField(g, ['comments', 'comment', 'commentNum', 'remark'], '');

    console.log(`   [${i + 1}/${count}] ${(name || '').substring(0, 25)}...`);

    let link = '';
    if (skuId) {
      const linkResult = await generatePromotionLink(config, accessToken, skuId);
      if (linkResult.link) {
        link = linkResult.link;
      } else if (linkResult.error) {
        console.log(`      ⚠️  链接生成失败: ${linkResult.error}`);
        link = `https://item.jd.com/${skuId}.html`;
      }
    } else {
      link = `https://item.jd.com/0.html`;
    }

    let ratingStr = String(rating);
    if (typeof rating === 'number' && rating <= 5) {
      ratingStr = `${(rating * 20).toFixed(0)}%`;
    } else if (ratingStr && !ratingStr.includes('%') && ratingStr !== 'N/A') {
      ratingStr = ratingStr;
    }

    results.push({
      name: name,
      brand: shop,
      price: price.startsWith('¥') ? price : `¥${price}`,
      rating: ratingStr,
      image: image || '📦',
      link: link,
      tags: [],
      desc: String(comments || '').substring(0, 100),
      skuId: skuId
    });

    await new Promise(r => setTimeout(r, 300));
  }

  if (results.length === 0) {
    console.log('⚠️  未获取到商品数据，使用示例数据...');
    const mock = generateMockProducts(keyword, count);
    writeJsFile(mock, keyword);
    return;
  }

  writeJsFile(results, keyword);
  console.log('\n🎯 完成！现在可以将 data.js 的内容复制到网页中使用');
  console.log('💡 提示: 在浏览器中打开 products-data.html 可查看数据预览');
}

main().catch(e => {
  console.error('❌ 运行出错:', e.message);
  console.log('\n📝 将使用示例数据继续执行...');
  const fs = require('fs');
  const path = require('path');
  const mockData = {
    '低卡调味': [
      { name: '千禾零添加油醋汁', price: '¥19.9', rating: '98%', image: '🥗', link: 'https://item.jd.com/example1.html', tags: ['控卡', '轻食搭档'], desc: '0脂肪零添加，适合拌沙拉' },
      { name: '亨氏无糖番茄酱', price: '¥15.8', rating: '96%', image: '🍅', link: 'https://item.jd.com/example2.html', tags: ['低GI', '儿童友好'], desc: '代糖配方，保留番茄风味' },
      { name: '千禾薄盐生抽', price: '¥22.5', rating: '99%', image: '🫙', link: 'https://item.jd.com/example3.html', tags: ['减盐', '家庭必备'], desc: '减盐30%，日常调味必备' },
      { name: '魔芋辣酱', price: '¥17.9', rating: '95%', image: '🌶️', link: 'https://item.jd.com/example4.html', tags: ['高蛋白', '饱腹感强'], desc: '魔芋基底低卡' },
      { name: '柠檬胡椒盐', price: '¥14.5', rating: '97%', image: '🍋', link: 'https://item.jd.com/example5.html', tags: ['天然香料', '无添加'], desc: '天然香料' }
    ]
  };
  const outPath = path.join(__dirname, '..', 'data.js');
  const webPath = path.join(__dirname, '..', 'products-data.js');
  const timestamp = new Date().toLocaleString('zh-CN');
  fs.writeFileSync(outPath, `// 自动生成的商品数据（示例）- ${timestamp}\n\nconst products = ${JSON.stringify(mockData['低卡调味'], null, 2)};\n\nmodule.exports = products;\n`, 'utf8');
  fs.writeFileSync(webPath, `// 京东联盟选品数据（示例）- ${timestamp}\n\nwindow.JD_PRODUCTS = ${JSON.stringify(mockData['低卡调味'], null, 2)};\n`, 'utf8');
  console.log('✅ 示例数据已写入 data.js 和 products-data.js');
  process.exit(0);
});