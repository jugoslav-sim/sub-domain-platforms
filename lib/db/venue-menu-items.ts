import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export type MenuItem = Database['public']['Tables']['venue_menu_items']['Row'];
export type NewMenuItem = Database['public']['Tables']['venue_menu_items']['Insert'];

export const menuService = {
    // Get all menu items for a venue
    getAll: async (client: SupabaseClient, venueId: string) => {
        const { data, error } = await client
            .from('venue_menu_items')
            .select('*')
            .eq('venue_id', venueId)
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Add a new menu item
    add: async (client: SupabaseClient, item: NewMenuItem) => {
        const { data, error } = await client
            .from('venue_menu_items')
            .insert(item)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update a menu item
    update: async (client: SupabaseClient, id: string, updates: Partial<MenuItem>) => {
        const { data, error } = await client
            .from('venue_menu_items')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete a menu item
    delete: async (client: SupabaseClient, id: string) => {
        const { error } = await client
            .from('venue_menu_items')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Delete all menu items for a venue
    deleteAll: async (client: SupabaseClient, venueId: string) => {
        const { error } = await client
            .from('venue_menu_items')
            .delete()
            .eq('venue_id', venueId);

        if (error) throw error;
    },

    // Reorder menu items
    reorder: async (client: SupabaseClient, items: { id: string; sort_order: number }[]) => {
        const updates = items.map(item =>
            client.from('venue_menu_items').update({ sort_order: item.sort_order }).eq('id', item.id)
        );
        await Promise.all(updates);
    }
};
