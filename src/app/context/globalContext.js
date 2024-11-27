"use client"

import React, { createContext, useContext, useState } from "react";

// Creăm contextul
const WalletContext = createContext();

// Provider pentru întreaga aplicație
export const WalletProvider = ({ children }) => {
  // Variabilele de stare
  const [walletAddress, setWalletAddress] = useState(null); // Adresa wallet-ului conectat
  const [balances, setBalances] = useState({ trx: 0, usdt: 0 }); // Balanțe
  const [network, setNetwork] = useState("TRC20"); // Rețeaua activă (TRC20/ERC20)
  
  // Furnizăm starea către toate componentele copil
  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        balances,
        setBalances,
        network,
        setNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Hook personalizat pentru a accesa Contextul
export const useWallet = () => useContext(WalletContext);
