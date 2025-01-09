import { WalletProvider } from "./context/globalContext";
import "./globals.css";

export const metadata = {
  title: "Aml Check wallet",
  description: "Solution to check AML Wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
