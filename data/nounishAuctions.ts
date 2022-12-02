import gql from 'graphql-tag'

/**
 * https://playground.api.zora.co/
 */

export const NOUNISH_AUCTIONS_QUERY = gql`
  query NounishAuctions($collectionAddress: String!, $network: NetworkInput) {
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
