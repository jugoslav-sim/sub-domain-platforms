'use client';

import { currentVenue } from '@/lib/mock-data';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VenueSelector() {
    return (
        <div className="border-t border-sidebar-border p-4 mt-auto">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-xl">
                    {currentVenue.avatar}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{currentVenue.name}</div>
                    <div className="text-xs text-muted-foreground truncate">@{currentVenue.tag}</div>
                </div>
            </div>

            <Button
                variant="ghost"
                className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
                size="sm"
            >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
            </Button>
        </div>
    );
}
