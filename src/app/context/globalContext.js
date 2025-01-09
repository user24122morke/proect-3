"use client"

import React, { createContext, useContext, useState, useEffect } from "react";

// Creăm contextul
const WalletContext = createContext();

// Provider pentru întreaga aplicație
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null); // Adresa wallet-ului conectat
  const [balances, setBalances] = useState({
       trx: 0,
       usdt: 0,
       eth: 0,
       usdc: 0 
  }); // Balanțe
  const [network, setNetwork] = useState("TRC20"); // Rețeaua activă (TRC20/ERC20)
  const [currentStep, setCurrentStep] = useState(1); // Inițializăm cu Step 
  const [auth, setAuth] = useState(false); // Adaugă starea de autentificat
  console.log(auth);
  const [email, setEmail] = useState("");
  useEffect(() => {
    // Accesăm localStorage doar pe client
    const savedStep = parseInt(localStorage.getItem("currentStep")) || 1;
    setCurrentStep(savedStep);
  }, []); // Se execută doar o dată, după montarea componentului

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const storedEmail = localStorage.getItem("email");

    if (storedAuth === "true") setAuth(true);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", auth);
    localStorage.setItem("email", email || "");
  }, [auth, email]);


  const updateStep = (step) => {
    setCurrentStep(step);
    localStorage.setItem("currentStep", step); // Salvează progresul în localStorage
  };
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
        currentStep,
        updateStep,
        auth,
        setAuth,
        email,
        setEmail
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};


export const useWallet = () => useContext(WalletContext);
