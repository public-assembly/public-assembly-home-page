import * as React from 'react'
import { useDaoAuctionQuery } from './useDaoAuctionQuery'
import {
  Auction as AuctionInterface,
  Auction__factory as BuilderNounsAuction__factory,
  Token as TokenInterface,
} from '@zoralabs/nouns-protocol/dist/typechain'
import { BigNumber as EthersBN, ContractTransaction } from 'ethers'
import { parseUnits } from '@ethersproject/units'
import { useEnsName } from "wagmi"
import { useNounsProtocol } from './useNounsProtocol'

export function useActiveAuction(
  /**
   * Nounish NFT Contract address
   */
  daoAddress: string
) {
  const { activeAuction } = useDaoAuctionQuery({ collectionAddress: daoAddress })
  
  const { data: ensName } = useEnsName({
    address: activeAuction?.nouns?.nounsActiveMarket?.highestBidder as string | undefined,
  })

  const auctionData = React.useMemo(() => {
    const data = activeAuction?.nouns?.nounsActiveMarket

    const minBidAmount = () => {
      if (data?.highestBidPrice?.chainTokenPrice?.decimal && data?.minBidIncrementPercentage) {
        const minBidValue =
          ((data.highestBidPrice.chainTokenPrice.decimal * (data.minBidIncrementPercentage / 100))
            + data.highestBidPrice.chainTokenPrice.decimal)
        return minBidValue
      } else {
        /* @ts-ignore */
        return data?.reservePrice?.chainTokenPrice?.decimal as number
      }
    }

    return {
      tokenId: data?.tokenId,
      address: data?.address,
      metadata: data?.metadata,
      duration: data?.duration,
      endTime: data?.endTime,
      highestBidder: data?.highestBidder,
      highestBidderENS: ensName || data?.highestBidder,
      highestBidPrice: data?.highestBidPrice?.chainTokenPrice?.decimal,
      highestBidPriceRaw: data?.highestBidPrice?.chainTokenPrice?.raw,
      minBidIncrement: data?.minBidIncrementPercentage,
      minBidAmount: minBidAmount(),
      /* @ts-ignore */
      reservePrice: data?.reservePrice?.chainTokenPrice?.raw,
    }
  }, [
    activeAuction,
    activeAuction?.nouns?.nounsActiveMarket?.highestBidPrice?.chainTokenPrice?.decimal
  ])

  const { BuilderAuction, BuilderToken} = useNounsProtocol({
    daoAddress: daoAddress,
    auctionAddress: auctionData?.address,
    metadataRendererAddress: auctionData?.metadata
  })
  
  const [totalSupply, setTotalSupply] = React.useState<number | undefined>()

  React.useEffect(() => {
    async function getSupply() {
      try {
        const supply = await BuilderToken?.totalSupply()
        setTotalSupply(supply?.toNumber())
      } catch (err) {
        console.error(err)
      }
    }
    getSupply()
  }, [BuilderToken, auctionData?.tokenId])

  const [createBidSuccess, setCreateBidSuccess] = React.useState(false)
  const [createBidLoading, setCreateBidLoading] = React.useState(false)
  const [createBidError, setCreateBidError] = React.useState(false)
  const [createBidTx, setCreateBidTx] = React.useState<ContractTransaction | undefined>()
  const [isValidBid, setIsValidBid] = React.useState(false)
  
  const [bidAmount, setBidAmount] = React.useState('0')
 
  const updateBidAmount = React.useCallback(
    (value: string) => {
      let newValue: EthersBN
      try {
        newValue = parseUnits(value, 18)
        if (+value >= auctionData?.minBidAmount) {
          setIsValidBid(true)
        } else {
          setIsValidBid(false)
        }
        const bidString = newValue.toString()
        setBidAmount(bidString)
      } catch (e) {
        console.error(e)
        return
      }
    },
    [setBidAmount, auctionData?.minBidAmount]
  )

  const createBid = React.useCallback(
    async (event: any) => {
      event.preventDefault()
      if (auctionData?.tokenId) {
        setCreateBidLoading(true)
        try {
          const tx = await BuilderAuction?.createBid(auctionData.tokenId, {
            value: bidAmount,
          })
          setCreateBidTx(tx)
          setCreateBidSuccess(true)
        } catch (err: any) {
          setCreateBidError(err)
          console.error(err)
        } finally {
          setCreateBidLoading(false)
        }
      }
    },
    [BuilderAuction, auctionData?.tokenId, bidAmount]
  )

  return {
    updateBidAmount,
    createBid,
    isValidBid,
    createBidSuccess,
    createBidError,
    createBidLoading,
    createBidTx,
    auctionData,
    totalSupply,
  }
}