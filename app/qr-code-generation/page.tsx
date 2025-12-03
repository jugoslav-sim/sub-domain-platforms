import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/qr-code/hero';
import { HowItWorks } from '@/components/qr-code/how-it-works';
import { Benefits } from '@/components/qr-code/benefits';
import { CTASection } from '@/components/qr-code/cta-section';

export default function QRCodePage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">
                <Hero />
                <HowItWorks />
                <Benefits />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
