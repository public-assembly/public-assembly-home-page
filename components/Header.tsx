import dynamic from 'next/dynamic'
import { Navigation } from './Navigation'

const DisconnectButton = dynamic(() => import('./elements/DisconnectButton'), {
  ssr: false,
})

export function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full px-6">
      <Navigation />
      <DisconnectButton />
    </header>
  )
}
