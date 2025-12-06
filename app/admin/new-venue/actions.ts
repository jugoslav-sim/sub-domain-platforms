'use server';

import { createClient } from '@/lib/auth/server';
import { revalidatePath } from 'next/cache';

export interface CreateVenueInput {
    name: string;
    tag: string;
    venueType: string;
}

export async function createVenueAction(input: CreateVenueInput) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Not authenticated' };
    }

    // Validate tag (alphanumeric, lowercase, hyphens only)
    const tagRegex = /^[a-z0-9-]+$/;
    if (!tagRegex.test(input.tag)) {
        return { success: false, error: 'Tag must be lowercase letters, numbers, and hyphens only' };
    }

    if (input.tag.length < 3 || input.tag.length > 30) {
        return { success: false, error: 'Tag must be between 3 and 30 characters' };
    }

    try {
        // Check if tag already exists
        const { data: existingVenue } = await supabase
            .from('venues')
            .select('id')
            .eq('tag', input.tag)
            .single();

        if (existingVenue) {
            return { success: false, error: 'This venue tag is already taken' };
        }

        // Create the venue
        const { data: venue, error: venueError } = await supabase
            .from('venues')
            .insert({
                name: input.name,
                tag: input.tag,
                profile_data: {
                    venueName: input.name,
                    venueType: input.venueType,
                    themeColor: '#6366f1',
                    coverImageUrl: '',
                    tagline: '',
                    vibeKeywords: '',
                    description: ''
                },
                hero_data: {
                    heroHeadline: '',
                    heroDescription: '',
                    heroButtonText: 'Book a Table',
                    heroButtonUrl: '#',
                    heroLayoutStyle: 'cinematic-center',
                    heroBackgroundImageUrl: ''
                },
                branding_data: {
                    themeColor: '#6366f1', // Ensure this is set for initial load
                },
                layout_data: {},
                seo_data: {},
                location_data: {
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: ''
                },
                hours_data: [],
                social_data: {},
                music_data: {}
            })
            .select()
            .single();

        if (venueError) {
            console.error('Venue creation error:', venueError);
            return { success: false, error: venueError.message };
        }

        // Add user as owner in venue_members
        const { error: memberError } = await supabase
            .from('venue_members')
            .insert({
                venue_id: venue.id,
                user_id: user.id,
                role: 'owner'
            });

        if (memberError) {
            console.error('Member creation error:', memberError);
            // Rollback: delete the venue if member creation fails
            await supabase.from('venues').delete().eq('id', venue.id);
            return { success: false, error: 'Failed to set up venue ownership' };
        }

        revalidatePath('/admin');

        return {
            success: true,
            venue: {
                id: venue.id,
                tag: venue.tag,
                name: venue.name
            }
        };

    } catch (error: any) {
        console.error('Create venue error:', error);
        return { success: false, error: error?.message || 'Failed to create venue' };
    }
}
