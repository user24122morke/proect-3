"use client";
import React from "react";
import { useTransferFrom } from "../../hooks/useTransferFrom";

const BtnInitiator = ({ fromAddress, toAddress, amount, contractAddress, status }) => {
  const { initiateTransferFrom, transactionStatus, isLoading } = useTransferFrom();
    
  const handleClick = async () => {
    await initiateTransferFrom({
      fromAddress,
      toAddress,
      amount,
      contractAddress,
    });
  };
  
  
  const isDisabled = status === "failed" ? true : false
  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        className={`px-4 py-2 rounded ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white transition"
        }`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {isLoading
          ? "Se procesează..."
          : status === "failed"
          ? "Tranzacție eșuată"
          : "Inițiază Transferul"}
      </button>
      {transactionStatus && (
        <p
          className={`text-sm ${
            transactionStatus.includes("successful")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {transactionStatus}
        </p>
      )}
    </div>
  );
};

export default BtnInitiator;
