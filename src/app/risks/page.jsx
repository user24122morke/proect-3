import DangerList from "./components/DangerList";
import Risks from "./components/Risks";
import SuspiciousSources from "./components/SuspiciousSources";
import TrustedSources from "./components/TrustedSources";



export default function RiskPage() {
  return (
    <div>
      <Risks />
      <DangerList/>
      <SuspiciousSources/>
      <TrustedSources/>
    </div>
  );
}
