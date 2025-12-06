
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type GalleryImage = Database['public']['Tables']['venue_gallery']['Row'];
export type NewGalleryImage = Database['public']['Tables']['venue_gallery']['Insert'];

export const galleryService = {
    // Get all images for a venue
    getAll: async (venueId: string) => {
        const { data, error } = await supabase
            .from('venue_gallery')
            .select('*')
            .eq('venue_id', venueId)
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Add a new image
    add: async (image: NewGalleryImage) => {
        const { data, error } = await supabase
            .from('venue_gallery')
            .insert(image)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update an image
    update: async (id: string, updates: Partial<GalleryImage>) => {
        const { data, error } = await supabase
            .from('venue_gallery')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete an image
    delete: async (id: string) => {
        const { error } = await supabase
            .from('venue_gallery')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Delete all images for a venue
    deleteAll: async (venueId: string) => {
        const { error } = await supabase
            .from('venue_gallery')
            .delete()
            .eq('venue_id', venueId);

        if (error) throw error;
    },

    // Reorder images
    reorder: async (items: { id: string; sort_order: number }[]) => {
        // This could be optimized with an RPC call, but loop is fine for small galleries
        const updates = items.map(item =>
            supabase.from('venue_gallery').update({ sort_order: item.sort_order }).eq('id', item.id)
        );
        await Promise.all(updates);
    }
};
