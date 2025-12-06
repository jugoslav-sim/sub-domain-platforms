'use client';

import { useAuth } from '@/lib/auth/context';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Building2 } from 'lucide-react';
import Link from 'next/link';

export function UserNav() {
    const { user, profile, isLoading, signOut } = useAuth();

    if (isLoading) {
        return (
            <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
        );
    }

    if (!user) {
        return (
            <Link href="/auth/login">
                <Button size="sm" variant="outline">
                    Sign In
                </Button>
            </Link>
        );
    }

    const initials = profile?.full_name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase() || user.email?.[0].toUpperCase() || 'U';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    {profile?.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt={profile.full_name || 'User'}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                            {initials}
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {profile?.full_name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                        <span className="text-xs text-pink-600 capitalize mt-1">
                            {profile?.role || 'owner'}
                        </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/admin/venues" className="cursor-pointer">
                        <Building2 className="mr-2 h-4 w-4" />
                        My Venues
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
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
    );
}
