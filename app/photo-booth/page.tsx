import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/photo-booth/hero';
import { HowItWorks } from '@/components/photo-booth/how-it-works';
import { Benefits } from '@/components/photo-booth/benefits';
import { TryItLive } from '@/components/photo-booth/try-it-live';

export default function PhotoBoothPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">
                <Hero />
                <HowItWorks />
                <Benefits />
                <TryItLive />
            </main>
            <Footer />
        </div>
    );
}
