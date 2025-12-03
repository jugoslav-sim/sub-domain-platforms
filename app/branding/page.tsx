import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/branding/hero';
import { CustomizationFeatures } from '@/components/branding/customization-features';
import { InteractiveDemo } from '@/components/branding/interactive-demo';
import { ProcessSteps } from '@/components/branding/process-steps';
import { CTASection } from '@/components/branding/cta-section';

export default function BrandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">
                <Hero />
                <CustomizationFeatures />
                <InteractiveDemo />
                <ProcessSteps />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
