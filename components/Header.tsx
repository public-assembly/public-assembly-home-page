import { Socials } from "./Socials"

export function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full px-6">
      <div className="flex flex-row items-center gap-8">
        <span className="font-bold">{process.env.NEXT_PUBLIC_SITE_TITLE}</span>
        <Socials />
      </div>
    </header>
  )
}
