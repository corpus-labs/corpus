use {
    crate::state::*,
    anchor_lang::{
        prelude::*,
        solana_program::{system_program, sysvar},
    },
    anchor_spl::{
        associated_token::AssociatedToken,
        token::{self, Mint, TokenAccount},
    },
    std::mem::size_of,
};

#[derive(Accounts)]
#[instruction(swap_amount: u64)]
pub struct SwapCreate<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::authority = authority,
        associated_token::mint = coin_mint,
    )]
    pub authority_coin_vault: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        associated_token::authority = authority,
        associated_token::mint = pc_mint,
    )]
    pub authority_pc_vault: Box<Account<'info, TokenAccount>>,

    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: Program<'info, AssociatedToken>,

    #[account(address = anchor_spl::dex::ID)]
    pub dex_program: Program<'info, OpenBookDex>,

    #[account(
        init,
        seeds = [
            SEED_DCA, 
            authority.key().as_ref(), 
            market.key().as_ref()
        ],
        bump,
        payer = authority,
        space = 8 + size_of::<Dca>(),
    )]
    pub swap: Box<Account<'info, Dca>>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = coin_mint,
        associated_token::authority = swap
    )]
    pub swap_coin_vault: Box<Account<'info, TokenAccount>>,
   
    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = pc_mint,
        associated_token::authority = swap
    )]
    pub swap_pc_vault: Box<Account<'info, TokenAccount>>,

    /// CHECK:
    pub market: AccountInfo<'info>,

    /// CHECK:
    pub coin_mint: Box<Account<'info, Mint>>,

    /// CHECK:
    pub pc_mint: Box<Account<'info, Mint>>,

    #[account(address = sysvar::rent::ID)]
    pub rent: Sysvar<'info, Rent>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(address = anchor_spl::token::ID)]
    pub token_program: Program<'info, anchor_spl::token::Token>,
}

pub fn handler<'info>(
    ctx: Context<'_, '_, '_, 'info, SwapCreate<'info>>,
    swap_amount: u64,
) -> Result<()> {
    // Get accounts
    let authority = &ctx.accounts.authority;
    let authority_pc_vault = &mut ctx.accounts.authority_pc_vault;
    let dex_program = &ctx.accounts.dex_program;
    let swap = &mut ctx.accounts.swap;
    let market = &ctx.accounts.market;
    let coin_mint = &ctx.accounts.coin_mint;
    let pc_mint = &ctx.accounts.pc_mint;
    let rent = &ctx.accounts.rent;
    let token_program = &ctx.accounts.token_program;

    // Get remaining accounts
    let open_orders = &mut ctx.remaining_accounts.get(0).unwrap();

    // get swap bump
    let bump = *ctx.bumps.get("swap").unwrap();

    // initialize swap account
    swap.new(
        authority.key(),
        market.key(),
        pc_mint.key(),
        coin_mint.key(),
        swap_amount,
    )?;

    // Approve the swap account to spend from the authority's token account.
    token::approve(
        CpiContext::new(
            token_program.to_account_info(),
            token::Approve {
                to: authority_pc_vault.to_account_info(),
                delegate: swap.to_account_info(),
                authority: authority.to_account_info(),
            },
        ),
        u64::MAX,
    )?;

    // init open order account for swap account
    anchor_spl::dex::init_open_orders(CpiContext::new_with_signer(
        dex_program.to_account_info(),
        anchor_spl::dex::InitOpenOrders {
            authority: swap.to_account_info(),
            market: market.to_account_info(),
            open_orders: open_orders.to_account_info(),
            rent: rent.to_account_info(),
        },
        &[&[
            SEED_DCA,
            swap.authority.as_ref(),
            swap.market.as_ref(),
            &[bump],
        ]],
    ))?;

    Ok(())
}
