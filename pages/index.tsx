import type { NextPage } from 'next'
import { Seo } from 'components'
import dynamic from 'next/dynamic'

const CurrentAuction = dynamic(() => import('./../components/CurrentAuction'), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <>
      <Seo/>
      {/*<Hero />*/}
      <CurrentAuction />
    </>
  )
}

export default Home
