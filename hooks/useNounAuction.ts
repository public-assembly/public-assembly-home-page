import useSWR from 'swr'
import { NounishAuctionsQuery } from 'types/zora.api.generated'
import { NOUNISH_AUCTIONS_QUERY } from 'data/nounishAuctions'
import { zoraApiFetcher } from 'utils/zoraApiFetcher'
import React from 'react'

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
    `pa-auction`,
    async () =>
      zoraApiFetcher(NOUNISH_AUCTIONS_QUERY, {
        collectionAddress,
      }),
  )

  React.useEffect(() => {
    console.log('activeAuction', activeAuction)
  }, [activeAuction])

  return {
    activeAuction,
    error,
  }
}
