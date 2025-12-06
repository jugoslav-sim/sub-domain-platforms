
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type Testimonial = Database['public']['Tables']['venue_testimonials']['Row'];
export type NewTestimonial = Database['public']['Tables']['venue_testimonials']['Insert'];

export const testimonialService = {
    getAll: async (venueId: string) => {
        const { data, error } = await supabase
            .from('venue_testimonials')
            .select('*')
            .eq('venue_id', venueId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    add: async (testimonial: NewTestimonial) => {
        const { data, error } = await supabase
            .from('venue_testimonials')
            .insert(testimonial)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id: string, updates: Partial<Testimonial>) => {
        const { data, error } = await supabase
            .from('venue_testimonials')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('venue_testimonials')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    deleteAll: async (venueId: string) => {
        const { error } = await supabase
            .from('venue_testimonials')
            .delete()
            .eq('venue_id', venueId);

        if (error) throw error;
    }
};
