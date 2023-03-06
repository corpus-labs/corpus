use {
  crate::state::*,
  anchor_lang::{
      prelude::*,
      __private::bytemuck::Contiguous,
      solana_program::{system_program, sysvar},
  },
  anchor_spl::{
      dex::{
          new_order_v3, settle_funds, SettleFunds,
          serum_dex::{
              instruction::SelfTradeBehavior,
              matching::{OrderType, Side},
          },
          NewOrderV3,
      },
      token::{Token, TokenAccount, transfer, Transfer},
  },
  std::num::NonZeroU64,
  // clockwork_sdk::state::{Thread, ThreadAccount},
};

#[derive(Accounts)]
pub struct Swap<'info> {
  #[account(
      mut,
      associated_token::mint = swap.coin_mint,
      associated_token::authority = swap.authority
  )]
  pub authority_coin_vault: Box<Account<'info, TokenAccount>>,

  #[account(
      mut,
      associated_token::mint = swap.pc_mint,
      associated_token::authority = swap.authority
  )]
  pub authority_pc_vault: Box<Account<'info, TokenAccount>>,

  #[account(address = anchor_spl::dex::ID)]
  pub dex_program: Program<'info, OpenBookDex>,

  #[account(
      seeds = [
          SEED_DCA, 
          swap.authority.key().as_ref(), 
          swap.market.key().as_ref(), 
      ], 
      bump,
  )]
  pub swap: Box<Account<'info, Swap>>,
  
  #[account(
      mut,
      associated_token::authority = swap,
      associated_token::mint = swap.coin_mint,
  )]
  pub swap_coin_vault: Box<Account<'info, TokenAccount>>,

  #[account(
      mut,
      associated_token::authority = swap,
      associated_token::mint = swap.pc_mint,
  )]
  pub swap_pc_vault: Box<Account<'info, TokenAccount>>,

  // #[account(
  //     signer,
  //     address = swap_thread.pubkey(),
  //     constraint = swap_thread.authority == swap.authority
  // )]
  // pub swap_thread: Box<Account<'info, Thread>>,

  #[account(address = sysvar::rent::ID)]
  pub rent: Sysvar<'info, Rent>,

  #[account(address = system_program::ID)]
  pub system_program: Program<'info, System>,

  #[account(address = anchor_spl::token::ID)]
  pub token_program: Program<'info, Token>,
}

pub fn handler<'info>(ctx: Context<'_, '_, '_, 'info, Swap<'info>>) -> Result<()> {
  // get accounts
  let authority_coin_vault = &mut ctx.accounts.authority_coin_vault; 
  let authority_pc_vault = &mut ctx.accounts.authority_pc_vault; 
  let dex_program = &ctx.accounts.dex_program;
  let swap = &ctx.accounts.swap;
  let swap_coin_vault= &mut ctx.accounts.swap_coin_vault;
  let swap_pc_vault= &mut ctx.accounts.swap_pc_vault;
  let rent = &ctx.accounts.rent;
  let token_program = &ctx.accounts.token_program;

  // get remaining accounts
  let market = &mut ctx.remaining_accounts.get(0).unwrap();
  let event_queue = &mut ctx.remaining_accounts.get(1).unwrap();
  let request_queue = &mut ctx.remaining_accounts.get(2).unwrap();
  let market_bids = &mut ctx.remaining_accounts.get(3).unwrap();
  let market_asks = &mut ctx.remaining_accounts.get(4).unwrap();
  let coin_vault = &mut ctx.remaining_accounts.get(5).unwrap();
  let pc_vault = &mut ctx.remaining_accounts.get(6).unwrap();
  let vault_signer = &mut ctx.remaining_accounts.get(7).unwrap();
  let open_orders = &mut ctx.remaining_accounts.get(8).unwrap();
  
  // get swap bump
  let bump = *ctx.bumps.get("swap").unwrap();

  // transfer swap amount from authority to swap ata
  transfer(
      CpiContext::new_with_signer(
          token_program.to_account_info(),
          Transfer {
              from: authority_pc_vault.to_account_info(),
              to: swap_pc_vault.to_account_info(),
              authority: swap.to_account_info(),
          },
          &[&[
              SEED_DCA,
              swap.authority.as_ref(),
              swap.market.as_ref(),
              &[bump],
          ]],
      ),
      swap.swap_amount,
  )?;

  // place order on openbook dex
  new_order_v3(
      CpiContext::new_with_signer(
          dex_program.to_account_info(),
          NewOrderV3 {
              market: market.to_account_info(),
              coin_vault: coin_vault.to_account_info(),
              pc_vault: pc_vault.to_account_info(),
              request_queue: request_queue.to_account_info(),
              event_queue: event_queue.to_account_info(),
              market_bids: market_bids.to_account_info(),
              market_asks: market_asks.to_account_info(),
              open_orders: open_orders.to_account_info(),
              order_payer_token_account: swap_pc_vault.to_account_info(),
              open_orders_authority: swap.to_account_info(),
              token_program: token_program.to_account_info(),
              rent: rent.to_account_info(),
          },
          &[&[
              SEED_DCA,
              swap.authority.as_ref(),
              swap.market.as_ref(),
              &[bump],
          ]],
      ),
      Side::Bid,
      NonZeroU64::new(NonZeroU64::MAX_VALUE).unwrap(),
      NonZeroU64::new(NonZeroU64::MAX_VALUE).unwrap(),
      NonZeroU64::new(swap.swap_amount).unwrap(),
      SelfTradeBehavior::DecrementTake,
      OrderType::Limit,
      u64::try_from_slice(&swap.key().to_bytes()[0..8]).unwrap(),
      std::u16::MAX,
  )?;

  settle_funds(
      CpiContext::new_with_signer(
          dex_program.to_account_info(), 
          SettleFunds {
              market: market.to_account_info(),
              open_orders: open_orders.to_account_info(),
              open_orders_authority: swap.to_account_info(),
              coin_vault: coin_vault.to_account_info(),
              pc_vault: pc_vault.to_account_info(),
              coin_wallet: swap_coin_vault.to_account_info(),
              pc_wallet: swap_pc_vault.to_account_info(),
              vault_signer: vault_signer.to_account_info(),
              token_program: token_program.to_account_info(),
          }, 
      &[&[
              SEED_DCA,
              swap.authority.as_ref(),
              swap.market.as_ref(),
              &[bump],
          ]],
  ))?;

  swap_coin_vault.reload()?;

   // settle funds back to user
  transfer(
      CpiContext::new_with_signer(
          token_program.to_account_info(),
          Transfer {
              from: swap_coin_vault.to_account_info(),
              to: authority_coin_vault.to_account_info(),
              authority: swap.to_account_info(),
          },
          &[&[
              SEED_DCA,
              swap.authority.as_ref(),
              swap.market.as_ref(),
              &[bump],
          ]],
      ),
      swap_coin_vault.amount,
  )?;


  Ok(())
}