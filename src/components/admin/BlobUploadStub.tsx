'use client'

import React from 'react'

// 替身元件，解決 @payloadcms/storage-vercel-blob@3.85.1 的打包 bug。
//
// 該套件的 client 上傳元件（VercelBlobClientUploadHandler）會連帶 import 到伺服器端程式碼
// （undici → node:console、pino → worker_threads），一旦被列進 admin importMap，
// Next.js 前端打包就會失敗（dev 與 production build 皆然）。
//
// 本專案未啟用 client 直傳（clientUploads 關閉，上傳走伺服器端後再存進 Vercel Blob），
// 因此這個 handler 實際上只需要「把子元件原樣渲染出來」即可。這裡提供一個不含任何
// 伺服器相依的同名替身，讓後台正常載入、打包通過，圖片仍永久保存於 Blob。
export const VercelBlobClientUploadHandler = (props: { children?: React.ReactNode }) => {
  return <>{props?.children ?? null}</>
}
