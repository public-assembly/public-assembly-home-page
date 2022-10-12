// @ts-nocheck
import type { NextPage } from 'next'
import { Hero, Seo, EditionsDisplay } from 'components'

const CURATION_CONTRACT: string = "0xbc8db622af59f115cc228dff44d6b17478470ae2"

const Home: NextPage = () => {
  return (
    <>
      <Seo/>
      <Hero />
      <EditionsDisplay curationContractAddress={CURATION_CONTRACT} />
    </>
  )
}

export default Home
