"use client";

import React, { useState } from "react";
import { useWallet } from "../../context/globalContext";
// import ConnectWallet from "../ConnectWallet";
import ConnectWallet from "../ConnectWallet";




const WalletCheck = () => {
  const { network, setNetwork } = useWallet();  
  const [showQRCode, setShowQRCode] = useState(false); // Stare pentru afișare

  const selectNetwork = (selectedNetwork) => {
    setNetwork(selectedNetwork); 
  };

  const handleContinue = () => {
    setShowQRCode(true); // Afișează componenta QR Code
  };

  if (showQRCode) {
    return <ConnectWallet />; // Afișează ConnectWallet dacă `showQRCode` este adevărat
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold bg-blue-100">Wallet check</h2>
        <span className="text-blue-500 bg-blue-100 text-sm px-4 py-1 rounded-full border border-blue-200">
          Step 1 of 4
        </span>
      </div>
      <p className="text-gray-500 mb-6">
        To continue, please select the desired network
      </p>

      <div
        className={`flex items-center justify-between border p-4 rounded-lg cursor-pointer mb-4 ${
          network === "TRC-20" ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onPointerDown={() => selectNetwork("TRC-20")} // PointerDown funcționează mai bine pe mobil
      >
        <img src="/assets/tron-trx-logo.png" alt="TRC-20 Logo" className="w-8 h-8" />
        <div className="text-left flex-1 ml-4">
          <strong className="block text-lg">USDT</strong>
          <small className="text-gray-400">TRC-20</small>
        </div>
      </div>

      <div
        className={`flex items-center justify-between border p-4 rounded-lg cursor-pointer mb-4 ${
          network === "ERC-20" ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onPointerDown={() => selectNetwork("ERC-20")}
      >
        <img src="/assets/erc-logo.png" alt="ERC-20 Logo" className="w-8 h-8" />
        <div className="text-left flex-1 ml-4">
          <strong className="block text-lg">USDT</strong>
          <small className="text-gray-400">ERC-20</small>
        </div>
      </div>

      <button
        className={`w-full py-2 px-4 text-white rounded-lg ${
          network ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!network}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};
WalletCheck.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default WalletCheck;

