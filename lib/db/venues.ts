
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export type Venue = Database['public']['Tables']['venues']['Row'];
export type NewVenue = Database['public']['Tables']['venues']['Insert'];
export type UpdateVenue = Database['public']['Tables']['venues']['Update'];

export const venueService = {
    // Get venue by tag (for public access via subdomain)
    getByTag: async (client: SupabaseClient, tag: string) => {
        const { data, error } = await client
            .from('venues')
            .select('*')
            .eq('tag', tag)
            .single();

        // PGRST116 = no rows returned - this is expected for non-existent venues
        if (error && error.code === 'PGRST116') {
            return null;
        }
        if (error) throw error;
        return data;
    },

    // Get venue by ID (for admin/internal use)
    getById: async (client: SupabaseClient, id: string) => {
        const { data, error } = await client
            .from('venues')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Create a new venue
    create: async (client: SupabaseClient, venue: NewVenue) => {
        const { data, error } = await client
            .from('venues')
            .insert(venue)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update venue details
    update: async (client: SupabaseClient, id: string, updates: UpdateVenue) => {
        const { data, error } = await client
            .from('venues')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update specific JSONB config column (partial update for larger JSONs)
    // Note: Supabase/Postgres merges JSONB by default on update if structured correctly, 
    // but simpler to just replace the whole JSON blob for this use case.
    updateConfig: async (client: SupabaseClient, id: string, configType: 'profile_data' | 'hero_data' | 'branding_data' | 'layout_data' | 'seo_data' | 'location_data' | 'hours_data' | 'social_data' | 'music_data', data: any) => {
        const { data: updated, error } = await client
            .from('venues')
            .update({ [configType]: data })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return updated;
    }
};
