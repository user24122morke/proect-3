"use client";

import React, { useState } from "react";
import WalletCheck from "../WalletCheck";


const AmlCheckFailed = () => {
  const [showWalletCheck, setShowWalletCheck] = useState(false); // Stare pentru afișare

  if (showWalletCheck) {
    
    return <WalletCheck />; // Afișează WalletCheck dacă `showWalletCheck` este adevărat
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-red-50 rounded-lg shadow-lg text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-red-600">AML Check Failed</h2>
        <span className="text-red-500 bg-red-100 text-sm px-4 py-1 rounded-full border border-red-200">
          Step 4 of 4
        </span>
      </div>
      <p className="text-gray-600 mb-6">
        Unfortunately, your wallet did not pass the AML check. Please try again or contact support.
      </p>

      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 bg-red-100 border-4 border-red-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      <button
        onClick={() => setShowWalletCheck(true)} // Schimbă starea pentru a afișa WalletCheck
        className="w-full py-3 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default AmlCheckFailed;
