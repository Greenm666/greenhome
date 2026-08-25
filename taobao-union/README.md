# 淘宝联盟选品助手

自动调用 **淘宝开放平台 (TOP)** API 搜索商品、按销量排序、生成推广链接，并将结果写入网页数据文件。

---

## 第一步：获取淘宝联盟 API 密钥

### 1.1 访问淘宝开放平台

打开浏览器，访问：**https://open.taobao.com**

> 💡 淘宝联盟的 API 由淘宝开放平台（TOP）统一管理。淘宝联盟后台（alimama.com）用于获取 PID（推广位ID）和查看佣金。

### 1.2 注册开发者

1. 打开 https://open.taobao.com
2. 点击右上角 **"登录"** 或 **"注册"**
3. 使用淘宝/支付宝账号登录
4. 进入 **控制台** → 完成 **开发者实名认证**（个人认证即可）

### 1.3 创建应用并获取 AppKey/AppSecret

1. 进入 **控制台 → 应用管理 → 创建应用**
2. 填写应用信息：
   - **应用名称**：`我的低卡选品助手`
   - **应用类型**：选择 **"工具类"**
   - **业务领域**：选择 **"淘宝联盟"** 或 **"联盟推广"**
   - **应用描述**：`自动筛选高销量健康食品并生成推广链接`
3. 提交后等待审核（通常几秒到几分钟）
4. 审核通过后，在应用详情页复制：
   - **AppKey**（也叫 app_key / client_id）
   - **AppSecret**（也叫 client_secret）

### 1.4 申请 API 接口权限

在应用详情页 → **接口管理/权限管理**，搜索并申请以下接口：

| 接口名称 | 功能 | 说明 |
|---------|------|------|
| `taobao.tbk.dg.material.optional` | 商品搜索 | 按关键词搜索导购商品，支持排序和筛选 |
| `taobao.tbk.item.convert` | 生成推广链接 | 将商品转换为带推广参数的链接 |

> 💡 搜索接口通常自动开通，转链接口需要审核。

### 1.5 获取 PID（推广位ID）

1. 访问淘宝联盟后台：**https://alimama.com**
2. 登录后进入 **"推广管理" → "推广位管理"**
3. 创建一个推广位，获取 **PID**（格式类似 `mm_12345678_0_0`）

### 1.6 填写配置文件

打开 `config.json`，将密钥填入：

```json
{
  "appKey": "你的AppKey",
  "appSecret": "你的AppSecret",
  "pid": "你的PID（推广位ID）",
  "accessToken": "",
  "tokenExpiresAt": 0
}
```

---

## 第二步：运行脚本

### 2.1 安装 Node.js（如未安装）

访问 https://nodejs.org 下载 LTS 版本（推荐 18.x 或 20.x）。

### 2.2 基本用法

```bash
cd e:\查询\taobao-union

# 格式: node index.js <关键词> <数量>

# 示例: 搜索"低卡调味"的前5款商品
node index.js "低卡调味" 5

# 示例: 搜索"无糖零食"的前3款商品
node index.js "无糖零食" 3
```

### 2.3 一键运行（Windows）

双击 `run.bat` 即可。

### 2.4 运行流程

```
================================================
  淘宝联盟选品助手 (open.taobao.com)
================================================
  关键词: 低卡调味
  数量: 5
================================================

🔑 使用缓存的 access_token
🔍 正在搜索 "低卡调味" 相关商品（淘宝联盟API）...
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

---

## 第三步：查看输出

结果会写入两个文件：

### `data.js` — Node.js 格式
```javascript
const products = [
  {
    "name": "千禾零添加油醋汁",
    "brand": "千禾旗舰店",
    "price": "¥19.9",
    "rating": "5000+销量",
    "image": "https://img.alicdn.com/...",
    "link": "https://s.click.taobao.com/t?e=m%3D...",
    "tags": ["高佣金", "30%"],
    "desc": "佣金比例: 30% | 推广位: mm_12345678_0_0",
    "skuId": "123456789"
  },
  // ...更多商品
];
```

### `products-data.js` — 网页可直接引用
```javascript
window.JD_PRODUCTS = [ /* 同上数据 */ ];
```

---

## 淘宝联盟 API 说明

### API 网关

```
GET http://gw.api.taobao.com/router/qm
```

### 接口 1：商品搜索 `taobao.tbk.dg.material.optional`

**请求参数：**
```json
{
  "q": "低卡调味",
  "page": "1",
  "page_size": "30",
  "sort": "auction30sumclick_desc",
  "pid": "mm_12345678_0_0",
  "hascoupon": "true"
}
```

| 参数 | 说明 |
|------|------|
| `q` | 搜索关键词 |
| `page` | 页码 |
| `page_size` | 每页数量（最大100） |
| `sort` | 排序方式：`auction30sumclick_desc`(30天销量)、`commission_desc`(佣金高到低)、`price_desc`(价格高到低) |
| `pid` | 推广位ID |
| `hascoupon` | 是否有优惠券（true/false） |

**响应字段：**
- `num_iid` - 商品ID
- `title` - 商品标题
- `zk_fee_price` - 折扣价
- `item_pic` - 主图URL
- `nick` - 店铺名称
- `auction30sumclick` - 30天销量
- `zk_fee_volume` - 佣金比例

### 接口 2：生成推广链接 `taobao.tbk.item.convert`

**请求参数：**
```json
{
  "num_iid": "123456789",
  "pid": "mm_12345678_0_0"
}
```

**响应字段：**
- `n_tbk_pwd_link` - 淘口令链接
- `tbk_url` - 推广链接
- `fee_price` - 实际价格
- `zk_fee_volume` - 佣金比例

---

## 如何将数据用于网页

### 方式一：直接引入 products-data.js

```html
<script src="products-data.js"></script>
<script>
  console.log(window.JD_PRODUCTS);
</script>
```

### 方式二：手动复制数据

将 `data.js` 中的 `products` 数组内容，复制到 `food-recommend.html` 的 `recommendData` 中，替换对应分类的 `products` 字段。

---

## 常见问题

### Q: API 返回 "Invalid Arguments"
检查 AppKey、AppSecret、PID 是否正确。

### Q: 获取 access_token 返回错误
1. 确认 AppKey/AppSecret 填写正确
2. 确认应用已通过审核
3. 确认是在 open.taobao.com 创建的应用

### Q: 商品搜索返回空结果
1. 尝试更换关键词
2. 确认接口权限 `taobao.tbk.dg.material.optional` 已开通

### Q: 转链失败（返回无权限）
1. 确认 `taobao.tbk.item.convert` 权限已开通
2. 确认 PID 填写正确
3. 确认商品有佣金

### Q: 脚本显示"示例数据"而非真实数据
说明 API 调用失败。请检查：
1. `config.json` 中的密钥是否正确
2. 网络连接是否正常
3. 应用是否已通过审核
4. 接口权限是否已开通

---

## 安全提示

- 🔒 **绝对不要**将 `config.json` 提交到 Git（已在 `.gitignore` 中排除）
- 🔒 AppSecret 是敏感信息，请勿分享给他人
- 🔒 建议定期更换密钥