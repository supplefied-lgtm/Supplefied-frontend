import HeroSection from '@/components/home/HeroSection';
import GoalCards from '@/components/home/GoalCards';
import BestSellersSlider from '@/components/home/BestSellersSlider';
import MascotPicks from '@/components/home/MascotPicks';
import ShopByBrand from '@/components/home/ShopByBrand';
import AuthenticityBanner from '@/components/home/AuthenticityBanner';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <GoalCards />
      <BestSellersSlider />
      <ShopByBrand />
      <MascotPicks />
      {/* <AuthenticityBanner /> */}
      <Testimonials />
    </div>
  );
}
