/**
 * 巴菲特护城河全集 PDF 生成器
 * 使用 Puppeteer 从 HTML 生成 PDF（支持中文）
 *
 * 运行: bun run scripts/pdf/generate-html-pdf.ts
 */

import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const outputDir = path.join(process.cwd(), 'public', 'pdfs')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// HTML 模板
const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>巴菲特护城河全集</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Noto Serif SC', 'Georgia', serif;
      font-size: 12pt;
      line-height: 1.8;
      color: #333;
    }

    /* 封面 */
    .cover {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%);
      color: white;
      page-break-after: always;
    }

    .cover h1 {
      font-size: 36pt;
      font-weight: 700;
      margin-bottom: 20px;
      color: white;
    }

    .cover .subtitle {
      font-size: 18pt;
      color: rgba(255,255,255,0.8);
      margin-bottom: 40px;
    }

    .cover .meta {
      position: absolute;
      bottom: 60px;
      font-size: 10pt;
      color: rgba(255,255,255,0.6);
    }

    /* 目录 */
    .toc {
      padding: 60px 80px;
      page-break-after: always;
    }

    .toc h1 {
      font-size: 24pt;
      margin-bottom: 30px;
      color: #1a1a2e;
      border-bottom: 2px solid #c9a227;
      padding-bottom: 10px;
    }

    .toc-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
      font-size: 11pt;
    }

    .toc-item .title {
      color: #333;
    }

    .toc-item .page {
      color: #666;
    }

    /* 章节页 */
    .chapter-page {
      padding: 60px 80px;
    }

    h1 {
      font-size: 22pt;
      color: #1a1a2e;
      margin-bottom: 30px;
      border-bottom: 2px solid #c9a227;
      padding-bottom: 15px;
    }

    h2 {
      font-size: 14pt;
      color: #1a1a2e;
      margin-top: 30px;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 12pt;
      color: #333;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 12px;
      text-align: justify;
    }

    /* 引用 */
    blockquote {
      margin: 20px 0;
      padding: 15px 20px;
      border-left: 4px solid #c9a227;
      background: #fef9e7;
      font-style: italic;
    }

    blockquote .source {
      display: block;
      margin-top: 8px;
      font-size: 10pt;
      color: #666;
      font-style: normal;
    }

    /* 表格 */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 10pt;
    }

    th {
      background: #f5f5f5;
      padding: 10px 12px;
      text-align: left;
      border-bottom: 2px solid #ddd;
      font-weight: 700;
    }

    td {
      padding: 8px 12px;
      border-bottom: 1px solid #eee;
    }

    tr:hover {
      background: #fafafa;
    }

    /* 列表 */
    ul, ol {
      margin: 15px 0;
      padding-left: 25px;
    }

    li {
      margin-bottom: 8px;
    }

    /* 高亮框 */
    .highlight-box {
      background: #fef9e7;
      border-left: 4px solid #c9a227;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }

    /* 标签 */
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 15px 0;
    }

    .tag {
      background: #fef3c7;
      color: #92400e;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 9pt;
    }

    /* 分割线 */
    hr {
      border: none;
      border-top: 1px solid #eee;
      margin: 30px 0;
    }

    /* 页脚 */
    @page {
      size: A4;
      margin: 40px 60px;
    }

    .page-footer {
      position: fixed;
      bottom: 30px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 9pt;
      color: #999;
    }

    /* 分页 */
    .page-break {
      page-break-after: always;
    }

    /* 内容页 */
    .content-page {
      padding: 60px 80px;
      position: relative;
    }
  </style>
