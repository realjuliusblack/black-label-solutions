import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import MeetMidas from "@/components/sections/MeetMidas";
import HowItWorks from "@/components/sections/HowItWorks";
import Customize from "@/components/sections/Customize";
import FreeDiagnostic from "@/components/sections/FreeDiagnostic";
import EfficiencyScore from "@/components/sections/EfficiencyScore";
import Certification from "@/components/sections/Certification";
import WhatYouGet from "@/components/sections/WhatYouGet";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <MeetMidas />
        <HowItWorks />
        <Customize />
        <FreeDiagnostic />
        <EfficiencyScore />
        <Certification />
        <WhatYouGet />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
