import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
    return (
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(/hero-background.jpg)`,
                    }}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Your Venue, Your Vibe, Your Success
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    VenueVibe provides the ultimate toolkit for nightclubs, bars, and restaurants
                    to create stunning, interactive landing pages.
                </p>
                <Link href="/get-started">
                    <Button
                        size="lg"
                        className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        Get Started Now
                    </Button>
                </Link>
            </div>
        </section>
    );
}
