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
    heroLayoutStyle: 'cinematic-center' | 'split-screen' | 'mobile-showcase' | 'cinematic-slider';
    heroBackgroundImageUrl: string;

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
    heroLayoutStyle: 'cinematic-center',
    heroBackgroundImageUrl: ''
};
