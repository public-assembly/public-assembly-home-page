/**
 * Could be cool to have a utility to store all relevant Dao info on chain...
 */

import { TWITTER_HANDLE } from './env-vars'

export const entries = {
  twitter: `https://twitter.com/${TWITTER_HANDLE}`,
  github: `https://github.com/public-assembly`,
  // "more": `https://www.notion.so/ourzora/Public-Assembly-1243e6a5700f4d0587e63b644bff4197`
}

/**
 * Use to convert list to array:
 */

export const socials = Object.keys(entries).map((key) => {
  return {
    platform: key,
    url: entries[key as keyof typeof entries],
  }
})
