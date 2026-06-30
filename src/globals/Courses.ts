import type { GlobalConfig } from 'payload'

export const Courses: GlobalConfig = {
  slug: 'courses',
  label: '課程類型',
  admin: { group: '首頁區段', description: '首頁「課程類型」區塊：國中／高中課程卡片。' },
  access: { read: () => true },
  fields: [
    {
      name: 'heading',
      label: '標題',
      type: 'textarea',
      defaultValue: '課程類型',
      admin: { description: '可用換行分成兩行' },
    },
    {
      name: 'subtitle',
      label: '副標',
      type: 'text',
      defaultValue: '國中會考・高中學測・分科測驗，我們都有對應的師資。',
    },
    {
      name: 'cards',
      label: '課程卡片',
      type: 'array',
      labels: { singular: '課程', plural: '課程' },
      fields: [
        { name: 'label', label: '上方標籤', type: 'text', required: true },
        { name: 'title', label: '標題', type: 'text', required: true },
        { name: 'description', label: '說明', type: 'textarea', required: true },
        {
          name: 'image',
          label: '卡片圖片',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'featured',
          label: '金色強調邊框',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'tags',
          label: '標籤',
          type: 'array',
          labels: { singular: '標籤', plural: '標籤' },
          fields: [{ name: 'text', label: '文字', type: 'text', required: true }],
        },
      ],
      defaultValue: [
        {
          label: '國中課程',
          title: '會考全科補強',
          featured: false,
          description:
            '國文、英文、數學、自然、社會全科均有師資，依學生程度客製化重點，搭配每日練習，穩定打好基礎。',
          tags: [
            { text: '國文' },
            { text: '英文' },
            { text: '數學' },
            { text: '自然' },
            { text: '社會' },
          ],
        },
        {
          label: '高中課程',
          title: '學測・分科衝刺',
          featured: true,
          description:
            '針對 108 課綱跨領域素養題型，由有大考輔導經驗的頂大師資一對一強化弱點，精準提分。',
          tags: [
            { text: '學測' },
            { text: '分科測驗' },
            { text: '數學' },
            { text: '物理' },
            { text: '化學' },
            { text: '英文' },
          ],
        },
      ],
    },
  ],
}
