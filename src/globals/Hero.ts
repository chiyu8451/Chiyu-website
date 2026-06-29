import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: '首屏 Hero',
  admin: { group: '首頁區段' },
  access: { read: () => true },
  fields: [
    {
      name: 'badgeText',
      label: '上方小標籤',
      type: 'text',
      defaultValue: '暑假早鳥優惠 · 限時報名中',
    },
    {
      name: 'headingLine1',
      label: '主標題（第一行）',
      type: 'text',
      defaultValue: '找到對的老師',
      required: true,
    },
    {
      name: 'headingLine2',
      label: '主標題（第二行，金色強調）',
      type: 'text',
      defaultValue: '學習就會不一樣',
      required: true,
    },
    {
      name: 'subtitle',
      label: '說明文字',
      type: 'textarea',
      defaultValue:
        '祈聿嚴選台清交頂大師資，一對一量身訂製課程，每日追蹤孩子的讀書狀況，讓家長安心掌握每一步進度。',
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
      defaultValue: '了解我們的老師',
    },
    {
      name: 'image',
      label: 'Hero 照片',
      type: 'upload',
      relationTo: 'media',
      admin: { description: '建議直式、高解析度的課堂情境照' },
    },
    {
      name: 'stats',
      label: '照片上的數據條',
      type: 'array',
      labels: { singular: '數據', plural: '數據' },
      maxRows: 3,
      fields: [
        { name: 'number', label: '數字', type: 'text', required: true },
        { name: 'label', label: '說明', type: 'text', required: true },
      ],
      defaultValue: [
        { number: '8+', label: '頂大師資' },
        { number: '92%', label: '家長好評' },
        { number: '50+', label: '成功學員' },
      ],
    },
  ],
}
