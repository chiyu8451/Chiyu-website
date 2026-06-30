import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: { singular: '學習資源', plural: '學習資源' },
  admin: {
    group: '內容',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'subject', 'level'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', label: '標題', type: 'text', required: true },
    { name: 'slug', label: 'URL Slug', type: 'text', required: true, unique: true },
    {
      name: 'category',
      label: '分類',
      type: 'select',
      options: [
        { label: '會考攻略', value: '會考攻略' },
        { label: '學測攻略', value: '學測攻略' },
        { label: '分科測驗', value: '分科測驗' },
        { label: '各科技巧', value: '各科技巧' },
        { label: '讀書計劃', value: '讀書計劃' },
      ],
      required: true,
    },
    {
      name: 'subject',
      label: '科目',
      type: 'select',
      options: [
        { label: '數學', value: '數學' },
        { label: '英文', value: '英文' },
        { label: '物理', value: '物理' },
        { label: '化學', value: '化學' },
        { label: '生物', value: '生物' },
        { label: '國文', value: '國文' },
        { label: '社會', value: '社會' },
        { label: '全科', value: '全科' },
      ],
    },
    {
      name: 'level',
      label: '適合年級',
      type: 'select',
      options: [
        { label: '國中', value: '國中' },
        { label: '高中', value: '高中' },
        { label: '國高中', value: '國高中' },
      ],
    },
    { name: 'excerpt', label: '摘要', type: 'textarea' },
    { name: 'content', label: '內容', type: 'richText', required: true },
    { name: 'publishedAt', label: '發布日期', type: 'date' },
  ],
}
