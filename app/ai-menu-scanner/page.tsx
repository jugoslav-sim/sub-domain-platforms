import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/ai-menu-scanner/hero';
import { HowItWorks } from '@/components/ai-menu-scanner/how-it-works';
import { DemoSection } from '@/components/ai-menu-scanner/demo-section';
import { BenefitsSection } from '@/components/ai-menu-scanner/benefits-section';
import { CTASection } from '@/components/ai-menu-scanner/cta-section';

export default function AIMenuScannerPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">
                <Hero />
                <HowItWorks />
                <DemoSection />
                <BenefitsSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
