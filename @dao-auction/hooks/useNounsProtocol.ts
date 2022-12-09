import * as React from 'react'
import { useSigner, useProvider } from "wagmi"
import { ethers } from 'ethers'
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
  const provider = useProvider()

  React.useEffect(() => {
    if (metadataRendererAddress) {
      setBuilderTokenMetadata(
        MetadataRenderer__factory.connect(metadataRendererAddress, signer || provider)
      )
    }
    if (daoAddress) {
      setBuilderToken(
        Token__factory.connect(daoAddress, signer || provider)
      )
    }
    if (auctionAddress) {
      setBuilderAuction(
        Auction__factory.connect(auctionAddress, signer || provider)
      )
    }
  }, [auctionAddress, daoAddress, signer])

  React.useEffect(() => {console.log(BuilderAuction?.callStatic.auction())}, [BuilderAuction])

  return {
    BuilderAuction,
    BuilderToken,
    BuilderTokenMetadata,
  }
}