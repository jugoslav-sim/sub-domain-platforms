'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    Sparkles,
    Palette,
    Globe,
    ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { VenueSelector } from './venue-selector';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/auth/user-nav';
import { currentVenue } from '@/lib/mock-data';

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    section?: string;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Events', href: '/admin/events', icon: Calendar, section: 'GROWTH' },
    { label: 'Marketing AI', href: '/admin/marketing-ai', icon: Sparkles, section: 'THE MARKETING AI' },
    { label: 'Venue Site Editor', href: '/admin/venue-editor', icon: Globe, section: 'ADMIN' },
    { label: 'App Landing Editor', href: '/admin/app-landing-editor', icon: Palette },
];



export function Sidebar() {
    const pathname = usePathname();

    let currentSection: string | null = null;

    return (
        <aside className="w-64 bg-white border-r border-sidebar-border flex flex-col h-screen sticky top-0">
            {/* Logo & User */}
            <div className="p-6 border-b border-sidebar-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-lg">VenueVibe</div>
                            <div className="text-xs text-purple-600 font-medium">SaaS Edition</div>
                        </div>
                    </div>
                    <UserNav />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-3 space-y-1">
                    {navItems.map((item) => {
                        const showSection = item.section && item.section !== currentSection;
                        if (item.section) {
                            currentSection = item.section;
                        }

                        return (
                            <div key={item.href}>
                                {showSection && (
                                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4">
                                        {item.section}
                                    </div>
                                )}
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                        pathname === item.href
                                            ? 'bg-purple-50 text-purple-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* App Home Page CTA */}
                <div className="px-3 mt-6 space-y-2">
                    <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        asChild
                    >
                        <Link href="/" target="_blank">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            App Home Page
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                        asChild
                    >
                        <Link href={`/s/${currentVenue.tag}`} target="_blank">
                            <Globe className="h-4 w-4 mr-2" />
                            Venue Live Page
                        </Link>
                    </Button>
                </div>
            </nav>

            {/* Venue Selector */}
            <VenueSelector />
        </aside>
    );
}
