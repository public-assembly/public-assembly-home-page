import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

interface Countdown {
  isEnded: boolean
  countdownString: string
}

export const useCountdown = (endTime: number): Countdown => {
  const [now, setNow] = useState(dayjs.unix(Date.now() / 1000))

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs.unix(Date.now() / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const end = dayjs.unix(endTime)
  const countdown = end.diff(now, 'second')

  return {
    isEnded: now >= end,
    countdownString: `${Math.floor(countdown / 3600)}h ${Math.floor(
      (countdown % 3600) / 60
    )}m ${countdown % 60}s`,
  }
}
