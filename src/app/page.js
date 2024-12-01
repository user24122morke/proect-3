
import { WalletProvider } from "./context/globalContext";

import "../app/globals.css"
import Navbar from "./components/HomeComponents/Navbar";
import HeroSection from "./components/HomeComponents/HeroSection";
import TrustSection from "./components/HomeComponents/TrustSection/TrustSection";
import PartnersSlider from "./components/HomeComponents/PartnersSlider";
import StatsSection from "./components/HomeComponents/StatsSection";
import AMLServices from "./components/HomeComponents/AMLServices";




export default function Home() {
  return (
    <>
      <WalletProvider>
        <Navbar/>
        <HeroSection/>
        <TrustSection/>
        <PartnersSlider/>
        <StatsSection/>
        <AMLServices/>
       
      </WalletProvider>
    </>
  );
}
