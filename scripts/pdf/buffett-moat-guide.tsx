/**
 * 巴菲特护城河全集 PDF 生成器
 *
 * 安装依赖: npm install @react-pdf/renderer
 * 运行: npx tsx scripts/pdf/buffett-moat-guide.tsx
 */

import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf,
} from '@react-pdf/renderer'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ============ 样式 ============

const styles = StyleSheet.create({
  // 页面
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.6,
  },

  // 封面
  coverPage: {
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  coverTitle: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a1a2e',
  },
  coverSubtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
  },
  coverAuthor: {
    fontSize: 12,
    color: '#999',
    marginTop: 60,
  },
  coverDate: {
    fontSize: 10,
    color: '#999',
    marginTop: 10,
  },

  // 标题层级
  h1: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginTop: 30,
    marginBottom: 15,
    color: '#1a1a2e',
  },
  h2: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1a1a2e',
  },
  h3: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#333',
  },

  // 段落
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
  },

  // 引用
  blockquote: {
    marginVertical: 10,
    paddingLeft: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#c9a227',
  },
  blockquoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555',
  },
  blockquoteSource: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },

  // 表格
  table: {
    marginVertical: 10,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
  },
  tableCellBold: {
    flex: 1,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },

  // 列表
  bulletList: {
    marginVertical: 5,
    paddingLeft: 15,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    color: '#c9a227',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },

  // 分割线
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 20,
  },

  // 页脚
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    fontSize: 9,
    color: '#999',
    textAlign: 'center',
  },

  // 章节分隔页
  sectionBreak: {
    paddingVertical: 100,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },

  // 目录
  tocItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    fontSize: 11,
  },
  tocTitle: {
    color: '#333',
  },
  tocPage: {
    color: '#666',
  },

  // 标签
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    fontSize: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },

  // 关键点
  keyPoint: {
    backgroundColor: '#fef9e7',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#c9a227',
  },
  keyPointText: {
    fontSize: 11,
    color: '#333',
  },

  // 统计
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#c9a227',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
})

// ============ 内容数据 ============

interface MoatType {
  name: string
  description: string
  examples: { company: string; detail: string }[]
}

interface FamousInvestment {
  company: string
  moatType: string
  heldSince: string
}

interface Company {
  name: string
  moatType: string
  example: string
}

// 护城河类型
const moatTypes: MoatType[] = [
  {
    name: '1. 无形资产',
    description: '品牌、专利、监管许可证或竞争对手难以复制的声誉。',
    examples: [
      { company: '可口可乐', detail: '品牌价值超700亿美元' },
      { company: '苹果', detail: '品牌 + iOS生态系统锁定效应' },
      { company: '制药公司', detail: '20年专利独占期' },
    ],
  },
  {
    name: '2. 成本优势',
    description: '能够以低于竞争对手的成本生产或交付产品/服务。',
    examples: [
      { company: 'BNSF铁路', detail: '每吨英里运输成本是卡车的1/3' },
      { company: 'GEICO', detail: '直销模式省去代理人佣金' },
      { company: 'Costco', detail: '规模经济实现天天低价' },
    ],
  },
  {
    name: '3. 转换成本',
    description: '客户转向竞争对手需要付出的金钱、心理或时间成本。',
    examples: [
      { company: 'Microsoft Office', detail: '学习曲线陡峭' },
      { company: '企业软件(SAP/Oracle)', detail: '多年培训投入' },
      { company: '企业银行关系', detail: '更换银行成本高昂' },
    ],
  },
  {
    name: '4. 网络效应',
    description: '产品随用户增多而变得更有价值。',
    examples: [
      { company: 'Visa/Mastercard', detail: '更多商户→更多用户→更多商户' },
      { company: 'Facebook', detail: '更多用户→更高广告价值' },
      { company: '苹果iOS', detail: '更多开发者→更多用户' },
    ],
  },
  {
    name: '5. 高效规模',
    description: '细分市场被高效服务，竞争对手无法有利可图地进入。',
    examples: [
      { company: '穆迪', detail: '债券评级需要监管认可' },
      { company: '伯克希尔保险', detail: '保险浮存金' },
    ],
  },
]

