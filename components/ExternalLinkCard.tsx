export type ExternalCard = {
    title: string,
    url: string,
    description: string
  }
  
  export function ExternalLinkCard(
    {links, gapSpacing}: {links: ExternalCard[], gapSpacing: number}
  ) {
  
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-x-[16px] sm:gap-x-[16px] gap-y-[16px]  text-[14px] w-fit `}>
        {links.map((link) =>         
          <a className="border-black border-opacity-[25%] border-2 w-[150px] p-1 w-fit hover:bg-black hover:text-white" href={link.url} key={link.url} target="_blank" rel="noreferrer">
            <div className="underline">
              {link.title}
            </div>
            <div className="text-[10px]">
              {link.description}
            </div>
          </a>        
        )}
      </div>
    )
  }