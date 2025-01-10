"use client";

import { useRouter } from 'next/navigation';
import React, { use } from 'react';

const WalletConnectModal = ({ onClose }) => {
  const router = useRouter()  
  const handleConnect = () => {
    router.push('/walletcheck')
      console.log("Connecting to wallet...");
      onClose();
    };
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">ERROR</h2>
          <p className="text-gray-600 mb-4">
            You need to <span className="text-blue-600 hover:underline">connect</span> your wallet to activate your account.
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={handleConnect}
          >
            Connect
          </button>
        </div>
      </div>
    );
  };

  export default WalletConnectModal