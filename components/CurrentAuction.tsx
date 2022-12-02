import { useEffect, useMemo } from "react"
import { useNounishAuctionQuery } from "hooks/useNounAuction"
import AuctionCountdown from "./AuctionCountdown"

/**
 * TODO: Grab DAO data
 */

export default function CurrentAuction() {
  const { activeAuction } = useNounishAuctionQuery({collectionAddress: '0x010db87cbf1444b9de89c3cf04297317fb484bfa'})
  
  const auctionData = useMemo(() => {
    const data = activeAuction?.nouns?.nounsActiveMarket
    
    console.log(data)

    return {
      duration: data?.duration,
      endTime: data?.endTime,
      highestBidder: data?.highestBidder,
      highestBidPrice: data?.highestBidPrice?.nativePrice?.decimal,
      tokenId: data?.tokenId
    }
  }, [activeAuction])

  return (
    <div className="flex flex-col">
      <div>Public Assembly #{auctionData?.tokenId}</div>
      {auctionData?.endTime && <AuctionCountdown endTime={auctionData.endTime} />}
      <div className="flex flex-col">
        <span>Current Bid:</span>
        <span>{auctionData?.highestBidPrice} ETH</span>
      </div>
    </div>
  )
}