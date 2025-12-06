import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { getAppLandingData } from '@/app/app-landing-actions';

export default async function HomePage() {
  // Fetch landing page data from Redis
  const landingData = await getAppLandingData();

  return (
    <div className="min-h-screen bg-white">
      <Header branding={landingData.branding} />
      <main className="pt-16">
        <HeroSection
          headline={landingData.heroHeadline || undefined}
          description={landingData.heroDescription || undefined}
          buttonText={landingData.heroButtonText || undefined}
          backgroundImageUrl={landingData.heroBackgroundImageUrl || undefined}
          layoutStyle={landingData.heroLayoutStyle}
          sliderImages={landingData.heroSliderImages}
          sliderSettings={landingData.heroSliderSettings}
        />
        <FeaturesSection
          features={landingData.features}
          layoutStyle={landingData.featuresLayoutStyle}
        />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
