import * as React from 'react';
import { VenueEditorClient } from './client-page';
import { getVenueByTag } from '@/lib/venue-data';

// This server component fetches data and renders the client form
export default async function VenueEditorPage() {
    // Hardcoded tag for this phase
    const CURRENT_VENUE_TAG = 'venuvibes';

    // Fetch data from Redis/Supabase
    const venueData = await getVenueByTag(CURRENT_VENUE_TAG);

    return (
        <VenueEditorClient initialData={venueData} />
    );
}
