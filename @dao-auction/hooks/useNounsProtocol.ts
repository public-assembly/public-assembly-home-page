import * as React from 'react'
import { useSigner } from "wagmi"

import {
  Auction as AuctionInterface,
  Auction__factory,
  Token as TokenInterface,
  Token__factory,
  MetadataRenderer as MetadataRendererInterface,
  MetadataRenderer__factory
} from '@zoralabs/nouns-protocol/dist/typechain'

export type NounsProtocolAddresses = {
  /**
   * Pass in the dao contract auction address if you want to interact with the auction
  */
  auctionAddress?: string,
  /**
  * Pass in the dao contract token address
  */
  daoAddress?: string,
  /**
  * Pass in the dao contract token address
  */
  metadataRendererAddress?: string
}

export function useNounsProtocol({
  auctionAddress,
  daoAddress,
  metadataRendererAddress
}: NounsProtocolAddresses) {
  const [BuilderAuction, setBuilderAuction] = React.useState<AuctionInterface>()
  const [BuilderToken, setBuilderToken] = React.useState<TokenInterface>()
  const [BuilderTokenMetadata, setBuilderTokenMetadata] = React.useState<MetadataRendererInterface>()

  const { data: signer } = useSigner()

  React.useEffect(() => {
    if (metadataRendererAddress && signer) {
      setBuilderTokenMetadata(
        MetadataRenderer__factory.connect(metadataRendererAddress, signer)
      )
    }
    if (daoAddress && signer) {
      setBuilderToken(
        Token__factory.connect(daoAddress, signer)
      )
    }
    if (auctionAddress && signer) {
      setBuilderAuction(
        Auction__factory.connect(auctionAddress, signer)
      )
    }
  }, [auctionAddress, daoAddress, signer])

  return {
    BuilderAuction,
    BuilderToken,
    BuilderTokenMetadata,
  }
}