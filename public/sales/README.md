# 护城河PDF产品套件

## 文件结构

```
public/sales/
├── buffett-moat-guide.html    # 销售页（可部署到 Gumroad 或独立托管）
```

## 快速开始

### 1. 安装 PDF 生成依赖

```bash
cd valueinvest-wiki
npm install @react-pdf/renderer
```

### 2. 生成 PDF

```bash
npx tsx scripts/pdf/buffett-moat-guide.tsx
```

PDF 将生成在 `public/pdfs/buffett-moat-guide.pdf`

### 3. 上传到 Gumroad

1. 访问 [gumroad.com](https://gumroad.com)
2. 创建产品，上传 PDF 文件
3. 获取产品链接，替换 `buffett-moat-guide.html` 中的 `YOUR_PRODUCT_ID`
4. 部署销售页到任何静态托管（Vercel、Netlify、Github Pages）

### 4. 部署销售页

```bash
# 推送到 GitHub
git add public/sales/
git commit -m "Add moat guide sales page"
git push

# Vercel 会自动部署 public 目录
```

## Gumroad 替代方案

### LemonSqueezy
- 更低的费率（0% + $0.50/笔）
- 内置 checkout 托管
- 替代 Gumroad 的好选择

### Buy Me a Coffee
- 简单的一次性支付
- 适合低单价产品
- 最简单的设置

### Stripe Payment Link
- 完全控制
- 需要自己托管销售页
- 最低费率

## 定价策略建议

| 产品 | 价格 | 说明 |
|------|------|------|
| 护城河全集 | $9.9 | 引流产品 |
| 股东大会精华 | $19 | 高价值产品 |
| 芒格思想手册 | $14.9 | 中等定价 |
| 致股东信全集 | $24.9 | 旗舰产品 |

## 联署营销 Banner

在销售页添加券商联署 Banner：

```html
<a href="YOUR_AFFILIATE_LINK" target="_blank" rel="noopener">
  <img src="/images/broker-banner.jpg" alt="开户赢奖励" />
</a>
```

### 推荐联署链接

| 券商 | 佣金 | 注册链接 |
|------|------|----------|
| Interactive Brokers | $200/户 | ibkr.com |
| moomoo | $50-200/户 | moomoo.com |
| 富途证券 | $100/户 | futu.com |

## 后续产品路线图

1. **股东大会精华1985-2024** - $19
2. **芒格思想手册** - $14.9
3. **致股东信精华1957-2024** - $24.9
4. **Newsletter 订阅** - $9.9/月
