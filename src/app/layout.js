import Footer from "./components/HomeComponents/Footer";
import Navbar from "./components/HomeComponents/Navbar";
import { WalletProvider } from "./context/globalContext";
import "./globals.css";



export const metadata = {
  title: 'AML Wallet eCheck - Secure Crypto Transaction Verification',
  description: 'Advanced wallet verification system with Anti-Money Laundering (AML) checks, KYC compliance, and secure blockchain transaction monitoring.',
  alternates: { canonical: 'https://amlwallet-echeck.com/' },
  keywords: 'AML check, crypto wallet verification, KYC compliance, blockchain security, cryptocurrency transaction monitoring, anti-money laundering',
  other: {
    'google-site-verification': 'EcT5YyeSNFSyvKhlCt8aGq-N_zSX5Uo-vk3Ghlb600A'
  },
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AML Wallet eCheck',
    description: 'Advanced wallet verification system with Anti-Money Laundering (AML) checks and blockchain security.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150'
    }
  },
  openGraph: {
    title: 'AML Wallet eCheck - Secure Crypto Transaction Verification',
    description: 'Ensure secure cryptocurrency transactions with our advanced AML verification system. Real-time monitoring, KYC compliance, and fraud prevention.',
    url: 'https://amlwallet-echeck.com/',
    siteName: 'AML Wallet eCheck',
    type: 'website',
    images: [
      {
        url: 'https://amlwallet-echeck.com/assets/logo-amlbot.png',
        width: 1200,
        height: 630,
        alt: 'AML Wallet eCheck Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AML Wallet eCheck - Secure Crypto Transaction Verification',
    description: 'Advanced wallet verification system with AML checks and secure blockchain monitoring.',
    images: ['https://amlwallet-echeck.com/assets/logo-amlbot.png'],
  },
};


// export const metadata = {
//   title: "Aml Check Wallet",
//   description: "Solution to check AML Wallet",
// };

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
