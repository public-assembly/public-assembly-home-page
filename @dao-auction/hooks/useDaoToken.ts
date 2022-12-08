import useSWR from 'swr'
import { DAO_TOKEN_QUERY } from '../data/daoTokenQuery'
import { zoraApiFetcher } from '@dao-auction/lib/zoraApiFetcher'

export type TokenData = {
  lastRefreshTime: string;
  /**
   * ETH Wallet address of token holder
   */
  owner: string;
  /**
   * Token Metadata Object
   */
  metadata: {
    description: string;
    image: string;
    name: string;
    /**
     * Properties may be undefined, otherwise denotes the layer variants of the image.
     */
    properties?: {}[];
  };
}

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
    tokenData: tokenData?.token?.token as TokenData,
    error,
  }
}
