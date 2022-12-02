import useSWR from 'swr'
import { NounishAuctionsQuery } from 'types/zora.api.generated'
import { NOUNISH_AUCTIONS_QUERY } from 'data/nounishAuctions'
import { zoraApiFetcher } from 'utils/zoraApiFetcher'

/**
 * Using some queries / config from the noun.market codebase:
 * https://github.com/ourzora/nouns-marketplace
 * Improvements made by 
 */

export function useNounishAuctionQuery({
  collectionAddress,
}: {
  collectionAddress: string
}) {
  const { data: activeAuction, error } = useSWR<NounishAuctionsQuery>(
    `nounish-auction-${collectionAddress}`,
    async () =>
      zoraApiFetcher(NOUNISH_AUCTIONS_QUERY, {
        collectionAddress,
      }),
    {
      refreshInterval: 3000,
    }
  )

  return {
    activeAuction,
    error,
  }
}
