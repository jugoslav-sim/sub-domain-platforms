import { VenueEditorData } from '@/lib/venue-editor-schema';
import { VenueHero } from './venue-hero';
import { VenueAbout } from './venue-about';
import { VenueLocation } from './venue-location';
import { VenueGallery } from './venue-gallery';
import { VenueMenu } from './venue-menu';
import { VenueEvents } from './venue-events';
import { VenueTestimonials } from './venue-testimonials';
import { VenueMusic } from './venue-music';
import { VenueSocial } from './venue-social';
import { VenueFooter } from './venue-footer';

interface VenueLandingPageProps {
    data: VenueEditorData;
}

export function VenueLandingPage({ data }: VenueLandingPageProps) {
    return (
        <div className="min-h-screen">
            {/* Hero - Always first */}
            <VenueHero data={data} />

            {/* About Section */}
            <VenueAbout data={data} />

            {/* Photo Gallery */}
            <VenueGallery data={data} />

            {/* Menu Showcase */}
            <VenueMenu data={data} />

            {/* Upcoming Events */}
            <VenueEvents data={data} />

            {/* Music/Atmosphere */}
            <VenueMusic data={data} />

            {/* Testimonials */}
            <VenueTestimonials data={data} />

            {/* Location & Hours */}
            <VenueLocation data={data} />

            {/* Social Links */}
            <VenueSocial data={data} />

            {/* Footer */}
            <VenueFooter data={data} />
        </div>
    );
}
