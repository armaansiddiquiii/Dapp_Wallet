import React, { useState } from 'react'
import InputComponent from './Input';
import ButtonComponent from './Button';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const Airdrop = ({connection, wallet, balanceChange, setBalanceChange}) => {
    const [amount, setAmount] = useState(0);
    const [isTransfered, setIsTransfered] = useState(false);

    const sendAirDropToUser = async () => {
        if(!amount) return;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        setIsTransfered(true);
    }

  return (
    <div className='airdrop'>
       <b> <h1>WALLET-SPACE</h1> </b>
        <InputComponent type="number" placeholder='Amount' setAmount={setAmount} />
        {/* <button onClick={sendAirDropToUser}>Send Airdrop</button> */}
        <div className='btn'><ButtonComponent onClickFunction={sendAirDropToUser} text={"Request Airdrop"} /></div>
        {/* <h1>Your public key is: {wallet.publicKey.toString()}</h1> */}
        <div className="transaction-successful">
          {
              isTransfered && <h2>Transaction successful!</h2>
          }
        </div>
    </div>
  )
}

export default Airdrop