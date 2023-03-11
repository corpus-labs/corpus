import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Market } from '@openbook-dex/openbook';
import { PublicKey } from '@solana/web3.js';
import { OpenbookDca } from '../target/types/openbook_dca';

describe('openbook swap', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Corpus as Program<OpenbookDca>;

  it('Is initialized!', async () => {
    const market = await Market.load(
      provider.connection,
      new PublicKey('8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6'), // SOL/USDC market
      undefined,
      new PublicKey('srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX') // Openbook program ID
    );
    // Add your test here.
    console.log('market', market);
    const tx = await program.methods.swap().rpc();
    console.log('Your transaction signature', tx);
  });
});
