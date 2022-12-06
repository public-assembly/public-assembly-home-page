export type ExternalLink = {
  title: string,
  url: string,
}

export function ExternalLinkList({links}: {links: ExternalLink[]}) {
  return (
    <div className={`mb-8 flex flex-col gap-[4px] text-[16px] w-full`}>
      {links.map((link) =>
        <a className="hover:font-bold underline w-fit" href={link.url} key={link.url} target="_blank" rel="noreferrer">{link.title}</a>
      )}
    </div>
  )
}