import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/events/hero';
import { Benefits } from '@/components/events/benefits';
import { CalendarPreview } from '@/components/events/calendar-preview';
import { GettingStarted } from '@/components/events/getting-started';
import { CTASection } from '@/components/events/cta-section';

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">
                <Hero />
                <Benefits />
                <CalendarPreview />
                <GettingStarted />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