// 著名护城河投资
const famousInvestments: FamousInvestment[] = [
  { company: '可口可乐', moatType: '品牌', heldSince: '1988' },
  { company: '美国运通', moatType: '网络效应', heldSince: '1960年代' },
  { company: '喜诗糖果', moatType: '品牌 + 忠诚度', heldSince: '1972' },
  { company: 'GEICO', moatType: '成本优势', heldSince: '1951' },
  { company: '穆迪', moatType: '监管护城河', heldSince: '1970年代' },
]

// 识别护城河清单
const moatChecklist = [
  '品牌实力 — 你能提价而不流失客户吗？',
  '市场主导地位 — 公司是其领域的领导者吗？',
  '客户忠诚度 — 客户留存率是多少？',
  '竞争壁垒 — 是什么阻止资金充足的竞争对手进入？',
  '历史回报 — ROIC是否持续高于资本成本？',
]

// ============ PDF 组件 ============

// 封面
const CoverPage = () => (
  <Page size="A4" style={styles.coverPage}>
    <Text style={styles.coverTitle}>巴菲特护城河全集</Text>
    <Text style={styles.coverSubtitle}>Economic Moat Complete Guide</Text>
    <Text style={styles.coverAuthor}>价值投资知识库 · ValueInvest.Wiki</Text>
    <Text style={styles.coverDate}>2026年最新版</Text>
  </Page>
)

// 目录
const TableOfContents = () => (
  <Page size="A4" style={styles.page}>
    <Text style={styles.h1}>目录</Text>
    <View style={styles.divider} />

    <View style={styles.tocItem}>
      <Text style={styles.tocTitle}>第一章：什么是护城河？</Text>
      <Text style={styles.tocPage}>3</Text>
    </View>
    <View style={styles.tocItem}>
      <Text style={styles.tocTitle}>第二章：护城河的五种类型</Text>
      <Text style={styles.tocPage}>5</Text>
    </View>
    <View style={styles.tocItem}>
      <Text style={styles.tocTitle}>第三章：如何识别护城河</Text>
      <Text style={styles.tocPage}>12</Text>
    </View>
    <View style={styles.tocItem}>
      <Text style={styles.tocTitle}>第四章：著名护城河投资案例</Text>
      <Text style={styles.tocPage}>15</Text>
    </View>
    <View style={styles.tocItem}>
      <Text style={styles.tocTitle}>第五章：护城河vs增长</Text>
      <Text style={styles.tocPage}>17</Text>
    </View>
    <View style={styles.tocItem}>
      <Text style={styles.tocTitle}>附录：巴菲特语录</Text>
      <Text style={styles.tocPage}>19</Text>
    </View>

    <View style={styles.divider} />

    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>5</Text>
        <Text style={styles.statLabel}>种护城河类型</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>60+</Text>
        <Text style={styles.statLabel}>年投资智慧</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>100+</Text>
        <Text style={styles.statLabel}>页深度内容</Text>
      </View>
    </View>
  </Page>
)

