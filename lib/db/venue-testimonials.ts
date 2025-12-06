import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export type Testimonial = Database['public']['Tables']['venue_testimonials']['Row'];
export type NewTestimonial = Database['public']['Tables']['venue_testimonials']['Insert'];

export const testimonialService = {
    // Get all testimonials for a venue
    getAll: async (client: SupabaseClient, venueId: string) => {
        const { data, error } = await client
            .from('venue_testimonials')
            .select('*')
            .eq('venue_id', venueId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Add a new testimonial
    add: async (client: SupabaseClient, testimonial: NewTestimonial) => {
        const { data, error } = await client
            .from('venue_testimonials')
            .insert(testimonial)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update a testimonial
    update: async (client: SupabaseClient, id: string, updates: Partial<Testimonial>) => {
        const { data, error } = await client
            .from('venue_testimonials')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete a testimonial
    delete: async (client: SupabaseClient, id: string) => {
        const { error } = await client
            .from('venue_testimonials')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Delete all testimonials for a venue
    deleteAll: async (client: SupabaseClient, venueId: string) => {
        const { error } = await client
            .from('venue_testimonials')
            .delete()
            .eq('venue_id', venueId);

        if (error) throw error;
    }
};
