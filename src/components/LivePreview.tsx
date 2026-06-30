'use client'
import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

// 放在前端 layout，平常不做任何事；只有在後台「即時預覽」的 iframe 內，
// 偵測到內容存檔時，會重新整理路由，讓預覽顯示最新內容。
export default function LivePreview() {
  const router = useRouter()
  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
    />
  )
}
