"use client";

import { WalletConnectWallet, WalletConnectChainID } from "@tronweb3/walletconnect-tron";
import { useWallet } from "../context/globalContext";

// Helper pentru detectarea dispozitivelor mobile
const isMobileDevice = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Funcție pentru log-uri către server
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


export const useWalletConnect = () => {
  const { setWalletAddress } = useWallet();
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  // logToServer("This is a test log from the client.");

  const connectWallet = async () => {
    // Verificăm dacă este un dispozitiv mobil
    // if (isMobileDevice()) {
    //   try {
    //     const message = "Redirecting to Trust Wallet on mobile...";
       
    //     await logToServer(message);

    //     // Redirecționare către Trust Wallet
    //     window.location.href = "trust://";
    //     return;
    //   } catch (error) {
    //     const errorMessage = `Error redirecting to Trust Wallet: ${error.message}`;
    //     console.error(errorMessage);
    //     await logToServer(errorMessage);
    //     throw new Error("Failed to redirect to Trust Wallet. Please ensure the app is installed.");
    //   }
    // }

    // Desktop flow - continuăm cu WalletConnect
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
    });

    try {
      const startMessage = "Attempting to connect wallet on desktop...";
      console.log(startMessage);
      // await logToServer(startMessage);

      // await logToServer(await wallet.checkConnectStatus());

      const data = await wallet.connect();
      const successMessage = `Wallet connect response: ${JSON.stringify(data)}`;
      // await logToServer(successMessage);
      // await logToServer(data)

      const address = data.address;
      if (!address) throw new Error("Wallet address not found");

      setWalletAddress(address);
      return { wallet, address };
    } catch (error) {
      const errorMessage = `Error during wallet connection: ${error.message}`;
      console.error(errorMessage);
      // await logToServer(errorMessage);
      throw error;
    }
  };

  return { connectWallet };
};