// 第一章
const Chapter1 = () => (
  <Page size="A4" style={styles.page}>
    <Text style={styles.h1}>第一章：什么是护城河？</Text>
    <View style={styles.divider} />

    <Text style={styles.h2}>护城河的定义</Text>
    <Text style={styles.paragraph}>
      经济护城河（Economic Moat）是指企业抵御竞争对手的能力，如同中世纪城堡的护城河保护城堡免受入侵者攻击。一个拥有宽阔护城河的公司，能够在数十年内保持超常盈利能力；而护城河狭窄的公司则面临持续侵蚀。
    </Text>

    <View style={styles.blockquote}>
      <Text style={styles.blockquoteText}>
        "The key to investing is not assessing how much an industry is going to affect society, or how much it will grow, but rather determining the competitive advantage of any given company, and above all, the durability of that advantage."
      </Text>
      <Text style={styles.blockquoteSource}>— 沃伦·巴菲特</Text>
    </View>

    <Text style={styles.h2}>为什么护城河如此重要？</Text>
    <Text style={styles.paragraph}>
      格雷厄姆的安全边际概念专注于价格——以低于内在价值的价格购买。但芒格帮助巴菲特意识到：以合理价格买一家优秀公司，比以优惠价格买一家普通公司要好。
    </Text>
    <Text style={styles.paragraph}>
      原因是：拥有宽阔护城河的企业可以数十年的高复合增长率复利增长，而普通企业无论多便宜，其回报最终都会被竞争侵蚀。
    </Text>

    <View style={styles.keyPoint}>
      <Text style={styles.keyPointText}>
        核心理念：护城河是巴菲特投资哲学的核心。没有持久竞争优势的企业容易受到颠覆、竞争和商品化的影响。
      </Text>
    </View>

    <Text style={styles.h2}>护城河宽度</Text>

    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableCellBold}>评级</Text>
        <Text style={styles.tableCellBold}>预期持续时间</Text>
        <Text style={styles.tableCellBold}>示例</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCellBold}>宽阔护城河</Text>
        <Text style={styles.tableCell}>20年以上</Text>
        <Text style={styles.tableCell}>苹果生态系统、可口可乐品牌</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCellBold}>狭窄护城河</Text>
        <Text style={styles.tableCell}>10-20年</Text>
        <Text style={styles.tableCell}>大多数竞争性企业</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCellBold}>无护城河</Text>
        <Text style={styles.tableCell}>商品化</Text>
        <Text style={styles.tableCell}>航空公司、大多数零售商</Text>
      </View>
    </View>

    <Text style={styles.footer}>巴菲特护城河全集 · ValueInvest.Wiki</Text>
  </Page>
)

// 第二章
const Chapter2 = () => (
  <Page size="A4" style={styles.page}>
    <Text style={styles.h1}>第二章：护城河的五种类型</Text>
    <View style={styles.divider} />

    {moatTypes.map((type, index) => (
      <View key={index}>
        <Text style={styles.h2}>{type.name}</Text>
        <Text style={styles.paragraph}>{type.description}</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellBold}>公司</Text>
            <Text style={styles.tableCellBold}>详情</Text>
          </View>
          {type.examples.map((ex, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCellBold}>{ex.company}</Text>
              <Text style={styles.tableCell}>{ex.detail}</Text>
            </View>
          ))}
        </View>
      </View>
    ))}

    <Text style={styles.footer}>巴菲特护城河全集 · ValueInvest.Wiki</Text>
  </Page>
)

// 第三章
const Chapter3 = () => (
  <Page size="A4" style={styles.page}>
    <Text style={styles.h1}>第三章：如何识别护城河</Text>
    <View style={styles.divider} />

    <Text style={styles.h2}>巴菲特的护城河检查清单</Text>
    <Text style={styles.paragraph}>在评估一家公司是否有护城河时，巴菲特会问以下问题：</Text>

    {moatChecklist.map((item, index) => (
      <View key={index} style={styles.bulletList}>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>{index + 1}.</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      </View>
    ))}

    <View style={styles.divider} />

    <Text style={styles.h2}>持久性是关键问题</Text>
    <View style={styles.blockquote}>
      <Text style={styles.blockquoteText}>
        "Tell me where you're going to die, and I'll tell you not to go there."
      </Text>
      <Text style={styles.blockquoteSource}>— 查理·芒格</Text>
    </View>
    <Text style={styles.paragraph}>
      关键问题不仅是公司今天是否有护城河，而是**这个护城河在10年、20年、30年后有多持久？**
    </Text>

    <Text style={styles.h2}>护城河正在缩小的行业</Text>
    <View style={styles.bulletList}>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>报纸 — 互联网摧毁了广告垄断</Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>商场零售 — 电子商务削弱了客流</Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>有线电视 — 流媒体解绑了内容护城河</Text>
      </View>
    </View>

    <Text style={styles.h2}>护城河正在扩大的行业</Text>
    <View style={styles.bulletList}>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>云计算 — 数据网络效应</Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>支付网络 — 更多交易 = 更高价值</Text>
      </View>
    </View>

    <Text style={styles.footer}>巴菲特护城河全集 · ValueInvest.Wiki</Text>
  </Page>
)

