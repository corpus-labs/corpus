import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useMarketContext } from '../../contexts/market'
import { CalculatorIcon } from '@heroicons/react/outline'
import { Button, ButtonSize } from '../atoms/Button'
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'
import { useAssociatedTokenAccount } from '../../hooks/useAssociatedTokenAccount'
import clsx from 'clsx'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
export const PositionForm = () => {
  const wallet = useWallet()
  const { connection } = useConnection()
  const { market } = useMarketContext()
  const [side, setSide] = useState<string>('buy')
  const [baseCurrency, setBaseCurrency] = useState<string>(0)
  const [quoteCurrency, setQuoteCurrency] = useState<string>(0)
  const [orderType, setOrderType] = useState<string>('limit')

  const handleBaseCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBaseCurrency(e.target.value)
  }

  const handleQuoteCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuoteCurrency(e.target.value)
  }

  const handleOrderTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderType(e.target.value)
  }

  const handleMarketOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!wallet.publicKey) {
      return
    }

    //
    const ataMint = new PublicKey(
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' // USDC
    )

    // Get associated token account
    const ata = await useAssociatedTokenAccount(
      ataMint,
      wallet.publicKey,
      wallet,
      connection
    )

    const payer = side === 'buy' ? ata?.address : ata?.owner
    // Place order transaction
    const order = await market.makePlaceOrderTransaction(connection, {
      owner: wallet.publicKey,
      payer: payer,
      side: side, // 'buy' or 'sell'
      price: quoteCurrency,
      size: baseCurrency,
      orderType: 'postOnly', // 'limit', 'ioc', 'postOnly',
    })

    // Build transaction
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash()

    const transaction = new Transaction({
      blockhash,
      lastValidBlockHeight,
      feePayer: wallet.publicKey,
    })

    transaction.add(order.transaction)

    // Send transaction
    try {
      await wallet.sendTransaction(transaction, connection, {
        signers: order.signers,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form
      className="flex flex-col w-1/4 border-b border-zinc-800"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center px-4 h-16 border-b border-zinc-800">
        <Button
          type="button"
          size={ButtonSize.sm}
          className="border mr-2 leading-none hover:bg-white hover:text-zinc-900"
        >
          Cross
        </Button>
        <Button
          type="button"
          size={ButtonSize.sm}
          className="border leading-none hover:bg-white hover:text-zinc-900"
        >
          5.00x
        </Button>
        <CalculatorIcon className="ml-auto h-6 w-6 text-zinc-400" />
      </div>

      <div className="flex text-sm font-medium text-zinc-400">
        <div
          className={clsx(
            'flex items-center justify-center w-1/2 border-b border-zinc-800 h-10 cursor-pointer',
            {
              'border-b-2 text-emerald-500 border-emerald-500': side === 'buy',
            }
          )}
          onClick={() => setSide('buy')}
        >
          Buy SOL/USDC
        </div>
        <div
          className={clsx(
            'flex items-center justify-center w-1/2 border-b border-zinc-800 h-10 cursor-pointer',
            {
              'border-b-2 text-red-500 border-red-500': side === 'sell',
            }
          )}
          onClick={() => setSide('sell')}
        >
          Sell SOL/USDC
        </div>
      </div>
      <fieldset>
        <div className="flex flex-col p-4 pb-2">
          <Label htmlFor="baseCurrencyInput" className="mb-2 text-zinc-400">
            Quantity (SOL)
          </Label>
          <input
            type="text"
            id="baseCurrencyInput"
            onChange={handleBaseCurrencyChange}
            value={baseCurrency}
            className={clsx(
              'form-input',
              'p-3',
              'text-sm',
              'bg-zinc-800',
              'rounded-lg',
              'font-semibold',
              'border-zinc-700'
            )}
          />
        </div>

        <div className="flex flex-col p-4">
          <Label htmlFor="quoteCurrencyInput" className="mb-2 text-zinc-400">
            Price (USDC)
          </Label>
          <input
            type="text"
            id="quoteCurrencyInput"
            onChange={handleQuoteCurrencyChange}
            value={quoteCurrency}
            className={clsx(
              'form-input',
              'p-3',
              'text-sm',
              'bg-zinc-800',
              'rounded-lg',
              'font-semibold',
              'border-zinc-700'
            )}
          />
        </div>

        <div className="flex space-x-4 p-4 pt-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="postOnly"
              className="form-checkbox rounded-sm"
              checked={orderType === 'postOnly'}
              onChange={() =>
                orderType === 'postOnly'
                  ? setOrderType('limit')
                  : setOrderType('postOnly')
              }
            />
            <Label htmlFor="postOnly" className="text-zinc-400">
              Post
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="ioc"
              className="form-checkbox rounded-sm"
              checked={orderType === 'ioc'}
              onChange={() =>
                orderType === 'ioc'
                  ? setOrderType('limit')
                  : setOrderType('ioc')
              }
            />
            <Label htmlFor="ioc" className="text-zinc-400">
              IOC
            </Label>
          </div>
          {/* <select
            className={clsx(
              'form-select',
              'p-3',
              'text-sm',
              'bg-zinc-800',
              'rounded-lg',
              'font-semibold',
              'border-zinc-700'
            )}
            onChange={handleOrderTypeChange}
            value={orderType}
          >
            <option value="limit">Limit</option>
            <option value="postOnly">Post Only</option>
            <option value="ioc">Immediete or Cancel</option>
          </select> */}
        </div>
      </fieldset>

      <div className="flex px-4 py-2">
        {side === 'buy' ? (
          <Button
            size={ButtonSize.lg}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Buy SOL
          </Button>
        ) : (
          <Button
            size={ButtonSize.lg}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Sell SOL
          </Button>
        )}
      </div>
    </form>
  )
}
