import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: '家長評語', plural: '家長評語' },
  admin: {
    group: '師資',
    useAsTitle: 'parentName',
    defaultColumns: ['parentName', 'subject', 'featured', 'order'],
  },
  access: { read: () => true },
  fields: [
    { name: 'parentName', label: '家長稱呼', type: 'text', required: true,
      admin: { description: '例：王媽媽 或 陳先生（匿名可寫「高三家長」）' } },
    { name: 'studentGrade', label: '學生年級', type: 'text',
      admin: { description: '例：高三、國二' } },
    {
      name: 'subject',
      label: '輔導科目',
      type: 'select',
      options: [
        { label: '數學', value: '數學' },
        { label: '英文', value: '英文' },
        { label: '物理', value: '物理' },
        { label: '化學', value: '化學' },
        { label: '生物', value: '生物' },
        { label: '國文', value: '國文' },
        { label: '全學科', value: '全學科' },
      ],
    },
    { name: 'content', label: '評語內容', type: 'textarea', required: true },
    { name: 'beforeScore', label: '輔導前分數', type: 'number',
      admin: { description: '選填，填了才顯示 before/after 進步條' } },
    { name: 'afterScore', label: '輔導後分數', type: 'number' },
    {
      name: 'teacher',
      label: '輔導老師',
      type: 'relationship',
      relationTo: 'teachers',
      admin: { description: '選填，連結到老師個人頁' },
    },
    { name: 'featured', label: '首頁顯示', type: 'checkbox', defaultValue: false,
      admin: { description: '勾選後出現在首頁 Testimonials carousel' } },
    { name: 'order', label: '排序', type: 'number', defaultValue: 99 },
  ],
}
