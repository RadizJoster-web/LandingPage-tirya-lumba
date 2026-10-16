import { getPools, getPlatformStats } from '@/services/api';
import { HeroSection } from '@/components/features/HeroSection';
import { BrandSection } from '@/components/features/BrandSection';
import { ProgramSection } from '@/components/features/ProgramSection';
import { AboutSection } from '@/components/features/AboutSection';
import { WhyUsSection } from '@/components/features/WhyUsSection';

export default async function HomePage() {
  // Parallel fetching to prevent network waterfall (as per Section 10 arsitektur.pdf)
  const [{ data: poolsResult }, stats] = await Promise.all([
    getPools(1, 100), // Get pool list for interactive client pagination
    getPlatformStats(),
  ]);

  return (
    <>
      <HeroSection />
      <BrandSection />
      <ProgramSection pools={poolsResult.data} />
      <AboutSection />
      <WhyUsSection stats={stats} />
    </>
  );
}
