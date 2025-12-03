'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeColorPicker } from './theme-color-picker';
import { ImageUpload } from './image-upload';
import { Camera } from 'lucide-react';
import { venueTypes } from '@/lib/mock-data';
import { VenueEditorData } from '@/lib/venue-editor-schema';

export function BrandingVisualsSection() {
    const { register, watch, setValue, formState: { errors } } = useFormContext<VenueEditorData>();

    const themeColor = watch('themeColor');
    const coverImageUrl = watch('coverImageUrl');
    const venueType = watch('venueType');

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-lg">Branding & Visuals</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="venueName">Venue Name</Label>
                    <Input
                        id="venueName"
                        placeholder="e.g. The Cloud Lounge"
                        {...register('venueName', { required: 'Venue name is required' })}
                    />
                    {errors.venueName && (
                        <p className="text-sm text-red-500">{errors.venueName.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Venue Type</Label>
                        <Select
                            value={venueType}
                            onValueChange={(value) => setValue('venueType', value, { shouldDirty: true })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {venueTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Theme Color</Label>
                        <ThemeColorPicker
                            color={themeColor}
                            onChange={(color) => setValue('themeColor', color, { shouldDirty: true })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Cover Image URL</Label>
                    <ImageUpload
                        value={coverImageUrl}
                        onChange={(value) => setValue('coverImageUrl', value, { shouldDirty: true })}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
