
import { supabase } from '@/lib/supabase';

// Helper to handle client-side vs server-side upload
// For now, this assumes client-side direct upload which is standard for Supabase
export const storageService = {
    uploadImage: async (file: File, path: string) => {
        const { data, error } = await supabase.storage
            .from('venue-assets')
            .upload(path, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('venue-assets')
            .getPublicUrl(path);

        return publicUrl;
    },

    deleteImage: async (path: string) => {
        const { error } = await supabase.storage
            .from('venue-assets')
            .remove([path]);

        if (error) throw error;
    },

    // Helper to construct paths standardly: venue_tag/(gallery|menu|hero)/timestamp-filename
    getStoragePath: (venueTag: string, folder: 'gallery' | 'menu' | 'hero' | 'logo' | 'events', filename: string) => {
        const timestamp = new Date().getTime();
        const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9.]/g, '-');
        return `${venueTag}/${folder}/${timestamp}-${cleanFilename}`;
    }
};
