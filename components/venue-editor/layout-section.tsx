'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueSection {
    id: string;
    name: string;
    description: string;
    visible: boolean;
    order: number;
}

const defaultVenueSections: VenueSection[] = [
    { id: 'hero', name: 'Hero', description: 'Main banner with headline and CTA', visible: true, order: 1 },
    { id: 'about', name: 'About', description: 'Venue description and vibe', visible: true, order: 2 },
    { id: 'gallery', name: 'Photo Gallery', description: 'Image showcase', visible: true, order: 3 },
    { id: 'menu', name: 'Menu', description: 'Drinks and food items', visible: true, order: 4 },
    { id: 'events', name: 'Events', description: 'Upcoming events calendar', visible: true, order: 5 },
    { id: 'music', name: 'Music/Atmosphere', description: 'Spotify embed and vibe description', visible: true, order: 6 },
    { id: 'testimonials', name: 'Testimonials', description: 'Customer reviews', visible: true, order: 7 },
    { id: 'location', name: 'Location & Hours', description: 'Address, map, and operating hours', visible: true, order: 8 },
    { id: 'social', name: 'Social Links', description: 'Social media icons', visible: true, order: 9 },
];

export function LayoutSection() {
    const { watch, setValue } = useFormContext<VenueEditorData>();

    // Use layout sections from form or default
    const layoutSections = watch('layoutSections' as any) || defaultVenueSections;

    const updateSections = (sections: VenueSection[]) => {
        setValue('layoutSections' as any, sections, { shouldDirty: true });
    };

    const toggleSectionVisibility = (sectionId: string) => {
        const updated = layoutSections.map((section: VenueSection) =>
            section.id === sectionId ? { ...section, visible: !section.visible } : section
        );
        updateSections(updated);
    };

    const moveSectionUp = (index: number) => {
        if (index === 0) return;
        const newSections = [...layoutSections];
        [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
        const reordered = newSections.map((s: VenueSection, i: number) => ({ ...s, order: i + 1 }));
        updateSections(reordered);
    };

    const moveSectionDown = (index: number) => {
        if (index === layoutSections.length - 1) return;
        const newSections = [...layoutSections];
        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        const reordered = newSections.map((s: VenueSection, i: number) => ({ ...s, order: i + 1 }));
        updateSections(reordered);
    };

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-lg">Page Sections</CardTitle>
                <CardDescription>
                    Control which sections appear on your venue page and their order
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {layoutSections.map((section: VenueSection, index: number) => (
                        <div
                            key={section.id}
                            className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${section.visible
                                    ? 'bg-white hover:bg-gray-50'
                                    : 'bg-gray-50 opacity-60'
                                }`}
                        >
                            {/* Reorder Buttons */}
                            <div className="flex flex-col gap-1">
                                <button
                                    type="button"
                                    onClick={() => moveSectionUp(index)}
                                    disabled={index === 0}
                                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move up"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveSectionDown(index)}
                                    disabled={index === layoutSections.length - 1}
                                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move down"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Drag Handle */}
                            <GripVertical className="h-5 w-5 text-gray-400" />

                            {/* Section Info */}
                            <div className="flex-1">
                                <div className="font-medium">{section.name}</div>
                                <div className="text-sm text-gray-500">{section.description}</div>
                            </div>

                            {/* Visibility Toggle */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => toggleSectionVisibility(section.id)}
                                    className={`p-2 rounded transition-colors ${section.visible
                                            ? 'text-green-600 bg-green-50 hover:bg-green-100'
                                            : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    title={section.visible ? 'Hide section' : 'Show section'}
                                >
                                    {section.visible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                </button>
                                <span className={`text-sm w-16 ${section.visible ? 'text-green-600' : 'text-gray-400'}`}>
                                    {section.visible ? 'Visible' : 'Hidden'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                        <strong>Tip:</strong> The Hero section is always shown at the top. Other sections can be reordered or hidden based on your preference.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
