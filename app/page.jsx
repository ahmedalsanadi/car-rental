import HeroSection from '@/components/sections/HeroSection';
import FeaturedCars from '@/components/sections/FeaturedCars';
import ServicesSection from '@/components/sections/ServicesSection';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCars />
      <ServicesSection />
      <HowItWorks />
    </div>
  );
}