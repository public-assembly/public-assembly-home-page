import gql from 'graphql-tag'

/**
 * https://playground.api.zora.co/
 */
export const TOKEN_METADATA_QUERY = gql`
  query NounishAuctions($collectionAddress: String!, $tokenId: String!) {
    token(
      token: {address: $collectionAddress, tokenId: $tokenId}
    ) {
      token {
        description
        metadata
      }
    }
  }
`

export const NOUNISH_AUCTIONS_QUERY = gql`
  query NounishAuctions($collectionAddress: String!, $network: NetworkInput) {
    token(
      token: {address: $collectionAddress, tokenId: "3"}
    ) {
      token {
        description
        metadata
      }
    }
    nouns {
      nounsActiveMarket(
        where: { collectionAddress: $collectionAddress }
        network: $network
      ) {
        duration
        endTime
        highestBidder
        metadata
        status
        tokenId
        winner
        highestBidPrice {
          nativePrice {
            decimal
            raw
          }
        }
        reservePrice {
          nativePrice {
            raw
            decimal
          }
        }
        startTime
        timeBuffer
        treasury
        extended
        firstBidTime
        estimatedDurationTime
        auction
        minBidIncrementPercentage
      }
    }
  }
`
