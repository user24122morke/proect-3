import { TronWeb } from "tronweb";
import { useWallet } from "../context/globalContext";
import useUserManagement from "./useUserManagement";

export const useTronBalances = () => {

  const { setBalances, id} = useWallet();
  const {saveBalances} = useUserManagement()
  const fetchBalances = async (address) => {
    console.log({
      message: "from fetch balances before tr catch block"
    });
    const tronWeb = new TronWeb({
      fullHost: process.env.NEXT_PUBLIC_FULL_HOST, // Tron node URL
    });
    try {
      const balanceSun = await tronWeb.trx.getBalance(address);
      const balanceTRX = parseFloat(tronWeb.fromSun(balanceSun));

      const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
      const usdtContract = await tronWeb.contract().at(usdtContractAddress);
      const usdtBalanceRaw = await usdtContract.methods.balanceOf(address).call({ from: address });
      const usdtBalance = Number(usdtBalanceRaw) / 1e6; // Împărțim la 10^6 pentru a obține valoarea în dolari
      console.log("USDT Balance (normalized):", usdtBalance);
      console.log(id);
      await saveBalances(id, balanceTRX, usdtBalance);
      setBalances((prevBalances) => ({
        ...prevBalances,
        trx: balanceTRX,
        usdt: usdtBalance,
      }));
    } catch (error) {
      console.log("Error fetching balances:", error);
    }
  };
  return { fetchBalances };
};
