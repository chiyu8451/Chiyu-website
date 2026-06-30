import type { GlobalConfig } from 'payload'

export const Manifesto: GlobalConfig = {
  slug: 'manifesto',
  label: '宣言區塊（深色）',
  admin: {
    group: '首頁區段',
    description: '首頁中段的深色大字宣言，是整站最有個性、最能打動學生的一段。文字可自由修改。',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'eyebrow',
      label: '小標',
      type: 'text',
      defaultValue: '寫給每一個還在卡關的你',
    },
    {
      name: 'line1',
      label: '大標第一行',
      type: 'text',
      defaultValue: '不是你不夠聰明，',
    },
    {
      name: 'line2',
      label: '大標第二行（金色強調）',
      type: 'text',
      defaultValue: '是還沒遇到對的老師。',
    },
    {
      name: 'subtext',
      label: '說明文字',
      type: 'textarea',
      defaultValue:
        '我們自己也曾經對著課本發呆、考卷上一片紅。後來才懂——找到一個真正懂你、願意陪你拆解每一題的人，學習就會整個不一樣。這就是祈聿存在的理由。',
    },
    {
      name: 'statNumber',
      label: '亮點數字',
      type: 'text',
      defaultValue: '28',
      admin: { description: '例如平均進步分數，純數字會有跑動動畫' },
    },
    {
      name: 'statLabel',
      label: '亮點數字說明',
      type: 'text',
      defaultValue: '位學員平均進步分數',
    },
  ],
}
