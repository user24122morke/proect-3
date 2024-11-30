import { useWallet } from "../context/globalContext";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import Web3 from "web3";

const useWalletConnectERC20 = () => {
  const {
    walletAddress,
    setWalletAddress,
    balances,
    updateBalances,
    network,
  } = useWallet();

  const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS_ERC_20; // Contract USDT pe Ethereum

  const erc20Abi = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_to", type: "address" }, { name: "_value", type: "uint256" }],
      name: "transfer",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
  ];

  let ethereumProvider = null; // Pentru instanța WalletConnect v2

  const connectWallet = async () => {
    try {
      // Inițializează WalletConnect v2 EthereumProvider
      ethereumProvider = await EthereumProvider.init({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // Project ID din WalletConnect Cloud
        chains: [1], // Ethereum Mainnet Chain ID
        showQrModal: true,
      });

      // Activează provider-ul și obține conturile wallet-ului conectat
      const accounts = await ethereumProvider.enable();
      const web3Instance = new Web3(ethereumProvider);

      const wallet = accounts[0];
      setWalletAddress(wallet);

      // Obține balanța ETH
      const rawEthBalance = await web3Instance.eth.getBalance(wallet);
      const ethBalance = web3Instance.utils.fromWei(rawEthBalance, "ether");

      // Obține balanța USDT
      const usdtContract = new web3Instance.eth.Contract(erc20Abi, usdtContractAddress);
      const rawUsdtBalance = await usdtContract.methods.balanceOf(wallet).call();
      const decimals = await usdtContract.methods.decimals().call();
      const usdtBalance = rawUsdtBalance / Math.pow(10, decimals);

      // Actualizează balanțele în Context
      updateBalances({ eth: ethBalance, usdt: usdtBalance });
    } catch (err) {
      console.error("Eroare la conectarea wallet-ului:", err);
    }
  };

  const transferUSDT = async (recipientAddress, amount) => {
    if (!walletAddress) {
      console.error("Wallet-ul nu este conectat.");
      return;
    }

    try {
      const web3Instance = new Web3(ethereumProvider);
      const tokenContract = new web3Instance.eth.Contract(erc20Abi, usdtContractAddress);

      // Transformă suma într-un format brut (uint256)
      const decimals = 6; // USDT are 6 zecimale
      const rawAmount = (amount * Math.pow(10, decimals)).toString();

      // Efectuează tranzacția
      const tx = await tokenContract.methods
        .transfer(recipientAddress, rawAmount)
        .send({ from: walletAddress });

      console.log("Transaction successful:", tx.transactionHash);
      return tx.transactionHash;
    } catch (err) {
      console.error("Eroare la efectuarea tranzacției:", err);
    }
  };

  return {
    connectWallet,
    transferUSDT,
    balances,
    walletAddress,
    network,
  };
};

export default useWalletConnectERC20;
