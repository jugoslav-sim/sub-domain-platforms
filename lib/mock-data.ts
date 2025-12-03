export const dashboardMetrics = {
    totalVisitors: {
        value: 1240,
        trend: 25,
        isPositive: true,
        label: 'vs last week'
    },
    vibeScore: {
        value: 92,
        unit: '/100',
        trend: 8,
        isPositive: true,
        label: 'vs last week'
    },
    revenue: {
        value: 14320,
        currency: '$',
        trend: 8,
        isPositive: true,
        label: 'vs last week'
    },
    avgSpend: {
        value: 45,
        currency: '$',
        trend: 25,
        isPositive: true,
        label: 'vs last week'
    }
};

export const visitorTrendsData = [
    { day: 'Mon', visitors: 150 },
    { day: 'Tue', visitors: 180 },
    { day: 'Wed', visitors: 280 },
    { day: 'Thu', visitors: 350 },
    { day: 'Fri', visitors: 450 },
    { day: 'Sat', visitors: 480 },
    { day: 'Sun', visitors: 320 }
];

export const sentimentData = [
    { day: 'Mon', score: 85 },
    { day: 'Tue', score: 88 },
    { day: 'Wed', score: 92 },
    { day: 'Thu', score: 95 },
    { day: 'Fri', score: 98 },
    { day: 'Sat', score: 96 },
    { day: 'Sun', score: 94 }
];

export const currentVenue = {
    name: 'The Cloud Lounge',
    tag: 'thecloudlounge',
    avatar: '☁️'
};

export const venueTypes = [
    'Rooftop Bar',
    'Nightclub',
    'Restaurant',
    'Lounge',
    'Event Space',
    'Concert Hall',
    'Wedding Venue'
];

export const themeColors = [
    '#6366f1', // Indigo
    '#ec4899', // Pink
    '#8b5cf6', // Violet
    '#ef4444', // Red
    '#f97316', // Orange
    '#eab308', // Yellow
    '#22c55e', // Green
    '#06b6d4', // Cyan
    '#3b82f6', // Blue
    '#14b8a6', // Teal
];

export const mockVenueEditorData = {
    venueName: 'The Cloud Lounge',
    venueType: 'Rooftop Bar',
    themeColor: '#6366f1',
    coverImageUrl: 'https://images.unsplash.com/photo-1519671482502-9759101d4561?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Elevate your senses above the city.',
    vibeKeywords: 'Chill, Luxury, Sunset, House Music',
    description: 'Experience the ultimate sunset views paired with artisanal cocktails and chill lo-fi beats. A sanctuary in the sky for modern spirits.',
    heroHeadline: 'Elevate Your Night',
    heroDescription: 'Experience the best views, cocktails, and music in the city. Welcome to The Cloud Lounge.',
    heroButtonText: 'Book a Table',
    heroLayoutStyle: 'cinematic-center',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1570572225388-755e88447d61?auto=format&fit=crop&w=1600&q=80'
};

export const mockAppLandingEditorData = {
    // Hero Tab
    heroHeadline: 'Your Venue, Your Vibe, Your Success',
    heroDescription: 'VenueVibe provides the ultimate toolkit for nightclubs, bars, and restaurants to create stunning, interactive landing pages that capture your unique atmosphere.',
    heroButtonText: 'Get Started Now',
    heroLayoutStyle: 'cinematic-center' as const,
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80',

    // Features Tab
    features: [
        {
            id: '1',
            icon: 'Zap',
            title: 'Lightning Fast Setup',
            description: 'Build your perfect venue landing page in minutes, not hours. Our intuitive editor makes it easy.',
            order: 1
        },
        {
            id: '2',
            icon: 'Palette',
            title: 'Fully Customizable',
            description: 'Match your brand colors, upload your logo, and customize every aspect of your page.',
            order: 2
        },
        {
            id: '3',
            icon: 'Smartphone',
            title: 'Mobile Optimized',
            description: 'Your landing page looks stunning on every device - desktop, tablet, and mobile.',
            order: 3
        },
        {
            id: '4',
            icon: 'TrendingUp',
            title: 'Analytics Included',
            description: 'Track visitors, engagement, and conversion rates with built-in analytics.',
            order: 4
        },
        {
            id: '5',
            icon: 'Shield',
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security and 99.9% uptime guarantee for your peace of mind.',
            order: 5
        },
        {
            id: '6',
            icon: 'Users',
            title: 'Customer Support',
            description: '24/7 dedicated support team ready to help you succeed with your venue.',
            order: 6
        }
    ],
    featuresLayoutStyle: '3-column' as const,

    // Branding Tab
    branding: {
        logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
        logoWidth: 140,
        logoPosition: 'left' as const,
        colors: {
            primary: '#6366f1',
            secondary: '#ec4899',
            accent: '#8b5cf6'
        },
        typography: {
            headingFont: 'Inter',
            bodyFont: 'Inter',
            fontSizes: {
                h1: 48,
                h2: 36,
                h3: 24,
                body: 16
            }
        }
    },

    // Layout Tab
    layout: {
        sections: [
            { id: '1', type: 'hero' as const, name: 'Hero Section', visible: true, order: 1 },
            { id: '2', type: 'features' as const, name: 'Features', visible: true, order: 2 },
            { id: '3', type: 'process' as const, name: 'Process Steps', visible: true, order: 3 },
            { id: '4', type: 'cta' as const, name: 'Call to Action', visible: true, order: 4 },
            { id: '5', type: 'testimonials' as const, name: 'Testimonials', visible: false, order: 5 },
            { id: '6', type: 'pricing' as const, name: 'Pricing', visible: false, order: 6 }
        ],
        navigation: {
            style: 'sticky' as const,
            links: [
                { id: '1', label: 'Features', href: '#features', order: 1 },
                { id: '2', label: 'Pricing', href: '#pricing', order: 2 },
                { id: '3', label: 'About', href: '#about', order: 3 },
                { id: '4', label: 'Contact', href: '#contact', order: 4 }
            ],
            showCTA: true,
            ctaText: 'Get Started',
            ctaHref: '/signup'
        }
    },

    // SEO Tab
    seo: {
        metaTitle: 'VenueVibe - Your Venue, Your Vibe, Your Success',
        metaDescription: 'Create stunning landing pages for your nightclub, bar, or restaurant. VenueVibe provides the ultimate toolkit for venue marketing.',
        metaKeywords: ['venue management', 'landing page', 'nightclub', 'bar', 'restaurant'],
        ogImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
        ogTitle: 'VenueVibe - Landing Page Builder for Venues',
        ogDescription: 'Build beautiful, high-converting landing pages for your venue in minutes.'
    }
};
