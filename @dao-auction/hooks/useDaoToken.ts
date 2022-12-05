import useSWR from 'swr'
import { DAO_TOKEN_QUERY } from '../data/daoTokenQuery'
import { zoraApiFetcher } from '@dao-auction/lib/zoraApiFetcher'

export function useDaoToken({
  collectionAddress,
  tokenId,
}: {
  collectionAddress: string
  tokenId: string
}) {
  const { data: tokenData, error } = useSWR<any>(
    `token-metadata-${collectionAddress}-${tokenId}`,
      async () =>
      zoraApiFetcher(DAO_TOKEN_QUERY, {
        collectionAddress,
        tokenId,
      }),
    {
      refreshInterval: 5000,
    }
  )

  return {
    tokenData,
    error,
  }
}
