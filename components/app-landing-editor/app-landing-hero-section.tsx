'use client';

import * as React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AppLandingHeroLayoutSelector } from './app-landing-hero-layout-selector';
import { ImageUpload } from '@/components/venue-editor/image-upload';
import { AppLandingEditorData } from '@/lib/app-landing-editor-schema';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export function AppLandingHeroSection() {
    const { register, watch, setValue, control } = useFormContext<AppLandingEditorData>();

    const heroLayoutStyle = watch('heroLayoutStyle');
    const heroBackgroundImageUrl = watch('heroBackgroundImageUrl');
    const heroSliderImages = watch('heroSliderImages') || [];

    const isSliderLayout = heroLayoutStyle === 'cinematic-slider';

    const addSliderImage = () => {
        const newImages = [...heroSliderImages, ''];
        setValue('heroSliderImages', newImages, { shouldDirty: true });
    };

    const removeSliderImage = (index: number) => {
        const newImages = heroSliderImages.filter((_, i) => i !== index);
        setValue('heroSliderImages', newImages, { shouldDirty: true });
    };

    const updateSliderImage = (index: number, value: string) => {
        const newImages = [...heroSliderImages];
        newImages[index] = value;
        setValue('heroSliderImages', newImages, { shouldDirty: true });
    };

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-lg">Hero Section</CardTitle>
                <CardDescription>
                    Customize the main section of your public landing page.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Text Content */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="heroHeadline">Headline</Label>
                        <Input
                            id="heroHeadline"
                            placeholder="e.g. Your Venue, Your Vibe, Your Success"
                            {...register('heroHeadline')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heroDescription">Description</Label>
                        <Textarea
                            id="heroDescription"
                            placeholder="e.g. VenueVibe provides the ultimate toolkit for nightclubs, bars, and restaurants to create stunning, interactive landing pages."
                            className="h-24"
                            {...register('heroDescription')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heroButtonText">Button Text</Label>
                        <Input
                            id="heroButtonText"
                            placeholder="e.g. Get Started Now"
                            {...register('heroButtonText')}
                        />
                    </div>
                </div>

                {/* Layout Selection */}
                <AppLandingHeroLayoutSelector
                    value={heroLayoutStyle}
                    onChange={(value) => setValue('heroLayoutStyle', value as any, { shouldDirty: true })}
                />

                {/* Background Image - Show for non-slider layouts */}
                {!isSliderLayout && (
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
                )}

                {/* Slider Images - Show only for cinematic-slider layout */}
                {isSliderLayout && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">Slider Images</Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Add multiple images that will rotate automatically in the hero section.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addSliderImage}
                                className="flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Add Image
                            </Button>
                        </div>

                        {heroSliderImages.length === 0 ? (
                            <div className="border-2 border-dashed rounded-xl p-8 text-center">
                                <p className="text-muted-foreground mb-4">No slider images added yet</p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addSliderImage}
                                    className="flex items-center gap-2 mx-auto"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Your First Image
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {heroSliderImages.map((imageUrl, index) => (
                                    <div key={index} className="flex gap-4 items-start p-4 border rounded-xl bg-muted/30">
                                        <div className="flex items-center text-muted-foreground">
                                            <GripVertical className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium">Slide {index + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeSliderImage(index)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <ImageUpload
                                                value={imageUrl}
                                                onChange={(value) => updateSliderImage(index, value)}
                                                placeholder="Enter image URL..."
                                            />
                                            {imageUrl && (
                                                <div className="relative rounded-lg overflow-hidden aspect-[16/9] bg-muted">
                                                    <img
                                                        src={imageUrl}
                                                        alt={`Slider image ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {heroSliderImages.length > 0 && heroSliderImages.length < 5 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addSliderImage}
                                className="w-full flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Add Another Image
                            </Button>
                        )}

                        {heroSliderImages.length >= 5 && (
                            <p className="text-sm text-muted-foreground text-center">
                                Maximum 5 slider images allowed
                            </p>
                        )}
                    </div>
                )}

                {/* Slider Settings - Show only for cinematic-slider layout */}
                {isSliderLayout && (
                    <SliderSettingsPanel />
                )}
            </CardContent>
        </Card>
    );
}

function SliderSettingsPanel() {
    const { watch, setValue } = useFormContext<AppLandingEditorData>();

    const sliderSettings = watch('heroSliderSettings') || {
        slideDuration: 5,
        transitionEffect: 'fade',
        showDots: true,
        overlayOpacity: 50,
        pauseOnHover: true
    };

    const updateSetting = <K extends keyof typeof sliderSettings>(
        key: K,
        value: typeof sliderSettings[K]
    ) => {
        setValue('heroSliderSettings', { ...sliderSettings, [key]: value }, { shouldDirty: true });
    };

    return (
        <div className="space-y-6 border rounded-xl p-6 bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                <Label className="text-base font-semibold">Slider Settings</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Slide Duration */}
                <div className="space-y-2">
                    <Label htmlFor="slideDuration">Slide Duration</Label>
                    <select
                        id="slideDuration"
                        value={sliderSettings.slideDuration}
                        onChange={(e) => updateSetting('slideDuration', Number(e.target.value) as 3 | 5 | 7 | 10)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value={3}>3 seconds</option>
                        <option value={5}>5 seconds</option>
                        <option value={7}>7 seconds</option>
                        <option value={10}>10 seconds</option>
                    </select>
                    <p className="text-xs text-muted-foreground">How long each slide is displayed</p>
                </div>

                {/* Transition Effect */}
                <div className="space-y-2">
                    <Label htmlFor="transitionEffect">Transition Effect</Label>
                    <select
                        id="transitionEffect"
                        value={sliderSettings.transitionEffect}
                        onChange={(e) => updateSetting('transitionEffect', e.target.value as 'fade' | 'slide' | 'zoom')}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="zoom">Zoom</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Animation between slides</p>
                </div>
            </div>

            {/* Overlay Opacity */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label htmlFor="overlayOpacity">Overlay Opacity</Label>
                    <span className="text-sm font-medium text-muted-foreground">{sliderSettings.overlayOpacity}%</span>
                </div>
                <input
                    id="overlayOpacity"
                    type="range"
                    min="0"
                    max="80"
                    step="5"
                    value={sliderSettings.overlayOpacity}
                    onChange={(e) => updateSetting('overlayOpacity', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0% (No overlay)</span>
                    <span>80% (Dark)</span>
                </div>
            </div>

            {/* Toggle Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Show Navigation Dots */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                    <div className="space-y-0.5">
                        <Label htmlFor="showDots" className="cursor-pointer">Show Navigation Dots</Label>
                        <p className="text-xs text-muted-foreground">Display slide indicators</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            id="showDots"
                            type="checkbox"
                            checked={sliderSettings.showDots}
                            onChange={(e) => updateSetting('showDots', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                </div>

                {/* Pause on Hover */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                    <div className="space-y-0.5">
                        <Label htmlFor="pauseOnHover" className="cursor-pointer">Pause on Hover</Label>
                        <p className="text-xs text-muted-foreground">Stop auto-play on hover</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            id="pauseOnHover"
                            type="checkbox"
                            checked={sliderSettings.pauseOnHover}
                            onChange={(e) => updateSetting('pauseOnHover', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                </div>
            </div>
        </div>
    );
}
