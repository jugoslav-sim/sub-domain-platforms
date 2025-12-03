import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
    return (
        <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900">VenueVibe</h3>
                        <p className="text-gray-500 leading-relaxed">
                            The ultimate toolkit for nightclubs, bars, and restaurants.
                        </p>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-6">Product</h4>
                        <ul className="space-y-4">
                            {['AI Menu Scanner', 'Branding', 'Photo Booth', 'Events', 'Rentals', 'QR Code Generation'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={
                                            item === 'AI Menu Scanner' ? '/ai-menu-scanner' :
                                                item === 'Branding' ? '/branding' :
                                                    item === 'Photo Booth' ? '/photo-booth' :
                                                        item === 'Events' ? '/events' :
                                                            item === 'Rentals' ? '/rentals' :
                                                                item === 'QR Code Generation' ? '/qr-code-generation' :
                                                                    '#'
                                        }
                                        className="text-gray-500 hover:text-gray-900 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-6">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-6">Stay in the loop</h4>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white border-gray-200 focus:border-rose-500 focus:ring-rose-500"
                            />
                            <Button className="bg-[#E11D48] hover:bg-[#BE123C] text-white">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} VenueVibe. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-gray-400 hover:text-gray-600 text-sm">Privacy Policy</Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-600 text-sm">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
