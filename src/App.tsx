import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import NoiseOverlay from './components/NoiseOverlay';
import FactsBar from './components/FactsBar';
import HeroSection from './sections/HeroSection';
import TheFieldSection from './sections/TheFieldSection';
import ProofSection from './sections/ProofSection';
import ProofSurface from './sections/ProofSurface';
import InfrastructureSection from './sections/InfrastructureSection';
import ThesisSection from './sections/ThesisSection';
import DeploySection from './sections/DeploySection';
import SecuritySection from './sections/SecuritySection';
import JurisdictionSection from './sections/JurisdictionSection';
import CommercialModel from './sections/CommercialModel';
import InstitutionalStructure from './sections/InstitutionalStructure';
import ExecutionDiscipline from './sections/ExecutionDiscipline';
import RoadmapSection from './sections/RoadmapSection';
import ComplianceSection from './sections/ComplianceSection';
import EcosystemSection from './sections/EcosystemSection';
import ArchivoSection from './sections/ArchivoSection';
import TokenSection from './sections/TokenSection';
import FieldAccessSection from './sections/FieldAccessSection';
import PrivateAccess from './sections/PrivateAccess';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => { ScrollTrigger.maxScroll(window); }, 500);
    return () => { clearTimeout(timer); ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-ignum-black min-h-screen">
      <NoiseOverlay />
      <Navigation />
      <main className="relative">
        <HeroSection className="z-10" />
        <FactsBar />
        <TheFieldSection className="z-15" />
        <ProofSection className="z-16" />
        <ProofSurface />
        <InfrastructureSection className="z-30" />
        <ThesisSection className="z-35" />
        <DeploySection className="z-40" />
        <SecuritySection className="z-45" />
        <JurisdictionSection />
        <CommercialModel />
        <InstitutionalStructure />
        <ExecutionDiscipline />
        <RoadmapSection />
        <ComplianceSection className="z-[60]" />
        <EcosystemSection className="z-[70]" />
        <ArchivoSection />
        <TokenSection className="z-[75]" />
        <FieldAccessSection />
        <PrivateAccess />
        <ContactSection className="z-[90]" />
      </main>
    </div>
  );
}
