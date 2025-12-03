export interface Feature {
    id: string;
    icon: string; // Lucide icon name
    title: string;
    description: string;
    order: number;
}

export interface BrandingColors {
    primary: string;
    secondary: string;
    accent: string;
}

export interface Typography {
    headingFont: string;
    bodyFont: string;
    fontSizes: {
        h1: number;
        h2: number;
        h3: number;
        body: number;
    };
}

export interface Branding {
    logoUrl: string;
    logoWidth: number;
    logoPosition: 'left' | 'center' | 'right';
    colors: BrandingColors;
    typography: Typography;
}

export interface PageSection {
    id: string;
    type: 'hero' | 'features' | 'process' | 'cta' | 'testimonials' | 'pricing';
    name: string;
    visible: boolean;
    order: number;
}

export interface NavigationLink {
    id: string;
    label: string;
    href: string;
    order: number;
}

export interface NavigationSettings {
    style: 'sticky' | 'transparent' | 'solid';
    links: NavigationLink[];
    showCTA: boolean;
    ctaText: string;
    ctaHref: string;
}

export interface LayoutConfig {
    sections: PageSection[];
    navigation: NavigationSettings;
}

export interface SEOConfig {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
}

export interface AppLandingEditorData {
    // Hero Tab
    heroHeadline: string;
    heroDescription: string;
    heroButtonText: string;
    heroLayoutStyle: 'cinematic-center' | 'split-screen' | 'mobile-showcase' | 'cinematic-slider';
    heroBackgroundImageUrl: string;

    // Features Tab
    features: Feature[];
    featuresLayoutStyle: '3-column' | '4-column' | 'icon-list' | 'feature-cards';

    // Branding Tab
    branding: Branding;

    // Layout Tab
    layout: LayoutConfig;

    // SEO Tab
    seo: SEOConfig;
}

export const defaultAppLandingData: AppLandingEditorData = {
    heroHeadline: '',
    heroDescription: '',
    heroButtonText: 'Get Started Now',
    heroLayoutStyle: 'cinematic-center',
    heroBackgroundImageUrl: '',
    features: [],
    featuresLayoutStyle: '3-column',
    branding: {
        logoUrl: '',
        logoWidth: 120,
        logoPosition: 'left',
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
    layout: {
        sections: [
            { id: '1', type: 'hero', name: 'Hero Section', visible: true, order: 1 },
            { id: '2', type: 'features', name: 'Features', visible: true, order: 2 },
            { id: '3', type: 'process', name: 'Process Steps', visible: true, order: 3 },
            { id: '4', type: 'cta', name: 'Call to Action', visible: true, order: 4 }
        ],
        navigation: {
            style: 'sticky',
            links: [
                { id: '1', label: 'Features', href: '#features', order: 1 },
                { id: '2', label: 'Pricing', href: '#pricing', order: 2 },
                { id: '3', label: 'About', href: '#about', order: 3 }
            ],
            showCTA: true,
            ctaText: 'Get Started',
            ctaHref: '/signup'
        }
    },
    seo: {
        metaTitle: '',
        metaDescription: '',
        metaKeywords: [],
        ogImage: '',
        ogTitle: '',
        ogDescription: ''
    }
};
