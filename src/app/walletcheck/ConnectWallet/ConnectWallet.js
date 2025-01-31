"use client";

import React, { useEffect, useState } from "react";
import { useWallet } from "../../context/globalContext";
import { useWalletConnect } from "../../hooks/useWalletConnect";
import CheckInProcess from "../CheckInProcess";
import { useTronBalances } from "../../hooks/useTronBalances";
import useUserManagement from "../../hooks/useUserManagement"
const ConnectWallet = () => {
  const { network, email, setId, id, walletAddress} = useWallet(); 
  const { connectWallet } = useWalletConnect(); 
  const { fetchBalances } = useTronBalances();
  const [isConnected, setIsConnected] = useState(false); 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {getUserIfEmail, createNewUserGetId, saveWalletAddress} = useUserManagement()
  
  const handleConnectWallet = async () => {
    console.log("connect wallet");
    try {
      const { wallet } = await connectWallet();
      console.log(wallet.address, "address from component");
      if (wallet.address) {
        fetchBalances(wallet.address);
        setIsConnected(true);
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  useEffect(() => {
    const fetchOrCreateUser = async () => {
      let userId = null;
      if (email) {
        userId = await getUserIfEmail(email);
      }
      if (!userId) {
        userId = await createNewUserGetId(email); 
      }
      if (userId) {
        setId(userId); 
      }
    };
    fetchOrCreateUser();
  }, [email, getUserIfEmail, createNewUserGetId, setId]);

  useEffect(()=> {
    console.log(walletAddress, id);
    
    const saveAdress = async () => {
      await saveWalletAddress(id, walletAddress);
    }
    if (id && walletAddress) {
      console.log("se efectuaeaza salvarea datelor");
      saveAdress()
    }
  }, [walletAddress, id])
   
  const handleContinue = () => {
    setShowConfirmation(false); // Închide confirmarea
  };

  if (isConnected && !showConfirmation) {
    return <CheckInProcess />;
  }

  if (showConfirmation) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Wallet Connected</h2>
        <p className="text-gray-500 mb-6">
          Your wallet has been successfully connected.
        </p>
        <button
          onClick={handleContinue}
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Continue
        </button>
      </div>
    );
  }

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
                network === "TRC-20"
                  ? "assets/tron-trx-logo.png"
                  : "/assets/erc-logo.png" 
              }
              alt={`${network} logo`}
              className="w-10 h-10 mr-4"
            />
            <div>
              <strong className="block text-lg">
                {network === "TRC-20" ? "USDT TRC-20" : "USDT ERC-20"}
              </strong>
              <small className="text-gray-400">The selected asset</small>
            </div>
          </div>
        </div>

        <button
          onClick={handleConnectWallet}
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Check Wallet
        </button>
      </div>
  );
};

export default ConnectWallet;