// 第四章
const Chapter4 = () => (
  <Page size="A4" style={styles.page}>
    <Text style={styles.h1}>第四章：著名护城河投资案例</Text>
    <View style={styles.divider} />

    <Text style={styles.h2}>伯克希尔的护城河投资</Text>
    <Text style={styles.paragraph}>
      巴菲特通过伯克希尔·哈撒韦持有了一批具有宽阔护城河的公司，这些投资跨越数十年，创造了巨大价值。
    </Text>

    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableCellBold}>公司</Text>
        <Text style={styles.tableCellBold}>护城河类型</Text>
        <Text style={styles.tableCellBold}>持有年份</Text>
      </View>
      {famousInvestments.map((inv, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCellBold}>{inv.company}</Text>
          <Text style={styles.tableCell}>{inv.moatType}</Text>
          <Text style={styles.tableCell}>{inv.heldSince}</Text>
        </View>
      ))}
    </View>

    <View style={styles.divider} />

    <Text style={styles.h2}>可口可乐（1988至今）</Text>
    <Text style={styles.paragraph}>
      1988年，巴菲特投资13亿美元买入可口可乐，如今价值超过200亿美元。可口可乐的品牌护城河是其核心价值——全球最具价值品牌之一，品牌价值超700亿美元。
    </Text>

    <Text style={styles.h2}>GEICO（1951至今）</Text>
    <Text style={styles.paragraph}>
      巴菲特在1951年首次投资GEICO，1976年大幅加仓。GEICO的护城河是直销模式——通过电话和互联网直接销售，省去代理人佣金，成本优势明显。
    </Text>

    <Text style={styles.h2}>苹果（2016至今）</Text>
    <Text style={styles.paragraph}>
      2016年起，巴菲特开始买入苹果，如今成为伯克希尔最大持仓。苹果的护城河是品牌+生态系统——iOS的锁定效应让用户难以切换到安卓。
    </Text>

    <View style={styles.keyPoint}>
      <Text style={styles.keyPointText}>
        共同点：这些投资都是在护城河被低估时买入的。最好的买入时机是市场暂时忽视护城河的时候。
      </Text>
    </View>

    <Text style={styles.footer}>巴菲特护城河全集 · ValueInvest.Wiki</Text>
  </Page>
)

// 第五章
const Chapter5 = () => (
  <Page size="A4" style={styles.page}>
    <Text style={styles.h1}>第五章：护城河 vs 增长</Text>
    <View style={styles.divider} />

    <Text style={styles.paragraph}>
      拥有宽阔护城河的缓慢增长行业，往往优于没有护城河的高速增长行业。
    </Text>

    <View style={styles.blockquote}>
      <Text style={styles.blockquoteText}>
        增长是不可预测的；护城河的持久性更容易评估。
      </Text>
    </View>

    <Text style={styles.h2}>护城河比增长更重要的原因</Text>
    <View style={styles.bulletList}>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>1.</Text>
        <Text style={styles.bulletText}>护城河可以持续数十年</Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>2.</Text>
        <Text style={styles.bulletText}>增长是一次性的，护城河是持久的</Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>3.</Text>
        <Text style={styles.bulletText}>护城河可以抵御市场波动</Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>4.</Text>
        <Text style={styles.bulletText}>宽护城河公司有定价权</Text>
      </View>
    </View>

    <Text style={styles.h2}>最佳业务的三个特征</Text>
    <View style={styles.keyPoint}>
      <Text style={styles.keyPointText}>1. 宽阔的护城河</Text>
    </View>
    <View style={styles.keyPoint}>
      <Text style={styles.keyPointText}>2. 高资本回报率</Text>
    </View>
    <View style={styles.keyPoint}>
      <Text style={styles.keyPointText}>3. 竞争优势持续时间长</Text>
    </View>

    <Text style={styles.divider} />

    <Text style={styles.h2}>结论</Text>
    <Text style={styles.paragraph}>
      护城河是巴菲特投资哲学的核心。没有持久竞争优势的企业容易受到颠覆、竞争和商品化的影响。
    </Text>
    <Text style={styles.paragraph}>
      最好的买入护城河股票的时机是市场暂时忽视它的时候。最错误的做法是买入实际上正在缩小的"护城河"。
    </Text>

    <Text style={styles.footer}>巴菲特护城河全集 · ValueInvest.Wiki</Text>
  </Page>
)

