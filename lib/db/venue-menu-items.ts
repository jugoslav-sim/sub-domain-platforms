
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type MenuItem = Database['public']['Tables']['venue_menu_items']['Row'];
export type NewMenuItem = Database['public']['Tables']['venue_menu_items']['Insert'];

export const menuService = {
    getAll: async (venueId: string) => {
        const { data, error } = await supabase
            .from('venue_menu_items')
            .select('*')
            .eq('venue_id', venueId)
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return data;
    },

    add: async (item: NewMenuItem) => {
        const { data, error } = await supabase
            .from('venue_menu_items')
            .insert(item)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id: string, updates: Partial<MenuItem>) => {
        const { data, error } = await supabase
            .from('venue_menu_items')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('venue_menu_items')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    deleteAll: async (venueId: string) => {
        const { error } = await supabase
            .from('venue_menu_items')
            .delete()
            .eq('venue_id', venueId);

        if (error) throw error;
    },

    reorder: async (items: { id: string; sort_order: number }[]) => {
        const updates = items.map(item =>
            supabase.from('venue_menu_items').update({ sort_order: item.sort_order }).eq('id', item.id)
        );
        await Promise.all(updates);
    }
};
