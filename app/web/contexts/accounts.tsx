import React, { ReactNode, useContext, useState } from 'react'
import { useConnection } from '@solana/wallet-adapter-react'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { Buffer } from 'buffer'

export interface ParsedAccount {
  publicKey: PublicKey
  account: AccountInfo<Buffer>
  info: unknown
}

export interface AccountsContextState {
  cache: Map<string, ParsedAccount>
  getAccount(account: PublicKey): Promise<ParsedAccount | undefined>
}

const AccountsContext = React.createContext<AccountsContextState | null>(null)

export function AccountsProvider({ children = null as ReactNode }) {
  const { connection } = useConnection()
  const [cache, updateCache] = useState<Map<string, ParsedAccount>>(new Map())

  const getAccount = async (
    account: PublicKey
  ): Promise<ParsedAccount | undefined> => {
    const key = account.toBase58()

    // If account exists in cache, return
    if (cache.get(key)) {
      return cache.get(key)
    }

    // Otherwise, fetch account info and return ParsedAccount
    const accountInfo = await connection.getAccountInfo(account)

    if (accountInfo) {
      updateCache(
        new Map(
          cache.set(key, {
            publicKey: account,
            account: accountInfo,
            info: null,
          })
        )
      )

      return cache.get(key)
    }
  }

  return (
    <AccountsContext.Provider
      value={{
        cache,
        getAccount,
      }}
    >
      {children}
    </AccountsContext.Provider>
  )
}

export const useAccountsContext = () => {
  const context = useContext(AccountsContext)
  return context as AccountsContextState
}
