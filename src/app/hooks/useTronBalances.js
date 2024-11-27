import { TronWeb } from "tronweb";
import { useWallet } from "../context/globalContext";

export const useTronBalances = () => {
  const { setBalances } = useWallet();

  // Fetch balances for TRX and USDT
  const fetchBalances = async (address) => {
    const tronWeb = new TronWeb({
      fullHost: process.env.NEXT_PUBLIC_FULL_HOST, // Tron node URL
    });

    try {
      // Fetch TRX balance
      const balanceSun = await tronWeb.trx.getBalance(address);
      const balanceTRX = tronWeb.fromSun(balanceSun);
      console.log("Fetched TRX Balance:", balanceTRX);

      // Fetch USDT balance
      const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
      const usdtContract = await tronWeb.contract().at(usdtContractAddress);
      const usdtBalanceRaw = await usdtContract.methods.balanceOf(address).call({from:address});
      const usdtBalance = Number(usdtBalanceRaw) / 1e6; // Convert Sun to USDT
      console.log("Fetched USDT Balance:", usdtBalance);

      // Update global state
      setBalances((prevBalances) => ({
        ...prevBalances,
        trx: balanceTRX,
        usdt: usdtBalance,
      }));
    } catch (error) {
      console.error("Error fetching balances:", error);
      throw error;
    }
  };

  return { fetchBalances };
};
