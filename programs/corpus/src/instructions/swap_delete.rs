use {crate::state::*, anchor_lang::prelude::*};

#[derive(Accounts)]
pub struct SwapDelete<'info> {
    /// The authority (owner) of the swap.
    #[account()]
    pub authority: Signer<'info>,

    /// The address to return the data rent lamports to.
    #[account(mut)]
    pub close_to: SystemAccount<'info>,

    #[account(
        mut,
        seeds = [
            SEED_DCA,
            swap.authority.as_ref(),
            swap.market.as_ref(),
        ],
        bump,
        has_one = authority,
        close = close_to
    )]
    pub swap: Account<'info, Swap>,
}

pub fn handler(_ctx: Context<SwapDelete>) -> Result<()> {
    Ok(())
}
