import useSWR from 'swr'
import { TOKEN_METADATA_QUERY } from 'data/nounishAuctions'
import { zoraApiFetcher } from 'utils/zoraApiFetcher'

export function useToken({
  collectionAddress,
  tokenId,
}: {
  collectionAddress: string
  tokenId: string
}) {
  const { data: tokenData, error } = useSWR<any>(
    `token-metadata-${collectionAddress}-${tokenId}`,
      async () =>
      zoraApiFetcher(TOKEN_METADATA_QUERY, {
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
