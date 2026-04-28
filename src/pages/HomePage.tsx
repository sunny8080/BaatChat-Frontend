import Features from '../components/Features/Features';
import GlobalCursorGlow from '../components/GlobalCursorGlow/GlobalCursorGlow';
import HeroSection from '../components/HeroSection/HeroSection';
import Navbar from '../components/Navbar/Navbar';

function HomePage() {
  return (
    <div className="bc-HomePage w-full h-full flex flex-col justify-between">
      <Navbar />
      <GlobalCursorGlow />

      <HeroSection />
      <div className="section-divider-glow"></div>
      <Features />
      <div className="section-divider-glow"></div>
    </div>
  );
}

export default HomePage;
