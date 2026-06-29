import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: '網站設定',
  admin: { group: '全站' },
  access: { read: () => true },
  fields: [
    {
      name: 'logoText',
      label: 'Logo 文字',
      type: 'text',
      defaultValue: '祈聿教育',
      required: true,
    },
    {
      name: 'navLinks',
      label: '導覽列選單',
      type: 'array',
      labels: { singular: '選單項目', plural: '選單項目' },
      admin: { description: '錨點請填 #區段id，例如 #why、#courses' },
      fields: [
        { name: 'label', label: '文字', type: 'text', required: true },
        { name: 'anchor', label: '連結錨點', type: 'text', required: true },
      ],
      defaultValue: [
        { label: '為什麼選我們', anchor: '#why' },
        { label: '服務流程', anchor: '#process' },
        { label: '課程類型', anchor: '#courses' },
        { label: '師資', anchor: '#teachers' },
        { label: 'FAQ', anchor: '#faq' },
      ],
    },
    {
      name: 'navCtaLabel',
      label: '導覽列按鈕文字',
      type: 'text',
      defaultValue: '立即諮詢',
    },
    {
      name: 'googleFormUrl',
      label: 'Google 問卷連結',
      type: 'text',
      admin: { description: '所有「填寫問卷」按鈕會連到這裡' },
    },
    {
      name: 'lineUrl',
      label: 'LINE 聯絡連結',
      type: 'text',
      admin: { description: '所有「LINE 聯絡」按鈕會連到這裡' },
    },
    {
      name: 'footerText',
      label: '頁尾版權文字',
      type: 'text',
      defaultValue: '© 2025 祈聿教育 · 嚴選頂大師資 · 讓每個孩子找到對的老師',
    },
  ],
}
