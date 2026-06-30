import type { GlobalConfig } from 'payload'
import { iconOptions } from '../fields/iconOptions'

export const WhyUs: GlobalConfig = {
  slug: 'why-us',
  label: '為什麼選我們',
  admin: { group: '首頁區段', description: '首頁「為什麼選我們」區塊：條列祈聿的三大價值。' },
  access: { read: () => true },
  fields: [
    {
      name: 'introHeading',
      label: '引言標題',
      type: 'textarea',
      defaultValue: '不是一般的家教平台',
      admin: { description: '可用換行分成兩行' },
    },
    {
      name: 'introText',
      label: '引言說明',
      type: 'textarea',
      defaultValue:
        '讀書升學不只是學科，心態、紀律、情緒更是關鍵。每位祈聿老師都通過嚴格篩選，用亦師亦友的方式陪孩子真正成長。',
    },
    {
      name: 'items',
      label: '賣點清單',
      type: 'array',
      labels: { singular: '賣點', plural: '賣點' },
      fields: [
        { name: 'label', label: '左側小標籤', type: 'text', required: true },
        {
          name: 'icon',
          label: '圖示',
          type: 'select',
          options: iconOptions,
          defaultValue: 'certificate',
        },
        { name: 'title', label: '標題', type: 'text', required: true },
        { name: 'description', label: '說明', type: 'textarea', required: true },
      ],
      defaultValue: [
        {
          label: '頂大嚴選師資',
          icon: 'certificate',
          title: '頂大嚴選師資',
          description:
            '所有老師來自台清交等頂尖大學，通過學科測驗、教學面試並完成超過 10 小時的培訓，才能在祈聿上課。',
        },
        {
          label: '每日進度追蹤',
          icon: 'checklist',
          title: '每日進度追蹤',
          description:
            '課後問題隨時可問，老師每日追蹤讀書狀況，不讓問題累積。家長也會定期收到孩子的學習回報。',
        },
        {
          label: '個人化課程',
          icon: 'user-check',
          title: '個人化客製課程',
          description:
            '了解學生弱科與程度後量身訂製課程，搭配錯題本複習，持續從漏洞下手，讓進步穩定發生。',
        },
      ],
    },
  ],
}
