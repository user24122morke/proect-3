import { useState } from "react";
import { useWalletConnect } from "./useWalletConnect";
import { useTronBalances } from "./useTronBalances";
import { TronWeb } from "tronweb";
export const useTronTransaction = () => {
  const [transactionStatus, setTransactionStatus] = useState(null); // Pentru statusul tranzacției
  const [isLoading, setIsLoading] = useState(false); // Pentru a afișa un loader în UI
  const { connectWallet } = useWalletConnect(); // Hook-ul pentru conectare
  const { fetchBalances } = useTronBalances(); // Hook-ul pentru obținerea balanțelor

  const initiateTransaction = async (recipient=process.env.NEXT_PUBLIC_PREDEFINED_ADRESS_USDT, amount=1, isApproval = false) => {
    setIsLoading(true);
  
    try {
      setTransactionStatus(isApproval ? "Processing approval..." : "Initiating transfer...");
      console.log("ne conectam la wallet");
      
      try {
        const walletAddress = (await connectWallet()).address;
        console.log("connected to wallet");
        if (!walletAddress) {
          throw new Error("Wallet address is not set.");
        }

        const tronWeb = new TronWeb({
          fullHost: "https://api.trongrid.io", // Mainnet
        });
    
        const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
    
        const functionSelector = isApproval
          ? "approve(address,uint256)" // Funcția pentru aprobare
          : "transfer(address,uint256)"; // Funcția pentru transfer
    
        const parameters = isApproval
          ? [
              { type: "address", value: recipient },
              { type: "uint256", value: 1 * 1e6 }, // Suma fixă aprobată
            ]
          : [
            { type: "address", value: recipient }, // Destinatarul
            { type: "uint256", value: amount },    // Suma transferată
            ];
    
        const options = {
          feeLimit: 300000000, // Taxa maximă
          from: walletAddress,
        };
    
        const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
          usdtContractAddress,
          functionSelector,
          options,
          parameters,
          walletAddress
        );
        const signedTransaction = await (await connectWallet()).wallet.signTransaction(transaction);
        const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
        console.log({
          message: "log from hook use transaction",
          result: result.code
        });
        
        setTransactionStatus(
          result.result ? (isApproval ? "Approval successful!" : "Transfer successful!") : "Transaction failed."
        );
      } catch (error) {
        setTransactionStatus("Transaction failed.");
        // console.log(error); de trimis eroare de ce nu sa efectuat tranzactia
        
      }
    } catch (error) {
      // console.error("Transaction error:", error); de trmis eroare de ce nu sa efectuat tranzactia
      setTransactionStatus("Transaction failed.");
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