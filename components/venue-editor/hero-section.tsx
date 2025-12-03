'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HeroLayoutSelector } from './hero-layout-selector';
import { ImageUpload } from './image-upload';
import { VenueEditorData } from '@/lib/venue-editor-schema';

export function HeroSection() {
    const { register, watch, setValue } = useFormContext<VenueEditorData>();

    const heroLayoutStyle = watch('heroLayoutStyle');
    const heroBackgroundImageUrl = watch('heroBackgroundImageUrl');

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-lg">Hero Section</CardTitle>
                <CardDescription>
                    This is the first thing your customers see.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Text Content */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="heroHeadline">Headline</Label>
                        <Input
                            id="heroHeadline"
                            placeholder="e.g. Elevate Your Night"
                            {...register('heroHeadline')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heroDescription">Description</Label>
                        <Textarea
                            id="heroDescription"
                            placeholder="e.g. Experience the best views, cocktails, and music in the city."
                            className="h-24"
                            {...register('heroDescription')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heroButtonText">Button Text</Label>
                        <Input
                            id="heroButtonText"
                            placeholder="e.g. Book a Table"
                            {...register('heroButtonText')}
                        />
                    </div>
                </div>

                {/* Layout Selection */}
                <HeroLayoutSelector
                    value={heroLayoutStyle}
                    onChange={(value) => setValue('heroLayoutStyle', value as any, { shouldDirty: true })}
                />

                {/* Background Image */}
                <div className="space-y-3">
                    <Label>Background Image</Label>
                    <div className="relative rounded-xl overflow-hidden border bg-muted aspect-[21/9] group">
                        {heroBackgroundImageUrl ? (
                            <>
                                <img
                                    src={heroBackgroundImageUrl}
                                    alt="Hero background"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
                                        <ImageUpload
                                            value={heroBackgroundImageUrl}
                                            onChange={(value) => setValue('heroBackgroundImageUrl', value, { shouldDirty: true })}
                                            placeholder="Enter image URL..."
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-8">
                                <div className="max-w-md w-full">
                                    <ImageUpload
                                        value={heroBackgroundImageUrl}
                                        onChange={(value) => setValue('heroBackgroundImageUrl', value, { shouldDirty: true })}
                                        placeholder="Enter image URL..."
                                    />
                                </div>
                            </div>
                        )}

                        {/* Overlay button for quick access if image exists */}
                        {heroBackgroundImageUrl && (
                            <div className="absolute bottom-4 right-4 opacity-100 group-hover:opacity-0 transition-opacity">
                                <button
                                    type="button"
                                    className="bg-white text-black text-sm font-medium px-4 py-2 rounded-full shadow-md hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                    Change Image
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
