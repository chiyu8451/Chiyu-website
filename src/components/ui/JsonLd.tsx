// Safe JSON-LD injector — escapes </script> to prevent script-injection from user content.
// Next.js requires dangerouslySetInnerHTML for <script type="application/ld+json">;
// the replace below is the only mitigation needed per Google's own guidance.
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/<\/script>/gi, '<\\/script>')
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
