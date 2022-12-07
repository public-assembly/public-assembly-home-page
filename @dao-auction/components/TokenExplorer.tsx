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
  
  return (
    <div {...props}>
      {totalSupply}
    </div>
  )
}
