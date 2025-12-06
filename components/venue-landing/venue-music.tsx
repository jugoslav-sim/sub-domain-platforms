import { Music } from 'lucide-react';
import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueMusicProps {
    data: VenueEditorData;
}

export function VenueMusic({ data }: VenueMusicProps) {
    const { spotifyPlaylistUrl, atmosphereDescription, themeColor, venueName } = data;

    if (!spotifyPlaylistUrl && !atmosphereDescription) {
        return null;
    }

    // Extract Spotify playlist/album ID for embed
    const getSpotifyEmbedUrl = (url: string) => {
        const match = url.match(/spotify\.com\/(playlist|album|track)\/([a-zA-Z0-9]+)/);
        if (match) {
            const [, type, id] = match;
            return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
        }
        return null;
    };

    const embedUrl = spotifyPlaylistUrl ? getSpotifyEmbedUrl(spotifyPlaylistUrl) : null;

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" id="music">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{ backgroundColor: `${themeColor}30` }}
                    >
                        <Music className="w-8 h-8" style={{ color: themeColor }} />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">The Vibe</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {atmosphereDescription || `Experience the unique atmosphere of ${venueName}`}
                    </p>
                </div>

                {embedUrl && (
                    <div className="max-w-xl mx-auto">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <iframe
                                src={embedUrl}
                                width="100%"
                                height="380"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="w-full"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
