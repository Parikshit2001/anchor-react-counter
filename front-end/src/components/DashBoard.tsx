import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { Counter, IDL } from "../anchor/idl";

function DashBoard() {
  const wallet = useAnchorWallet();
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const [program, setProgram] = useState<Program<Counter>>();

  const getProvider = () => {
    if (wallet) {
      const provider = new AnchorProvider(
        connection,
        wallet,
        AnchorProvider.defaultOptions()
      );
      setProvider(provider);
      console.log(provider);
      const prog = new Program(IDL as Counter);
      setProgram(prog);
    }
  };

  const handleInitialise = async () => {
    const res = await program?.methods.initialize().rpc();
    console.log(res);
  };

  const handleIncrement = async () => {
    const res = await program?.methods.increment().rpc();
    console.log(res);
  };

  const handleFetchAccounts = async () => {
    if (program) {
      // const [counterPDA] = PublicKey.findProgramAddressSync(
      //   [Buffer.from("counter")],
      //   program.programId
      // );
      // const accounts = await program?.account.counter.fetch(counterPDA);
      // console.log(accounts.count.toString());
      const accounts = await program.account.counter.all();
      console.log(accounts[0].account.count.toString());
    }
  };

  return (
    <div className="flex flex-col border-2 gap-2">
      <button onClick={getProvider}>Get Provider</button>
      <button onClick={handleInitialise}>Initialise</button>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleFetchAccounts}>Fetch Accounts</button>
    </div>
  );
}

export default DashBoard;
