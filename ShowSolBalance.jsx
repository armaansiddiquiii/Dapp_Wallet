import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";

export function ShowSolBalance({connection, wallet}) {
    async function getBalance() {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;
            getBalance();
        }
    }

    useEffect(() => {
        getBalance();
    }, [wallet]);
    
    getBalance();
    return <div className="show-balance">
        <p>SOL Balance:</p> <div id="balance">{document?.getElementById("balance")?.innerHTML == '' && <p>First connect your wallet</p>}</div>
    </div>
}