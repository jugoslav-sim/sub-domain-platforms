import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueAboutProps {
    data: VenueEditorData;
}

export function VenueAbout({ data }: VenueAboutProps) {
    const {
        venueName,
        venueType,
        tagline,
        description,
        vibeKeywords,
        themeColor
    } = data;

    const keywords = vibeKeywords ? vibeKeywords.split(',').map(k => k.trim()).filter(Boolean) : [];

    return (
        <section className="py-20 bg-white" id="about">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        {venueType && (
                            <span
                                className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                            >
                                {venueType}
                            </span>
                        )}
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            About {venueName || 'Us'}
                        </h2>
                        {tagline && (
                            <p className="text-xl text-gray-600 italic">
                                "{tagline}"
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    {description && (
                        <div className="prose prose-lg max-w-none text-center mb-12">
                            <p className="text-gray-700 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    )}

                    {/* Vibe Keywords */}
                    {keywords.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3">
                            {keywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
