import type { CollectionConfig } from 'payload'

// 圖片上傳。Hero 照片、課程卡片圖等都從這裡選。
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: '圖片', plural: '圖片庫' },
  admin: { group: '內容' },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'card', width: 800, height: undefined, position: 'centre' },
      { name: 'hero', width: 1400, height: undefined, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: '替代文字（無障礙用，簡述圖片內容）',
      type: 'text',
    },
  ],
}
