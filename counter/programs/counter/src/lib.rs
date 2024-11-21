use anchor_lang::prelude::*;

declare_id!("5P6CYMLiCj2VX7XWPNoEAaF2j8Kriy3AXDN8UKuBHCgX");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
