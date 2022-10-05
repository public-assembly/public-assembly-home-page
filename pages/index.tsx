import type { NextPage } from 'next'
import { Hero, Seo } from 'components'

const Home: NextPage = () => {
  return (
    <>
      <Seo/>
      <Hero />
    </>
  )
}

export default Home
