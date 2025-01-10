import Navbar from "../components/HomeComponents/Navbar";
import DangerList from "./components/DangerList";
import Risks from "./components/Risks";
import SuspiciousSources from "./components/SuspiciousSources";
import TrustedSources from "./components/TrustedSources";
import Footer from "../components/HomeComponents/Footer";



export default function RiskPage() {
  return (
    <div>
      <Navbar/>
      <Risks />
      <DangerList/>
      <SuspiciousSources/>
      <TrustedSources/>
      <Footer/>
    </div>
  );
}
