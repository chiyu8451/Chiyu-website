import type { GlobalConfig } from 'payload'
import { iconOptions } from '../fields/iconOptions'

export const TeacherScreening: GlobalConfig = {
  slug: 'teacher-screening',
  label: '師資篩選',
  admin: { group: '首頁區段' },
  access: { read: () => true },
  fields: [
    {
      name: 'heading',
      label: '標題',
      type: 'textarea',
      defaultValue: '不是來者不拒的媒合平台',
      admin: { description: '可用換行分成兩行' },
    },
    {
      name: 'intro',
      label: '說明',
      type: 'textarea',
      defaultValue:
        '每位老師都通過學科測驗、教學面試，再完成超過 10 小時的培訓才能上線。新銳老師更由金牌老師督導，確保教學品質。',
    },
    {
      name: 'steps',
      label: '篩選步驟',
      type: 'array',
      labels: { singular: '步驟', plural: '步驟' },
      fields: [
        {
          name: 'icon',
          label: '圖示',
          type: 'select',
          options: iconOptions,
          defaultValue: 'file-check',
        },
        { name: 'title', label: '標題', type: 'text', required: true },
        { name: 'description', label: '說明', type: 'textarea', required: true },
      ],
      defaultValue: [
        {
          icon: 'clipboard-check',
          title: '學科測驗',
          description: '通過各科專業知識測驗，確認學科程度紮實，不只是名校學歷，更要真的會教。',
        },
        {
          icon: 'microphone',
          title: '教學面試',
          description: '模擬試教與情境問答，評估教學表達與引導學生的能力，亦師亦友才是我們要的風格。',
        },
        {
          icon: 'school',
          title: '師資培訓',
          description: '完成祈聿教師培訓內容，學習帶學生培養紀律、建立成長心態，不只解題更教思考。',
        },
        {
          icon: 'eye',
          title: '持續督導',
          description: '課後持續追蹤教學成效，新銳老師由金牌老師共同督導，確保每個孩子的學習方向正確。',
        },
      ],
    },
  ],
}
