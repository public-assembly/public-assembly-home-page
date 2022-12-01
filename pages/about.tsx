// @ts-nocheck
import dynamic from 'next/dynamic'
import type { NextPage } from 'next'
import { Seo, CurationContractPlug } from 'components'

const EditionsDisplay = dynamic(() => import('./../components/editions-display/EditionsDisplay'), {
  ssr: false,
})


const CURATION_CONTRACT: string = "0xbc8db622af59f115cc228dff44d6b17478470ae2"

const About: NextPage = () => {
  return (
    <>
      <Seo title="about"/>
      <EditionsDisplay curationContractAddress={CURATION_CONTRACT} />
      <CurationContractPlug />
    </>
  )
}

export default About
