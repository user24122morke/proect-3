import Footer from "./components/HomeComponents/Footer";
import Navbar from "./components/HomeComponents/Navbar";
import { WalletProvider } from "./context/globalContext";
import "./globals.css";

export const metadata = {
  title: "Aml Check Wallet",
  description: "Solution to check AML Wallet",
};

export default function RootLayout({ children }) {
  // Verifică dacă pagina are propriul layout
  const getLayout = children.type?.getLayout || ((page) => page);

  return (
    <html lang="en">
      <body>
        <WalletProvider>
            {children}
        </WalletProvider>
      </body>
    </html>
  );
}