// 附录
const Appendix = () => (
  <Page size="A4" style={styles.page}>
    <Text style={styles.h1}>附录：巴菲特语录精选</Text>
    <View style={styles.divider} />

    <View style={styles.blockquote}>
      <Text style={styles.blockquoteText}>
        "The key to investing is not assessing how much an industry is going to affect society, or how much it will grow, but rather determining the competitive advantage of any given company, and above all, the durability of that advantage."
      </Text>
    </View>

    <View style={styles.blockquote}>
      <Text style={styles.blockquoteText}>
        "Price is what you pay. Value is what you get."
      </Text>
      <Text style={styles.blockquoteSource}>价格是你付出的，价值是你得到的。</Text>
    </View>

    <View style={styles.blockquote}>
      <Text style={styles.blockquoteText}>
        "It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price."
      </Text>
      <Text style={styles.blockquoteSource}>以合理价格买一家优秀公司，远比以优惠价格买一家普通公司要好。</Text>
    </View>

    <View style={styles.blockquote}>
      <Text style={styles.blockquoteText}>
        "The most important investment you can make is in yourself."
      </Text>
      <Text style={styles.blockquoteSource}>最重要的投资是对自己的投资。</Text>
    </View>

    <View style={styles.blockquote}>
      <Text style={styles.blockquoteText}>
        "Diversification is protection against ignorance."
      </Text>
      <Text style={styles.blockquoteSource}>分散化是对无知的保护。</Text>
    </View>

    <View style={styles.divider} />

    <Text style={styles.h2}>相关资源</Text>
    <Text style={styles.paragraph}>
      想深入学习护城河概念？访问 ValueInvest.Wiki 获取更多内容：
    </Text>
    <View style={styles.bulletList}>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>→</Text>
        <Text style={styles.bulletText}>valueinvest.wiki/concepts/moat - 护城河概念详解</Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>→</Text>
        <Text style={styles.bulletText}>valueinvest.wiki/people/warren-buffett - 巴菲特投资哲学</Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>→</Text>
        <Text style={styles.bulletText}>valueinvest.wiki/companies - 伯克希尔持仓公司分析</Text>
      </View>
    </View>

    <View style={styles.divider} />

    <Text style={styles.paragraph} style={{ textAlign: 'center', color: '#999', fontSize: 10 }}>
      本PDF由 ValueInvest.Wiki 生成 | 免费知识库 · 价值投资者首选
    </Text>
    <Text style={styles.paragraph} style={{ textAlign: 'center', color: '#999', fontSize: 9, marginTop: 5 }}>
      © 2026 ValueInvest.Wiki · 保留所有权利
    </Text>
  </Page>
)

// ============ 主文档 ============

const MoatGuideDocument = () => (
  <Document>
    <CoverPage />
    <TableOfContents />
    <Chapter1 />
    <Chapter2 />
    <Chapter3 />
    <Chapter4 />
    <Chapter5 />
    <Appendix />
  </Document>
)

// ============ 生成函数 ============

async function generatePDF() {
  console.log('📄 正在生成巴菲特护城河全集 PDF...')

  const outputPath = path.join(process.cwd(), 'public', 'pdfs')
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  const filePath = path.join(outputPath, 'buffett-moat-guide.pdf')

  const doc = <MoatGuideDocument />
  const pdfBlob = await pdf(doc).toBlob()

  const buffer = await pdfBlob.arrayBuffer()
  fs.writeFileSync(filePath, Buffer.from(buffer))

  console.log(`✅ PDF 生成成功: ${filePath}`)
  console.log(`📊 文件大小: ${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB`)
}

// 运行
generatePDF().catch(console.error)
