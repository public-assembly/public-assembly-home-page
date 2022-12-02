import { useNounishAuctionQuery } from "hooks/useNounAuction"

export default function CurrentAuction() {
  const { activeAuction } = useNounishAuctionQuery({collectionAddress: '0x010db87cbf1444b9de89c3cf04297317fb484bfa'})
  
  return (
    <div>{JSON.stringify(activeAuction, null, 2)}</div>
  )
}