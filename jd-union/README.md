# 京东联盟选品助手

自动调用 **京东联盟开放平台** (union.jd.com) API 搜索商品、按好评率排序、生成推广链接，并将结果写入网页数据文件。

---

## 第一步：获取京东联盟 API 密钥

### 1.1 访问京东联盟开放平台

打开浏览器，访问：**https://union.jd.com**

> ⚠️ 注意：这是 **京东联盟开放平台**（面向推广者/推客），不是京东零售开放平台（open.jd.com，面向商家）。
> - 联盟 API 前缀：`jd.union.open.xxx`
> - 零售 API 前缀：`jingdong.xxx`
> - 我们使用的是前者（联盟 API）

### 1.2 登录并完成开发者认证

1. 使用京东账号登录 union.jd.com
2. 进入 **个人中心 → 账户设置**，完成个人开发者认证（需要身份证验证）
3. 认证通常几分钟内通过

### 1.3 创建应用并获取密钥

1. 进入 **应用管理 → 我的应用 → 创建应用**
2. 填写应用信息：
   - **应用名称**：`我的低卡选品助手`
   - **应用类型**：选择 **工具类**
   - **业务用途**：`用于自动筛选高好评率健康食品并生成推广链接`
3. 提交后等待审核（通常几秒钟）
4. 审核通过后，在应用详情页复制：
   - **AppKey**（也叫 app_key / client_id）
   - **AppSecret**（也叫 client_secret）

### 1.4 申请 API 接口权限

在应用详情页 → **权限管理**，申请以下接口：

| 接口方法 | 功能 | 说明 |
|---------|------|------|
| `jd.union.open.goods.search` | 商品搜索 | 按关键词搜索商品，支持排序 |
| `jd.union.open.promotion.common.get` | 生成推广链接 | 生成带联盟参数的推广链接 |

> 💡 商品搜索接口通常自动开通，推广链接生成需要审核。

### 1.5 获取 UnionID（推广者ID）

在 union.jd.com → **个人中心 → 我的账户** 页面可以找到你的 **UnionID**（也叫推广者ID），格式为数字字符串。

### 1.6 填写配置文件

打开 `config.json`，将密钥填入：

```json
{
  "appKey": "你的AppKey",
  "appSecret": "你的AppSecret",
  "unionId": "你的UnionID（推广者ID）",
  "accessToken": "",
  "tokenExpiresAt": 0
}
```

---

## 第二步：安装 Node.js

访问 **https://nodejs.org** 下载并安装 LTS 版本（推荐 18.x 或 20.x）。

安装完成后，验证：
```bash
node --version
npm --version
```

> 💡 如果还没装，可在 CMD 中运行 `winget install OpenJS.NodeJS.LTS` 自动安装。

---

## 第三步：运行脚本

### 3.1 进入目录

```bash
cd e:\查询\jd-union
```

### 3.2 基本用法

```bash
# 格式: node index.js <关键词> <数量>

# 示例: 搜索"低卡调味"的前5款商品
node index.js "低卡调味" 5

# 示例: 搜索"无糖零食"的前3款商品
node index.js "无糖零食" 3
```

### 3.3 一键运行（Windows）

双击 `run.bat` 即可，默认搜索"低卡调味"的前 5 款商品。

### 3.4 运行流程

```
==============================================
  京东联盟选品助手 (union.jd.com)
==============================================
  关键词: 低卡调味
  数量: 5
==============================================

🔑 正在获取 access_token...
✅ access_token 获取成功（有效期 86400 秒）
🔍 正在搜索 "低卡调味" 相关商品（京东联盟API）...
   找到 89 个商品

🔗 正在为 5 个商品生成推广链接...
   [1/5] 千禾零添加油醋汁...
   [2/5] 亨氏无糖番茄酱...
   [3/5] 千禾薄盐生抽...
   [4/5] 辣妹子魔芋辣酱...
   [5/5] McCormick柠檬胡椒盐...
✅ 数据已写入 e:\查询\data.js
✅ 网页数据已写入 e:\查询\products-data.js
```

### 3.5 查看输出

结果会写入两个文件：

**`e:\查询\data.js`** — Node.js 格式：
```javascript
// 自动生成的商品数据 - 来源: 京东联盟API (union.jd.com)
const products = [
  {
    "name": "千禾零添加油醋汁",
    "brand": "千禾旗舰店",
    "price": "¥19.9",
    "rating": "98%",
    "image": "https://img10.360buyimg.com/...",
    "link": "https://item.jd.com/123456789.html?union=100001234",
    "tags": [],
    "desc": "...",
    "skuId": "123456789"
  },
  // ...更多商品
];
```

**`e:\查询\products-data.js`** — 网页可直接引用：
```javascript
window.JD_PRODUCTS = [ /* 同上数据 */ ];
```

---

## 第四步：将数据用于网页

### 方式一：直接引入 products-data.js

在 HTML 页面中引入：
```html
<script src="products-data.js"></script>
<script>
  console.log(window.JD_PRODUCTS);
</script>
```

### 方式二：手动复制数据

将 `data.js` 中的 `products` 数组内容，复制到 `food-recommend.html` 的 `recommendData` 中，替换对应分类的 `products` 字段。

---

## 京东联盟 API 说明

### 接口 1：商品搜索 `jd.union.open.goods.search`

**请求参数：**
```json
{
  "goodsSearchReq": {
    "keyword": "低卡调味",
    "pageIndex": 1,
    "pageSize": 30,
    "sortType": "comment_num_desc"
  }
}
```

**响应字段：**
- `skuId` - 商品ID
- `skuName` - 商品名称
- `price` - 京东价
- `wxPrice` - 微信价
- `imagePath` - 主图URL
- `shopName` - 店铺名称
- `commentScore` - 好评率
- `comments` - 评论数

### 接口 2：生成推广链接 `jd.union.open.promotion.common.get`

**请求参数：**
```json
{
  "promotionCodeReq": {
    "materialId": "你的UnionID",
    "couponInfo": "",
    "subUnionId": "自定义标识"
  }
}
```

**响应字段：**
- `clickUrl` - 推广链接（用户点击此链接购买可获得佣金）
- `couponInfo` - 含优惠券的链接
- `shortLink` - 短链接

---

## 常见问题

### Q: API 返回 "invalid parameter"
检查 AppKey、AppSecret、unionId 是否正确。

### Q: 获取 access_token 返回错误
1. 确认 AppKey/AppSecret 填写正确
2. 确认应用已通过审核
3. 确认是在 union.jd.com 创建的应用（不是 open.jd.com）

### Q: 商品搜索返回空结果
1. 尝试更换关键词，如 "食用油"、"酱油" 等具体品类
2. 确认接口权限 `jd.union.open.goods.search` 已开通

### Q: 推广链接生成失败（返回无权限）
1. 确认 `jd.union.open.promotion.common.get` 权限已开通
2. 确认 `unionId` 填写正确
3. 确认商品有佣金（无佣金商品无法生成推广链接）

### Q: 脚本显示"示例数据"而非真实数据
这说明 API 调用失败。请检查：
1. `config.json` 中的密钥是否正确
2. 网络连接是否正常
3. 应用是否已通过审核
4. 接口权限是否已开通

### Q: access_token 会过期吗？
会的，有效期通常为 86400 秒（24 小时）。脚本会自动缓存并在过期前自动刷新。

---

## 安全提示

- 🔒 **绝对不要**将 `config.json` 提交到 Git（已在 `.gitignore` 中排除）
- 🔒 AppSecret 是敏感信息，请勿分享给他人
- 🔒 建议定期更换密钥