import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/rentals/hero';
import { Benefits } from '@/components/rentals/benefits';
import { Showcase } from '@/components/rentals/showcase';
import { GettingStarted } from '@/components/rentals/getting-started';
import { CTASection } from '@/components/rentals/cta-section';

export default function RentalsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">
                <Hero />
                <Benefits />
                <Showcase />
                <GettingStarted />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
