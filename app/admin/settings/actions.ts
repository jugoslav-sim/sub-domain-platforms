'use server';

import { createClient } from '@/lib/auth/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProfileAction(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Not authenticated' };

    const fullName = formData.get('fullName') as string;
    const avatarUrl = formData.get('avatarUrl') as string;

    try {
        const { error } = await supabase
            .from('user_profiles')
            .update({
                full_name: fullName,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id);

        if (error) throw error;

        revalidatePath('/admin');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteVenueAction(venueId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Not authenticated' };

    try {
        // Verify ownership using our secure function logic or direct RLS
        // Since we fixed RLS, a simple delete should work if the user is an owner
        const { error } = await supabase
            .from('venues')
            .delete()
            .eq('id', venueId);
        // RLS "owner_delete_venues" policy ensures they own it

        if (error) throw error;

        revalidatePath('/admin');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteAllVenuesAction() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Not authenticated' };

    try {
        // Fetch all owned venues first to confirm existence
        const { data: venues } = await supabase
            .from('venue_members')
            .select('venue_id')
            .eq('user_id', user.id)
            .eq('role', 'owner');

        if (!venues?.length) return { success: true, message: 'No venues to delete' };

        const venueIds = venues.map(v => v.venue_id);

        const { error } = await supabase
            .from('venues')
            .delete()
            .in('id', venueIds);

        if (error) throw error;

        revalidatePath('/admin');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteAccountAction() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Not authenticated' };

    try {
        // 1. Delete all venues owned by user
        await deleteAllVenuesAction();

        // 2. Delete user profile
        const { error: profileError } = await supabase
            .from('user_profiles')
            .delete()
            .eq('id', user.id);

        if (profileError) throw profileError;

        // 3. Sign out
        await supabase.auth.signOut();

        // Note: Actual auth user deletion requires service role key.
        // For now, we clean up data and sign out.
        // To strictly delete auth user: supabase.auth.admin.deleteUser(user.id) using service client.

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function exportDataAction() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Not authenticated' };

    try {
        // Fetch venues with all related data
        // Using a deep query. Note: Supabase query depth might be limited.
        // We'll fetch venues then fetch related data for each if needed, 
        // but let's try a join first.

        const { data: venues, error } = await supabase
            .from('venues')
            .select(`
                *,
                venue_gallery(*),
                venue_menu_items(*),
                venue_events(*),
                venue_testimonials(*)
            `)
            // We need to filter by ownership. 
            // Since we don't have owner_id on venues, we filter by filtering access via RLS or explicit join.
            // But RLS on 'venues' is public read!
            // So we MUST join venue_members to filter only OUR venues.
            .eq('venue_members.user_id', user.id) // This won't work directly on top-level query usually
        // Better approach: Get IDs from membership first

        // 1. Get My Venue IDs
        const { data: members } = await supabase
            .from('venue_members')
            .select('venue_id')
            .eq('user_id', user.id)
            .eq('role', 'owner');

        if (!members?.length) return { success: true, data: [] };

        const venueIds = members.map(m => m.venue_id);

        // 2. Fetch Full Data
        const { data: fullData, error: dataError } = await supabase
            .from('venues')
            .select(`
                *,
                venue_gallery(*),
                venue_menu_items(*),
                venue_events(*),
                venue_testimonials(*)
             `)
            .in('id', venueIds);

        if (dataError) throw dataError;

        return { success: true, data: fullData };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
