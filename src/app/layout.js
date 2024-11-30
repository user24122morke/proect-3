
import "./globals.css";



export const metadata = {
  title: "Aml Check wallet",
  description: "Solution to check AML Wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
