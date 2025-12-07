'use server';

import { redis } from '@/lib/redis';
import { isValidIcon } from '@/lib/subdomains';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { rootDomain, protocol } from '@/lib/utils';
import { venueService } from '@/lib/db/venues';
import { defaultVenueData } from '@/lib/venue-editor-schema';
import { createClient } from '@/lib/auth/server';

export async function createSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get('subdomain') as string;
  const icon = formData.get('icon') as string;

  if (!subdomain || !icon) {
    return { success: false, error: 'Subdomain and icon are required' };
  }

  if (!isValidIcon(icon)) {
    return {
      subdomain,
      icon,
      success: false,
      error: 'Please enter a valid emoji (maximum 10 characters)'
    };
  }

  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');

  if (sanitizedSubdomain !== subdomain) {
    return {
      subdomain,
      icon,
      success: false,
      error:
        'Subdomain can only have lowercase letters, numbers, and hyphens. Please try again.'
    };
  }

  const subdomainAlreadyExists = await redis.get(
    `subdomain:${sanitizedSubdomain}`
  );
  if (subdomainAlreadyExists) {
    return {
      subdomain,
      icon,
      success: false,
      error: 'This subdomain is already taken'
    };
  }

  // Create Venue in Supabase
  const supabase = await createClient();
  try {
    const newVenue = await venueService.create(supabase, {
      tag: sanitizedSubdomain,
      name: sanitizedSubdomain,
      profile_data: {
        venueName: sanitizedSubdomain,
        venueType: defaultVenueData.venueType,
        themeColor: defaultVenueData.themeColor,
        coverImageUrl: defaultVenueData.coverImageUrl,
        tagline: `Welcome to ${subdomain}`,
        vibeKeywords: defaultVenueData.vibeKeywords,
        description: defaultVenueData.description
      },
      hero_data: {
        heroHeadline: defaultVenueData.heroHeadline,
        heroDescription: defaultVenueData.heroDescription,
        heroButtonText: defaultVenueData.heroButtonText,
        heroButtonUrl: defaultVenueData.heroButtonUrl,
        heroLayoutStyle: defaultVenueData.heroLayoutStyle,
        heroBackgroundImageUrl: defaultVenueData.heroBackgroundImageUrl
      },
      branding_data: {
        logo: defaultVenueData.logo,
        brandColors: defaultVenueData.brandColors
      },
      layout_data: {
        layoutStyle: defaultVenueData.layoutStyle,
        highlights: defaultVenueData.highlights
      },
      seo_data: {
        metaTitle: defaultVenueData.metaTitle,
        metaDescription: defaultVenueData.metaDescription,
        metaKeywords: defaultVenueData.metaKeywords
      },
      location_data: defaultVenueData.location as unknown as any,
      hours_data: defaultVenueData.hours as unknown as any,
      social_data: defaultVenueData.socialLinks as unknown as any,
      music_data: {
        spotifyPlaylistUrl: defaultVenueData.spotifyPlaylistUrl,
        atmosphereDescription: defaultVenueData.atmosphereDescription
      },
      is_published: true
    });

    // Store in Redis with reference to Supabase ID
    await redis.set(`subdomain:${sanitizedSubdomain}`, {
      venueId: newVenue.id,
      emoji: icon,
      createdAt: Date.now()
    });

  } catch (error) {
    console.error("Failed to create venue:", error);
    return {
      subdomain,
      icon,
      success: false,
      error: 'Failed to create venue. Please try again.'
    };
  }

  redirect(`${protocol}://${sanitizedSubdomain}.${rootDomain}`);
}

export async function deleteSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get('subdomain');
  await redis.del(`subdomain:${subdomain}`);
  revalidatePath('/admin');
  return { success: 'Domain deleted successfully' };
}
