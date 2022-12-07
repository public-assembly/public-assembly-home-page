import type { NextPage } from 'next'
import { Seo } from 'components'
import dynamic from 'next/dynamic'

const CurrentAuction = dynamic(() => import('../@dao-auction/components/CurrentAuction'), {
  ssr: false,
})

const TokenExplorer = dynamic(() => import('../@dao-auction/components/TokenExplorer'), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <>
      <Seo/>
      <section id="current-auction" className="pb-6">
        <TokenExplorer daoAddress='0xd2E7684Cf3E2511cc3B4538bB2885Dc206583076'/>
      </section>
    </>
  )
}

export default Home
