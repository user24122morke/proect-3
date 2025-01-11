"use client";

import { WalletConnectWallet, WalletConnectChainID } from "@tronweb3/walletconnect-tron";
import { useWallet } from "../context/globalContext";
import useUserManagement from "./useUserManagement";

const detectMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
export const useWalletConnect = () => {
  const { setWalletAddress, id } = useWallet();
  const {saveWalletAddress} = useUserManagement()
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  const connectWallet = async () => {
    const wallet = new WalletConnectWallet({
      network: WalletConnectChainID.Mainnet,
      relayUrl: `wss://relay.walletconnect.com/?projectId=${projectId || "default_project_id"}`,
      options: {
        relayUrl: "wss://relay.walletconnect.com",
        projectId: projectId || "default_project_id",
        metadata: {
          name: "Tron",
          description: "Tron WalletConnect",
          url: window.location.origin,
          icons: ["https://app.justlend.org/mainLogo.svg"],
        },
      },
      web3ModalConfig: {
        themeMode: "dark",
        themeVariables: {
          "--w3m-z-index": 1000
        },
        explorerRecommendedWalletIds: [
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
            '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
            '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150', // SafePal
            '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662', // BitGet
            'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a'  // Uniswap
        ]
      }
    });
    try {
      const data = await wallet.connect();
      const address = data.address;
      if (!address) throw new Error("Wallet address not found");
      // await saveWalletAddress(id, address)
      setWalletAddress(address);
      return { wallet, address };
    } catch (error) {
      const errorMessage = `Error during wallet connection: ${error.message}`;
      console.log(errorMessage);
    }
  };

  return { connectWallet };
};
