import React, { FC, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
// import { clusterApiUrl } from '@solana/web3.js';
import "./App.css";

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './components/Airdrop';
import { ShowSolBalance } from './components/ShowSolBalance';
import { SignMessage } from './components/SignMessage';
import { SendTokens } from './components/SendTokens';

function App() {
  const { connection } = useConnection();
  const wallet = useWallet();
  return (
    <main>
      <div className="page-1">
        <div className="wallet-btns">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
        <Airdrop connection={connection} wallet={wallet} />
        <ShowSolBalance connection={connection} wallet={wallet} />
      </div>
      <div className="page-2">
        <SendTokens connection={connection} wallet={wallet} />
        <SignMessage wallet={wallet} />
      </div>
    </main>
  )
}

export default App

