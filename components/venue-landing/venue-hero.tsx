import { Button } from '@/components/ui/button';
import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueHeroProps {
    data: VenueEditorData;
}

export function VenueHero({ data }: VenueHeroProps) {
    const {
        heroHeadline,
        heroDescription,
        heroButtonText,
        heroButtonUrl,
        heroBackgroundImageUrl,
        heroLayoutStyle,
        themeColor
    } = data;

    // Cinematic center layout (default)
    if (heroLayoutStyle === 'cinematic-center' || !heroLayoutStyle) {
        return (
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                {heroBackgroundImageUrl && (
                    <div className="absolute inset-0">
                        <img
                            src={heroBackgroundImageUrl}
                            alt="Hero background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        {heroHeadline || 'Welcome'}
                    </h1>
                    {heroDescription && (
                        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                            {heroDescription}
                        </p>
                    )}
                    {heroButtonText && (
                        <Button
                            size="lg"
                            className="text-lg px-8 py-6"
                            style={{ backgroundColor: themeColor }}
                            asChild
                        >
                            <a href={heroButtonUrl || '#'}>{heroButtonText}</a>
                        </Button>
                    )}
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg
                        className="w-6 h-6 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>
        );
    }

    // Split screen layout
    if (heroLayoutStyle === 'split-screen') {
        return (
            <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative min-h-[50vh] lg:min-h-screen">
                    {heroBackgroundImageUrl && (
                        <img
                            src={heroBackgroundImageUrl}
                            alt="Hero background"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Content Side */}
                <div className="flex items-center justify-center p-8 lg:p-16 bg-gray-900">
                    <div className="max-w-lg">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            {heroHeadline || 'Welcome'}
                        </h1>
                        {heroDescription && (
                            <p className="text-lg text-gray-300 mb-8">
                                {heroDescription}
                            </p>
                        )}
                        {heroButtonText && (
                            <Button
                                size="lg"
                                className="text-lg px-8 py-6"
                                style={{ backgroundColor: themeColor }}
                                asChild
                            >
                                <a href={heroButtonUrl || '#'}>{heroButtonText}</a>
                            </Button>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // Mobile showcase layout
    if (heroLayoutStyle === 'mobile-showcase') {
        return (
            <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
                </div>

                <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            {heroHeadline || 'Welcome'}
                        </h1>
                        {heroDescription && (
                            <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                                {heroDescription}
                            </p>
                        )}
                        {heroButtonText && (
                            <Button
                                size="lg"
                                className="text-lg px-8 py-6"
                                style={{ backgroundColor: themeColor }}
                                asChild
                            >
                                <a href={heroButtonUrl || '#'}>{heroButtonText}</a>
                            </Button>
                        )}
                    </div>

                    {/* Phone mockup */}
                    <div className="flex justify-center">
                        <div className="relative w-64 h-[500px] bg-black rounded-[3rem] p-2 shadow-2xl">
                            <div className="w-full h-full bg-gray-100 rounded-[2.5rem] overflow-hidden">
                                {heroBackgroundImageUrl && (
                                    <img
                                        src={heroBackgroundImageUrl}
                                        alt="App preview"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Cinematic slider (simplified, shows first image)
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {heroBackgroundImageUrl && (
                <div className="absolute inset-0">
                    <img
                        src={heroBackgroundImageUrl}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            )}

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    {heroHeadline || 'Welcome'}
                </h1>
                {heroDescription && (
                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {heroDescription}
                    </p>
                )}
                {heroButtonText && (
                    <Button
                        size="lg"
                        className="text-lg px-8 py-6"
                        style={{ backgroundColor: themeColor }}
                        asChild
                    >
                        <a href={heroButtonUrl || '#'}>{heroButtonText}</a>
                    </Button>
                )}
            </div>
        </section>
    );
}
