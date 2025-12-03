'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { BrandingColors } from '@/lib/app-landing-editor-schema';

interface ColorSchemePickerProps {
    colors: BrandingColors;
    onChange: (colors: BrandingColors) => void;
}

const colorPresets = [
    { name: 'Default', colors: { primary: '#6366f1', secondary: '#ec4899', accent: '#8b5cf6' } },
    { name: 'Ocean', colors: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#14b8a6' } },
    { name: 'Forest', colors: { primary: '#22c55e', secondary: '#84cc16', accent: '#10b981' } },
    { name: 'Sunset', colors: { primary: '#f97316', secondary: '#ef4444', accent: '#f59e0b' } },
    { name: 'Royal', colors: { primary: '#7c3aed', secondary: '#a855f7', accent: '#c026d3' } },
    { name: 'Monochrome', colors: { primary: '#1f2937', secondary: '#6b7280', accent: '#9ca3af' } }
];

export function ColorSchemePicker({ colors, onChange }: ColorSchemePickerProps) {
    const handleColorChange = (colorType: keyof BrandingColors, value: string) => {
        onChange({
            ...colors,
            [colorType]: value
        });
    };

    const applyPreset = (preset: typeof colorPresets[0]) => {
        onChange(preset.colors);
    };

    return (
        <div className="space-y-6">
            {/* Presets */}
            <div className="space-y-3">
                <Label>Color Presets</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {colorPresets.map((preset) => (
                        <button
                            key={preset.name}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            className="p-3 rounded-lg border-2 hover:border-pink-500 transition-colors text-left"
                        >
                            <div className="font-medium text-sm mb-2">{preset.name}</div>
                            <div className="flex gap-1">
                                <div
                                    className="w-8 h-8 rounded"
                                    style={{ backgroundColor: preset.colors.primary }}
                                    title="Primary"
                                />
                                <div
                                    className="w-8 h-8 rounded"
                                    style={{ backgroundColor: preset.colors.secondary }}
                                    title="Secondary"
                                />
                                <div
                                    className="w-8 h-8 rounded"
                                    style={{ backgroundColor: preset.colors.accent }}
                                    title="Accent"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Colors */}
            <div className="space-y-4">
                <Label>Custom Colors</Label>

                {/* Primary Color */}
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <label htmlFor="primary-color" className="text-sm font-medium">
                            Primary Color
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Main brand color for buttons and accents</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="primary-color"
                            type="color"
                            value={colors.primary}
                            onChange={(e) => handleColorChange('primary', e.target.value)}
                            className="w-16 h-16 rounded border-2 border-gray-200 cursor-pointer"
                        />
                        <input
                            type="text"
                            value={colors.primary}
                            onChange={(e) => handleColorChange('primary', e.target.value)}
                            className="w-24 px-2 py-1 border rounded text-sm font-mono"
                            placeholder="#000000"
                        />
                    </div>
                </div>

                {/* Secondary Color */}
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <label htmlFor="secondary-color" className="text-sm font-medium">
                            Secondary Color
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Supporting color for highlights</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="secondary-color"
                            type="color"
                            value={colors.secondary}
                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                            className="w-16 h-16 rounded border-2 border-gray-200 cursor-pointer"
                        />
                        <input
                            type="text"
                            value={colors.secondary}
                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                            className="w-24 px-2 py-1 border rounded text-sm font-mono"
                            placeholder="#000000"
                        />
                    </div>
                </div>

                {/* Accent Color */}
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <label htmlFor="accent-color" className="text-sm font-medium">
                            Accent Color
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Tertiary color for special elements</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="accent-color"
                            type="color"
                            value={colors.accent}
                            onChange={(e) => handleColorChange('accent', e.target.value)}
                            className="w-16 h-16 rounded border-2 border-gray-200 cursor-pointer"
                        />
                        <input
                            type="text"
                            value={colors.accent}
                            onChange={(e) => handleColorChange('accent', e.target.value)}
                            className="w-24 px-2 py-1 border rounded text-sm font-mono"
                            placeholder="#000000"
                        />
                    </div>
                </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
                <Label>Color Preview</Label>
                <div className="p-6 rounded-lg border-2 space-y-3" style={{ borderColor: colors.primary }}>
                    <button
                        type="button"
                        className="px-6 py-3 rounded-lg font-semibold text-white"
                        style={{ backgroundColor: colors.primary }}
                    >
                        Primary Button
                    </button>
                    <button
                        type="button"
                        className="px-6 py-3 rounded-lg font-semibold text-white ml-2"
                        style={{ backgroundColor: colors.secondary }}
                    >
                        Secondary Button
                    </button>
                    <div className="flex items-center gap-2 mt-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.accent }} />
                        <span className="text-sm" style={{ color: colors.accent }}>Accent Color Text</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
