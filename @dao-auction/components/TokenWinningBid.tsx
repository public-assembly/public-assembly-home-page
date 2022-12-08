import React from 'react'
import { useDaoToken } from "@dao-auction/hooks/useDaoToken"
import { useNounsProtocol } from '@dao-auction/hooks/useNounsProtocol'
import { useActiveAuction } from '@dao-auction/hooks/useActiveAuction'
import { ethers } from 'ethers'

export default function TokenWinningBid({
  tokenId,
  daoAddress,
}: {
  daoAddress: string
  tokenId: string
  }) {
  const {
    auctionData
  } = useActiveAuction(daoAddress)
  
  const { tokenData } = useDaoToken({
    daoAddress: daoAddress,
    tokenId: tokenId,
  })
  
  const {
    BuilderAuction
  } = useNounsProtocol({daoAddress: daoAddress, auctionAddress: auctionData?.address})

  const [winningBid, setWinningBid] = React.useState<string | undefined>('N/A')

  React.useEffect(() => {
    async function getBids() {
      try {
        if(tokenData?.mintInfo?.mintContext?.blockNumber) {
          /** 
           * https://docs.ethers.io/v5/api/contract/contract/#Contract-queryFilter
           * Used to query the Auction events exposed below:
           * https://github.com/ourzora/nouns-protocol/blob/main/src/auction/IAuction.sol#L16-L22
           */
          const bids = await BuilderAuction?.queryFilter(
            'AuctionBid' as any,
            tokenData?.mintInfo?.mintContext?.blockNumber,
            'latest'
          )
          if (bids) {
            const auctionEventsArray = bids.map((event) => {
              return {
                id: parseInt(event.args?.tokenId?._hex, 16),
                bidder: event.args?.bidder,
                amount: ethers.utils.formatEther(event.args?.amount),
                transactionHash: event.transactionHash,
              }
            })
            
            const tokenEvents = auctionEventsArray?.filter(token => token?.id === Number(tokenId))

            if (tokenEvents?.length) {
              const lastTokenEvent = tokenEvents.at(-1)
              setWinningBid(`${lastTokenEvent?.amount} ETH`)
            } else {
              setWinningBid('N/A')
            }
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
    getBids()
    
    return function cleanup() {
      console.log('unmount')
    }
  }, [BuilderAuction, tokenId, tokenData])
  
  return (
    <a
      href={`https://etherscan.io/`}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col leading-5"
    >
      <span className="opacity-50">Winning bid:</span>
      <span className="hover:underline">
        {winningBid}
      </span>
    </a>
  )
}