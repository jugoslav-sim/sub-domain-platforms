import Link from 'next/link';
import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueFooterProps {
    data: VenueEditorData;
}

export function VenueFooter({ data }: VenueFooterProps) {
    const { venueName, location, themeColor } = data;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Venue Name */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">{venueName || 'Venue'}</h3>
                        {location?.address && (
                            <p className="text-gray-400 text-sm">
                                {[location.address, location.city, location.state].filter(Boolean).join(', ')}
                            </p>
                        )}
                    </div>

                    {/* Quick Links */}
                    <nav className="flex flex-wrap justify-center gap-6 text-sm">
                        <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
                        <a href="#menu" className="text-gray-400 hover:text-white transition-colors">Menu</a>
                        <a href="#events" className="text-gray-400 hover:text-white transition-colors">Events</a>
                        <a href="#location" className="text-gray-400 hover:text-white transition-colors">Location</a>
                        <a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a>
                    </nav>

                    {/* Powered By */}
                    <div className="text-center md:text-right">
                        <p className="text-gray-500 text-xs">
                            Powered by{' '}
                            <Link
                                href="/"
                                className="hover:text-white transition-colors"
                                style={{ color: themeColor }}
                            >
                                VenueVibe
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} {venueName || 'Venue'}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
