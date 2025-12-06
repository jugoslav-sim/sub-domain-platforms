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
    heroButtonUrl: '#location',
    heroLayoutStyle: 'cinematic-center' as const,
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1570572225388-755e88447d61?auto=format&fit=crop&w=1600&q=80',

    // Location & Hours
    location: {
        address: '123 Sky Tower, 50th Floor',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
    },
    hours: [
        { day: 'Monday', open: '5:00 PM', close: '12:00 AM', isClosed: false },
        { day: 'Tuesday', open: '5:00 PM', close: '12:00 AM', isClosed: false },
        { day: 'Wednesday', open: '5:00 PM', close: '12:00 AM', isClosed: false },
        { day: 'Thursday', open: '5:00 PM', close: '1:00 AM', isClosed: false },
        { day: 'Friday', open: '4:00 PM', close: '2:00 AM', isClosed: false },
        { day: 'Saturday', open: '4:00 PM', close: '2:00 AM', isClosed: false },
        { day: 'Sunday', open: '4:00 PM', close: '11:00 PM', isClosed: false }
    ],

    // Gallery
    galleryImages: [
        { id: '1', url: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80', alt: 'Rooftop view at sunset', order: 1 },
        { id: '2', url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80', alt: 'Bar interior', order: 2 },
        { id: '3', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', alt: 'Signature cocktail', order: 3 },
        { id: '4', url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80', alt: 'Night atmosphere', order: 4 },
        { id: '5', url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=800&q=80', alt: 'Lounge seating', order: 5 },
        { id: '6', url: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=800&q=80', alt: 'DJ booth', order: 6 }
    ],

    // Menu
    menuCategories: ['Signature Cocktails', 'Classic Cocktails', 'Wine & Champagne', 'Small Plates'],
    menuItems: [
        { id: '1', name: 'Cloud Nine', description: 'Vodka, elderflower, champagne, lemon zest, edible gold', price: '$24', category: 'Signature Cocktails', isSignature: true, imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80' },
        { id: '2', name: 'Sunset Boulevard', description: 'Tequila, blood orange, agave, chili rim', price: '$22', category: 'Signature Cocktails', isSignature: true, imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=400&q=80' },
        { id: '3', name: 'Midnight Velvet', description: 'Bourbon, blackberry, vanilla, activated charcoal', price: '$23', category: 'Signature Cocktails', isSignature: true, imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80' },
        { id: '4', name: 'Old Fashioned', description: 'Bourbon, bitters, orange, cherry', price: '$18', category: 'Classic Cocktails', isSignature: false },
        { id: '5', name: 'Negroni', description: 'Gin, Campari, sweet vermouth', price: '$17', category: 'Classic Cocktails', isSignature: false },
        { id: '6', name: 'Espresso Martini', description: 'Vodka, Kahlúa, fresh espresso', price: '$19', category: 'Classic Cocktails', isSignature: false },
        { id: '7', name: 'Truffle Fries', description: 'Hand-cut fries, truffle oil, parmesan, herbs', price: '$16', category: 'Small Plates', isSignature: false },
        { id: '8', name: 'Oysters', description: 'Half dozen, mignonette, lemon', price: '$28', category: 'Small Plates', isSignature: false }
    ],

    // Events
    events: [
        { id: '1', title: 'Sunset Sessions', description: 'Live DJ set with the best sunset views in the city. Featuring deep house and chill vibes.', date: '2025-12-14', time: '6:00 PM - 10:00 PM', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80', ticketUrl: '#' },
        { id: '2', title: 'Jazz & Champagne Night', description: 'Live jazz trio with complimentary champagne for the first 50 guests.', date: '2025-12-21', time: '8:00 PM - 12:00 AM', imageUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=600&q=80', ticketUrl: '#' },
        { id: '3', title: 'New Year\'s Eve Gala', description: 'Ring in the new year above the city skyline. Black tie. Open bar. Fireworks view.', date: '2025-12-31', time: '9:00 PM - 3:00 AM', imageUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=600&q=80', ticketUrl: '#' }
    ],

    // Testimonials
    testimonials: [
        { id: '1', author: 'Sarah M.', role: 'NYC Local', content: 'Absolutely stunning views and the cocktails are incredible. The Cloud Nine is a must-try! Perfect for date nights.', rating: 5 },
        { id: '2', author: 'James L.', role: 'Travel Blogger', content: 'One of the best rooftop bars I\'ve visited anywhere in the world. The atmosphere is unmatched.', rating: 5 },
        { id: '3', author: 'Emily R.', role: 'Food & Drink Critic', content: 'The attention to detail in both the drinks and the ambiance is remarkable. A true gem in the NYC nightlife scene.', rating: 5 },
        { id: '4', author: 'Michael T.', content: 'Great music, amazing views, friendly staff. What more could you ask for? Will definitely be back.', rating: 4 }
    ],

    // Music
    spotifyPlaylistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXa8NOEUWPn9W',
    atmosphereDescription: 'Immerse yourself in carefully curated deep house and chill electronic beats that perfectly complement the panoramic city views.',

    // Social
    socialLinks: {
        instagram: 'https://instagram.com/thecloudlounge',
        facebook: 'https://facebook.com/thecloudlounge',
        tiktok: 'https://tiktok.com/@thecloudlounge'
    }
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
