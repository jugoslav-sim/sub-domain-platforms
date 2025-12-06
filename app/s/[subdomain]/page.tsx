import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubdomainData } from '@/lib/subdomains';
import { rootDomain } from '@/lib/utils';
import { VenueLandingPage } from '@/components/venue-landing/venue-landing-page';
import { mockVenueEditorData, currentVenue } from '@/lib/mock-data';
import { VenueEditorData } from '@/lib/venue-editor-schema';

// Mock venue lookup for development
const mockVenues: Record<string, typeof mockVenueEditorData> = {
  [currentVenue.tag]: mockVenueEditorData
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;

  // Check mock venues first, then Redis
  const venueData = mockVenues[subdomain] || null;
  const subdomainData = venueData ? { emoji: currentVenue.avatar } : await getSubdomainData(subdomain);

  if (!subdomainData && !venueData) {
    return {
      title: rootDomain
    };
  }

  const data = venueData as VenueEditorData;

  return {
    title: data ? `${data.venueName} | ${data.venueType}` : `${subdomain}.${rootDomain}`,
    description: data?.heroDescription || data?.description || `Venue page for ${subdomain}`,
    openGraph: data ? {
      title: data.venueName,
      description: data.heroDescription || data.description,
      images: data.heroBackgroundImageUrl ? [data.heroBackgroundImageUrl] : []
    } : undefined
  };
}

export default async function SubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;

  // Check mock venues first for development
  const venueData = mockVenues[subdomain];

  if (venueData) {
    return <VenueLandingPage data={venueData as VenueEditorData} />;
  }

  // Fallback to Redis lookup for production subdomains
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  // TODO: In production, fetch venue data from database based on subdomain
  // For now, use mock data as fallback
  return <VenueLandingPage data={mockVenueEditorData as VenueEditorData} />;
}
