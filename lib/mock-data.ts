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
