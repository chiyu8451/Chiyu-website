import React from 'react'

// 後台首頁的歡迎／操作指南，顯示在 Dashboard 最上方（beforeDashboard）。
// 目的：讓非技術同仁一登入就知道怎麼操作，降低上手門檻。
export default function Welcome() {
  return (
    <div className="qiyu-welcome">
      <h2 className="qiyu-welcome__title">歡迎來到祈聿教育後台 👋</h2>
      <p className="qiyu-welcome__lead">
        這裡可以改官網的所有文字與圖片，不需要工程師。改完按「儲存」就會更新到網站。
      </p>

      <div className="qiyu-welcome__steps">
        <div className="qiyu-welcome__step">
          <span className="qiyu-welcome__num">1</span>
          <div>
            <strong>從左側選單挑要改的區塊</strong>
            <p>「首頁區段」是首頁每一段；「師資」放老師與評語；「內容」放文章。</p>
          </div>
        </div>
        <div className="qiyu-welcome__step">
          <span className="qiyu-welcome__num">2</span>
          <div>
            <strong>右側「即時預覽」邊改邊看</strong>
            <p>編輯畫面右上角可切換「Live Preview」，存檔後預覽會自動更新，所見即所得。</p>
          </div>
        </div>
        <div className="qiyu-welcome__step">
          <span className="qiyu-welcome__num">3</span>
          <div>
            <strong>上傳真實照片</strong>
            <p>到「圖片庫（Media）」上傳老師、上課的照片，再到對應區塊選用，就會取代佔位圖。</p>
          </div>
        </div>
      </div>

      <div className="qiyu-welcome__links">
        <a href="/" target="_blank" rel="noopener noreferrer">↗ 開啟官網首頁</a>
        <a href="/admin/globals/hero">編輯首屏 Hero</a>
        <a href="/admin/collections/teachers/create">新增老師</a>
        <a href="/admin/collections/posts/create">新增文章</a>
        <a href="/admin/globals/site-settings">填 Google 表單 / LINE 連結</a>
      </div>
    </div>
  )
}
