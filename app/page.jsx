import HeroSection from '@/components/sections/HeroSection';
import FeaturedCars from '@/components/sections/FeaturedCars';
import ServicesSection from '@/components/sections/ServicesSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCars />
      <ServicesSection />
    </div>
  );
}