import type { GlobalConfig } from 'payload'

export const Faq: GlobalConfig = {
  slug: 'faq',
  label: '常見問題',
  admin: { group: '首頁區段', description: '常見問題區塊：首頁與獨立 /faq 頁共用同一份問答。' },
  access: { read: () => true },
  fields: [
    {
      name: 'heading',
      label: '標題',
      type: 'text',
      defaultValue: '常見問題',
    },
    {
      name: 'intro',
      label: '左側引導文字',
      type: 'textarea',
      defaultValue: '還有疑問？歡迎直接 LINE 我們，通常一個工作天內回覆。',
    },
    {
      name: 'items',
      label: '問答清單',
      type: 'array',
      labels: { singular: '問答', plural: '問答' },
      fields: [
        { name: 'question', label: '問題', type: 'text', required: true },
        { name: 'answer', label: '回答', type: 'textarea', required: true },
      ],
      defaultValue: [
        {
          question: '老師都是什麼學校的？',
          answer:
            '所有祈聿老師都來自台清交、陽明交大、台大等頂尖大學，科系涵蓋醫學、理工、法律、資訊等。每位老師都通過學科測驗與教學面試，並完成超過 10 小時的培訓。',
        },
        {
          question: '費用大概是多少？',
          answer:
            '費用依老師等級與課程類型而定，建議填寫問卷讓我們了解需求後，再提供適合的方案說明。暑假期間有早鳥優惠。',
        },
        {
          question: '試教不滿意可以換老師嗎？',
          answer:
            '可以！試教的目的就是確認師生默契。如果孩子或家長覺得不適合，我們會重新媒合，直到找到最合適的老師為止。',
        },
        {
          question: '一週上幾堂課？',
          answer:
            '通常每週 1-2 堂、每堂 2 小時。可依孩子的時間與學習需求調整，時段彈性，不受限於固定班次。',
        },
        {
          question: '課後有什麼服務？',
          answer:
            '老師每日追蹤學生的讀書狀況，課後問題可以隨時提出，不用等到下次上課。我們也會定期向家長回報學習進度。',
        },
        {
          question: '只有線上課程嗎？',
          answer:
            '目前主打線上一對一，省去通勤時間、時段彈性、在家即可上課。部分老師也提供實體家教，可在問卷中說明需求。',
        },
      ],
    },
  ],
}
