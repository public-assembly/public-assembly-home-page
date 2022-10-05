import type { NextPage } from 'next'
import { Hero, Seo, EditionsDisplay } from 'components'

const Home: NextPage = () => {
  return (
    <>
      <Seo/>
      <Hero />
      <EditionsDisplay />
    </>
  )
}

export default Home