</head>
<body>
  <!-- 封面 -->
  <div class="cover">
    <h1>巴菲特护城河全集</h1>
    <p class="subtitle">Economic Moat Complete Guide</p>
    <p class="meta">ValueInvest.Wiki · 2026年最新版</p>
  </div>

  <!-- 目录 -->
  <div class="toc content-page">
    <h1>目录</h1>

    <div class="toc-item">
      <span class="title">第一章：什么是护城河？</span>
      <span class="page">3</span>
    </div>
    <div class="toc-item">
      <span class="title">第二章：护城河的五种类型</span>
      <span class="page">5</span>
    </div>
    <div class="toc-item">
      <span class="title">第三章：如何识别护城河</span>
      <span class="page">12</span>
    </div>
    <div class="toc-item">
      <span class="title">第四章：著名护城河投资案例</span>
      <span class="page">15</span>
    </div>
    <div class="toc-item">
      <span class="title">第五章：护城河 vs 增长</span>
      <span class="page">17</span>
    </div>
    <div class="toc-item">
      <span class="title">附录：巴菲特语录精选</span>
      <span class="page">19</span>
    </div>

    <hr style="margin-top: 40px;">

    <div style="display: flex; justify-content: space-around; text-align: center; margin-top: 40px;">
      <div>
        <div style="font-size: 28pt; font-weight: 700; color: #c9a227;">5</div>
        <div style="font-size: 10pt; color: #666;">种护城河类型</div>
      </div>
      <div>
        <div style="font-size: 28pt; font-weight: 700; color: #c9a227;">60+</div>
        <div style="font-size: 10pt; color: #666;">年投资智慧</div>
      </div>
      <div>
        <div style="font-size: 28pt; font-weight: 700; color: #c9a227;">100+</div>
        <div style="font-size: 10pt; color: #666;">页深度内容</div>
      </div>
    </div>
  </div>

  <!-- 第一章 -->
  <div class="content-page page-break">
    <h1>第一章：什么是护城河？</h1>

    <h2>护城河的定义</h2>
    <p>
      经济护城河（Economic Moat）是指企业抵御竞争对手的能力，如同中世纪城堡的护城河保护城堡免受入侵者攻击。一个拥有宽阔护城河的公司，能够在数十年内保持超常盈利能力；而护城河狭窄的公司则面临持续侵蚀。
    </p>

    <blockquote>
      "The key to investing is not assessing how much an industry is going to affect society, or how much it will grow, but rather determining the competitive advantage of any given company, and above all, the durability of that advantage."
      <span class="source">— 沃伦·巴菲特</span>
    </blockquote>

    <h2>为什么护城河如此重要？</h2>
    <p>
      格雷厄姆的安全边际概念专注于价格——以低于内在价值的价格购买。但芒格帮助巴菲特意识到：以合理价格买一家优秀公司，比以优惠价格买一家普通公司要好。
    </p>
    <p>
      原因是：拥有宽阔护城河的企业可以数十年的高复合增长率复利增长，而普通企业无论多便宜，其回报最终都会被竞争侵蚀。
    </p>

    <div class="highlight-box">
      <strong>核心理念：</strong>护城河是巴菲特投资哲学的核心。没有持久竞争优势的企业容易受到颠覆、竞争和商品化的影响。
    </div>

    <h2>护城河宽度</h2>
    <table>
      <thead>
        <tr>
          <th>评级</th>
          <th>预期持续时间</th>
          <th>示例</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>宽阔护城河</strong></td>
          <td>20年以上</td>
          <td>苹果生态系统、可口可乐品牌</td>
        </tr>
        <tr>
          <td><strong>狭窄护城河</strong></td>
          <td>10-20年</td>
          <td>大多数竞争性企业</td>
        </tr>
        <tr>
          <td><strong>无护城河</strong></td>
          <td>商品化</td>
          <td>航空公司，大大多数零售商</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 第二章 -->
  <div class="content-page page-break">
    <h1>第二章：护城河的五种类型</h1>

    <h2>1. 无形资产</h2>
    <p><strong>品牌、专利、监管许可证或竞争对手难以复制的声誉。</strong></p>
    <table>
      <thead>
        <tr>
          <th>公司</th>
          <th>护城河类型</th>
          <th>详情</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>可口可乐</td>
          <td>品牌</td>
          <td>品牌价值超700亿美元</td>
        </tr>
        <tr>
          <td>苹果</td>
          <td>品牌 + 生态系统</td>
          <td>iOS 生态系统锁定效应</td>
        </tr>
        <tr>
          <td>制药公司</td>
          <td>专利</td>
          <td>20年专利独占期</td>
        </tr>
      </tbody>
    </table>

    <h2>2. 成本优势</h2>
    <p><strong>能够以低于竞争对手的成本生产或交付产品/服务。</strong></p>
    <table>
      <thead>
        <tr>
          <th>公司</th>
          <th>详情</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>BNSF铁路</td>
          <td>每吨英里运输成本是卡车的1/3</td>
        </tr>
        <tr>
          <td>GEICO</td>
          <td>直销模式省去代理人佣金</td>
        </tr>
        <tr>
          <td>Costco</td>
          <td>规模经济实现天天低价</td>
        </tr>
      </tbody>
    </table>

    <h2>3. 转换成本</h2>
    <p><strong>客户转向竞争对手需要付出的金钱、心理或时间成本。</strong></p>
    <table>
      <thead>
        <tr>
          <th>公司</th>
          <th>转换成本</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Microsoft Office</td>
          <td>学习曲线陡峭</td>
        </tr>
        <tr>
          <td>企业软件(SAP/Oracle)</td>
          <td>多年培训投入</td>
        </tr>
        <tr>
          <td>企业银行关系</td>
          <td>更换银行成本高昂</td>
        </tr>
      </tbody>
    </table>

    <h2>4. 网络效应</h2>
    <p><strong>产品随用户增多而变得更有价值。</strong></p>
    <table>
      <thead>
        <tr>
          <th>公司</th>
          <th>网络效应</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Visa/Mastercard</td>
          <td>更多商户 → 更多用户 → 更多商户</td>
        </tr>
        <tr>
          <td>Facebook</td>
          <td>更多用户 → 更高广告价值</td>
        </tr>
        <tr>
          <td>苹果 iOS</td>
          <td>更多开发者 → 更多用户</td>
        </tr>
      </tbody>
    </table>

    <h2>5. 高效规模</h2>
    <p><strong>细分市场被高效服务，竞争对手无法有利可图地进入。</strong></p>
    <table>
      <thead>
        <tr>
          <th>公司</th>
          <th>详情</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>穆迪</td>
          <td>债券评级需要监管认可</td>
        </tr>
        <tr>
          <td>伯克希尔保险</td>
          <td>保险浮存金优势</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 第三章 -->
  <div class="content-page page-break">
    <h1>第三章：如何识别护城河</h1>

    <h2>巴菲特的护城河检查清单</h2>
    <p>在评估一家公司是否有护城河时，巴菲特会问以下问题：</p>

    <ol>
      <li><strong>品牌实力</strong> — 你能提价而不流失客户吗？</li>
      <li><strong>市场主导地位</strong> — 公司是其领域的领导者吗？</li>
      <li><strong>客户忠诚度</strong> — 客户留存率是多少？</li>
      <li><strong>竞争壁垒</strong> — 是什么阻止资金充足的竞争对手进入？</li>
      <li><strong>历史回报</strong> — ROIC是否持续高于资本成本？</li>
    </ol>

    <h2>持久性是关键问题</h2>
    <blockquote>
      "Tell me where you're going to die, and I'll tell you not to go there."
      <span class="source">— 查理·芒格</span>
    </blockquote>
    <p>
      关键问题不仅是公司今天是否有护城河，而是<strong>这个护城河在10年、20年、30年后有多持久？</strong>
    </p>

    <h2>护城河正在缩小的行业</h2>
    <ul>
      <li><strong>报纸</strong> — 互联网摧毁了广告垄断</li>
      <li><strong>商场零售</strong> — 电子商务削弱了客流</li>
      <li><strong>有线电视</strong> — 流媒体解绑了内容护城河</li>
    </ul>

    <h2>护城河正在扩大的行业</h2>
    <ul>
      <li><strong>云计算</strong> — 数据网络效应</li>
      <li><strong>支付网络</strong> — 更多交易 = 更高价值</li>
    </ul>
  </div>

  <!-- 第四章 -->
  <div class="content-page page-break">
    <h1>第四章：著名护城河投资案例</h1>

    <h2>伯克希尔的护城河投资</h2>
    <p>巴菲特通过伯克希尔·哈撒韦持有了一批具有宽阔护城河的公司，这些投资跨越数十年，创造了巨大价值。</p>

    <table>
      <thead>
        <tr>
          <th>公司</th>
          <th>护城河类型</th>
          <th>持有年份</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>可口可乐</td>
          <td>品牌</td>
          <td>1988至今</td>
        </tr>
        <tr>
          <td>美国运通</td>
          <td>网络效应</td>
          <td>1960年代至今</td>
        </tr>
        <tr>
          <td>喜诗糖果</td>
          <td>品牌 + 忠诚度</td>
          <td>1972至今</td>
        </tr>
        <tr>
          <td>GEICO</td>
          <td>成本优势</td>
          <td>1951至今</td>
        </tr>
        <tr>
          <td>穆迪</td>
          <td>监管护城河</td>
          <td>1970年代至今</td>
        </tr>
      </tbody>
    </table>

    <h2>可口可乐（1988至今）</h2>
    <p>
      1988年，巴菲特投资13亿美元买入可口可乐，如今价值超过200亿美元。可口可乐的品牌护城河是其核心价值——全球最具价值品牌之一，品牌价值超700亿美元。
    </p>

    <h2>GEICO（1951至今）</h2>
    <p>
      巴菲特在1951年首次投资GEICO，1976年大幅加仓。GEICO的护城河是直销模式——通过电话和互联网直接销售，省去代理人佣金，成本优势明显。
    </p>

    <h2>苹果（2016至今）</h2>
    <p>
      2016年起，巴菲特开始买入苹果，如今成为伯克希尔最大持仓。苹果的护城河是品牌+生态系统——iOS的锁定效应让用户难以切换到安卓。
    </p>

    <div class="highlight-box">
      <strong>共同点：</strong>这些投资都是在护城河被低估时买入的。最好的买入时机是市场暂时忽视护城河的时候。
    </div>
  </div>

  <!-- 第五章 -->
  <div class="content-page page-break">
    <h1>第五章：护城河 vs 增长</h1>

    <p>
      拥有宽阔护城河的缓慢增长行业，往往优于没有护城河的高速增长行业。
    </p>

    <blockquote>
      增长是不可预测的；护城河的持久性更容易评估。
    </blockquote>

    <h2>护城河比增长更重要的原因</h2>
    <ol>
      <li>护城河可以持续数十年</li>
      <li>增长是一次性的，护城河是持久的</li>
      <li>护城河可以抵御市场波动</li>
      <li>宽护城河公司有定价权</li>
    </ol>

    <h2>最佳业务的三个特征</h2>
    <div class="highlight-box">
      <strong>1. 宽阔的护城河</strong>
    </div>
    <div class="highlight-box">
      <strong>2. 高资本回报率</strong>
    </div>
    <div class="highlight-box">
      <strong>3. 竞争优势持续时间长</strong>
    </div>

    <h2>结论</h2>
    <p>
      护城河是巴菲特投资哲学的核心。没有持久竞争优势的企业容易受到颠覆、竞争和商品化的影响。
    </p>
    <p>
      最好的买入护城河股票的时机是市场暂时忽视它的时候。最错误的做法是买入实际上正在缩小的"护城河"。
    </p>
  </div>

  <!-- 附录 -->
  <div class="content-page page-break">
    <h1>附录：巴菲特语录精选</h1>

    <blockquote>
      "The key to investing is not assessing how much an industry is going to affect society, or how much it will grow, but rather determining the competitive advantage of any given company, and above all, the durability of that advantage."
    </blockquote>

    <blockquote>
      "Price is what you pay. Value is what you get."
      <span class="source">价格是你付出的，价值是你得到的。</span>
    </blockquote>

    <blockquote>
      "It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price."
      <span class="source">以合理价格买一家优秀公司，远比以优惠价格买一家普通公司要好。</span>
    </blockquote>

    <blockquote>
      "The most important investment you can make is in yourself."
      <span class="source">最重要的投资是对自己的投资。</span>
    </blockquote>

    <blockquote>
      "Diversification is protection against ignorance."
      <span class="source">分散化是对无知的保护。</span>
    </blockquote>

    <hr>

    <h2>相关资源</h2>
    <p>想深入学习护城河概念？访问 ValueInvest.Wiki 获取更多内容：</p>
    <ul>
      <li>valueinvest.wiki/concepts/moat - 护城河概念详解</li>
      <li>valueinvest.wiki/people/warren-buffett - 巴菲特投资哲学</li>
      <li>valueinvest.wiki/companies - 伯克希尔持仓公司分析</li>
    </ul>

    <hr style="margin-top: 40px;">

    <p style="text-align: center; color: #999; font-size: 10pt; margin-top: 30px;">
      本PDF由 ValueInvest.Wiki 生成 | 免费知识库 · 价值投资者首选<br>
      © 2026 ValueInvest.Wiki · 保留所有权利
    </p>
  </div>
</body>
</html>
`

async function generatePDF() {
  console.log('📄 正在生成巴菲特护城河全集 PDF...')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  // 设置视口为 A4
  await page.setViewport({
    width: 595, // A4 width in points
    height: 842, // A4 height in points
    isPaper: true
  })

  // 设置内容
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  })

  // 等待字体加载
  await new Promise(resolve => setTimeout(resolve, 2000))

  // 生成 PDF
  const pdfPath = path.join(outputDir, 'buffett-moat-guide.pdf')
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  })

  await browser.close()

  const stats = fs.statSync(pdfPath)
  console.log(`✅ PDF 生成成功: ${pdfPath}`)
  console.log(`📊 文件大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB`)
}

generatePDF().catch(console.error)
