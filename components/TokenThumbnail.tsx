import React from 'react'
import { useToken } from "hooks/useToken"

export function TokenThumbnail({
  tokenId,
  collectionAddress,
}: {
  collectionAddress: string
  tokenId: string
}) {
  const [thumbnail, setThumbnail] = React.useState<undefined | string>()
  
  const {tokenData} = useToken({
    collectionAddress: collectionAddress,
    tokenId: tokenId,
  })

  React.useEffect(() => {
    const image = tokenData?.token?.token?.metadata?.image
    if (image) {
      setThumbnail(image)
    }
  }, [tokenData])

  return (
    <div className="aspect-square relative w-full bg-slate-50">
      {thumbnail && <img src={thumbnail} className="w-full h-full inset-0"/>}
    </div>
  )
}