import { DropsComponents } from "@public-assembly/erc721-drops-minter"
import { useDropsContractProvider } from "@public-assembly/zora-drops-utils"
import { AuthCheck } from "components/elements"

export function MintEdition() {
  const { mintStatus } = useDropsContractProvider()
  if (mintStatus?.isEnded) return null
  return (
    <div>
      <AuthCheck
        formUI={<DropsComponents.MintButton className="w-auto" />}
      />
    </div>
  )
}