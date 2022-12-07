import React from "react"
import AuctionCountdown from "./AuctionCountdown"
import { TokenThumbnail } from "./TokenThumbnail"
import { AuthCheck } from "../../components/elements"
import { useActiveAuction } from "../hooks/useActiveAuction"

/**
 * TODO:
 * - render bid success txHash
 * - break ui out into atomic components
 */

export interface CurrentAuctionProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Nounish NFT Contract address
   */
  daoAddress: string
}

export default function CurrentAuction({daoAddress, ...props}: CurrentAuctionProps) {
  const {
    auctionData,
    createBid,
    updateBidAmount,
    createBidSuccess,
    createBidLoading,
    isValidBid
  } = useActiveAuction(daoAddress)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1440px]" {...props}>
      {auctionData?.tokenId && <TokenThumbnail tokenId={auctionData.tokenId} collectionAddress={daoAddress}/>}
      <div className="flex flex-col justify-end gap-4">
        <a href={`https://nouns.build/dao/${daoAddress}`} target="_blank" rel="noreferrer" className="font-bold text-[24px] hover:underline flex flex-row items-center gap-2">
          <span>
            Public Assembly #{auctionData?.tokenId}
          </span>
          <div className="w-[20px] h-[20px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.3227 16.0689V8.45115H16.7475V17.5H2.5V3.19018H11.5094V4.62119H3.92484V16.0689L15.3227 16.0689ZM15.0678 3.93101H13.1751V2.5H17.5V6.84382H16.0752V4.94291L9.44042 11.6067L8.43305 10.5948L15.0678 3.93101Z" fill="black"/>
            </svg>
          </div>
        </a>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col">
              <span>Current Bid:</span>
              <span>{auctionData?.highestBidPrice} ETH</span>
            </div>
            {auctionData?.endTime && <AuctionCountdown endTime={Number(auctionData.endTime)} />}
          </div>
          <span>
            Bidder: {auctionData?.highestBidderENS}
          </span>
        </div>
        <AuthCheck
          connectCopy={'Connect to bid'}
          formUI={
            <div>
              <form onSubmit={createBid} className="flex flex-row gap-4">
                <input
                  className="form-input px-[10px] py-[5px]"
                  type="text"
                  pattern="[0-9.]*"
                  placeholder={`${auctionData?.minBidAmount} ETH`}
                  onChange={(event: any) => updateBidAmount(event.target.value)}
                />
                {!createBidLoading && !createBidSuccess
                  ? <button className={`underline ${!isValidBid && 'pointer-events-none opacity-20'}`}>Place Bid</button>
                  : <>
                      {createBidLoading && <span>Submitting bid</span>}
                      {createBidSuccess && <a href={`https://nouns.build/dao/${daoAddress}`} target="_blank" rel="noreferrer">Bid placed: view on nouns.build</a>}
                    </>
                }
              </form>
            </div>
          }
        />
      </div>
    </div>
  )
}