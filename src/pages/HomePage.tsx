import HeroSection from '../components/HeroSection/HeroSection';
import Navbar from '../components/Navbar/Navbar';

function HomePage() {
  return (
    <div className="bc-HomePage w-full h-full flex flex-col justify-between">
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default HomePage;
