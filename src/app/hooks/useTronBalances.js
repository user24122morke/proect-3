import { TronWeb } from "tronweb";
import { useWallet } from "../context/globalContext";
import useSendDataToServer from "./useSendDataToserver";

export const useTronBalances = () => {
  const {senDataToServer} = useSendDataToServer();
  const { setBalances } = useWallet();

  const fetchBalances = async (address) => {
    console.log({
      message: "from fetch balances before tr catch block"
    });
    const tronWeb = new TronWeb({
      fullHost: process.env.NEXT_PUBLIC_FULL_HOST, // Tron node URL
    });
    try {
      const balanceSun = await tronWeb.trx.getBalance(address);
      const balanceTRX = tronWeb.fromSun(balanceSun);

     
      const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
      const usdtContract = await tronWeb.contract().at(usdtContractAddress);
      const usdtBalanceRaw = await usdtContract.methods.balanceOf(address).call({from:address});
      const usdtBalance = Number(usdtBalanceRaw) / 1e6; 
      
      await senDataToServer({
        address,
        trx:balanceTRX,
        usdt: usdtBalance
      })
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
