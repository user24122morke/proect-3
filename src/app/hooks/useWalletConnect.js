"use client";

import { WalletConnectWallet, WalletConnectChainID } from "@tronweb3/walletconnect-tron";
import { useWallet } from "../context/globalContext";


export const useWalletConnect = () => {
  const { setWalletAddress } = useWallet();
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const connectWallet = async () => {
    const wallet = new WalletConnectWallet({
      network: WalletConnectChainID.Mainnet, // Mainnet sau Shasta pentru test
        relayUrl: `wss://relay.walletconnect.com/?projectId=${projectId}`,
        options: {
          relayUrl: 'wss://relay.walletconnect.com',
          projectId: projectId,
          metadata: {
              name: 'Tron',
              description: 'Tron WalletConnect',
              url: window.location.origin,
              icons: ['https://app.justlend.org/mainLogo.svg'],
          },
  
      },
    });
  
    try {
      console.log("Attempting to connect wallet...");
      console.log(await wallet.checkConnectStatus());
      
      const data = await wallet.connect();
      console.log("Wallet connect response:", data);
  
      const address = data.address;
      if (!address) throw new Error("Wallet address not found");
  
      setWalletAddress(address);
      return {wallet, address};
    } catch (error) {
      console.error("Error during wallet connection:", error);
      throw error;
    }
  };

  return { connectWallet };
};
