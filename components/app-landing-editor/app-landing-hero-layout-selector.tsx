'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Monitor, Columns, Smartphone, GalleryHorizontal } from 'lucide-react';

interface AppLandingHeroLayoutSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export function AppLandingHeroLayoutSelector({ value, onChange }: AppLandingHeroLayoutSelectorProps) {
    const layouts = [
        {
            id: 'cinematic-center',
            label: 'Cinematic Center',
            description: 'Full screen background, centered text.',
            icon: Monitor
        },
        {
            id: 'split-screen',
            label: 'Split Screen',
            description: 'Text on left, feature image on right.',
            icon: Columns
        },
        {
            id: 'mobile-showcase',
            label: 'Mobile Showcase',
            description: 'Phone mockup frame with centered text.',
            icon: Smartphone
        },
        {
            id: 'cinematic-slider',
            label: 'Cinematic Slider',
            description: 'Rotating background images with overlay text.',
            icon: GalleryHorizontal
        }
    ];

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Hero Layout Style
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {layouts.map((layout) => (
                    <div
                        key={layout.id}
                        onClick={() => onChange(layout.id)}
                        className={cn(
                            "cursor-pointer rounded-xl border-2 p-4 hover:border-pink-600 hover:bg-pink-50 transition-all",
                            value === layout.id ? "border-pink-600 bg-pink-50 ring-2 ring-pink-600 ring-offset-2" : "border-muted bg-white"
                        )}
                    >
                        <div className="flex flex-col gap-2">
                            <layout.icon className={cn(
                                "h-5 w-5",
                                value === layout.id ? "text-pink-600" : "text-muted-foreground"
                            )} />
                            <div className="space-y-1">
                                <div className={cn(
                                    "font-medium text-sm",
                                    value === layout.id ? "text-pink-900" : "text-foreground"
                                )}>
                                    {layout.label}
                                </div>
                                <div className="text-xs text-muted-foreground leading-snug">
                                    {layout.description}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
