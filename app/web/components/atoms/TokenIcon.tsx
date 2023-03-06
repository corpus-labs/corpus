import React, { FC, useState } from 'react'
import Image from 'next/image'
import { useCorpusContext } from '../../contexts/corpus'

interface Props {
  name: string
  mint: string
}

export const TokenIcon: FC<Props> = ({ name, mint }) => {
  const { tokenMap } = useCorpusContext()
  const [error, toggleError] = useState(false)
  const token = tokenMap.get(mint)

  const onError = () => {
    toggleError(true)
  }

  return token?.logoURI && !error ? (
    <Image
      src={token.logoURI}
      className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-100 bg-white"
      alt={name}
      onError={onError}
    />
  ) : (
    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-100 bg-gray-50" />
  )
}
