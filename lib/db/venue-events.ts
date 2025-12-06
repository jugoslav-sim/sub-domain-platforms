import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export type VenueEvent = Database['public']['Tables']['venue_events']['Row'];
export type NewVenueEvent = Database['public']['Tables']['venue_events']['Insert'];

export const eventService = {
    // Get all events for a venue
    getAll: async (client: SupabaseClient, venueId: string) => {
        const { data, error } = await client
            .from('venue_events')
            .select('*')
            .eq('venue_id', venueId)
            .order('start_time', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Get upcoming events
    getUpcoming: async (client: SupabaseClient, venueId: string) => {
        const { data, error } = await client
            .from('venue_events')
            .select('*')
            .eq('venue_id', venueId)
            .eq('is_published', true)
            .gte('start_time', new Date().toISOString())
            .order('start_time', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Add a new event
    add: async (client: SupabaseClient, event: NewVenueEvent) => {
        const { data, error } = await client
            .from('venue_events')
            .insert(event)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update an event
    update: async (client: SupabaseClient, id: string, updates: Partial<VenueEvent>) => {
        const { data, error } = await client
            .from('venue_events')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete an event
    delete: async (client: SupabaseClient, id: string) => {
        const { error } = await client
            .from('venue_events')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Delete all events for a venue
    deleteAll: async (client: SupabaseClient, venueId: string) => {
        const { error } = await client
            .from('venue_events')
            .delete()
            .eq('venue_id', venueId);

        if (error) throw error;
    }
};
