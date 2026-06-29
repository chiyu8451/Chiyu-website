import type { CollectionConfig } from 'payload'

// 後台登入帳號。可以邀請多位同仁，每位都能編輯所有內容。
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: '管理員', plural: '管理員' },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: '系統',
  },
  fields: [
    {
      name: 'name',
      label: '姓名',
      type: 'text',
    },
  ],
}
