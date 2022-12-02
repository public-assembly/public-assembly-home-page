// @ts-nocheck
import dynamic from 'next/dynamic'
import type { NextPage } from 'next'
import { Seo, CurationContractPlug } from 'components'

const EditionsDisplay = dynamic(() => import('./../components/editions-display/EditionsDisplay'), {
  ssr: false,
})

const CURATION_CONTRACT: string = "0xbC8DB622af59F115CC228dfF44d6b17478470AE2";

const Archive: NextPage = () => {
  return (
    <>
      <Seo title="library"/>      
      {/* <CurationContractPlug curationContractAddress/> */}
      <EditionsDisplay curationContractAddress={CURATION_CONTRACT}  />      
    </>
  )
}

export default Archive
