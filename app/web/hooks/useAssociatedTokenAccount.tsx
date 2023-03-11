import {
  Commitment,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  Connection,
} from '@solana/web3.js'
import {
  Account,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { WalletContextState } from '@solana/wallet-adapter-react'
import { Wallet } from '@solana/wallet-adapter-base'

export const useAssociatedTokenAccount = async (
  mint: PublicKey,
  owner: PublicKey,
  wallet: WalletContextState,
  connection: Connection,
  commitment?: Commitment,
  programId = TOKEN_PROGRAM_ID
) => {
  const { publicKey, sendTransaction } = wallet
  const associatedToken = await getAssociatedTokenAddress(mint, owner)

  let account: Account

  if (!publicKey) {
    return
  }

  try {
    account = await getAccount(
      connection,
      associatedToken,
      commitment,
      programId
    )
  } catch (error: unknown) {
    if (
      error instanceof TokenAccountNotFoundError ||
      error instanceof TokenInvalidAccountOwnerError
    ) {
      try {
        // const { blockhash, lastValidBlockHeight } =
        //   await connection.getLatestBlockhash()

        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            associatedToken,
            owner,
            mint,
            programId,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        )

        await sendTransaction(transaction, connection)
      } catch (error: unknown) {}
      account = await getAccount(
        connection,
        associatedToken,
        commitment,
        programId
      )
    } else {
      throw error
    }
  }

  return account
}
