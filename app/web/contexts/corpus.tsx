import React, { useState, useEffect, useContext } from 'react'
import { TokenListProvider, TokenInfo, ENV } from '@solana/spl-token-registry'

export interface CorpusContextState {
  tokenMap: Map<string, TokenInfo>
}

const CorpusContext = React.createContext<CorpusContextState | null>(null)

export function CorpusProvider({ children = null as any }) {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map())

  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const tokenList = tokens
        .filterByChainId(ENV.MainnetBeta)
        .excludeByTag('nft')
        .getList()

      setTokenMap(
        tokenList.reduce((map, item) => {
          map.set(item.address, item)
          return map
        }, new Map())
      )
    })
  }, [setTokenMap])

  return (
    <CorpusContext.Provider
      value={{
        tokenMap,
      }}
    >
      {children}
    </CorpusContext.Provider>
  )
}

export const useCorpusContext = () => {
  const context = useContext(CorpusContext)
  return context as CorpusContextState
}
