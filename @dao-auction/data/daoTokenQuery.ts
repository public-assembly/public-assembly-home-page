import gql from 'graphql-tag'

export const DAO_TOKEN_QUERY = gql`
  query NounishAuctions($collectionAddress: String!, $tokenId: String!) {
    token(
      token: {address: $collectionAddress, tokenId: $tokenId}
    ) {
      token {
        metadata
        owner
        lastRefreshTime
      }
    }
  }
`