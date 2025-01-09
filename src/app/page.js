
import { WalletProvider } from "./context/globalContext";

import "../app/globals.css"
import Navbar from "./components/HomeComponents/Navbar";
import HeroSection from "./components/HomeComponents/HeroSection";
import TrustSection from "./components/HomeComponents/TrustSection/TrustSection";
import PartnersSlider from "./components/HomeComponents/PartnersSlider";
import StatsSection from "./components/HomeComponents/StatsSection";
import AMLServices from "./components/HomeComponents/AMLServices";
import AssuranceCard from "./components/HomeComponents/AssuranceCard";
import SuspiciousWalletInfo from "./components/HomeComponents/SuspiciousWalletInfo";
import WhyAMLBot from "./components/HomeComponents/WhyAMLBot";
import FAQs from "./components/HomeComponents/FAQs";
import Footer from "./components/HomeComponents/Footer";




export default function Home() {
  return (
    <>
        <HeroSection/>
        <TrustSection/>
        <PartnersSlider/>
        <StatsSection/>
        <AMLServices/>
        <AssuranceCard/>
        <SuspiciousWalletInfo/>
        <WhyAMLBot/>
        <FAQs/>
    </>
  );
}
