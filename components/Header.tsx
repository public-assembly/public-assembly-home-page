import dynamic from 'next/dynamic'
import { Navigation } from './Navigation'

const DisconnectButton = dynamic(() => import('./elements/DisconnectButton'), {
  ssr: false,
})

export function Header() {
  return (
    <header className="flex flex-col justify-center md:flex-row md:justify-between md:items-center w-full px-6 gap-2">
      <Navigation />
      <div className="relative">
        <DisconnectButton />
      </div>
    </header>
  )
}
