
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type VenueEvent = Database['public']['Tables']['venue_events']['Row'];
export type NewVenueEvent = Database['public']['Tables']['venue_events']['Insert'];

export const eventService = {
    getAll: async (venueId: string) => {
        const { data, error } = await supabase
            .from('venue_events')
            .select('*')
            .eq('venue_id', venueId)
            .order('start_time', { ascending: true });

        if (error) throw error;
        return data;
    },

    getUpcoming: async (venueId: string) => {
        const { data, error } = await supabase
            .from('venue_events')
            .select('*')
            .eq('venue_id', venueId)
            .eq('is_published', true)
            .gte('start_time', new Date().toISOString())
            .order('start_time', { ascending: true });

        if (error) throw error;
        return data;
    },

    add: async (event: NewVenueEvent) => {
        const { data, error } = await supabase
            .from('venue_events')
            .insert(event)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id: string, updates: Partial<VenueEvent>) => {
        const { data, error } = await supabase
            .from('venue_events')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('venue_events')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    deleteAll: async (venueId: string) => {
        const { error } = await supabase
            .from('venue_events')
            .delete()
            .eq('venue_id', venueId);

        if (error) throw error;
    }
};
