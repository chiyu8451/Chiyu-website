import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: '文章', plural: '文章' },
  admin: {
    group: '內容',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedAt'],
    description: '把 Threads／IG／FB 的好文貼進來，會出現在 /blog 與首頁文章預覽。記得填英文 slug 與摘要（SEO 用）。',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', label: '文章標題', type: 'text', required: true },
    { name: 'slug', label: 'URL Slug', type: 'text', required: true, unique: true,
      admin: { description: '用於 /blog/[slug]，只能用英文、數字、連字號' } },
    { name: 'excerpt', label: '摘要（SEO 用，160 字以內）', type: 'textarea', required: true },
    { name: 'content', label: '文章內容', type: 'richText', required: true },
    { name: 'coverImage', label: '封面圖', type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      label: '分類',
      type: 'select',
      options: [
        { label: '升學策略', value: '升學策略' },
        { label: '學習方法', value: '學習方法' },
        { label: '師資介紹', value: '師資介紹' },
        { label: '品牌故事', value: '品牌故事' },
        { label: '學科攻略', value: '學科攻略' },
      ],
      required: true,
    },
    {
      name: 'tags',
      label: '標籤',
      type: 'array',
      labels: { singular: '標籤', plural: '標籤' },
      fields: [{ name: 'tag', label: '標籤文字', type: 'text' }],
    },
    {
      name: 'author',
      label: '作者',
      type: 'select',
      options: [
        { label: '王祈 Samuel', value: '王祈' },
        { label: '施威聿 阿威', value: '施威聿' },
        { label: '祈聿教育編輯部', value: '祈聿教育' },
      ],
      defaultValue: '祈聿教育',
    },
    { name: 'publishedAt', label: '發布日期', type: 'date', required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } } },
    {
      name: 'seo',
      label: 'SEO 設定',
      type: 'group',
      fields: [
        { name: 'title', label: 'SEO 標題（不填則用文章標題）', type: 'text' },
        { name: 'description', label: 'SEO 描述（不填則用摘要）', type: 'textarea',
          admin: { description: '160 字以內' } },
      ],
    },
  ],
}
