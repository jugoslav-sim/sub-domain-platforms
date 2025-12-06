'use client';

import * as React from 'react';
import { LogOut, ChevronsUpDown, Check, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/lib/auth/context';
import { getUserVenuesAction } from '@/app/admin/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Venue {
    id: string;
    name: string;
    tag: string;
    role: string;
    avatar: string | null;
}

export function VenueSelector() {
    const { signOut } = useAuth();
    const [venues, setVenues] = React.useState<Venue[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTag = searchParams.get('venue');

    React.useEffect(() => {
        const fetchVenues = async () => {
            const data = await getUserVenuesAction();
            setVenues(data);
            setIsLoading(false);

            // If no venue selected and we have venues, select the first one
            if (!currentTag && data.length > 0) {
                const params = new URLSearchParams(searchParams.toString());
                params.set('venue', data[0].tag);
                router.replace(`/admin?${params.toString()}`);
            }
        };
        fetchVenues();
    }, [currentTag, router, searchParams]);

    const handleVenueSelect = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('venue', tag);
        router.push(`?${params.toString()}`);
    };

    const selectedVenue = venues.find(v => v.tag === currentTag) || venues[0];

    if (isLoading) {
        return <div className="p-4 animate-pulse h-20 bg-gray-50/50" />;
    }

    if (!selectedVenue) {
        return (
            <div className="border-t border-sidebar-border p-4 mt-auto space-y-2">
                <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => router.push('/admin/new-venue')}
                >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Your First Venue
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={signOut}
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        );
    }

    return (
        <div className="border-t border-sidebar-border p-4 mt-auto">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-2 hover:bg-gray-100 h-auto py-3">
                        <div className="flex items-center gap-3 w-full text-left">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                                {selectedVenue.avatar ? (
                                    <img src={selectedVenue.avatar} alt={selectedVenue.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-purple-600 font-bold">{selectedVenue.name[0]}</span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm truncate">{selectedVenue.name}</div>
                                <div className="text-xs text-muted-foreground truncate flex items-center">
                                    @{selectedVenue.tag}
                                    <span className="ml-1.5 px-1 py-0.5 rounded-sm bg-gray-100 text-[10px] uppercase font-bold tracking-wider">
                                        {selectedVenue.role}
                                    </span>
                                </div>
                            </div>
                            <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mb-2" align="start" side="top">
                    <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                        Switch Venue
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {venues.map((venue) => (
                        <DropdownMenuItem
                            key={venue.id}
                            className="cursor-pointer"
                            onClick={() => handleVenueSelect(venue.tag)}
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <span className="font-medium">{venue.name}</span>
                                    <span className="text-xs text-muted-foreground">@{venue.tag}</span>
                                </div>
                                {venue.tag === selectedVenue.tag && (
                                    <Check className="h-4 w-4 text-purple-600" />
                                )}
                            </div>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer text-purple-600"
                        onClick={() => router.push('/admin/new-venue')}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Venue
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={signOut}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
