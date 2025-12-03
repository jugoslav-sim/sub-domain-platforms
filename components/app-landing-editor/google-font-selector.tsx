'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GoogleFontSelectorProps {
    value: string;
    onChange: (font: string) => void;
    label: string;
}

// Popular Google Fonts for web projects
const popularFonts = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Raleway',
    'Ubuntu',
    'Nunito',
    'Playfair Display',
    'Merriweather',
    'PT Sans',
    'Source Sans Pro',
    'Oswald',
    'Rubik',
    'Work Sans',
    'Dancing Script',
    'Bebas Neue',
    'Crimson Text',
    'Bitter'
];

export function GoogleFontSelector({ value, onChange, label }: GoogleFontSelectorProps) {
    // Load the selected font dynamically
    React.useEffect(() => {
        if (value && !document.getElementById(`font-${value}`)) {
            const link = document.createElement('link');
            link.id = `font-${value}`;
            link.rel = 'stylesheet';
            link.href = `https://fonts.googleapis.com/css2?family=${value.replace(' ', '+')}:wght@400;500;600;700&display=swap`;
            document.head.appendChild(link);
        }
    }, [value]);

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                    {popularFonts.map((font) => (
                        <SelectItem key={font} value={font}>
                            <span style={{ fontFamily: font }}>{font}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {value && (
                <div className="p-4 rounded-lg border bg-gray-50 mt-2">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <p
                        className="text-2xl font-semibold"
                        style={{ fontFamily: value }}
                    >
                        The quick brown fox jumps over the lazy dog
                    </p>
                    <p
                        className="text-base mt-2"
                        style={{ fontFamily: value }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            )}
        </div>
    );
}
