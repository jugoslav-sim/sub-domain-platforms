import Link from 'next/link';
import { FeatureCard } from './feature-card';
import { QrCode, ScanText, Paintbrush, Calendar, Waves, Camera } from 'lucide-react';

export function FeaturesSection() {
    const features = [
        {
            icon: QrCode,
            title: 'QR Code Generation',
            description: 'Generate unique QR codes for your venue page.',
            href: '/qr-code-generation',
        },
        {
            icon: ScanText,
            title: 'AI Menu Scanner',
            description: 'Instantly digitize your physical menu.',
            href: '/ai-menu-scanner',
        },
        {
            icon: Paintbrush,
            title: 'Personal Branding',
            description: 'Customize your page with your logo and colors.',
            href: '/branding',
        },
        {
            icon: Calendar,
            title: 'Events',
            description: 'Showcase your events for guests to see.',
            href: '/events',
        },
        {
            icon: Waves,
            title: 'Rentals',
            description: 'Post rentals like VIP booths.',
            href: '/rentals',
        },
        {
            icon: Camera,
            title: 'Photo Booth',
            description: 'Engage customers with a branded photo booth.',
            href: '/photo-booth',
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Badge */}
                <div className="flex justify-center mb-4">
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        Key Features
                    </span>
                </div>

                {/* Section Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
                    Everything You Need to Shine
                </h2>
                <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
                    From AI-powered tools to complete customization, VenueVibe helps you create an unforgettable
                    online presence.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {features.map((feature, index) => {
                        const Card = (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        );

                        if (feature.href) {
                            return (
                                <Link key={index} href={feature.href} className="block h-full">
                                    {Card}
                                </Link>
                            );
                        }

                        return Card;
                    })}
                </div>
            </div>
        </section>
    );
}
