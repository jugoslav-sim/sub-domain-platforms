'use client';

import * as React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { themeColors } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface ThemeColorPickerProps {
    color: string;
    onChange: (color: string) => void;
}

export function ThemeColorPicker({ color, onChange }: ThemeColorPickerProps) {
    const safeColor = color || '#000000';

    return (
        <div className="flex items-center gap-3">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[80px] h-10 p-1 px-1 shrink-0"
                    >
                        <div
                            className="w-full h-full rounded-sm border border-muted"
                            style={{ backgroundColor: safeColor }}
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                    <HexColorPicker color={safeColor} onChange={onChange} />

                    <div className="mt-3 grid grid-cols-5 gap-2">
                        {themeColors.map((c) => (
                            <button
                                key={c}
                                className={cn(
                                    "w-6 h-6 rounded-full border border-muted transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-ring",
                                    safeColor === c && "ring-2 ring-offset-1 ring-ring"
                                )}
                                style={{ backgroundColor: c }}
                                onClick={() => onChange(c)}
                                type="button"
                            />
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground text-sm">#</span>
                </div>
                <Input
                    value={safeColor.replace('#', '')}
                    onChange={(e) => onChange(`#${e.target.value}`)}
                    className="pl-7 uppercase font-mono"
                    maxLength={7}
                />
            </div>
        </div>
    );
}
