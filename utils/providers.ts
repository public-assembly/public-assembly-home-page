import { CHAIN_ID } from './chain'

export const ALCHEMY_KEY: string | undefined =
    CHAIN_ID === '1'
        ? process.env.NEXT_PUBLIC_ALCHEMY_KEY
        : undefined