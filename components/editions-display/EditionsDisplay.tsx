// @ts-nocheck
import { DropsContractProvider } from "@public-assembly/zora-drops-utils"
import { DropsComponents } from "@public-assembly/erc721-drops-minter"
import { VideoPlayer } from "./VideoPlayer"
import { MintEdition } from "./MintEdition"
import { useCurationFunctions } from "@public-assembly/curation-interactions"
import { useMemo } from "react"

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
    <section id="editions" className='flex flex-col border-t-[1px] border-black gap-12 py-6 pb-20'>
      {finalListings.map((address) =>
        <DropsContractProvider collectionAddress={address} key={address}>
          <div className="grid md:grid-cols-2 gap-3 md:gap-6">
            <VideoPlayer />
            <div className="flex flex-col">
              <div className="flex flex-col">
                <DropsComponents.MetadataName label={false} />
                <DropsComponents.MetadataDescription label={false} />
                <DropsComponents.EtherscanLink className="text-underline mr-auto" label='Edition:' truncateAddress />
              </div>
              <MintEdition />
            </div>
          </div>
        </DropsContractProvider>
      )}
    </section>
  )
}