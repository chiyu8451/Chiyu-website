import type { GlobalConfig } from 'payload'

export const Cta: GlobalConfig = {
  slug: 'cta',
  label: '行動呼籲 CTA',
  admin: { group: '首頁區段', description: '頁面最下方的行動呼籲：標題、按鈕與亮點標籤。' },
  access: { read: () => true },
  fields: [
    {
      name: 'heading',
      label: '標題',
      type: 'text',
      defaultValue: '暑假是最好的起點',
    },
    {
      name: 'text',
      label: '說明',
      type: 'textarea',
      defaultValue:
        '填寫問卷只需 5 分鐘，我們會在一個工作天內聯絡您，安排適合的師資與試教課。',
    },
    {
      name: 'primaryCtaLabel',
      label: '主要按鈕文字',
      type: 'text',
      defaultValue: '免費填寫問卷',
    },
    {
      name: 'secondaryCtaLabel',
      label: '次要按鈕文字',
      type: 'text',
      defaultValue: 'LINE 直接諮詢',
    },
    {
      name: 'benefits',
      label: '下方亮點標籤',
      type: 'array',
      labels: { singular: '標籤', plural: '標籤' },
      admin: { description: '顯示為按鈕下方的一排小標籤' },
      fields: [{ name: 'text', label: '文字', type: 'text', required: true }],
      defaultValue: [
        { text: '台清交頂大嚴選師資' },
        { text: '第一堂試教課評估' },
        { text: '每日追蹤讀書進度' },
        { text: '暑假早鳥優惠限時' },
      ],
    },
  ],
}
