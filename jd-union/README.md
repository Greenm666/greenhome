# 京东联盟自动化选品和转链工具

自动调用京东联盟API搜索商品、按好评率排序、生成推广链接，并将结果写入网页数据文件。

---

## 第一步：获取京东联盟 API 密钥

### 1.1 访问京东联盟开发者平台

打开浏览器，访问：**https://open.jd.com**

> ⚠️ 注意：联盟API的开发者入口在 **open.jd.com**（京东开放平台），而不是 union.jd.com。union.jd.com 是推广者后台，API 密钥需要在 open.jd.com 获取。

### 1.2 登录并创建应用

1. 使用京东账号登录 open.jd.com
2. 进入控制台 → **应用管理** → **创建应用**
3. 填写应用信息：
   - **应用名称**：`我的低卡选品助手`
   - **应用类型**：选择 **工具类** 或 **应用类**
   - **业务用途/应用描述**：`用于自动筛选高好评率健康食品并生成推广链接`

### 1.3 申请接口权限

创建应用后，进入应用详情页，在 **权限管理** 或 **API管理** 中申请以下接口：

| 接口名称 | 接口方法 | 说明 |
|---------|---------|------|
| 商品搜索 | `open.jd.goods.search` | 按关键词搜索商品 |
| 推广链接生成 | `open.jd.promotion.common.get` | 生成推广链接（需联盟权限） |

> 💡 商品搜索接口通常自动开通，推广链接生成需要审核。

### 1.4 复制密钥

审核通过后，在应用详情页复制：

- **AppKey**（也叫 app_key 或 client_id）
- **AppSecret**（也叫 client_secret）
- **UnionID**（在联盟账户后台获取，用于生成推广链接）

### 1.5 填写配置文件

打开 `config.json`，将密钥填入：

```json
{
  "appKey": "你的AppKey，如 abc123def456",
  "appSecret": "你的AppSecret，如 xyz789ghi012",
  "unionId": "你的联盟ID，如 100001234",
  "accessToken": ""
}
```

---

## 第二步：安装 Node.js

### 2.1 下载安装 Node.js

访问 **https://nodejs.org** 下载并安装 LTS 版本（推荐 18.x 或 20.x）。

安装完成后，打开 **命令提示符**（CMD）或 **PowerShell**，验证安装：

```bash
node --version
# 应输出: v18.x.x 或 v20.x.x

npm --version
# 应输出: 9.x.x 或 10.x.x
```

### 2.2 安装依赖

本工具仅使用 Node.js 内置模块（`fs`, `https`, `crypto`），**无需安装额外依赖**。

---

## 第三步：运行脚本

### 3.1 进入项目目录

```bash
cd e:\查询\jd-union
```

### 3.2 基本用法

```bash
# 格式: node index.js <关键词> <数量>

# 示例: 搜索"低卡调味"的前5款商品
node index.js "低卡调味" 5

# 示例: 搜索"全麦面包"的前3款商品
node index.js "全麦面包" 3

# 示例: 搜索"无糖零食"的前10款商品
node index.js "无糖零食" 10
```

### 3.3 运行流程

脚本会自动执行以下步骤：

```
========================================
  京东联盟选品助手
========================================
  关键词: 低卡调味
  数量: 5
========================================

🔑 正在获取 access_token...
✅ access_token 获取成功
🔍 正在搜索 "低卡调味" 相关商品...
   找到 89 个商品
🔗 正在为 5 个商品生成推广链接...
   [1/5] 千禾零添加油醋汁...
   [2/5] 亨氏无糖番茄酱...
   [3/5] 千禾薄盐生抽...
   [4/5] 辣酱王魔芋辣酱...
   [5/5] McCormick柠檬胡椒盐...
✅ 数据已写入 e:\查询\data.js
   共 5 款商品
```

### 3.4 查看输出

结果会写入 `e:\查询\data.js`，格式如下：

```javascript
// 自动生成的商品数据 - 来源: 京东联盟API
// 搜索关键词: 低卡调味
// 生成时间: 2026/8/21 15:30:00
// 共 5 款商品

const products = [
  {
    "name": "千禾零添加油醋汁",
    "brand": "千禾旗舰店",
    "price": "¥19.9",
    "rating": "98%",
    "image": "https://img10.360buyimg.com/...",
    "link": "https://item.jd.com/123456789.html?union=1",
    "tags": [],
    "desc": "...",
    "skuId": "123456789"
  },
  // ...更多商品
];

module.exports = products;
```

---

## 第四步：将数据用于网页

将 `data.js` 中的 `products` 数组内容，替换到 `food-recommend.html`、`product-list.html` 或 `product-detail.js` 中的商品数据即可。

例如在 `food-recommend.html` 中：
```javascript
// 将搜索结果替换到对应分类的 products 字段
seasoning: {
  label: '低卡调味',
  categories: [{
    id: 'sauce',
    name: '健康酱料',
    products: data.products  // 使用 data.js 的数据
  }]
}
```

---

## 常见问题

### Q: API 调用返回 "invalid parameter"
**A**: 检查 AppKey 和 AppSecret 是否正确，参数名是否拼写正确。

### Q: 获取 access_token 返回错误
**A**: 
1. 确认 AppKey/AppSecret 填写正确
2. 确认应用已通过审核
3. 确认 API 权限已开通

### Q: 商品搜索返回空结果
**A**: 
1. 尝试更换关键词，如 "食用油"、"酱油" 等具体品类
2. 确认接口权限 `open.jd.goods.search` 已开通

### Q: 推广链接生成失败
**A**: 
1. 确认 `unionId` 已正确填写
2. 确认 `open.jd.promotion.common.get` 权限已开通
3. 确认商品有佣金（无佣金商品无法生成推广链接）

### Q: 脚本显示 "示例数据" 而非真实数据
**A**: 这说明 API 调用失败。请检查：
1. 网络连接是否正常
2. `config.json` 中的密钥是否正确
3. 应用是否已通过审核

### Q: 运行很慢
**A**: 脚本对每个商品都会调用转链API，有 300ms 间隔。如果需要更快，可以减少商品数量或修改脚本中的间隔时间。

---

## 安全提示

- 🔒 **绝对不要**将 `config.json` 提交到 Git 仓库（已在 `.gitignore` 中排除）
- 🔒 AppSecret 是敏感信息，请勿分享给他人
- 🔒 建议定期更换密钥