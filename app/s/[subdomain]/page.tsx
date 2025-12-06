import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { rootDomain } from '@/lib/utils';
import { VenueLandingPage } from '@/components/venue-landing/venue-landing-page';
import { getVenueByTag } from '@/lib/venue-data';
import { mockVenueEditorData, currentVenue } from '@/lib/mock-data';
import { VenueEditorData } from '@/lib/venue-editor-schema';

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;

  // Try to fetch from database first
  const venueData = await getVenueByTag(subdomain);

  if (!venueData) {
    return {
      title: rootDomain
    };
  }

  return {
    title: venueData.metaTitle || `${venueData.venueName} | ${venueData.venueType}`,
    description: venueData.metaDescription || venueData.heroDescription || venueData.description || `Venue page for ${subdomain}`,
    openGraph: {
      title: venueData.venueName,
      description: venueData.heroDescription || venueData.description,
      images: venueData.heroBackgroundImageUrl ? [venueData.heroBackgroundImageUrl] : []
    }
  };
}

export default async function SubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;

  // Try to fetch from database (with Redis cache)
  const venueData = await getVenueByTag(subdomain);

  if (venueData) {
    return <VenueLandingPage data={venueData as VenueEditorData} />;
  }

  // Fallback to mock data for development (e.g., if venue not yet created in DB)
  if (subdomain === currentVenue.tag) {
    return <VenueLandingPage data={mockVenueEditorData as VenueEditorData} />;
  }

  notFound();
}
