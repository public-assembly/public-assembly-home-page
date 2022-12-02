import { DropsComponents } from "@public-assembly/erc721-drops-minter"
import { useDropsContractProvider } from "@public-assembly/zora-drops-utils"
import { AuthCheck } from "components/elements"

function MintPropmpt() {
  return (
    <div className="mint-prompt">
      <span>Connect ETH wallet to mint</span>
    </div>
  )
}

export function MintEdition() {
  const { mintStatus } = useDropsContractProvider()
  if (mintStatus?.isEnded) return null
  return (
    <div>
      <AuthCheck
        connectCopy={<MintPropmpt />}
        formUI={
          <>
            <div className="flex flex-row gap-2">
              <DropsComponents.MintButton className="w-auto" />
              <DropsComponents.TotalPrice label={false} />    
            </div>
            <DropsComponents.TxStatus />
          </>
        }
      />
    </div>
  )
}