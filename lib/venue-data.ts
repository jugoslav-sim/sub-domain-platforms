import { redis } from '@/lib/redis';
import { createClient } from '@/lib/auth/server';
import { venueService } from '@/lib/db/venues';
import { galleryService } from '@/lib/db/venue-gallery';
import { menuService } from '@/lib/db/venue-menu-items';
import { eventService } from '@/lib/db/venue-events';
import { testimonialService } from '@/lib/db/venue-testimonials';
import { VenueEditorData } from '@/lib/venue-editor-schema';

export const VENUE_CACHE_TTL = 3600; // 1 hour

export async function getVenueByTag(tag: string): Promise<VenueEditorData | null> {
    const cacheKey = `venue-cache:${tag}`;

    // 1. Try Cache
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
        return cachedData as VenueEditorData;
    }

    // 2. Fetch from Supabase
    try {
        const supabase = await createClient();
        const venue = await venueService.getByTag(supabase, tag);
        if (!venue) return null;

        // Fetch related data in parallel
        const [gallery, menu, events, testimonials] = await Promise.all([
            galleryService.getAll(supabase, venue.id),
            menuService.getAll(supabase, venue.id),
            eventService.getAll(supabase, venue.id),
            testimonialService.getAll(supabase, venue.id)
        ]);

        // 3. Construct VenueEditorData
        const venueData: VenueEditorData = {
            // Profile
            venueName: venue.name,
            ...venue.profile_data as any,

            // Hero
            ...venue.hero_data as any,

            // Branding
            ...venue.branding_data as any,

            // Layout
            ...venue.layout_data as any,

            // SEO
            ...venue.seo_data as any,

            // Location & Hours
            location: venue.location_data as any,
            hours: venue.hours_data as any,

            // Social & Music
            socialLinks: venue.social_data as any,
            ...venue.music_data as any,

            // Content
            galleryImages: gallery?.map(g => ({
                id: g.id,
                url: g.url,
                alt: g.alt_text || '',
                order: g.sort_order
            })) ?? [],

            menuItems: menu?.map(m => ({
                id: m.id,
                name: m.name,
                description: m.description || '',
                price: m.price?.toString() || '',
                imageUrl: m.image_url || undefined,
                category: m.category,
                isSignature: m.is_signature
            })) ?? [],
            menuCategories: Array.from(new Set(menu?.map(m => m.category) ?? [])),

            events: events?.map(e => ({
                id: e.id,
                title: e.name,
                description: e.description || '',
                date: new Date(e.start_time).toLocaleDateString(), // simplified formatting
                time: new Date(e.start_time).toLocaleTimeString(),
                imageUrl: e.image_url || undefined,
                ticketUrl: e.ticket_url || undefined
            })) ?? [],

            testimonials: testimonials?.map(t => ({
                id: t.id,
                author: t.author_name,
                role: t.author_role || undefined,
                content: t.content,
                rating: t.rating,
                avatarUrl: t.avatar_url || undefined
            })) ?? []
        };

        // 4. Cache Result
        await redis.set(cacheKey, venueData, { ex: VENUE_CACHE_TTL });

        return venueData;
    } catch (error) {
        console.error(`Failed to fetch venue data for tag ${tag}:`, error);
        return null;
    }
}

export async function invalidateVenueCache(tag: string) {
    await redis.del(`venue-cache:${tag}`);
}
