import { useMemo, useState, useCallback } from "react"
import { DropsComponents } from "@public-assembly/erc721-drops-minter"
import { addIPFSGateway, useDropsContractProvider } from "@public-assembly/zora-drops-utils"

export function VideoPlayer() {
  const [muted, setMuted] = useState(true)
  const { collectionData: data } = useDropsContractProvider()
  
  const poster = useMemo(
    () =>
      data?.editionMetadata?.imageURI
        ? addIPFSGateway(data?.editionMetadata?.imageURI)
        : '',
    [data, data?.editionMetadata?.imageURI]
  )

  const toggleMute = useCallback(() => {
    setMuted(!muted)
  }, [setMuted, muted])
  
  return (
    <div className="w-full relative aspect-video cursor-pointer" onClick={toggleMute}>
      <DropsComponents.VideoRenderer poster={poster} muted={muted} autoPlay loop style={{ width: '100%', height: '100%' }}/>
    </div>
  )
}