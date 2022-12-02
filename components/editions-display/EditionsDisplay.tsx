// @ts-nocheck
import { DropsContractProvider } from "@public-assembly/zora-drops-utils"
import { DropsComponents } from "@public-assembly/erc721-drops-minter"
import { VideoPlayer } from "./VideoPlayer"
import { MintEdition } from "./MintEdition"
import { useCurationFunctions } from "@public-assembly/curation-interactions"
import { useMemo } from "react"
// import {CurationContractPlug} from 

export default function EditionsDisplay({curationContractAddress}: string) {

  const { getListingsReturn: siteData } = useCurationFunctions({
    curationContractAddress
  })

  console.log("siteData: ", siteData);

  const cleanListings = () => {
    let arrayOfCollections = []
    
    siteData.map((collection => {
      const collectionAddress = collection[0]
      arrayOfCollections.push(collectionAddress)
    }))
    const finalArray = [...arrayOfCollections].reverse()
    return finalArray
  }

  const finalListings = useMemo(
    () => (siteData ? cleanListings() : []),
    [siteData]
  )

  return (
    <section id="editions" className='flex flex-col border-black gap-12 py-6 pb-20'>
      {finalListings.map((address) =>
        <DropsContractProvider collectionAddress={address} key={address}>
          <div className="grid md:grid-cols-2 gap-3 md:gap-6">
            <VideoPlayer />
            <div className="flex flex-col">
              <div className="flex flex-col text-[14px]">
                <DropsComponents.MetadataName label={false} />
                <DropsComponents.MetadataDescription label={false} />
                <DropsComponents.EtherscanLink className="text-underline mr-auto" label='Edition:' truncateAddress />
                <div className="mt-4 w-full">
                  {"*media rendering live from "}
                  <a
                  href="https://etherscan.io/address/0xbc8db622af59f115cc228dff44d6b17478470ae2"
                  className="hover:cursor-pointer underline text-[#0029FF]"
                  >
                  {"0xbc...0ae2"}
                  </a>
                </div>                
              </div>
              <MintEdition />
            </div>
          </div>
        </DropsContractProvider>
      )}
    </section>
  )
}