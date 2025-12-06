import * as React from 'react';
import { VenueEditorClient } from './client-page';
import { getVenueByTag } from '@/lib/venue-data';

// This server component fetches data and renders the client form
export default async function VenueEditorPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const venueTag = typeof params.venue === 'string' ? params.venue : 'venuvibes';

    // Fetch data from Redis/Supabase
    const venueData = await getVenueByTag(venueTag);

    return (
        <VenueEditorClient initialData={venueData} venueTag={venueTag} />
    );
}
