export type VenueEditorData = {
    // Identity
    id?: string;
    tag: string;
    name: string;
    venueType?: string;
    emoji?: string;

    // Config stored as JSON
    profileData?: any;
    heroData?: any;
    brandingData?: any;
    layoutData?: any;
    seoData?: any;
    locationData?: any;
    hoursData?: any;
    socialData?: any;
    musicData?: any;

    isPublished?: boolean;
};

export type VenueContent = {
    id?: string;
    venueId: string;
    contentType: 'gallery' | 'menu_item' | 'event' | 'testimonial';
    data: any;
    sortOrder: number;
    isVisible: boolean;
};

// Application System Config
export type AppConfig = {
    key: string;
    value: any;
};
