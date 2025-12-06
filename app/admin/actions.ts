'use server';

import { createClient } from '@/lib/auth/server';

export async function getUserVenuesAction() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    // Get venues where user is owner or staff
    const { data: venues, error } = await supabase
        .from('venue_members')
        .select(`
      venue_id,
      role,
      venues (
        id,
        name,
        tag,
        branding_data
      )
    `)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error fetching user venues:', error);
        return [];
    }

    // Flatten structure
    return venues.map((m: any) => ({
        id: m.venues.id,
        name: m.venues.name,
        tag: m.venues.tag,
        role: m.role,
        avatar: m.venues.branding_data?.logo || null
    }));
}
