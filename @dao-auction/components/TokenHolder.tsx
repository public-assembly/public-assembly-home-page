import React from 'react'
import { useDaoToken } from "@dao-auction/hooks/useDaoToken"
import { useEnsName } from "wagmi"

export default function TokenTitle({
  tokenId,
  daoAddress,
}: {
  daoAddress: string
  tokenId: string
}) {
  const { tokenData } = useDaoToken({
    daoAddress: daoAddress,
    tokenId: tokenId,
  })
  
  const { data: ensName } = useEnsName({
    address: tokenData?.owner as string | undefined,
  })

  if (!tokenData) return null

  return (
    <a
      href={`https://etherscan.io/address/${tokenData?.owner}`}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col leading-5"
    >
      <span className="opacity-50">Held by:</span>
      <span className="hover:underline">
        {ensName ? ensName : tokenData?.owner}
      </span>
    </a>
  )
}
