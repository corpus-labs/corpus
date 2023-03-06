import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Corpus } from "../target/types/corpus";

describe("corpus", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Corpus as Program<Corpus>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
