import CallScreen3D from '../components/CallScreen3D/CallScreen3D';
import Features from '../components/Features/Features';
import GlobalCursorGlow from '../components/GlobalCursorGlow/GlobalCursorGlow';
import HeroSection from '../components/HeroSection/HeroSection';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Navbar from '../components/Navbar/Navbar';
import Stats from '../components/Stats/Stats';
import TechCarousel from '../components/TechCarousel/TechCarousel';

function HomePage() {
  return (
    <div className="bc-HomePage w-full h-full flex flex-col justify-between">
      <Navbar />
      <GlobalCursorGlow />

      <HeroSection />
      <div className="section-divider-glow"></div>

      <Features />
      <div className="section-divider-glow"></div>

      <HowItWorks />
      <div className="section-divider-glow"></div>

      <TechCarousel />
      <div className="section-divider-glow"></div>

      <CallScreen3D />
      <div className="section-divider-glow"></div>

      <Stats />
      <div className="section-divider-glow"></div>
    </div>
  );
}

export default HomePage;
