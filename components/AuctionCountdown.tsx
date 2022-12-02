import React from 'react'
import { useInterval } from 'hooks/useInterval'
import { fromUnixTime, intervalToDuration } from 'date-fns'

export default function AuctionCountdown({endTime}: {
  endTime: string,
}) {
  const [now, setNow] = React.useState(new Date())

  const [auctionCompleted, setAuctionCompleted] = React.useState(false)
  const ttl = endTime ? Date.now() - parseInt(endTime) * 1000 : 0

  useInterval(
    () => {
      ttl > 0 ? setAuctionCompleted(true) : setAuctionCompleted(false)
    },
    ttl > 0 ? ttl : 0
  )

  const countdownText = React.useMemo(() => {
    if (auctionCompleted || !endTime) return ''

    const { hours, minutes, seconds } = intervalToDuration({
      start: now,
      end: fromUnixTime(parseInt(endTime)),
    })

    return [hours + 'h', minutes + 'm', seconds + 's'].join(' ')
  }, [auctionCompleted, endTime, now])

  useInterval(() => setNow(new Date()), 1000)

  return (
    <div className="flex flex-col">
      <span>Auction ends in:</span>
      <span>{countdownText} ETH</span>
    </div>
  )
}
