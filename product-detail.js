(function() {

  var productDatabase = {
    staple: {
      label: '安心主食',
      categories: {
        'whole-grain': {
          name: '全谷物',
          items: [
            { id: 'staple-whole-grain-1', brand: '谷绿', name: '有机全麦面条', desc: '采用加拿大硬红小麦石磨磨制，保留完整麸皮，蛋白质含量高达14%，嚼劲十足。', price: '¥12.9', unit: '/500g', image: '🍜', tags: ['高纤维', '低糖', '高蛋白'], tagColor: ['green','green','blue'], badge: 'hot', badgeText: '热销', nutrition: { '能量': '340 kcal', '蛋白质': '14g', '脂肪': '2.5g', '碳水化合物': '68g', '膳食纤维': '12g' }, scenarios: ['控糖减脂', '健身人群', '日常主食'], warn: ['注意查看配料表，确保全麦粉含量≥50%', '避免添加糖和植脂末的产品', '关注钠含量，选择低盐产品'] },
            { id: 'staple-whole-grain-2', brand: '磨匠', name: '手工荞麦面', desc: '陕北高原黑荞麦磨粉制作，0添加白面粉，控糖友好，适合糖尿病人群。', price: '¥18.5', unit: '/400g', image: '🍜', tags: ['低糖', '低脂', '无添加'], tagColor: ['green','green','blue'], badge: 'recommend', badgeText: '推荐', nutrition: { '能量': '324 kcal', '蛋白质': '11g', '脂肪': '2.1g', '碳水化合物': '64g', '膳食纤维': '10g' }, scenarios: ['糖尿病人群', '控糖减脂', '素食者'], warn: ['配料表首位应为荞麦粉', '警惕"荞麦风味"而非真荞麦', '建议搭配鸡蛋和蔬菜营养更均衡'] },
            { id: 'staple-whole-grain-3', brand: '穗元', name: '糙米面条', desc: '糙米+全麦黄金比例，富含谷维素和膳食纤维，口感劲道，饱腹感持久。', price: '¥9.9', unit: '/500g', image: '🍝', tags: ['高纤维', '富含B族'], tagColor: ['green','orange'], nutrition: { '能量': '348 kcal', '蛋白质': '12g', '脂肪': '2.8g', '碳水化合物': '66g', '膳食纤维': '10g' }, scenarios: ['日常主食', '控糖减脂'], warn: ['确认糙米含量比例', '注意是否含有添加剂'] },
            { id: 'staple-whole-grain-4', brand: '麦粒', name: '燕麦宽面', desc: '30%燕麦粉+70%全麦，β-葡聚糖含量高，降胆固醇效果显著。', price: '¥15.8', unit: '/450g', image: '🍲', tags: ['高纤维', '降胆固醇', '低糖'], tagColor: ['green','purple','green'], nutrition: { '能量': '338 kcal', '蛋白质': '13g', '脂肪': '3.2g', '碳水化合物': '62g', '膳食纤维': '11g' }, scenarios: ['降胆固醇', '心血管健康', '控糖减脂'], warn: ['确保燕麦粉含量≥30%', '避免添加糖和香精', '关注GI值选择低GI产品'] },
            { id: 'staple-whole-grain-5', brand: '原磨坊', name: '三色谷物面', desc: '小麦+燕麦+荞麦三色谷物搭配，营养更全面，色彩丰富增进食欲。', price: '¥16.9', unit: '/500g', image: '🍜', tags: ['高纤维', '多谷物', '低糖'], tagColor: ['green','blue','green'], badge: 'new', badgeText: '新品', nutrition: { '能量': '342 kcal', '蛋白质': '12.5g', '脂肪': '2.6g', '碳水化合物': '65g', '膳食纤维': '11g' }, scenarios: ['营养均衡', '日常主食', '儿童辅食'], warn: ['查看三色谷物比例是否均衡', '注意是否含有色素', '建议搭配蔬果增加风味'] }
          ]
        },
        'mixed-grain': {
          name: '杂粮饭',
          items: [
            { id: 'staple-mixed-grain-1', brand: '谷养道', name: '三色米（糙米+红米+黑米）', desc: '精选东北黑土地原料，真空包装锁鲜，煮后粒粒分明，香糯可口。', price: '¥39.9', unit: '/2kg', image: '🍙', tags: ['高纤维', '富含花青素', '低脂'], tagColor: ['green','purple','green'], nutrition: { '能量': '330 kcal', '蛋白质': '7.7g', '脂肪': '2.7g', '碳水化合物': '72g', '膳食纤维': '4.5g' }, scenarios: ['日常主食', '营养均衡', '抗氧化'], warn: ['真空包装漏气请勿购买', '注意保质期，建议3个月内食用', '煮饭比例建议1:1.2（米:水）'] },
            { id: 'staple-mixed-grain-2', brand: '藜麦君', name: '秘鲁进口白藜麦', desc: '世界上唯一全蛋白植物食品，氨基酸组成完美，素食者的优质蛋白来源。', price: '¥68.0', unit: '/500g', image: '🌾', tags: ['高蛋白', '无麸质', '低脂'], tagColor: ['blue','green','green'], badge: 'recommend', badgeText: '推荐', nutrition: { '能量': '368 kcal', '蛋白质': '14g', '脂肪': '6g', '碳水化合物': '64g', '膳食纤维': '7g' }, scenarios: ['素食者', '健身增肌', '无麸质饮食'], warn: ['确认原产地为秘鲁', '注意清洗，表面有皂苷', '建议浸泡2小时后再烹饪'] },
            { id: 'staple-mixed-grain-3', brand: '燕之坊', name: '每日杂粮粥料包', desc: '10种五谷杂粮科学配比，独立小包装，一人一份刚好，方便上班族。', price: '¥29.9', unit: '/750g(30包)', image: '🥣', tags: ['高纤维', '便捷', '多种谷物'], tagColor: ['green','blue','blue'], badge: 'hot', badgeText: '热销', nutrition: { '能量': '310 kcal', '蛋白质': '8g', '脂肪': '2.5g', '碳水化合物': '68g', '膳食纤维': '8g' }, scenarios: ['便捷早餐', '上班族', '营养均衡'], warn: ['查看配料表是否真有10种谷物', '注意是否含有添加糖', '独立包装注意密封性'] },
            { id: 'staple-mixed-grain-4', brand: '粮年隆', name: '七色米（7种谷物）', desc: '糙米、红米、黑米、紫米、糯米、小米、玉米碴七色搭配，视觉味觉双重享受。', price: '¥45.8', unit: '/2kg', image: '🍚', tags: ['高纤维', '多谷物', '富含花青素'], tagColor: ['green','blue','purple'], nutrition: { '能量': '335 kcal', '蛋白质': '8.2g', '脂肪': '2.8g', '碳水化合物': '70g', '膳食纤维': '5.5g' }, scenarios: ['营养均衡', '儿童辅食', '日常主食'], warn: ['确认7种谷物真实存在', '注意密封保存', '建议搭配豆类食用'] }
          ]
        },
        'bean': {
          name: '豆类主食',
          items: [
            { id: 'staple-bean-1', brand: '豆果缘', name: '新疆鹰嘴豆', desc: '天山雪水灌溉，颗粒饱满，蛋白质含量高达22%，煮熟直接食用或打豆浆。', price: '¥22.0', unit: '/500g', image: '🫘', tags: ['高蛋白', '高纤维', '低脂'], tagColor: ['blue','green','green'], badge: 'hot', badgeText: '热销', nutrition: { '能量': '332 kcal', '蛋白质': '22g', '脂肪': '6g', '碳水化合物': '60g', '膳食纤维': '17g' }, scenarios: ['素食者', '健身增肌', '日常佐餐'], warn: ['注意是否有虫蛀或霉变', '建议浸泡后去皮使用', '搭配谷物食用营养更全面'] },
            { id: 'staple-bean-2', brand: '南派', name: '有机蒸南瓜', desc: '贝贝南瓜品种，板栗口感，天然甜度无需加糖，减脂期完美主食替代。', price: '¥19.9', unit: '/1kg(2个)', image: '🎃', tags: ['低卡', '低脂', '富含维A'], tagColor: ['green','green','orange'], nutrition: { '能量': '45 kcal', '蛋白质': '1g', '脂肪': '0.1g', '碳水化合物': '10g', '膳食纤维': '0.5g' }, scenarios: ['减脂期', '糖尿病人群', '儿童辅食'], warn: ['选择表皮光滑无破损的', '按压底部判断成熟度', '建议蒸15-20分钟'] },
            { id: 'staple-bean-3', brand: '豆之味', name: '花豆（红芸豆）', desc: '云南高山种植，炖煮易糯，富含铁和花青素，素食补铁好帮手。', price: '¥15.5', unit: '/500g', image: '🫘', tags: ['高蛋白', '富含铁', '高纤维'], tagColor: ['blue','red','green'], nutrition: { '能量': '310 kcal', '蛋白质': '20g', '脂肪': '1g', '碳水化合物': '55g', '膳食纤维': '15g' }, scenarios: ['素食补铁', '营养补血', '日常佐餐'], warn: ['注意清洗去除杂质', '建议浸泡8小时以上', '炖煮至软烂更易消化'] },
            { id: 'staple-bean-4', brand: '栗源', name: '即食板栗仁', desc: '燕山板栗去壳即食，原味零添加，香甜软糯，办公室健康加餐。', price: '¥12.8', unit: '/250g', image: '🌰', tags: ['低卡', '便捷', '无添加'], tagColor: ['green','blue','green'], nutrition: { '能量': '210 kcal', '蛋白质': '4.5g', '脂肪': '1.5g', '碳水化合物': '46g', '膳食纤维': '8g' }, scenarios: ['办公室加餐', '户外运动', '儿童零食'], warn: ['确认无添加糖和香精', '注意包装袋是否膨胀', '每日食用不超过50g'] }
          ]
        }
      }
    },
    snack: {
      label: '解馋零食',
      categories: {
        'nut': {
          name: '原味坚果',
          items: [
            { id: 'snack-nut-1', brand: '巴旦木庄园', name: '美国加州巴旦木', desc: '产地直采，物理烘烤不油炸，维生素E含量丰富，每日一小把。', price: '¥35.0', unit: '/500g', image: '🌰', tags: ['高维E', '低糖', '无添加'], tagColor: ['orange','green','green'], badge: 'hot', badgeText: '热销', nutrition: { '能量': '578 kcal', '蛋白质': '21g', '脂肪': '49g', '碳水化合物': '22g', '膳食纤维': '12g' }, scenarios: ['办公室零食', '追剧伴侣', '营养补充'], warn: ['选择原味无盐款', '每日不超过30g（约15颗）', '注意密封保存防潮'] },
            { id: 'snack-nut-2', brand: '核桃村', name: '新疆阿克苏薄皮核桃', desc: '薄皮手捏即开，核桃仁饱满，Omega-3含量高，每日3颗补脑。', price: '¥49.9', unit: '/500g', image: '🥜', tags: ['高Omega-3', '低糖', '无添加'], tagColor: ['blue','green','green'], nutrition: { '能量': '627 kcal', '蛋白质': '14.9g', '脂肪': '58.8g', '碳水化合物': '19g', '膳食纤维': '9.5g' }, scenarios: ['补脑益智', '孕妇食用', '办公室零食'], warn: ['选择薄皮原味核桃', '每日3-5颗即可', '注意核桃仁是否饱满'] },
            { id: 'snack-nut-3', brand: '腰果庄园', name: '越南原味腰果', desc: 'A180超大颗粒，低温烘烤保留油脂香，零添加更健康。', price: '¥88.0', unit: '/500g', image: '🥥', tags: ['低糖', '无添加', '高能量'], tagColor: ['green','green','blue'], badge: 'recommend', badgeText: '推荐', nutrition: { '能量': '553 kcal', '蛋白质': '17g', '脂肪': '36.7g', '碳水化合物': '41g', '膳食纤维': '3.6g' }, scenarios: ['健身加餐', '高端零食', '送礼'], warn: ['A180为最大规格', '选择真空或充氮包装', '注意是否有哈喇味'] },
            { id: 'snack-nut-4', brand: '坚果日记', name: '每日坚果30包', desc: '7种坚果果干科学配比，独立小包装，每日一包营养全。', price: '¥99.0', unit: '/750g(30包)', image: '🥜', tags: ['多种坚果', '便捷', '营养均衡'], tagColor: ['blue','green','purple'], badge: 'hot', badgeText: '热销', nutrition: { '能量': '480 kcal', '蛋白质': '15g', '脂肪': '32g', '碳水化合物': '38g', '膳食纤维': '6g' }, scenarios: ['每日一包', '便捷营养', '儿童零食'], warn: ['选择7种以上混合款', '注意果干添加糖含量', '独立包装注意防潮'] }
          ]
        },
        'biscuit': {
          name: '无糖饼干',
          items: [
            { id: 'snack-biscuit-1', brand: '纤麸', name: '高纤维燕麦代餐饼', desc: '燕麦+小麦麸皮，膳食纤维高达8g/100g，代餐饱腹感强。', price: '¥25.9', unit: '/500g', image: '🍪', tags: ['低糖', '高纤维', '低脂'], tagColor: ['green','green','green'], badge: 'hot', badgeText: '热销', nutrition: { '能量': '420 kcal', '蛋白质': '9g', '脂肪': '8g', '碳水化合物': '68g', '膳食纤维': '8g' }, scenarios: ['代餐', '减脂期', '办公室零食'], warn: ['配料表首位应为燕麦', '注意是否有添加糖', '每日不超过5片'] },
            { id: 'snack-biscuit-2', brand: '全麦屋', name: '真正全麦消化饼', desc: '配料表第一位就是全麦粉，非精制小麦粉冒充，控糖首选。', price: '¥22.0', unit: '/400g', image: '🥠', tags: ['低糖', '高纤维', '无添加糖'], tagColor: ['green','green','green'], nutrition: { 'energy': '445 kcal', '蛋白质': '8.5g', '脂肪': '12g', '碳水化合物': '68g', '膳食纤维': '6.5g' }, scenarios: ['控糖期', '减脂期', '日常零食'], warn: ['确认配料表第一位是全麦粉', '避免"全麦风味"产品', '注意脂肪含量'] },
            { id: 'snack-biscuit-3', brand: '糖友乐', name: '糖尿病人专用饼干', desc: '使用赤藓糖醇代糖，GI值低，血糖友好，经临床测试验证。', price: '¥29.8', unit: '/500g', image: '🍪', tags: ['无糖', '低GI', '糖尿病友好'], tagColor: ['green','blue','purple'], badge: 'recommend', badgeText: '推荐', nutrition: { '能量': '395 kcal', '蛋白质': '10g', '脂肪': '10g', '碳水化合物': '58g', '膳食纤维': '7g' }, scenarios: ['糖尿病人群', '控糖期', '医生推荐'], warn: ['确认使用赤藓糖醇代糖', '查看GI值标注', '经临床测试验证'] },
            { id: 'snack-biscuit-4', brand: '轻谷', name: '黑麦苏打饼干', desc: '德国黑麦粉发酵制作，天然麦香浓郁，搭配奶酪或鳄梨更佳。', price: '¥18.5', unit: '/300g', image: '🥨', tags: ['低糖', '低卡', '无添加'], tagColor: ['green','green','green'], nutrition: { '能量': '410 kcal', '蛋白质': '9g', '脂肪': '8g', '碳水化合物': '65g', '膳食纤维': '5g' }, scenarios: ['下午茶', '搭奶酪', '轻食'], warn: ['确认黑麦粉含量', '注意发酵工艺', '搭配高蛋白食物更均衡'] }
          ]
        },
        'chip': {
          name: '健康脆片',
          items: [
            { id: 'snack-chip-1', brand: '薯乐', name: '烘烤红薯片', desc: '福建六鳌红心地瓜，低温烘烤非油炸，香脆不油腻。', price: '¥19.9', unit: '/400g', image: '🍟', tags: ['低卡', '低脂', '非油炸'], tagColor: ['green','green','blue'], badge: 'hot', badgeText: '热销', nutrition: { '能量': '120 kcal', '蛋白质': '1.5g', '脂肪': '0.3g', '碳水化合物': '28g', '膳食纤维': '2g' }, scenarios: ['追剧零食', '减脂期', '儿童零食'], warn: ['选择烘烤非油炸款', '注意是否有添加糖', '每日不超过100g'] },
            { id: 'snack-chip-2', brand: '海的味道', name: '无糖海苔脆片', desc: '韩国进口紫菜片，烘烤后口感酥脆，蛋白质和矿物质丰富。', price: '¥15.0', unit: '/200g', image: '🍙', tags: ['低卡', '高蛋白', '富含矿物质'], tagColor: ['green','blue','orange'], nutrition: { 'energy': '180 kcal', '蛋白质': '40g', '脂肪': '7g', '碳水化合物': '35g', '膳食纤维': '5g' }, scenarios: ['低卡零食', '矿物质补充', '儿童零食'], warn: ['选择无糖无盐款', '注意碘含量', '甲状腺疾病患者慎用'] },
            { id: 'snack-chip-3', brand: '蔬乐', name: '综合果蔬脆片', desc: '6种蔬菜水果真空低温脱水，保留97%营养，多种口味。', price: '¥32.0', unit: '/500g', image: '🥕', tags: ['高纤维', '多种果蔬', '非油炸'], tagColor: ['green','blue','blue'], nutrition: { 'energy': '155 kcal', '蛋白质': '2g', '脂肪': '0.8g', '碳水化合物': '35g', '膳食纤维': '6g' }, scenarios: ['儿童零食', '营养补充', '办公室零食'], warn: ['选择非油炸款', '查看添加糖含量', '注意密封防潮'] },
            { id: 'snack-chip-4', brand: '豆香脆', name: '烘烤鹰嘴豆脆', desc: '鹰嘴豆煮熟烘烤至酥脆，高蛋白高纤维，替代薯片的好选择。', price: '¥16.8', unit: '/300g', image: '🫘', tags: ['高蛋白', '高纤维', '低卡'], tagColor: ['blue','green','green'], badge: 'recommend', badgeText: '推荐', nutrition: { 'energy': '180 kcal', '蛋白质': '10g', '脂肪': '2g', '碳水化合物': '28g', '膳食纤维': '8g' }, scenarios: ['健身零食', '替代薯片', '素食零食'], warn: ['选择原味无盐款', '每日不超过50g', '注意咀嚼充分'] }
          ]
        },
        'chocolate': {
          name: '黑巧系列',
          items: [
            { id: 'snack-chocolate-1', brand: '歌帝梵', name: '85%可可黑巧克力', desc: '比利时工艺，单一产地厄瓜多尔可可，入口微苦回甘，控糖首选。', price: '¥78.0', unit: '/100g', image: '🍫', tags: ['低糖', '高抗氧化', '黑巧'], tagColor: ['green','purple','red'], badge: 'recommend', badgeText: '推荐', nutrition: { 'energy': '592 kcal', '蛋白质': '7.8g', '脂肪': '42g', '碳水化合物': '35g', '膳食纤维': '16g' }, scenarios: ['控糖甜品', '抗氧化', '送礼'], warn: ['确保可可含量≥85%', '每日不超过25g（约2小块）', '储存温度15-20℃'] },
            { id: 'snack-chocolate-2', brand: '每日黑巧', name: '98%无糖黑巧克力', desc: '使用赤藓糖醇代糖，可可含量高达98%，几乎无碳水，生酮友好。', price: '¥45.0', unit: '/80g', image: '🍫', tags: ['无糖', '生酮友好', '高抗氧化'], tagColor: ['green','blue','purple'], badge: 'hot', badgeText: '热销', nutrition: { 'energy': '585 kcal', '蛋白质': '11g', '脂肪': '55g', '碳水化合物': '12g', '膳食纤维': '20g' }, scenarios: ['生酮饮食', '控糖期', '健身'], warn: ['确认可可含量≥98%', '注意赤藓糖醇是否会引起腹泻', '每日不超过20g'] },
            { id: 'snack-chocolate-3', brand: '巧心', name: '黑可可豆碎', desc: '100%可可豆粒，无任何添加，纯粹的可可香，可做烘焙原料。', price: '¥32.0', unit: '/200g', image: '🥥', tags: ['无添加', '高抗氧化', '黑巧'], tagColor: ['green','purple','red'], nutrition: { 'energy': '560 kcal', '蛋白质': '14g', '脂肪': '52g', '碳水化合物': '15g', '膳食纤维': '35g' }, scenarios: ['烘焙原料', '抗氧化', '纯可可'], warn: ['确认100%纯可可', '注意豆粒新鲜度', '密封冷藏保存'] },
            { id: 'snack-chocolate-4', brand: 'Lindt', name: '瑞士莲70%黑巧', desc: '经典瑞士工艺，70%可可含量，丝滑口感，入门黑巧首选。', price: '¥35.0', unit: '/100g', image: '🍫', tags: ['低糖', '高抗氧化'], tagColor: ['green','purple'], nutrition: { 'energy': '582 kcal', '蛋白质': '8.5g', '脂肪': '45g', '碳水化合物': '38g', '膳食纤维': '12g' }, scenarios: ['入门黑巧', '日常甜品', '送礼'], warn: ['确认可可含量≥70%', '选择经典款而非风味款', '每日不超过25g'] }
          ]
        }
      }
    },
    drink: {
      label: '轻盈饮品',
      categories: {
        'tea': {
          name: '健康茶饮',
          items: [
            { id: 'drink-tea-1', brand: '绿茶园', name: '西湖龙井（明前）', desc: '明前采摘，色翠味醇，含儿茶素和氨基酸，抗氧化解腻首选。', price: '¥88.0', unit: '/50g', image: '🍵', tags: ['无糖', '零热量', '抗氧化'], tagColor: ['green','green','purple'], badge: 'hot', badgeText: '热销', nutrition: { '能量': '1 kcal', '蛋白质': '0.2g', '脂肪': '0g', '碳水化合物': '0g', '膳食纤维': '0g' }, scenarios: ['餐后解腻', '办公室饮品', '送礼'], warn: ['明前茶产量稀少注意防伪', '水温80℃为宜', '避免长时间浸泡'] },
            { id: 'drink-tea-2', brand: '洋甘菊工坊', name: '德国洋甘菊茶', desc: '天然舒缓助眠，睡前一杯好梦，不含咖啡因，孕妇也可饮用。', price: '¥45.0', unit: '/100g', image: '🌼', tags: ['无咖啡因', '助眠', '舒缓'], tagColor: ['blue','purple','green'], nutrition: { 'energy': '1 kcal', '蛋白质': '0.1g', '脂肪': '0g', '碳水化合物': '0g', '膳食纤维': '0g' }, scenarios: ['睡前饮品', '助眠', '舒缓情绪'], warn: ['孕妇请咨询医生', '过敏体质慎用', '避免与药物同服'] },
            { id: 'drink-tea-3', brand: '大麦世家', name: '日本进口大麦茶', desc: '烘焙大麦香气浓郁，解腻助消化，大餐后来一杯最合适。', price: '¥28.0', unit: '/400g', image: '🌾', tags: ['零热量', '助消化', '无咖啡因'], tagColor: ['green','orange','blue'], nutrition: { 'energy': '0 kcal', '蛋白质': '0g', '脂肪': '0g', '碳水化合物': '0g', '膳食纤维': '0g' }, scenarios: ['餐后解腻', '日常饮品', '儿童饮品'], warn: ['选择烘焙型香气更浓', '注意保质期', '可反复冲泡2-3次'] },
            { id: 'drink-tea-4', brand: '花茶花', name: '玫瑰花+胎菊茶', desc: '平阴玫瑰+桐乡胎菊，花香怡人，理气解郁，女生必备茶饮。', price: '¥36.0', unit: '/150g', image: '🌹', tags: ['无添加', '理气', '养颜'], tagColor: ['green','purple','pink'], badge: 'recommend', badgeText: '推荐', nutrition: { 'energy': '2 kcal', '蛋白质': '0.1g', '脂肪': '0g', '碳水化合物': '0.5g', '膳食纤维': '0g' }, scenarios: ['女性茶饮', '养颜', '办公室饮品'], warn: ['孕妇经期慎用', '选择无硫熏玫瑰花', '搭配枸杞更佳'] }
          ]
        },
        'milk': {
          name: '乳品饮品',
          items: [
            { id: 'drink-milk-1', brand: '优活', name: '无糖原味酸奶', desc: '内蒙古牧场奶源，益生菌≥100亿CFU，助消化不酸牙。', price: '¥19.9', unit: '/1kg', image: '🥛', tags: ['低糖', '高钙', '含益生菌'], tagColor: ['green','blue','purple'], badge: 'hot', badgeText: '热销', nutrition: { 'energy': '72 kcal', '蛋白质': '2.5g', '脂肪': '2.7g', '碳水化合物': '9g', '膳食纤维': '0g' }, scenarios: ['早餐', '助消化', '补钙'], warn: ['确认益生菌数量', '选择无糖款', '冷藏2-6℃保存'] },
            { id: 'drink-milk-2', brand: '伊利', name: '低脂纯牛奶', desc: '甄选内蒙古黄金牧场，脂肪含量仅1.2g/100ml，钙和蛋白质不减。', price: '¥69.9', unit: '/250ml*24盒', image: '🥤', tags: ['低脂', '高蛋白', '高钙'], tagColor: ['green','blue','blue'], nutrition: { 'energy': '48 kcal', '蛋白质': '3g', '脂肪': '1.2g', '碳水化合物': '4.5g', '膳食纤维': '0g' }, scenarios: ['日常饮用', '补钙', '健身'], warn: ['确认脂肪含量≤1.5%', '保质期内饮用', '搭配谷物早餐更佳'] },
            { id: 'drink-milk-3', brand: 'Oatly', name: '瑞典燕麦奶', desc: '全球领先燕麦奶品牌，植物基替代，低卡无乳糖，环保可持续。', price: '¥48.0', unit: '/1L', image: '🥣', tags: ['低卡', '无乳糖', '植物基'], tagColor: ['green','green','blue'], badge: 'recommend', badgeText: '推荐', nutrition: { 'energy': '45 kcal', '蛋白质': '1g', '脂肪': '1g', '碳水化合物': '8g', '膳食纤维': '0.8g' }, scenarios: ['乳糖不耐', '素食者', '环保饮食'], warn: ['选择原味无添加款', '注意保质期', '开封后3天内饮用'] },
            { id: 'drink-milk-4', brand: '豆本豆', name: '无糖纯豆奶', desc: '东北非转基因大豆压榨，无糖添加，植物蛋白丰富，乳糖不耐者福音。', price: '¥59.9', unit: '/250ml*12盒', image: '🥛', tags: ['无糖', '植物蛋白', '无乳糖'], tagColor: ['green','blue','green'], nutrition: { 'energy': '54 kcal', '蛋白质': '3g', '脂肪': '1.6g', '碳水化合物': '6g', '膳食纤维': '1g' }, scenarios: ['乳糖不耐', '素食者', '日常饮用'], warn: ['选择非转基因大豆', '无糖款', '注意是否含有添加剂'] }
          ]
        },
        'juice': {
          name: '鲜榨果汁',
          items: [
            { id: 'drink-juice-1', brand: '17.5', name: 'NFC非浓缩橙汁', desc: '巴西圣保罗橙子鲜榨，100%原果汁，维C含量达30mg/100ml。', price: '¥28.8', unit: '/330ml', image: '🍊', tags: ['高维C', '天然', '无添加糖'], tagColor: ['orange','green','green'], badge: 'hot', badgeText: '热销', nutrition: { 'energy': '45 kcal', '蛋白质': '0.7g', '脂肪': '0.2g', '碳水化合物': '10g', '膳食纤维': '0.2g' }, scenarios: ['维C补充', '早餐搭配', '日常饮品'], warn: ['确认100%纯原果汁', 'NFC非浓缩还原', '开封后24小时内饮用'] },
            { id: 'drink-juice-2', brand: '蓝果', name: '野生蓝莓汁', desc: '大兴安岭野生蓝莓压榨，花青素含量高，护眼抗氧化效果显著。', price: '¥15.8', unit: '/150ml', image: '🫐', tags: ['高抗氧化', '护眼', '天然'], tagColor: ['purple','blue','green'], badge: 'recommend', badgeText: '推荐', nutrition: { 'energy': '57 kcal', '蛋白质': '0.7g', '脂肪': '0.3g', '碳水化合物': '14g', '膳食纤维': '2.4g' }, scenarios: ['护眼', '抗氧化', '女性饮品'], warn: ['选择野生蓝莓汁', '无添加糖', '每日不超过300ml'] },
            { id: 'drink-juice-3', brand: '农夫山泉', name: 'NFC苹果汁', desc: '新疆阿克苏苹果鲜榨，甜度自然，富含果胶和膳食纤维。', price: '¥22.0', unit: '/300ml', image: '🍎', tags: ['天然', '无添加糖', '高纤维'], tagColor: ['green','green','green'], nutrition: { 'energy': '48 kcal', '蛋白质': '0.3g', '脂肪': '0.2g', '碳水化合物': '12g', '膳食纤维': '0.8g' }, scenarios: ['日常饮品', '早餐搭配', '儿童饮品'], warn: ['确认100%原果汁', '选择NFC非浓缩款', '注意保质期'] },
            { id: 'drink-juice-4', brand: '唯可', name: '混合莓果汁', desc: '蓝莓+草莓+树莓三色莓果混合，花青素种类丰富，美容养颜。', price: '¥32.0', unit: '/250ml', image: '🍓', tags: ['高抗氧化', '多种莓果', '天然'], tagColor: ['purple','red','green'], nutrition: { 'energy': '52 kcal', '蛋白质': '0.6g', '脂肪': '0.3g', '碳水化合物': '12g', '膳食纤维': '1.8g' }, scenarios: ['美容养颜', '抗氧化', '女性饮品'], warn: ['确认多种莓果真实存在', '无添加糖', '注意花青素含量'] }
          ]
        }
      }
    },
    supplement: {
      label: '营养补剂',
      categories: {
        'vitamin': {
          name: '维生素类',
          items: [
            { id: 'supplement-vitamin-1', brand: '汤臣倍健', name: '维生素C泡腾片', desc: '每片含维C 1000mg，增强免疫力，橙子口味，每日一片。', price: '¥78.0', unit: '/10片*3瓶', image: '💊', tags: ['高维C', '增强免疫', '便携'], tagColor: ['orange','green','blue'], badge: 'hot', badgeText: '热销', nutrition: { '能量': '2 kcal', '蛋白质': '0g', '脂肪': '0g', '碳水化合物': '0.5g', '膳食纤维': '0g' }, scenarios: ['增强免疫', '感冒预防', '便携补充'], warn: ['每日不超过1片', '避免长期大剂量服用', '饭后服用吸收更佳'] },
            { id: 'supplement-vitamin-2', brand: 'D-Force', name: '维生素D3软胶囊', desc: '每粒含维D3 400IU，促进钙吸收，适合室内工作者和北方人群。', price: '¥58.0', unit: '/200粒', image: '☀️', tags: ['高维D', '促钙吸收', '健骨'], tagColor: ['yellow','purple','blue'], badge: 'recommend', badgeText: '推荐', nutrition: { 'energy': '10 kcal', '蛋白质': '0g', '脂肪': '1g', '碳水化合物': '0g', '膳食纤维': '0g' }, scenarios: ['促钙吸收', '健骨', '室内工作者'], warn: ['每日400IU即可', '避免长期大剂量', '搭配钙片效果更佳'] },
            { id: 'supplement-vitamin-3', brand: '善存', name: '复合维生素B族', desc: '8种B族维生素全补充，能量代谢更顺畅，缓解疲劳提升精力。', price: '¥88.0', unit: '/100片', image: '🍋', tags: ['高B族', '促代谢', '抗疲劳'], tagColor: ['yellow','orange','blue'], nutrition: { 'energy': '5 kcal', '蛋白质': '0g', '脂肪': '0g', '碳水化合物': '1g', '膳食纤维': '0g' }, scenarios: ['抗疲劳', '能量代谢', 'B族补充'], warn: ['每日1片即可', '避免与其他B族重复补充', '饭后服用'] },
            { id: 'supplement-vitamin-4', brand: 'Bio Island', name: '儿童维生素软糖', desc: '澳洲进口，多种维生素+矿物质，水果口味，小孩爱吃不抗拒。', price: '¥68.0', unit: '/60粒', image: '🧸', tags: ['多种维生素', '儿童友好', '好吃'], tagColor: ['orange','blue','pink'], nutrition: { 'energy': '15 kcal', '蛋白质': '0g', '脂肪': '0g', '碳水化合物': '3g', '膳食纤维': '0g' }, scenarios: ['儿童补充', '挑食偏食', '日常保健'], warn: ['每日不超过2粒', '注意添加糖含量', '选择大品牌儿童款'] }
          ]
        },
        'mineral': {
          name: '矿物质类',
          items: [
            { id: 'supplement-mineral-1', brand: '钙尔奇', name: '碳酸钙D3片', desc: '每片含钙600mg+维D3，中老年人必备，预防骨质疏松。', price: '¥128.0', unit: '/60片', image: '🦴', tags: ['高钙', '健骨', '中老年人'], tagColor: ['blue','green','orange'], badge: 'hot', badgeText: '热销', nutrition: { 'energy': '0 kcal', '蛋白质': '0g', '脂肪': '0g', '碳水化合物': '0g', '膳食纤维': '0g' }, scenarios: ['骨质疏松', '中老年', '补钙'], warn: ['每日1片即可', '避免与高铁同服', '配合日晒促进吸收'] },
            { id: 'supplement-mineral-2', brand: '铁元', name: '德国有机补铁剂', desc: '有机铁源+维C，吸收率高不刺激胃，适合女性和贫血人群。', price: '¥168.0', unit: '/500ml', image: '🩸', tags: ['有机铁', '补血', '女性友好'], tagColor: ['red','green','pink'], badge: 'recommend', badgeText: '推荐', nutrition: { 'energy': '10 kcal', '蛋白质': '0g', '脂肪': '0g', '碳水化合物': '2g', '膳食纤维': '0g' }, scenarios: ['贫血', '女性补铁', '孕期补铁'], warn: ['每日5-10ml', '避免与茶、咖啡同服', '搭配维C促进吸收'] },
            { id: 'supplement-mineral-3', brand: 'Mg-Plus', name: '柠檬酸镁胶囊', desc: '柠檬酸镁比氧化镁吸收率高3倍，缓解肌肉痉挛，运动人群必备。', price: '¥98.0', unit: '/120粒', image: '⚡', tags: ['高镁', '缓解疲劳', '运动'], tagColor: ['blue','orange','green'], nutrition: { 'energy': '5 kcal', '蛋白质': '0g', '脂肪': '0g', '碳水化合物': '1g', '膳食纤维': '0g' }, scenarios: ['运动人群', '缓解肌肉痉挛', '抗疲劳'], warn: ['每日1-2粒', '肾功能不全者慎用', '睡前服用助眠'] },
            { id: 'supplement-mineral-4', brand: '锌宝贝', name: '葡萄糖酸锌口服液', desc: '锌+维B1+维C，改善食欲促进发育，挑食偏食儿童的好伙伴。', price: '¥58.0', unit: '/10ml*20支', image: '🧴', tags: ['高锌', '改善食欲', '儿童'], tagColor: ['purple','green','blue'], nutrition: { 'energy': '8 kcal', '蛋白质': '0g', '脂肪': '0g', '碳水化合物': '2g', '膳食纤维': '0g' }, scenarios: ['儿童挑食', '改善食欲', '生长发育'], warn: ['每日1支即可', '避免长期服用', '饭后服用吸收更佳'] }
          ]
        },
        'protein': {
          name: '蛋白类',
          items: [
            { id: 'supplement-protein-1', brand: 'WonderLab', name: '乳清蛋白粉', desc: '每100g含蛋白质80g，吸收速度快，健身增肌首选，原味/巧克力味。', price: '¥299.0', unit: '/450g', image: '🥛', tags: ['高蛋白', '低脂', '健身增肌'], tagColor: ['blue','green','red'], badge: 'hot', badgeText: '热销', nutrition: { 'energy': '380 kcal', '蛋白质': '80g', '脂肪': '3g', '碳水化合物': '5g', '膳食纤维': '0g' }, scenarios: ['健身增肌', '术后恢复', '补充蛋白'], warn: ['每日1-2勺', '用温水或冷牛奶冲调', '训练后30分钟内服用'] },
            { id: 'supplement-protein-2', brand: '姿美堂', name: '胶原蛋白粉', desc: '分子量3000道尔顿，皮肤好吸收，美容养颜提升皮肤弹性。', price: '¥199.0', unit: '/60袋', image: '💧', tags: ['高蛋白', '美容', '女性友好'], tagColor: ['blue','pink','pink'], badge: 'recommend', badgeText: '推荐', nutrition: { 'energy': '370 kcal', '蛋白质': '90g', '脂肪': '0g', '碳水化合物': '0g', '膳食纤维': '0g' }, scenarios: ['美容养颜', '女性保健', '皮肤改善'], warn: ['每日1袋即可', '选择小分子胶原蛋白', '搭配维E效果更佳'] },
            { id: 'supplement-protein-3', brand: '素之源', name: '豌豆蛋白粉', desc: '非转基因豌豆蛋白，植物基来源，乳糖不耐者和素食者福音。', price: '¥159.0', unit: '/500g', image: '🫛', tags: ['植物蛋白', '无乳糖', '素食'], tagColor: ['green','green','blue'], nutrition: { 'energy': '350 kcal', '蛋白质': '75g', '脂肪': '5g', '碳水化合物': '15g', '膳食纤维': '5g' }, scenarios: ['素食者', '乳糖不耐', '环保饮食'], warn: ['每日1-2勺', '选择非转基因豌豆', '搭配谷物蛋白更全面'] },
            { id: 'supplement-protein-4', brand: '肌肉科技', name: '酪蛋白缓释蛋白粉', desc: '慢吸收蛋白，夜间持续供给氨基酸，适合睡前饮用。', price: '¥399.0', unit: '/907g', image: '🥤', tags: ['高蛋白', '缓释', '健身'], tagColor: ['blue','purple','green'], nutrition: { 'energy': '390 kcal', '蛋白质': '78g', '脂肪': '3g', '碳水化合物': '8g', '膳食纤维': '0g' }, scenarios: ['睡前饮用', '健身增肌', '夜间修复'], warn: ['睡前1小时服用', '用牛奶冲调吸收更好', '避免空腹服用'] }
          ]
        }
      }
    }
  };

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function findProductById(productId) {
    var tabs = Object.keys(productDatabase);
    for (var i = 0; i < tabs.length; i++) {
      var tab = productDatabase[tabs[i]];
      var categories = tab.categories;
      var catKeys = Object.keys(categories);
      for (var j = 0; j < catKeys.length; j++) {
        var cat = categories[catKeys[j]];
        var items = cat.items;
        for (var k = 0; k < items.length; k++) {
          if (items[k].id === productId) {
            return { product: items[k], tab: tab, category: cat, tabKey: tabs[i], catKey: catKeys[j] };
          }
        }
      }
    }
    return null;
  }

  function renderCrumbBar(tab, category, product) {
    var crumb = document.getElementById('crumbBar');
    if (!crumb) return;
    var tabKey = getQueryParam('tab') || '';
    var catKey = getQueryParam('category') || '';
    var listUrl = 'product-list.html';
    if (tabKey) listUrl += '?tab=' + encodeURIComponent(tabKey);
    if (catKey) listUrl += '&category=' + encodeURIComponent(catKey);
    crumb.innerHTML =
      '<a href="index.html">首页</a> › ' +
      '<a href="food-recommend.html">知食分子</a> › ' +
      '<a href="' + listUrl + '">' + (tab ? tab.label : '') + '</a> › ' +
      '<span>' + product.name + '</span>' +
      '<a href="javascript:history.back()" class="back-btn">← 返回</a>';
  }

  function renderCoreTags(product) {
    var container = document.getElementById('coreTags');
    if (!container) return;
    var tags = product.tags || [];
    container.innerHTML = tags.slice(0, 3).map(function(tag) {
      return '<span class="core-tag"><span class="dot"></span>' + tag + '</span>';
    }).join('');
  }

  function renderNutritionGrid(product) {
    var grid = document.getElementById('nutritionGrid');
    if (!grid) return;
    var nutrition = product.nutrition || {};
    grid.innerHTML = Object.keys(nutrition).map(function(key) {
      var value = nutrition[key];
      var match = value.match(/^([\d.]+)\s*(.*)$/);
      var numVal = value;
      var unit = '';
      if (match) {
        numVal = match[1];
        unit = match[2] || '';
      }
      return '<div class="info-card">' +
        '<div class="info-card-label">' + key + '</div>' +
        '<div class="info-card-value">' + numVal + '<span class="unit">' + unit + '</span></div>' +
      '</div>';
    }).join('');
  }

  function renderScenarios(product) {
    var container = document.getElementById('scenarioList');
    if (!container) return;
    var scenarios = product.scenarios || ['日常食用'];
    container.innerHTML = scenarios.map(function(s) {
      return '<span class="scenario-tag">' + s + '</span>';
    }).join('');
  }

  function renderRelatedProducts(currentTabKey, currentCatKey, currentProduct) {
    var grid = document.getElementById('relatedGrid');
    var section = document.getElementById('relatedSection');
    if (!grid || !section) return;
    var tab = productDatabase[currentTabKey];
    if (!tab) {
      section.style.display = 'none';
      return;
    }
    var categories = tab.categories;
    var relatedItems = [];
    var catKeys = Object.keys(categories);
    for (var i = 0; i < catKeys.length; i++) {
      if (catKeys[i] === currentCatKey) continue;
      var items = categories[catKeys[i]].items;
      for (var j = 0; j < items.length; j++) {
        if (items[j].id !== currentProduct.id) {
          relatedItems.push(items[j]);
        }
      }
    }
    if (relatedItems.length === 0) {
      section.style.display = 'none';
      return;
    }
    var displayItems = relatedItems.slice(0, 8);
    var tabKey = currentTabKey;
    var catKey = currentCatKey;
    grid.innerHTML = displayItems.map(function(item) {
      var priceStr = item.price || '';
      var priceUnit = item.unit || '';
      return '<a class="related-item" href="product-detail.html?id=' + encodeURIComponent(item.id) + '&tab=' + encodeURIComponent(tabKey) + '&category=' + encodeURIComponent(catKey) + '">' +
        '<div class="related-emoji">' + item.image + '</div>' +
        '<div class="related-name">' + item.name + '</div>' +
        '<div class="related-price">' + priceStr + ' <span class="unit">' + priceUnit + '</span></div>' +
      '</a>';
    }).join('');
  }

  function render() {
    var productId = getQueryParam('id');
    if (!productId) {
      document.getElementById('productName').textContent = '未指定商品';
      document.getElementById('galleryEmoji').textContent = '🔍';
      document.getElementById('recommendText').textContent = '请通过商品列表页访问具体商品详情。';
      return;
    }

    var result = findProductById(productId);
    if (!result) {
      document.getElementById('productName').textContent = '商品未找到';
      document.getElementById('galleryEmoji').textContent = '😕';
      document.getElementById('recommendText').textContent = '抱歉，未找到该商品信息。';
      return;
    }

    var product = result.product;
    var tab = result.tab;
    var category = result.category;

    document.title = product.name + ' - 知食分子 | 食品营养搜索';

    document.getElementById('galleryBrand').textContent = product.brand || '';
    document.getElementById('galleryEmoji').textContent = product.image || '📦';
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price || '';
    document.getElementById('productUnit').textContent = product.unit || '';

    renderCrumbBar(tab, category, product);
    renderCoreTags(product);

    var recommendEl = document.getElementById('recommendText');
    var tagText = (product.tags || []).join('、');
    recommendEl.innerHTML = '<strong>' + product.name + '</strong> 采用优质原料，' + product.desc + ' 富含' + (tagText || '多种营养成分') + '，适合日常健康饮食搭配。';

    var warnList = product.warn || ['注意查看产品配料表和生产日期', '根据自身需求合理选购，避免盲目跟风', '建议先购买小包装试用，确认适合后再回购'];
    var warnEl = document.getElementById('warnList');
    warnEl.innerHTML = warnList.map(function(w) {
      return '<li>' + w + '</li>';
    }).join('');

    renderNutritionGrid(product);
    renderScenarios(product);
    renderRelatedProducts(result.tabKey, result.catKey, product);

    var tasteBtn = document.getElementById('tasteBtn');
    if (tasteBtn) {
      tasteBtn.addEventListener('click', function() {
        alert('即将前往购买 ' + product.name + '，请在打开的页面完成购买。');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();