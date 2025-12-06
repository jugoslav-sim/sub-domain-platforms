import { MapPin, Clock } from 'lucide-react';
import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueLocationProps {
    data: VenueEditorData;
}

export function VenueLocation({ data }: VenueLocationProps) {
    const { location, hours, themeColor } = data;

    if (!location?.address && (!hours || hours.length === 0)) {
        return null;
    }

    const fullAddress = location ? [
        location.address,
        location.city,
        location.state,
        location.zipCode,
        location.country
    ].filter(Boolean).join(', ') : '';

    const googleMapsUrl = fullAddress
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
        : '';

    return (
        <section className="py-20 bg-gray-50" id="location">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
                    <p className="text-gray-600">Come visit and experience the vibe</p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Location Card */}
                    {location?.address && (
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${themeColor}20` }}
                                >
                                    <MapPin className="w-6 h-6" style={{ color: themeColor }} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
                                    <p className="text-gray-600 mb-4">{fullAddress}</p>
                                    {googleMapsUrl && (
                                        <a
                                            href={googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 font-medium hover:underline"
                                            style={{ color: themeColor }}
                                        >
                                            Get Directions
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hours Card */}
                    {hours && hours.length > 0 && (
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${themeColor}20` }}
                                >
                                    <Clock className="w-6 h-6" style={{ color: themeColor }} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Hours</h3>
                                    <div className="space-y-2">
                                        {hours.map((hour, index) => (
                                            <div key={index} className="flex justify-between text-gray-600">
                                                <span className="font-medium">{hour.day}</span>
                                                <span>
                                                    {hour.isClosed ? 'Closed' : `${hour.open} - ${hour.close}`}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
