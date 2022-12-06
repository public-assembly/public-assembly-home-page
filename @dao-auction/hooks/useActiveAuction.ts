import * as React from 'react'
import { useDaoAuctionQuery } from './useDaoAuctionQuery'
import {
  Auction as AuctionInterface,
  Auction__factory as BuilderNounsAuction__factory
} from '@zoralabs/nouns-protocol/dist/typechain'
import { BigNumber as EthersBN, ContractTransaction } from 'ethers'
import { parseUnits } from '@ethersproject/units'
import { useSigner, useEnsName } from "wagmi"

export function useActiveAuction(
  /**
   * Nounish NFT Contract address
   */
  daoAddress: string
) {
  const { activeAuction } = useDaoAuctionQuery({collectionAddress: daoAddress})
  
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

  /**
   * Setup auction interactions
   */
  
  const [createBidSuccess, setCreateBidSuccess] = React.useState(false)
  const [createBidLoading, setCreateBidLoading] = React.useState(false)
  const [createBidError, setCreateBidError] = React.useState(false)
  const [createBidTx, setCreateBidTx] = React.useState<ContractTransaction | undefined>()
  const [isValidBid, setIsValidBid] = React.useState(false)
  
  const [bidAmount, setBidAmount] = React.useState('0')
 
  const { data: signer } = useSigner()
 
  React.useEffect(() => {
    if (auctionData.address && signer) {
      setBuilderNounsAuction(
        BuilderNounsAuction__factory.connect(auctionData.address, signer)
      )
    }
  }, [auctionData.address, signer])

  const [BuilderNounsAuction, setBuilderNounsAuction] = React.useState<AuctionInterface>()

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
          const tx = await BuilderNounsAuction?.createBid(auctionData.tokenId, {
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
    [BuilderNounsAuction, auctionData?.tokenId, bidAmount]
  )

  return {
    updateBidAmount,
    createBid,
    isValidBid,
    createBidSuccess,
    createBidError,
    createBidLoading,
    createBidTx,
    auctionData
  }
}