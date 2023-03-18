import {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
} from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export const getTokenAccounts = async (
  wallet: PublicKey,
  connection: Connection
) => {
  const filters: GetProgramAccountsFilter[] = [
    {
      dataSize: 165, //size of account (bytes)
    },
    {
      memcmp: {
        offset: 32, //location of our query in the account (bytes)
        bytes: wallet.toBase58(), //our search criteria, a base58 encoded string
      },
    },
  ]
  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    { filters: filters }
  )
  console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`)
  accounts.forEach((account, i) => {
    //Parse the account data
    const parsedAccountInfo: any = account.account.data
    const mintAddress: string = parsedAccountInfo['parsed']['info']['mint']
    const tokenBalance: number =
      parsedAccountInfo['parsed']['info']['tokenAmount']['uiAmount']
    //Log results
    console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`)
    console.log(`--Token Mint: ${mintAddress}`)
    console.log(`--Token Balance: ${tokenBalance}`)
  })

  return accounts
}
