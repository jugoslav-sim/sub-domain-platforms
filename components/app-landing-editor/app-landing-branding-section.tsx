'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AppLandingEditorData } from '@/lib/app-landing-editor-schema';
import { ImageUpload } from '@/components/venue-editor/image-upload';
import { ColorSchemePicker } from './color-scheme-picker';
import { GoogleFontSelector } from './google-font-selector';

const logoPositions = [
    { value: 'left', label: 'Left', description: 'Logo aligned to the left' },
    { value: 'center', label: 'Center', description: 'Logo centered' },
    { value: 'right', label: 'Right', description: 'Logo aligned to the right' }
] as const;

export function AppLandingBrandingSection() {
    const { watch, setValue } = useFormContext<AppLandingEditorData>();

    const branding = watch('branding');

    const updateBranding = (field: string, value: any) => {
        setValue(`branding.${field}` as any, value, { shouldDirty: true });
    };

    return (
        <div className="space-y-6">
            {/* Logo Section */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Logo</CardTitle>
                    <CardDescription>
                        Upload your brand logo and configure its appearance
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Logo Upload */}
                    <div className="space-y-3">
                        <Label>Logo Image</Label>
                        <ImageUpload
                            value={branding.logoUrl}
                            onChange={(value) => updateBranding('logoUrl', value)}
                            placeholder="Enter logo URL or upload a file..."
                        />
                    </div>

                    {/* Logo Width */}
                    <div className="space-y-2">
                        <Label htmlFor="logo-width">Logo Width (pixels)</Label>
                        <Input
                            id="logo-width"
                            type="number"
                            min="50"
                            max="500"
                            value={branding.logoWidth}
                            onChange={(e) => updateBranding('logoWidth', parseInt(e.target.value) || 120)}
                            className="max-w-[200px]"
                        />
                        <p className="text-xs text-gray-500">Recommended: 120-200px</p>
                    </div>

                    {/* Logo Position */}
                    <div className="space-y-3">
                        <Label>Logo Position</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {logoPositions.map((position) => (
                                <button
                                    key={position.value}
                                    type="button"
                                    onClick={() => updateBranding('logoPosition', position.value)}
                                    className={`
                                        p-4 rounded-lg border-2 text-center transition-all
                                        ${branding.logoPosition === position.value
                                            ? 'border-pink-600 bg-pink-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <div className="font-medium">{position.label}</div>
                                    <div className="text-xs text-gray-600 mt-1">{position.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Color Scheme Section */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Color Scheme</CardTitle>
                    <CardDescription>
                        Define your brand colors for a consistent look
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ColorSchemePicker
                        colors={branding.colors}
                        onChange={(colors) => updateBranding('colors', colors)}
                    />
                </CardContent>
            </Card>

            {/* Typography Section */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Typography</CardTitle>
                    <CardDescription>
                        Choose fonts that match your brand identity
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Heading Font */}
                    <GoogleFontSelector
                        value={branding.typography.headingFont}
                        onChange={(font) => updateBranding('typography.headingFont', font)}
                        label="Heading Font"
                    />

                    {/* Body Font */}
                    <GoogleFontSelector
                        value={branding.typography.bodyFont}
                        onChange={(font) => updateBranding('typography.bodyFont', font)}
                        label="Body Font"
                    />

                    {/* Font Sizes */}
                    <div className="space-y-4 pt-4 border-t">
                        <Label>Font Sizes</Label>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="h1-size" className="text-sm">H1 Size</Label>
                                <Input
                                    id="h1-size"
                                    type="number"
                                    min="24"
                                    max="96"
                                    value={branding.typography.fontSizes.h1}
                                    onChange={(e) => updateBranding('typography.fontSizes.h1', parseInt(e.target.value) || 48)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="h2-size" className="text-sm">H2 Size</Label>
                                <Input
                                    id="h2-size"
                                    type="number"
                                    min="20"
                                    max="72"
                                    value={branding.typography.fontSizes.h2}
                                    onChange={(e) => updateBranding('typography.fontSizes.h2', parseInt(e.target.value) || 36)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="h3-size" className="text-sm">H3 Size</Label>
                                <Input
                                    id="h3-size"
                                    type="number"
                                    min="16"
                                    max="48"
                                    value={branding.typography.fontSizes.h3}
                                    onChange={(e) => updateBranding('typography.fontSizes.h3', parseInt(e.target.value) || 24)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="body-size" className="text-sm">Body Size</Label>
                                <Input
                                    id="body-size"
                                    type="number"
                                    min="12"
                                    max="24"
                                    value={branding.typography.fontSizes.body}
                                    onChange={(e) => updateBranding('typography.fontSizes.body', parseInt(e.target.value) || 16)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Typography Preview */}
                    <div className="space-y-2 pt-4 border-t">
                        <Label>Typography Preview</Label>
                        <div className="p-6 rounded-lg border bg-gray-50 space-y-4">
                            <h1
                                style={{
                                    fontFamily: branding.typography.headingFont,
                                    fontSize: `${branding.typography.fontSizes.h1}px`,
                                    color: branding.colors.primary
                                }}
                                className="font-bold"
                            >
                                Heading 1
                            </h1>
                            <h2
                                style={{
                                    fontFamily: branding.typography.headingFont,
                                    fontSize: `${branding.typography.fontSizes.h2}px`,
                                    color: branding.colors.secondary
                                }}
                                className="font-semibold"
                            >
                                Heading 2
                            </h2>
                            <h3
                                style={{
                                    fontFamily: branding.typography.headingFont,
                                    fontSize: `${branding.typography.fontSizes.h3}px`,
                                    color: branding.colors.accent
                                }}
                                className="font-medium"
                            >
                                Heading 3
                            </h3>
                            <p
                                style={{
                                    fontFamily: branding.typography.bodyFont,
                                    fontSize: `${branding.typography.fontSizes.body}px`
                                }}
                            >
                                This is body text using your selected font. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
