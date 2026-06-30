import type { GlobalConfig } from 'payload'

export const Process: GlobalConfig = {
  slug: 'process',
  label: '服務流程',
  admin: { group: '首頁區段', description: '首頁「服務流程」區塊：從諮詢到正式上課的步驟。' },
  access: { read: () => true },
  fields: [
    {
      name: 'heading',
      label: '標題',
      type: 'text',
      defaultValue: '開始合作，只需四步驟',
    },
    {
      name: 'subtitle',
      label: '副標',
      type: 'text',
      defaultValue: '從諮詢到第一堂課，最快一週內開始',
    },
    {
      name: 'steps',
      label: '步驟',
      type: 'array',
      labels: { singular: '步驟', plural: '步驟' },
      admin: { description: '編號會依順序自動產生（1、2、3…）' },
      fields: [
        { name: 'title', label: '步驟標題', type: 'text', required: true },
        { name: 'description', label: '步驟說明', type: 'textarea', required: true },
      ],
      defaultValue: [
        {
          title: '填寫問卷',
          description: '告訴我們孩子的年級、目標科目、學習狀況與時間安排，讓我們更了解需求。',
        },
        {
          title: '媒合師資',
          description: '根據需求配對最適合的老師，提供老師背景與教學風格說明，確認後安排試教。',
        },
        {
          title: '試教評估',
          description: '第一堂試教課評估師生默契，確認教學方式適合孩子，試教不滿意可重新媒合。',
        },
        {
          title: '開始課程',
          description: '每週 1-2 堂、每堂 2 小時，搭配每日練習與課後追蹤，讓學習持續發生。',
        },
      ],
    },
  ],
}
