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
    {
      name: 'seo',
      label: 'SEO 設定',
      type: 'group',
      admin: { description: '全站預設 SEO，各頁面可覆蓋' },
      fields: [
        { name: 'title', label: '預設 SEO 標題', type: 'text',
          defaultValue: '祈聿教育｜台清交師資一對一家教 · 國高中全學科' },
        { name: 'description', label: '預設 SEO 描述', type: 'textarea',
          defaultValue: '嚴選台清交頂大師資，一對一量身訂製課程，每日追蹤學習進度，讓家長安心掌握每一步。提供國中會考、高中學測、分科測驗全科輔導。' },
        { name: 'ogImage', label: 'OG 預覽圖（1200×630px）', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'social',
      label: '社群連結',
      type: 'group',
      fields: [
        { name: 'fbUrl', label: 'Facebook 連結', type: 'text' },
        { name: 'igUrl', label: 'Instagram 連結', type: 'text' },
        { name: 'threadsUrl', label: 'Threads 連結', type: 'text' },
        { name: 'lineUrl2', label: 'LINE 官方帳號連結', type: 'text',
          admin: { description: '與上方 LINE 聯絡連結相同或不同皆可' } },
      ],
    },
  ],
}
