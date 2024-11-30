
import { WalletProvider } from "./context/globalContext";

import Wrapper from "./components/Wrapper";
import "../app/globals.css"
import WalletERC20 from "./components/WalletERC20/WalletERC20";




export default function Home() {
  return (
    <>
      <WalletProvider>
        <Wrapper/>
        {/* <WalletERC20/> */}
      </WalletProvider>
    </>
  );
}
