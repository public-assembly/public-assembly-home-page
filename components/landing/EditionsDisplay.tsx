import { DropsContractProvider } from "@public-assembly/zora-drops-utils"
import { DropsComponents } from "@public-assembly/erc721-drops-minter"
import { VideoPlayer } from "./VideoPlayer"
import { MintEdition } from "./MintEdition"

const EDITIONS = [
  '0x1abb112117822d395c2b147679a9a93273a39255',
  '0x2c3f108328581c0b490b222b75d474de38b355f9',
  '0x454bc9e2f870939913626fb8fbea439782e16238',
]

export function EditionsDisplay() {
  return (
    <section id="editions" className='flex flex-col border-t-[1px] border-black gap-12 py-6 pb-20'>
      {EDITIONS.map((address) =>
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