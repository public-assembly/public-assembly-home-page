import React from 'react'
import { useActiveAuction } from "../hooks/useActiveAuction"

export interface TokenExplorerProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Nounish NFT Contract address
   */
  daoAddress: string
}

export default function TokenPagination({daoAddress, ...props}: TokenExplorerProps) {
  const { totalSupply } = useActiveAuction(daoAddress)
  
  const [tokenId, setTokenId] = React.useState(0)

  React.useEffect(() => {
    totalSupply && setTokenId(totalSupply - 1)
  }, [totalSupply])

  const incrementId = React.useCallback(() => {
    if (totalSupply && tokenId < totalSupply - 1) {
      setTokenId(tokenId + 1)
    }
  }, [setTokenId, tokenId])

  const decrementId = React.useCallback(() => {
    if (totalSupply && tokenId > 0) {
      setTokenId(tokenId - 1)
    }
  }, [setTokenId, tokenId])

  if (!totalSupply) return null

  return (
    <div {...props}>
      <button onClick={decrementId}>-</button>
      {tokenId}
      <button onClick={incrementId}>+</button>
    </div>
  )
}
