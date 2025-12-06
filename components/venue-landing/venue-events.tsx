import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueEventsProps {
    data: VenueEditorData;
}

export function VenueEvents({ data }: VenueEventsProps) {
    const { events, themeColor } = data;

    if (!events || events.length === 0) {
        return null;
    }

    // Sort events by date
    const sortedEvents = [...events].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            year: date.getFullYear()
        };
    };

    return (
        <section className="py-20 bg-white" id="events">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
                    <p className="text-gray-600">Don't miss out on what's happening</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {sortedEvents.slice(0, 5).map((event) => {
                        const { day, month } = formatDate(event.date);

                        return (
                            <div
                                key={event.id}
                                className="flex flex-col md:flex-row gap-6 bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {/* Date Badge */}
                                <div
                                    className="flex md:flex-col items-center justify-center p-6 text-white min-w-[120px]"
                                    style={{ backgroundColor: themeColor }}
                                >
                                    <span className="text-4xl font-bold mr-2 md:mr-0">{day}</span>
                                    <span className="text-lg uppercase tracking-wide">{month}</span>
                                </div>

                                {/* Event Image */}
                                {event.imageUrl && (
                                    <div className="w-full md:w-48 aspect-video md:aspect-square flex-shrink-0">
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Event Details */}
                                <div className="flex-1 p-6 flex flex-col justify-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {event.time}
                                        </span>
                                    </div>
                                </div>

                                {/* Ticket Button */}
                                {event.ticketUrl && (
                                    <div className="p-6 flex items-center">
                                        <Button asChild style={{ backgroundColor: themeColor }}>
                                            <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                                                Get Tickets
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
