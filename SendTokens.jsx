import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import InputComponent from "./Input";
import ButtonComponent from "./Button";
import { useState } from "react";


export function SendTokens({connection, wallet}) {
    const [isErr, setIsErr] = useState(false);
    const [to, setTo] = useState();
    const [amount, setAmount] = useState();

    async function sendTokens() {
        // to = document.getElementById("to")?.value;
        // amount = document.getElementById("amount")?.value;
        if(!to || !amount) return setIsErr(true);
        else setIsErr(false);
        
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    return <div className="send-tokens">
        <h1>Send Tokens</h1>
        <InputComponent id="to" type="text" placeholder="To" setAmount={setTo} />
        <InputComponent id="amount" type="text" placeholder="Amount" setAmount={setAmount} />
        <ButtonComponent onClickFunction={sendTokens} text={"Send"} />
        {isErr && <p>Enter both fields first</p>}
    </div>
}