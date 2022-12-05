export type ExternalLink = {
  title: string,
  url: string,
}

export function ExternalLinkList(
  {links, gapSpacing}: {links: ExternalLink[], gapSpacing: number}
) {

  return (
    <div className={`mb-8 flex flex-col gap-[${gapSpacing}px] text-[16px]`}>
      {links.map((link) =>
        <a className="hover:font-bold underline w-fit" href={link.url} key={link.url} target="_blank" rel="noreferrer">{link.title}</a>
      )}
    </div>
  )
}