
import { WalletProvider } from "./context/globalContext";
import WalletCheck from "./components/WalletCheck";
import AmlCheckPassed from "./components/AmlCheckPassed";



export default function Home() {
  return (
    <>
      <WalletProvider>
         <WalletCheck/>
          {/* <AmlCheckPassed/> */}
    
      </WalletProvider>
    </>
  );
}
