const foodDatabase = [
  // 水果
  {
    id: 1, name: "苹果", category: "水果", aliases: ["apple", "红富士"],
    serving: "100克", calories: 52,
    protein: 0.3, fat: 0.2, carbs: 14, fiber: 2.4, sugar: 10,
    sodium: 1, potassium: 107, cholesterol: 0,
    vitaminA: 54, vitaminC: 4.6, vitaminD: 0, vitaminB12: 0,
    calcium: 6, iron: 0.12, magnesium: 5,
    healthTip: "苹果富含膳食纤维和维生素C，有助于促进肠道蠕动，每天一个苹果有益健康。"
  },
  {
    id: 2, name: "香蕉", category: "水果", aliases: ["banana"],
    serving: "100克", calories: 89,
    protein: 1.1, fat: 0.3, carbs: 23, fiber: 2.6, sugar: 12,
    sodium: 1, potassium: 358, cholesterol: 0,
    vitaminA: 10, vitaminC: 8.7, vitaminD: 0, vitaminB12: 0,
    calcium: 5, iron: 0.26, magnesium: 27,
    healthTip: "香蕉是钾的良好来源，有助于维持正常血压，运动后食用可补充能量。"
  },
  {
    id: 3, name: "橙子", category: "水果", aliases: ["orange", "柑橘"],
    serving: "100克", calories: 47,
    protein: 0.9, fat: 0.1, carbs: 12, fiber: 2.2, sugar: 9,
    sodium: 0, potassium: 181, cholesterol: 0,
    vitaminA: 24, vitaminC: 53.2, vitaminD: 0, vitaminB12: 0,
    calcium: 40, iron: 0.12, magnesium: 10,
    healthTip: "橙子富含维生素C，能增强免疫力，促进铁吸收，预防感冒。"
  },
  {
    id: 4, name: "葡萄", category: "水果", aliases: ["grape"],
    serving: "100克", calories: 69,
    protein: 0.7, fat: 0.3, carbs: 18, fiber: 0.9, sugar: 16,
    sodium: 2, potassium: 191, cholesterol: 0,
    vitaminA: 8, vitaminC: 3.2, vitaminD: 0, vitaminB12: 0,
    calcium: 10, iron: 0.36, magnesium: 9,
    healthTip: "葡萄含有抗氧化物质如白藜芦醇，有助于保护心血管健康。"
  },
  {
    id: 5, name: "草莓", category: "水果", aliases: ["strawberry"],
    serving: "100克", calories: 32,
    protein: 0.7, fat: 0.3, carbs: 7.7, fiber: 2, sugar: 4.9,
    sodium: 1, potassium: 153, cholesterol: 0,
    vitaminA: 1, vitaminC: 58.8, vitaminD: 0, vitaminB12: 0,
    calcium: 16, iron: 0.41, magnesium: 13,
    healthTip: "草莓维生素C含量极高，还含有花青素等抗氧化成分。"
  },
  {
    id: 6, name: "西瓜", category: "水果", aliases: ["watermelon"],
    serving: "100克", calories: 30,
    protein: 0.6, fat: 0.2, carbs: 7.6, fiber: 0.4, sugar: 6.2,
    sodium: 1, potassium: 112, cholesterol: 0,
    vitaminA: 28, vitaminC: 8, vitaminD: 0, vitaminB12: 0,
    calcium: 7, iron: 0.24, magnesium: 10,
    healthTip: "西瓜含水量高，夏季食用可消暑解渴，还含有番茄红素。"
  },
  {
    id: 7, name: "芒果", category: "水果", aliases: ["mango"],
    serving: "100克", calories: 60,
    protein: 0.8, fat: 0.4, carbs: 15, fiber: 1.6, sugar: 14,
    sodium: 1, potassium: 168, cholesterol: 0,
    vitaminA: 54, vitaminC: 36.4, vitaminD: 0, vitaminB12: 0,
    calcium: 11, iron: 0.16, magnesium: 10,
    healthTip: "芒果富含维生素A和C，以及膳食纤维，有助于消化系统健康。"
  },
  {
    id: 8, name: "蓝莓", category: "水果", aliases: ["blueberry"],
    serving: "100克", calories: 57,
    protein: 0.7, fat: 0.3, carbs: 14, fiber: 2.4, sugar: 10,
    sodium: 1, potassium: 77, cholesterol: 0,
    vitaminA: 3, vitaminC: 9.7, vitaminD: 0, vitaminB12: 0,
    calcium: 6, iron: 0.28, magnesium: 6,
    healthTip: "蓝莓被誉为'超级食物'，富含花青素，对眼睛和大脑有益。"
  },

  // 蔬菜
  {
    id: 9, name: "西红柿", category: "蔬菜", aliases: ["tomato", "番茄"],
    serving: "100克", calories: 18,
    protein: 0.9, fat: 0.2, carbs: 3.9, fiber: 1.2, sugar: 2.5,
    sodium: 5, potassium: 237, cholesterol: 0,
    vitaminA: 92, vitaminC: 13.7, vitaminD: 0, vitaminB12: 0,
    calcium: 10, iron: 0.33, magnesium: 20,
    healthTip: "西红柿富含番茄红素，是一种强大的抗氧化剂，有助于预防慢性病。"
  },
  {
    id: 10, name: "黄瓜", category: "蔬菜", aliases: ["cucumber"],
    serving: "100克", calories: 16,
    protein: 0.7, fat: 0.1, carbs: 3.6, fiber: 0.5, sugar: 1.7,
    sodium: 2, potassium: 147, cholesterol: 0,
    vitaminA: 3, vitaminC: 2.8, vitaminD: 0, vitaminB12: 0,
    calcium: 16, iron: 0.28, magnesium: 14,
    healthTip: "黄瓜水分含量高，热量低，是减脂餐的理想选择。"
  },
  {
    id: 11, name: "胡萝卜", category: "蔬菜", aliases: ["carrot"],
    serving: "100克", calories: 41,
    protein: 0.9, fat: 0.2, carbs: 9.6, fiber: 2.8, sugar: 4.7,
    sodium: 59, potassium: 326, cholesterol: 0,
    vitaminA: 1068, vitaminC: 5.9, vitaminD: 0, vitaminB12: 0,
    calcium: 33, iron: 0.3, magnesium: 12,
    healthTip: "胡萝卜富含β-胡萝卜素，在体内转化为维生素A，对眼睛健康至关重要。"
  },
  {
    id: 12, name: "白菜", category: "蔬菜", aliases: ["cabbage", "圆白菜"],
    serving: "100克", calories: 25,
    protein: 1.3, fat: 0.1, carbs: 5.8, fiber: 2.5, sugar: 3.2,
    sodium: 7, potassium: 196, cholesterol: 0,
    vitaminA: 98, vitaminC: 36.6, vitaminD: 0, vitaminB12: 0,
    calcium: 40, iron: 0.47, magnesium: 12,
    healthTip: "白菜含有丰富的维生素K和C，以及硫代葡萄糖苷，具有防癌功效。"
  },
  {
    id: 13, name: "菠菜", category: "蔬菜", aliases: ["spinach"],
    serving: "100克", calories: 23,
    protein: 2.9, fat: 0.4, carbs: 3.6, fiber: 2.2, sugar: 0.4,
    sodium: 99, potassium: 558, cholesterol: 0,
    vitaminA: 481, vitaminC: 28.1, vitaminD: 0, vitaminB12: 0,
    calcium: 136, iron: 2.71, magnesium: 87,
    healthTip: "菠菜是铁、钙和维生素K的极佳来源，有助于骨骼和血液健康。"
  },
  {
    id: 14, name: "西兰花", category: "蔬菜", aliases: ["broccoli", "花椰菜"],
    serving: "100克", calories: 34,
    protein: 2.8, fat: 0.4, carbs: 7, fiber: 2.6, sugar: 1.4,
    sodium: 41, potassium: 303, cholesterol: 0,
    vitaminA: 120, vitaminC: 89.2, vitaminD: 0, vitaminB12: 0,
    calcium: 47, iron: 0.73, magnesium: 21,
    healthTip: "西兰花是'蔬菜之王'，富含维生素C和抗癌物质萝卜硫素。"
  },
  {
    id: 15, name: "土豆", category: "蔬菜", aliases: ["potato", "马铃薯"],
    serving: "100克", calories: 77,
    protein: 2, fat: 0.1, carbs: 17, fiber: 2.2, sugar: 0.8,
    sodium: 6, potassium: 421, cholesterol: 0,
    vitaminA: 5, vitaminC: 19.7, vitaminD: 0, vitaminB12: 0,
    calcium: 12, iron: 0.78, magnesium: 23,
    healthTip: "土豆是钾的重要来源，富含膳食纤维，有助于维持心血管健康。"
  },
  {
    id: 16, name: "茄子", category: "蔬菜", aliases: ["eggplant", "aubergine"],
    serving: "100克", calories: 25,
    protein: 1, fat: 0.2, carbs: 5.9, fiber: 3, sugar: 3.5,
    sodium: 5, potassium: 230, cholesterol: 0,
    vitaminA: 8, vitaminC: 2.2, vitaminD: 0, vitaminB12: 0,
    calcium: 16, iron: 0.55, magnesium: 14,
    healthTip: "茄子含有丰富的可溶性纤维，有助于降低胆固醇水平。"
  },

  // 肉类
  {
    id: 17, name: "鸡胸肉", category: "肉类", aliases: ["chicken breast", "鸡胸"],
    serving: "100克", calories: 165,
    protein: 31, fat: 3.6, carbs: 0, fiber: 0, sugar: 0,
    sodium: 64, potassium: 376, cholesterol: 85,
    vitaminA: 15, vitaminC: 0, vitaminD: 0, vitaminB12: 0.24,
    calcium: 15, iron: 1.3, magnesium: 32,
    healthTip: "鸡胸肉是优质高蛋白低脂肪食品，适合健身人群和减脂人群食用。"
  },
  {
    id: 18, name: "鸡腿肉", category: "肉类", aliases: ["chicken thigh", "鸡腿"],
    serving: "100克", calories: 181,
    protein: 26, fat: 7.8, carbs: 0, fiber: 0, sugar: 0,
    sodium: 75, potassium: 340, cholesterol: 102,
    vitaminA: 48, vitaminC: 0, vitaminD: 0, vitaminB12: 0.2,
    calcium: 15, iron: 1.29, magnesium: 26,
    healthTip: "鸡腿肉肉质鲜嫩，蛋白质含量高，铁含量也比鸡胸肉略高。"
  },
  {
    id: 19, name: "牛肉(瘦)", category: "肉类", aliases: ["beef", "瘦牛肉"],
    serving: "100克", calories: 250,
    protein: 26, fat: 15, carbs: 0, fiber: 0, sugar: 0,
    sodium: 73, potassium: 315, cholesterol: 73,
    vitaminA: 12, vitaminC: 0, vitaminD: 0, vitaminB12: 2.6,
    calcium: 12, iron: 2.6, magnesium: 22,
    healthTip: "牛肉是血红素铁的极佳来源，还富含维生素B12和肌酸，适合增肌人群。"
  },
  {
    id: 20, name: "猪肉(瘦)", category: "肉类", aliases: ["pork", "瘦猪肉"],
    serving: "100克", calories: 143,
    protein: 20.3, fat: 6.2, carbs: 1.5, fiber: 0, sugar: 1.5,
    sodium: 57, potassium: 305, cholesterol: 81,
    vitaminA: 44, vitaminC: 0, vitaminD: 0, vitaminB12: 0.9,
    calcium: 6, iron: 3, magnesium: 25,
    healthTip: "猪肉富含B族维生素，尤其是维生素B1，有助于神经系统健康。"
  },
  {
    id: 21, name: "羊肉(瘦)", category: "肉类", aliases: ["lamb", "瘦羊肉"],
    serving: "100克", calories: 118,
    protein: 20.5, fat: 3.9, carbs: 0, fiber: 0, sugar: 0,
    sodium: 68, potassium: 284, cholesterol: 60,
    vitaminA: 11, vitaminC: 0, vitaminD: 0, vitaminB12: 2.7,
    calcium: 6, iron: 2.3, magnesium: 22,
    healthTip: "羊肉含有丰富的蛋白质和铁，具有温补作用，适合冬季食用。"
  },

  // 水产
  {
    id: 22, name: "三文鱼", category: "水产", aliases: ["salmon", "鲑鱼"],
    serving: "100克", calories: 208,
    protein: 20, fat: 13, carbs: 0, fiber: 0, sugar: 0,
    sodium: 59, potassium: 363, cholesterol: 55,
    vitaminA: 12, vitaminC: 0, vitaminD: 11, vitaminB12: 3.2,
    calcium: 12, iron: 0.8, magnesium: 29,
    healthTip: "三文鱼富含Omega-3脂肪酸，对心血管和大脑健康有重要作用。"
  },
  {
    id: 23, name: "金枪鱼", category: "水产", aliases: ["tuna"],
    serving: "100克", calories: 132,
    protein: 28, fat: 1, carbs: 0, fiber: 0, sugar: 0,
    sodium: 33, potassium: 498, cholesterol: 47,
    vitaminA: 68, vitaminC: 0, vitaminD: 3.7, vitaminB12: 9.4,
    calcium: 11, iron: 2.5, magnesium: 50,
    healthTip: "金枪鱼是高蛋白低脂肪食品，富含维生素B12和Omega-3脂肪酸。"
  },
  {
    id: 24, name: "草鱼", category: "水产", aliases: ["grass carp"],
    serving: "100克", calories: 113,
    protein: 16.6, fat: 5.2, carbs: 0, fiber: 0, sugar: 0,
    sodium: 46, potassium: 312, cholesterol: 86,
    vitaminA: 11, vitaminC: 0, vitaminD: 0, vitaminB12: 2.7,
    calcium: 38, iron: 0.8, magnesium: 31,
    healthTip: "草鱼肉质鲜美，富含优质蛋白和多种微量元素，适合日常食用。"
  },
  {
    id: 25, name: "虾", category: "水产", aliases: ["shrimp", "prawn"],
    serving: "100克", calories: 99,
    protein: 24, fat: 0.3, carbs: 0.2, fiber: 0, sugar: 0.2,
    sodium: 168, potassium: 220, cholesterol: 195,
    vitaminA: 26, vitaminC: 0, vitaminD: 0, vitaminB12: 2.6,
    calcium: 32, iron: 2.2, magnesium: 22,
    healthTip: "虾是高蛋白低脂肪食品，富含虾青素等抗氧化物质。"
  },
  {
    id: 26, name: "螃蟹", category: "水产", aliases: ["crab"],
    serving: "100克", calories: 97,
    protein: 19, fat: 1.5, carbs: 0.1, fiber: 0, sugar: 0.1,
    sodium: 291, potassium: 356, cholesterol: 100,
    vitaminA: 20, vitaminC: 0, vitaminD: 0, vitaminB12: 6,
    calcium: 50, iron: 0.5, magnesium: 30,
    healthTip: "螃蟹含有丰富的蛋白质和维生素B12，注意适量食用。"
  },

  // 蛋奶
  {
    id: 27, name: "鸡蛋", category: "蛋奶", aliases: ["egg"],
    serving: "100克", calories: 155,
    protein: 13, fat: 11, carbs: 1.1, fiber: 0, sugar: 1.1,
    sodium: 141, potassium: 138, cholesterol: 237,
    vitaminA: 70, vitaminC: 0, vitaminD: 1.1, vitaminB12: 1.1,
    calcium: 56, iron: 1.8, magnesium: 12,
    healthTip: "鸡蛋是完美的蛋白质来源，含有人体所需的全部必需氨基酸。"
  },
  {
    id: 28, name: "牛奶", category: "蛋奶", aliases: ["milk"],
    serving: "100克", calories: 42,
    protein: 3.4, fat: 1, carbs: 5, fiber: 0, sugar: 5,
    sodium: 52, potassium: 157, cholesterol: 5,
    vitaminA: 24, vitaminC: 0, vitaminD: 0.1, vitaminB12: 0.4,
    calcium: 125, iron: 0, magnesium: 14,
    healthTip: "牛奶是钙的最佳来源之一，每日一杯牛奶有助于骨骼健康。"
  },
  {
    id: 29, name: "酸奶", category: "蛋奶", aliases: ["yogurt"],
    serving: "100克", calories: 59,
    protein: 10, fat: 0.4, carbs: 3.6, fiber: 0, sugar: 3.6,
    sodium: 70, potassium: 250, cholesterol: 5,
    vitaminA: 26, vitaminC: 0.5, vitaminD: 0, vitaminB12: 0.5,
    calcium: 110, iron: 0.1, magnesium: 9,
    healthTip: "酸奶含有益生菌，有助于肠道健康，乳糖不耐受者也可食用。"
  },
  {
    id: 30, name: "奶酪", category: "蛋奶", aliases: ["cheese", "芝士"],
    serving: "100克", calories: 402,
    protein: 25, fat: 33, carbs: 3.5, fiber: 0, sugar: 0.7,
    sodium: 584, potassium: 72, cholesterol: 105,
    vitaminA: 158, vitaminC: 0, vitaminD: 0.6, vitaminB12: 0.5,
    calcium: 721, iron: 0.7, magnesium: 28,
    healthTip: "奶酪钙含量极高，是补钙的好选择，但注意选择低钠产品。"
  },

  // 谷物
  {
    id: 31, name: "大米(白)", category: "谷物", aliases: ["rice", "白米饭"],
    serving: "100克", calories: 130,
    protein: 2.7, fat: 0.3, carbs: 28, fiber: 0.4, sugar: 0.1,
    sodium: 1, potassium: 115, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 10, iron: 0.2, magnesium: 12,
    healthTip: "白米饭是主食之一，提供碳水化合物能量，建议搭配蔬菜和蛋白质食用。"
  },
  {
    id: 32, name: "糙米", category: "谷物", aliases: ["brown rice"],
    serving: "100克", calories: 112,
    protein: 2.6, fat: 0.9, carbs: 23, fiber: 1.8, sugar: 0.4,
    sodium: 0, potassium: 223, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 10, iron: 0.5, magnesium: 84,
    healthTip: "糙米保留了胚芽和麸皮，富含纤维和B族维生素，比白米更有营养。"
  },
  {
    id: 33, name: "小麦面粉", category: "谷物", aliases: ["flour", "面粉"],
    serving: "100克", calories: 364,
    protein: 11, fat: 2.2, carbs: 76, fiber: 2.7, sugar: 0.3,
    sodium: 2, potassium: 107, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 15, iron: 2.7, magnesium: 22,
    healthTip: "小麦粉是制作面食的原料，建议多食用全麦制品以获取更多营养。"
  },
  {
    id: 34, name: "燕麦", category: "谷物", aliases: ["oatmeal", "oats", "麦片"],
    serving: "100克", calories: 389,
    protein: 16.9, fat: 6.9, carbs: 66, fiber: 10.6, sugar: 0,
    sodium: 3, potassium: 429, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 54, iron: 4.7, magnesium: 170,
    healthTip: "燕麦富含β-葡聚糖，有助于降低胆固醇，是健康早餐的理想选择。"
  },
  {
    id: 35, name: "玉米", category: "谷物", aliases: ["corn", "玉米棒"],
    serving: "100克", calories: 96,
    protein: 3.4, fat: 1.5, carbs: 21, fiber: 2.7, sugar: 4.5,
    sodium: 1, potassium: 237, cholesterol: 0,
    vitaminA: 7, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 14, iron: 1.1, magnesium: 32,
    healthTip: "玉米含有叶黄素和玉米黄质，对眼睛健康有益。"
  },
  {
    id: 36, name: "小米", category: "谷物", aliases: ["millet"],
    serving: "100克", calories: 361,
    protein: 9, fat: 3.1, carbs: 75, fiber: 8.5, sugar: 0,
    sodium: 8, potassium: 284, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 41, iron: 5.1, magnesium: 107,
    healthTip: "小米富含铁和B族维生素，易消化吸收，适合肠胃虚弱人群。"
  },

  // 豆类
  {
    id: 37, name: "黄豆", category: "豆类", aliases: ["soybean", "大豆"],
    serving: "100克", calories: 359,
    protein: 35, fat: 16, carbs: 34, fiber: 31, sugar: 0,
    sodium: 2, potassium: 1503, cholesterol: 0,
    vitaminA: 37, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 191, iron: 8.2, magnesium: 99,
    healthTip: "黄豆是植物蛋白之王，还含有异黄酮等植物化学物质。"
  },
  {
    id: 38, name: "豆腐", category: "豆类", aliases: ["tofu"],
    serving: "100克", calories: 76,
    protein: 8, fat: 4.8, carbs: 1.9, fiber: 0.3, sugar: 1.4,
    sodium: 7, potassium: 125, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 350, iron: 2.6, magnesium: 30,
    healthTip: "豆腐是植物性蛋白的优质来源，富含钙，适合素食者食用。"
  },
  {
    id: 39, name: "红豆", category: "豆类", aliases: ["red bean", "红豆沙"],
    serving: "100克", calories: 324,
    protein: 20.2, fat: 0.6, carbs: 63, fiber: 30, sugar: 0,
    sodium: 2, potassium: 860, cholesterol: 0,
    vitaminA: 13, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 74, iron: 7.4, magnesium: 138,
    healthTip: "红豆富含铁和膳食纤维，中医认为有助于补血利水。"
  },
  {
    id: 40, name: "绿豆", category: "豆类", aliases: ["mung bean"],
    serving: "100克", calories: 316,
    protein: 21.6, fat: 0.8, carbs: 62, fiber: 30, sugar: 0,
    sodium: 3, potassium: 787, cholesterol: 0,
    vitaminA: 22, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 81, iron: 6.5, magnesium: 125,
    healthTip: "绿豆具有清热解毒的功效，夏季食用可消暑。"
  },

  // 坚果
  {
    id: 41, name: "核桃", category: "坚果", aliases: ["walnut"],
    serving: "100克", calories: 654,
    protein: 15.2, fat: 65.2, carbs: 13.7, fiber: 6.7, sugar: 2.6,
    sodium: 6, potassium: 455, cholesterol: 0,
    vitaminA: 5, vitaminC: 1.3, vitaminD: 0, vitaminB12: 0,
    calcium: 98, iron: 2.9, magnesium: 131,
    healthTip: "核桃富含Omega-3脂肪酸和维生素E，对大脑健康有益。"
  },
  {
    id: 42, name: "杏仁", category: "坚果", aliases: ["almond"],
    serving: "100克", calories: 578,
    protein: 21.2, fat: 49.9, carbs: 21.6, fiber: 12.5, sugar: 4.4,
    sodium: 1, potassium: 705, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 269, iron: 3.7, magnesium: 270,
    healthTip: "杏仁是维生素E和钙的极佳来源，每日适量食用有益骨骼健康。"
  },
  {
    id: 43, name: "花生", category: "坚果", aliases: ["peanut"],
    serving: "100克", calories: 567,
    protein: 25.8, fat: 49.2, carbs: 16.1, fiber: 8.5, sugar: 4.7,
    sodium: 18, potassium: 705, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 92, iron: 4.6, magnesium: 168,
    healthTip: "花生富含不饱和脂肪酸和蛋白质，注意选择无盐、非油炸的产品。"
  },
  {
    id: 44, name: "腰果", category: "坚果", aliases: ["cashew"],
    serving: "100克", calories: 552,
    protein: 17.8, fat: 43.9, carbs: 24.3, fiber: 3.6, sugar: 5.9,
    sodium: 12, potassium: 600, cholesterol: 0,
    vitaminA: 0, vitaminC: 0.5, vitaminD: 0, vitaminB12: 0,
    calcium: 37, iron: 6.7, magnesium: 292,
    healthTip: "腰果含镁量高，对心脏健康有益，但热量较高需适量食用。"
  },

  // 饮料
  {
    id: 45, name: "绿茶", category: "饮料", aliases: ["green tea"],
    serving: "100克", calories: 1,
    protein: 0.2, fat: 0, carbs: 0.2, fiber: 0, sugar: 0,
    sodium: 3, potassium: 27, cholesterol: 0,
    vitaminA: 0, vitaminC: 0.3, vitaminD: 0, vitaminB12: 0,
    calcium: 3, iron: 0.04, magnesium: 3,
    healthTip: "绿茶富含儿茶素等抗氧化物质，有助于预防癌症和心血管疾病。"
  },
  {
    id: 46, name: "咖啡", category: "饮料", aliases: ["coffee"],
    serving: "100克", calories: 2,
    protein: 0.3, fat: 0, carbs: 0, fiber: 0, sugar: 0,
    sodium: 2, potassium: 49, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 5, iron: 0.04, magnesium: 3,
    healthTip: "咖啡含咖啡因，可提神醒脑，但孕妇和心血管疾病患者应谨慎饮用。"
  },
  {
    id: 47, name: "橙汁", category: "饮料", aliases: ["orange juice"],
    serving: "100克", calories: 45,
    protein: 0.7, fat: 0.2, carbs: 10.4, fiber: 0.2, sugar: 9.2,
    sodium: 4, potassium: 200, cholesterol: 0,
    vitaminA: 12, vitaminC: 33.6, vitaminD: 0, vitaminB12: 0,
    calcium: 9, iron: 0.1, magnesium: 11,
    healthTip: "橙汁富含维生素C，但含糖量较高，建议适量饮用或选择鲜榨低糖款。"
  },
  {
    id: 48, name: "可乐", category: "饮料", aliases: ["cola", "coke"],
    serving: "100克", calories: 43,
    protein: 0, fat: 0, carbs: 10.6, fiber: 0, sugar: 10.6,
    sodium: 4, potassium: 2, cholesterol: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 6, iron: 0, magnesium: 0,
    healthTip: "碳酸饮料含糖量高，营养价值低，建议少喝或选择无糖版本。"
  },

  // 零食
  {
    id: 49, name: "薯片", category: "零食", aliases: ["chips", "potato chips"],
    serving: "100克", calories: 536,
    protein: 6.6, fat: 37.6, carbs: 52, fiber: 13, sugar: 0.5,
    sodium: 1480, potassium: 197, cholesterol: 0,
    vitaminA: 0, vitaminC: 8, vitaminD: 0, vitaminB12: 0,
    calcium: 20, iron: 1.2, magnesium: 22,
    healthTip: "薯片高脂高盐，过量食用不利于健康，建议选择烤薯片或其他健康零食。"
  },
  {
    id: 50, name: "巧克力", category: "零食", aliases: ["chocolate"],
    serving: "100克", calories: 546,
    protein: 4.9, fat: 34.4, carbs: 61, fiber: 7, sugar: 54.5,
    sodium: 24, potassium: 359, cholesterol: 0,
    vitaminA: 5, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 56, iron: 6.7, magnesium: 192,
    healthTip: "黑巧克力（70%以上）富含可可黄烷醇，适量食用对心血管有益。"
  },
  {
    id: 51, name: "饼干", category: "零食", aliases: ["biscuit", "cookie"],
    serving: "100克", calories: 485,
    protein: 6.5, fat: 20.5, carbs: 65, fiber: 2, sugar: 30,
    sodium: 400, potassium: 120, cholesterol: 5,
    vitaminA: 10, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
    calcium: 60, iron: 3.5, magnesium: 15,
    healthTip: "饼干糖分和油脂含量高，建议选择低糖低油的健康饼干。"
  },
  {
    id: 52, name: "冰淇淋", category: "零食", aliases: ["ice cream"],
    serving: "100克", calories: 207,
    protein: 3.5, fat: 11, carbs: 24, fiber: 0.7, sugar: 21,
    sodium: 56, potassium: 138, cholesterol: 41,
    vitaminA: 16, vitaminC: 0.4, vitaminD: 0.4, vitaminB12: 0.4,
    calcium: 128, iron: 0.3, magnesium: 14,
    healthTip: "冰淇淋含糖量和脂肪含量较高，建议饭后适量食用。"
  }
];