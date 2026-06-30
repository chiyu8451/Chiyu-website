import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Teachers } from './collections/Teachers'
import { Testimonials } from './collections/Testimonials'
import { Posts } from './collections/Posts'
import { Resources } from './collections/Resources'
import { SiteSettings } from './globals/SiteSettings'
import { Hero } from './globals/Hero'
import { Manifesto } from './globals/Manifesto'
import { WhyUs } from './globals/WhyUs'
import { Process } from './globals/Process'
import { Courses } from './globals/Courses'
import { TeacherScreening } from './globals/TeacherScreening'
import { Faq } from './globals/Faq'
import { Cta } from './globals/Cta'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// 有設 DATABASE_URI（Postgres）就用 Postgres，否則用本機 SQLite 檔。
// 本機開發：不用設任何東西，直接 npm run dev 就會建立 qiyu.db。
// 正式上線：在環境變數設 DATABASE_URI 指向 Supabase。
// push:true → 第一次部署時自動依程式建立資料表，不需手動跑 migration（小型專案最省事）。
const db = process.env.DATABASE_URI
  ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI }, push: true })
  : sqliteAdapter({ client: { url: `file:${path.resolve(dirname, '../qiyu.db')}` } })

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    // 自訂後台元件的路徑以 src 為基準（否則 importMap 會誤指到專案根目錄）。
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' — 祈聿教育後台',
    },
    // Dashboard 最上方的歡迎／操作指南，幫非技術同仁快速上手。
    components: {
      beforeDashboard: ['/components/admin/Welcome#default'],
    },
    // 即時預覽：在後台編輯任何區段／文章／老師時，右側直接看到對應的前端畫面，
    // 存檔後預覽自動刷新。讓非技術同仁所見即所得。
    livePreview: {
      breakpoints: [
        { label: '手機', name: 'mobile', width: 390, height: 844 },
        { label: '平板', name: 'tablet', width: 768, height: 1024 },
        { label: '桌機', name: 'desktop', width: 1440, height: 900 },
      ],
      url: ({ data, collectionConfig, globalConfig }) => {
        if (collectionConfig?.slug === 'posts') return `${serverUrl}/blog/${data?.slug ?? ''}`
        if (collectionConfig?.slug === 'teachers') return `${serverUrl}/teachers/${data?.slug ?? ''}`
        // 其餘（首頁各區段 globals、家長評語）都呈現在首頁
        return `${serverUrl}/`
      },
      collections: ['posts', 'teachers', 'testimonials'],
      globals: ['hero', 'manifesto', 'why-us', 'process', 'courses', 'teacher-screening', 'faq', 'cta', 'site-settings'],
    },
  },
  collections: [Users, Media, Teachers, Testimonials, Posts, Resources],
  globals: [SiteSettings, Hero, Manifesto, WhyUs, Process, Courses, TeacherScreening, Faq, Cta],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  sharp,
  // 圖片儲存：有設 BLOB_READ_WRITE_TOKEN（正式上線）就把圖片存到 Vercel Blob 雲端，
  // 永久保存、不會因為重新部署而消失。本機開發沒設 token → 自動關閉、用本機資料夾即可。
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
