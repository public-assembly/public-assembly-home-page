export type ExternalLink = {
  title: string,
  url: string,
}

export function ExternalLinkList({links}: {links: ExternalLink[]} ) {
  return (
    <div className="flex flex-col gap-2">
      {links.map((link) =>
        <a href={link.url} key={link.url} target="_blank" rel="noreferrer">{link.title}</a>
      )}
    </div>
  )
}