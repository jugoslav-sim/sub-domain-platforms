export interface VenueLocation {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface VenueHours {
    day: string;
    open: string;
    close: string;
    isClosed: boolean;
}

export interface GalleryImage {
    id: string;
    url: string;
    alt: string;
    order: number;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl?: string;
    category: string;
    isSignature: boolean;
}

export interface VenueEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    imageUrl?: string;
    ticketUrl?: string;
}

export interface Testimonial {
    id: string;
    author: string;
    role?: string;
    content: string;
    rating: number;
    avatarUrl?: string;
}

export interface SocialLinks {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
}

export interface VenueEditorData {
    // Profile Tab
    venueName: string;
    venueType: string;
    themeColor: string;
    coverImageUrl: string;
    tagline: string;
    vibeKeywords: string; // Comma separated string for input
    description: string;

    // Hero Tab
    heroHeadline: string;
    heroDescription: string;
    heroButtonText: string;
    heroButtonUrl: string;
    heroLayoutStyle: 'cinematic-center' | 'split-screen' | 'mobile-showcase' | 'cinematic-slider';
    heroBackgroundImageUrl: string;

    // Location & Hours
    location: VenueLocation;
    hours: VenueHours[];

    // Gallery
    galleryImages: GalleryImage[];

    // Menu
    menuItems: MenuItem[];
    menuCategories: string[];

    // Events
    events: VenueEvent[];

    // Testimonials
    testimonials: Testimonial[];

    // Music/Atmosphere
    spotifyPlaylistUrl?: string;
    atmosphereDescription?: string;

    // Social Links
    socialLinks: SocialLinks;

    // Highlights Tab (future)
    highlights?: string[];

    // Branding Tab (future)
    logo?: string;
    brandColors?: string[];

    // Layout Tab (future)
    layoutStyle?: string;

    // SEO Tab (future)
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
}

export const defaultVenueData: VenueEditorData = {
    venueName: '',
    venueType: '',
    themeColor: '#6366f1',
    coverImageUrl: '',
    tagline: '',
    vibeKeywords: '',
    description: '',
    heroHeadline: '',
    heroDescription: '',
    heroButtonText: 'Book a Table',
    heroButtonUrl: '#',
    heroLayoutStyle: 'cinematic-center',
    heroBackgroundImageUrl: '',
    location: {
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    },
    hours: [],
    galleryImages: [],
    menuItems: [],
    menuCategories: [],
    events: [],
    testimonials: [],
    socialLinks: {}
};
