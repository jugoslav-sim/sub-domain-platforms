'use server';

import { venueService } from '@/lib/db/venues';
import { galleryService } from '@/lib/db/venue-gallery';
import { menuService } from '@/lib/db/venue-menu-items';
import { eventService } from '@/lib/db/venue-events';
import { testimonialService } from '@/lib/db/venue-testimonials';
import { invalidateVenueCache } from '@/lib/venue-data';
import { VenueEditorData } from '@/lib/venue-editor-schema';
import { revalidatePath } from 'next/cache';

// Hardcoded tag for this phase, or passed from context
const CURRENT_VENUE_TAG = 'venuvibes';

export async function saveVenueAction(data: VenueEditorData) {
    try {
        // 1. Get Venue ID (assuming single venue for now)
        // In real app, we might pass ID or get from session
        const venue = await venueService.getByTag(CURRENT_VENUE_TAG);

        if (!venue) {
            return { success: false, error: 'Venue not found' };
        }

        const venueId = venue.id;

        // 2. Update Core Config (JSONBs)
        await venueService.update(venueId, {
            name: data.venueName,
            profile_data: {
                venueName: data.venueName,
                venueType: data.venueType,
                themeColor: data.themeColor,
                coverImageUrl: data.coverImageUrl,
                tagline: data.tagline,
                vibeKeywords: data.vibeKeywords,
                description: data.description
            },
            hero_data: {
                heroHeadline: data.heroHeadline,
                heroDescription: data.heroDescription,
                heroButtonText: data.heroButtonText,
                heroButtonUrl: data.heroButtonUrl,
                heroLayoutStyle: data.heroLayoutStyle,
                heroBackgroundImageUrl: data.heroBackgroundImageUrl
            },
            branding_data: {
                logo: data.logo,
                brandColors: data.brandColors
            },
            layout_data: {
                layoutStyle: data.layoutStyle,
                highlights: data.highlights
            },
            seo_data: {
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                metaKeywords: data.metaKeywords
            },
            location_data: data.location as unknown as any,
            hours_data: data.hours as unknown as any,
            social_data: data.socialLinks as unknown as any,
            music_data: {
                spotifyPlaylistUrl: data.spotifyPlaylistUrl,
                atmosphereDescription: data.atmosphereDescription
            }
        });

        // 3. Update Relations (Gallery, Menu, Events, Testimonials)
        // Using "Delete All -> Insert All" strategy for simplicity and guaranteed sequencing.

        // Gallery
        await galleryService.deleteAll(venueId);
        if (data.galleryImages?.length > 0) {
            await Promise.all(data.galleryImages.map(img =>
                galleryService.add({
                    venue_id: venueId,
                    url: img.url,
                    alt_text: img.alt,
                    sort_order: img.order
                })
            ));
        }

        // Menu
        await menuService.deleteAll(venueId);
        if (data.menuItems?.length > 0) {
            await Promise.all(data.menuItems.map((item, index) =>
                menuService.add({
                    venue_id: venueId,
                    name: item.name,
                    description: item.description,
                    price: parseFloat(item.price) || 0,
                    category: item.category,
                    image_url: item.imageUrl,
                    is_signature: item.isSignature,
                    sort_order: index, // assuming array order is sort order
                    is_available: true
                })
            ));
        }

        // Events
        await eventService.deleteAll(venueId);
        if (data.events?.length > 0) {
            await Promise.all(data.events.map(event => {
                // Parse date/time strings roughly: date="MM/DD/YYYY", time="HH:MM AM/PM"
                const eventDate = new Date(`${event.date} ${event.time}`);
                const startTime = !isNaN(eventDate.getTime()) ? eventDate.toISOString() : new Date().toISOString();

                return eventService.add({
                    venue_id: venueId,
                    name: event.title,
                    description: event.description,
                    start_time: startTime,
                    image_url: event.imageUrl,
                    ticket_url: event.ticketUrl,
                    is_published: true
                });
            }));
        }

        // Testimonials
        await testimonialService.deleteAll(venueId);
        if (data.testimonials?.length > 0) {
            await Promise.all(data.testimonials.map(t =>
                testimonialService.add({
                    venue_id: venueId,
                    author_name: t.author,
                    author_role: t.role,
                    content: t.content,
                    rating: t.rating,
                    avatar_url: t.avatarUrl
                })
            ));
        }

    } catch (error: any) {
        console.error("Save error details:", {
            message: error?.message,
            code: error?.code,
            details: error?.details,
            hint: error?.hint,
            stack: error?.stack
        });
        return { success: false, error: error?.message || 'Failed to save changes' };
    }

    // Invalidate Cache
    await invalidateVenueCache(CURRENT_VENUE_TAG);
    revalidatePath('/s/[subdomain]');

    return { success: true };
}
