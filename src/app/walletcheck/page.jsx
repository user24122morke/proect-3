import { WalletProvider } from "@/app/context/globalContext";
import Wrapper from "@/app/walletcheck/WrapperComponent";

export default function WalletCheckPage() {
  return (
    <WalletProvider>
      <Wrapper />
    </WalletProvider>
  );
}
