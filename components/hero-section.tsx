'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { SliderSettings } from '@/lib/app-landing-editor-schema';

interface HeroSectionProps {
    headline?: string;
    description?: string;
    buttonText?: string;
    backgroundImageUrl?: string;
    layoutStyle?: 'cinematic-center' | 'split-screen' | 'mobile-showcase' | 'cinematic-slider';
    sliderImages?: string[];
    sliderSettings?: SliderSettings;
}

const defaultSliderSettings: SliderSettings = {
    slideDuration: 5,
    transitionEffect: 'fade',
    showDots: true,
    overlayOpacity: 50,
    pauseOnHover: true
};

export function HeroSection({
    headline = 'Your Venue, Your Vibe, Your Success',
    description = 'VenueVibe provides the ultimate toolkit for nightclubs, bars, and restaurants to create stunning, interactive landing pages.',
    buttonText = 'Get Started Now',
    backgroundImageUrl = '/hero-background.jpg',
    layoutStyle = 'cinematic-center',
    sliderImages = [],
    sliderSettings = defaultSliderSettings
}: HeroSectionProps) {

    // Cinematic Center - Full screen background, centered text
    if (layoutStyle === 'cinematic-center') {
        return (
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {headline}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <Link href="/get-started">
                        <Button
                            size="lg"
                            className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            {buttonText}
                        </Button>
                    </Link>
                </div>
            </section>
        );
    }

    // Split Screen - Text on left, feature image on right
    if (layoutStyle === 'split-screen') {
        return (
            <section className="relative min-h-[500px] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left - Text Content */}
                        <div className="text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                {headline}
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 mb-8">
                                {description}
                            </p>
                            <Link href="/get-started">
                                <Button
                                    size="lg"
                                    className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    {buttonText}
                                </Button>
                            </Link>
                        </div>
                        {/* Right - Feature Image */}
                        <div className="relative hidden md:block">
                            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Mobile Showcase - Phone mockup frame with centered text
    if (layoutStyle === 'mobile-showcase') {
        return (
            <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_50%)]" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Text Content */}
                        <div className="text-center lg:text-left lg:flex-1">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                {headline}
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">
                                {description}
                            </p>
                            <Link href="/get-started">
                                <Button
                                    size="lg"
                                    className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    {buttonText}
                                </Button>
                            </Link>
                        </div>
                        {/* Phone Mockup */}
                        <div className="relative flex-shrink-0">
                            <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                                {/* Phone notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />
                                {/* Phone screen */}
                                <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                                    />
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400/30 rounded-full blur-xl" />
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-pink-400/30 rounded-full blur-xl" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Cinematic Slider - Rotating background images with overlay text
    if (layoutStyle === 'cinematic-slider') {
        return <CinematicSliderHero
            headline={headline}
            description={description}
            buttonText={buttonText}
            backgroundImageUrl={backgroundImageUrl}
            sliderImages={sliderImages}
            sliderSettings={sliderSettings}
        />;
    }

    // Default fallback
    return null;
}

// Separate component for slider to use hooks
function CinematicSliderHero({
    headline,
    description,
    buttonText,
    backgroundImageUrl,
    sliderImages = [],
    sliderSettings = defaultSliderSettings
}: {
    headline: string;
    description: string;
    buttonText: string;
    backgroundImageUrl: string;
    sliderImages?: string[];
    sliderSettings?: SliderSettings;
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Use provided slider images, or fall back to background image
    const slides = sliderImages.length > 0
        ? sliderImages.filter(Boolean)
        : [backgroundImageUrl].filter(Boolean);

    const { slideDuration, transitionEffect, showDots, overlayOpacity, pauseOnHover } = sliderSettings;

    useEffect(() => {
        if (isPaused && pauseOnHover) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, slideDuration * 1000);
        return () => clearInterval(interval);
    }, [slides.length, slideDuration, isPaused, pauseOnHover]);

    // Get transition classes based on effect
    const getTransitionClasses = (isActive: boolean) => {
        const baseClasses = 'absolute inset-0';

        switch (transitionEffect) {
            case 'fade':
                return `${baseClasses} transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`;
            case 'slide':
                return `${baseClasses} transition-transform duration-1000 ${isActive ? 'translate-x-0' : 'translate-x-full'}`;
            case 'zoom':
                return `${baseClasses} transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`;
            default:
                return `${baseClasses} transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`;
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-[600px] flex items-center justify-center overflow-hidden"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            {/* Sliding backgrounds */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={getTransitionClasses(index === currentSlide)}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: `url(${slide})` }}
                    />
                </div>
            ))}

            {/* Overlay with dynamic opacity */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
                    {headline}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    {description}
                </p>
                <Link href="/get-started">
                    <Button
                        size="lg"
                        className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        {buttonText}
                    </Button>
                </Link>
            </div>

            {/* Slide indicators - conditionally rendered */}
            {showDots && slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Pause indicator */}
            {isPaused && pauseOnHover && (
                <div className="absolute top-4 right-4 z-20 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Paused
                </div>
            )}
        </section>
    );
}
