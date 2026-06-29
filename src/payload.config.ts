import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'
import { Hero } from './globals/Hero'
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
const db = process.env.DATABASE_URI
  ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } })
  : sqliteAdapter({ client: { url: `file:${path.resolve(dirname, '../qiyu.db')}` } })

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — 祈聿教育後台',
    },
  },
  collections: [Users, Media],
  globals: [SiteSettings, Hero, WhyUs, Process, Courses, TeacherScreening, Faq, Cta],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  sharp,
})
