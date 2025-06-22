import HeroSection from '@/components/sections/HeroSection';
import FeaturedCars from '@/components/sections/FeaturedCars';


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCars />
    </div>
  );
}