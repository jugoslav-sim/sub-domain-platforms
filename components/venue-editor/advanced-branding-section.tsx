'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { VenueEditorData } from '@/lib/venue-editor-schema';
import { ImageUpload } from './image-upload';
import { ThemeColorPicker } from './theme-color-picker';

const fontOptions = [
    { value: 'inter', label: 'Inter', sample: 'Modern & Clean' },
    { value: 'playfair', label: 'Playfair Display', sample: 'Elegant & Serif' },
    { value: 'montserrat', label: 'Montserrat', sample: 'Bold & Striking' },
    { value: 'roboto', label: 'Roboto', sample: 'Friendly & Open' },
    { value: 'outfit', label: 'Outfit', sample: 'Contemporary Style' },
];

export function AdvancedBrandingSection() {
    const { watch, setValue, register } = useFormContext<VenueEditorData>();

    const logo = watch('logo') || '';
    const themeColor = watch('themeColor');
    const brandColors = watch('brandColors') || [];
    const [colorInput, setColorInput] = React.useState('');

    const addBrandColor = () => {
        if (colorInput && /^#[0-9A-Fa-f]{6}$/.test(colorInput)) {
            if (!brandColors.includes(colorInput)) {
                setValue('brandColors', [...brandColors, colorInput], { shouldDirty: true });
            }
            setColorInput('');
        }
    };

    const removeBrandColor = (index: number) => {
        const updated = brandColors.filter((_, i) => i !== index);
        setValue('brandColors', updated, { shouldDirty: true });
    };

    return (
        <div className="space-y-6">
            {/* Logo Upload Card */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Logo</CardTitle>
                    <CardDescription>
                        Your venue's logo appears in the header and footer
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ImageUpload
                        value={logo}
                        onChange={(value) => setValue('logo', value, { shouldDirty: true })}
                        placeholder="Enter logo URL or upload..."
                    />
                    <p className="text-xs text-gray-500">
                        Recommended: PNG with transparent background, min 200px width
                    </p>

                    {logo && (
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <Label className="text-sm text-gray-600 mb-2 block">Preview</Label>
                            <div className="flex items-center gap-4">
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <img src={logo} alt="Logo preview" className="h-12 w-auto object-contain" />
                                </div>
                                <div className="bg-gray-900 p-3 rounded-lg">
                                    <img src={logo} alt="Logo preview dark" className="h-12 w-auto object-contain" />
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Colors Card */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Brand Colors</CardTitle>
                    <CardDescription>
                        Define your venue's color palette for consistent branding
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Primary Theme Color */}
                    <div className="space-y-2">
                        <Label>Primary Theme Color</Label>
                        <ThemeColorPicker
                            color={themeColor}
                            onChange={(color) => setValue('themeColor', color, { shouldDirty: true })}
                        />
                        <p className="text-xs text-gray-500">
                            Used for buttons, links, and accent elements
                        </p>
                    </div>

                    {/* Secondary Colors */}
                    <div className="space-y-3 pt-4 border-t">
                        <Label>Secondary Colors</Label>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">#</span>
                                <Input
                                    value={colorInput.replace('#', '')}
                                    onChange={(e) => setColorInput(`#${e.target.value}`)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addBrandColor();
                                        }
                                    }}
                                    placeholder="000000"
                                    maxLength={6}
                                    className="pl-7 font-mono uppercase"
                                />
                            </div>
                            <Button type="button" onClick={addBrandColor} variant="outline">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        {brandColors.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {brandColors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                                    >
                                        <div
                                            className="w-6 h-6 rounded border"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className="font-mono text-sm uppercase">{color}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeBrandColor(index)}
                                            className="text-gray-400 hover:text-red-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Color Palette Preview */}
                    <div className="pt-4 border-t">
                        <Label className="text-sm text-gray-600 mb-3 block">Palette Preview</Label>
                        <div className="flex gap-1 h-12 rounded-lg overflow-hidden">
                            <div className="flex-1" style={{ backgroundColor: themeColor }} />
                            {brandColors.map((color, index) => (
                                <div key={index} className="flex-1" style={{ backgroundColor: color }} />
                            ))}
                            {brandColors.length === 0 && (
                                <>
                                    <div className="flex-1 bg-gray-200" />
                                    <div className="flex-1 bg-gray-100" />
                                </>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Typography Card */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Typography</CardTitle>
                    <CardDescription>
                        Choose fonts that match your venue's personality
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {fontOptions.map((font) => (
                            <button
                                key={font.value}
                                type="button"
                                onClick={() => setValue('fontFamily' as any, font.value, { shouldDirty: true })}
                                className={`p-4 rounded-lg border-2 text-left transition-all ${watch('fontFamily' as any) === font.value
                                        ? 'border-purple-600 bg-purple-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="font-semibold">{font.label}</div>
                                <div className="text-sm text-gray-500 mt-1">{font.sample}</div>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
