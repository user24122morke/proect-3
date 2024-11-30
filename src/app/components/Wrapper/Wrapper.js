"use client";

import WalletCheck from "../WalletCheck";


const Wrapper = () => {
  
  console.log("FULL_HOST:", process.env.NEXT_PUBLIC_FULL_HOST);
  console.log("PROJECT_ID:", process.env.NEXT_PUBLIC_PROJECT_ID);
  console.log("USDT_CONTRACT_ADDRESS:", process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS);
  // Componenta inițială (dacă wallet-ul nu este conectat)
  return (
    <WalletCheck/>
  )
};

export default Wrapper;
