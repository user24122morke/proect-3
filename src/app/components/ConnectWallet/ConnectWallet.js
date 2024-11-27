"use client";

import React, { useState } from "react";
import { useWallet } from "@/app/context/globalContext";
import { useWalletConnect } from "@/app/hooks/useWalletConnect";
import CheckInProcess from "../CheckInProcess";
import { useTronBalances } from "@/app/hooks/useTronBalances";
const ConnectWallet = () => {
  const { network } = useWallet(); // Rețeaua selectată (din context)
  const { connectWallet } = useWalletConnect(); // Funcția de conectare la wallet
  const {fetchBalances} = useTronBalances()
  const [isConnected, setIsConnected] = useState(false); // Starea pentru a comuta între componente

  const handleConnectWallet = async () => {
    try {
      const {address} = await connectWallet();
      console.log(address, "adress from component");
      if (address) {
        await fetchBalances(address);
        setIsConnected(true)
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };
  

  // Redare condiționată: Dacă este conectat, afișează `CheckInProcess`
  if (isConnected) {
    return <CheckInProcess />;
  }

  // Componenta inițială (dacă wallet-ul nu este conectat)
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Connect wallet</h2>
        <span className="text-blue-500 bg-blue-100 text-sm px-4 py-1 rounded-full border border-blue-200">
          Step 2 of 4
        </span>
      </div>
      <p className="text-gray-500 mb-6">
        To continue, select and connect your wallet
      </p>

      <div className="flex items-center justify-between border p-4 rounded-lg mb-4 bg-gray-50">
        <div className="flex items-center">
          <img
            src={
              network === "TRC20"
                ? "/assets/erc-logo.png"
                : "/assets/tron-trx-logo.png"
            }
            alt={`${network} logo`}
            className="w-10 h-10 mr-4"
          />
          <div>
            <strong className="block text-lg">
              {network === "TRC20" ? "USDT TRC-20" : "USDT ERC-20"}
            </strong>
            <small className="text-gray-400">The selected asset</small>
          </div>
        </div>
      </div>

      <button
        onClick={handleConnectWallet}
        className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
      >
        WalletConnect
      </button>
    </div>
  );
};

export default ConnectWallet;
