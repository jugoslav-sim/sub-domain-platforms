import { Star } from 'lucide-react';
import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueTestimonialsProps {
    data: VenueEditorData;
}

export function VenueTestimonials({ data }: VenueTestimonialsProps) {
    const { testimonials, themeColor } = data;

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-gray-900" id="testimonials">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">What People Say</h2>
                    <p className="text-gray-400">Hear from our amazing guests</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.slice(0, 6).map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors"
                        >
                            {/* Rating Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                {testimonial.avatarUrl ? (
                                    <img
                                        src={testimonial.avatarUrl}
                                        alt={testimonial.author}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                        style={{ backgroundColor: themeColor }}
                                    >
                                        {testimonial.author.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold text-white">{testimonial.author}</div>
                                    {testimonial.role && (
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
