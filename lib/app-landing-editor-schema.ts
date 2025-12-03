export interface AppLandingEditorData {
    // Hero Tab
    heroHeadline: string;
    heroDescription: string;
    heroButtonText: string;
    heroLayoutStyle: 'cinematic-center' | 'split-screen' | 'mobile-showcase' | 'cinematic-slider';
    heroBackgroundImageUrl: string;

    // Features Tab (future)
    features?: string[];

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

export const defaultAppLandingData: AppLandingEditorData = {
    heroHeadline: '',
    heroDescription: '',
    heroButtonText: 'Get Started Now',
    heroLayoutStyle: 'cinematic-center',
    heroBackgroundImageUrl: ''
};
