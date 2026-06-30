// 全站共用的導覽列項目。所有頁面都用這一份，確保導覽列在任何頁面都一致。
// 「為什麼選我們」用 /#why（而非 #why），這樣在子頁面點也能正確跳回首頁的該區段，
// 不會出現「導覽列項目在不同頁面變成不同東西」的怪異感。Logo 本身即是回首頁的入口。
export const NAV_LINKS = [
  { label: '為什麼選我們', anchor: '/#why' },
  { label: '師資陣容', anchor: '/teachers' },
  { label: '文章', anchor: '/blog' },
  { label: 'FAQ', anchor: '/faq' },
]
