'use client';

import * as React from 'react';
import { Monitor, Columns, Smartphone, GalleryHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface HeroLayoutSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

const layouts = [
    {
        id: 'cinematic-center',
        title: 'Cinematic Center',
        description: 'Full screen background, centered text.',
        icon: Monitor
    },
    {
        id: 'split-screen',
        title: 'Split Screen',
        description: 'Text on left, feature image on right.',
        icon: Columns
    },
    {
        id: 'mobile-showcase',
        title: 'Mobile Showcase',
        description: 'Phone mockup frame with centered text.',
        icon: Smartphone
    },
    {
        id: 'cinematic-slider',
        title: 'Cinematic Slider',
        description: 'Rotating background images with overlay text.',
        icon: GalleryHorizontal
    }
];

export function HeroLayoutSelector({ value, onChange }: HeroLayoutSelectorProps) {
    return (
        <div className="space-y-3">
            <Label>Hero Layout Style</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {layouts.map((layout) => (
                    <div
                        key={layout.id}
                        onClick={() => onChange(layout.id)}
                        className={cn(
                            "cursor-pointer rounded-xl border-2 p-4 transition-all hover:border-pink-200 hover:bg-pink-50",
                            value === layout.id
                                ? "border-pink-500 bg-pink-50/50"
                                : "border-muted bg-card"
                        )}
                    >
                        <div className={cn(
                            "mb-3 w-10 h-10 rounded-lg flex items-center justify-center",
                            value === layout.id ? "bg-pink-100 text-pink-600" : "bg-muted text-muted-foreground"
                        )}>
                            <layout.icon className="h-5 w-5" />
                        </div>
                        <div className="font-semibold text-sm mb-1">{layout.title}</div>
                        <div className="text-xs text-muted-foreground leading-snug">
                            {layout.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
