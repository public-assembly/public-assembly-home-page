export const CHAIN_ID = process.env.NEXT_PUBLIC_NETWORK_URL as '1' | '5' | undefined

if (!CHAIN_ID) {
    throw new Error('ChainID is required.')
}