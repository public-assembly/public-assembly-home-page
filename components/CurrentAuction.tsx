import { useEffect, useMemo } from "react"
import { useNounishAuctionQuery } from "hooks/useNounAuction"
import AuctionCountdown from "./AuctionCountdown"
import { TokenThumbnail } from "./TokenThumbnail"
/**
 * TODO: Grab DAO data
 */

const COLLECTION_ADDRESS = '0x010db87cbf1444b9de89c3cf04297317fb484bfa'

export default function CurrentAuction() {
  const { activeAuction } = useNounishAuctionQuery({collectionAddress: COLLECTION_ADDRESS})
  
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {auctionData?.tokenId && <TokenThumbnail tokenId={auctionData.tokenId} collectionAddress={COLLECTION_ADDRESS}/>}
      <div className="flex flex-col justify-end gap-10">
        <a href={`https://nouns.build/dao/${COLLECTION_ADDRESS}`} className="font-bold text-[24px]" target="_blank" rel="noreferrer">Public Assembly #{auctionData?.tokenId}</a>
        <div className="flex flex-row gap-8">
          {auctionData?.endTime && <AuctionCountdown endTime={auctionData.endTime} />}
          <div className="flex flex-col">
            <span>Current Bid:</span>
            <span>{auctionData?.highestBidPrice} ETH</span>
          </div>
        </div>
      </div>
    </div>
  )
}