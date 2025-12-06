'use client';

import * as React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus, GripVertical, Sparkles, Star, Music, Utensils, Clock, Award, Wifi, Car, CreditCard } from 'lucide-react';
import { VenueEditorData } from '@/lib/venue-editor-schema';

const iconOptions = [
    { value: 'sparkles', label: 'Sparkles', icon: Sparkles },
    { value: 'star', label: 'Star', icon: Star },
    { value: 'music', label: 'Music', icon: Music },
    { value: 'utensils', label: 'Dining', icon: Utensils },
    { value: 'clock', label: 'Hours', icon: Clock },
    { value: 'award', label: 'Award', icon: Award },
    { value: 'wifi', label: 'WiFi', icon: Wifi },
    { value: 'car', label: 'Parking', icon: Car },
    { value: 'credit-card', label: 'Payment', icon: CreditCard },
];

export function HighlightsSection() {
    const { watch, setValue } = useFormContext<VenueEditorData>();
    const highlights = watch('highlights') || [];
    const [newHighlight, setNewHighlight] = React.useState('');

    const addHighlight = () => {
        if (newHighlight.trim()) {
            const updated = [...highlights, newHighlight.trim()];
            setValue('highlights', updated, { shouldDirty: true });
            setNewHighlight('');
        }
    };

    const removeHighlight = (index: number) => {
        const updated = highlights.filter((_, i) => i !== index);
        setValue('highlights', updated, { shouldDirty: true });
    };

    const moveHighlight = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= highlights.length) return;

        const updated = [...highlights];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        setValue('highlights', updated, { shouldDirty: true });
    };

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-lg">Venue Highlights</CardTitle>
                <CardDescription>
                    Showcase what makes your venue special. These appear prominently on your landing page.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add New Highlight */}
                <div className="flex gap-2">
                    <Input
                        value={newHighlight}
                        onChange={(e) => setNewHighlight(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addHighlight();
                            }
                        }}
                        placeholder="e.g., Live DJ Every Weekend, Rooftop Views, VIP Reservations"
                    />
                    <Button type="button" onClick={addHighlight} variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                    </Button>
                </div>

                {/* Highlights List */}
                {highlights.length > 0 ? (
                    <div className="space-y-2">
                        {highlights.map((highlight, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors group"
                            >
                                {/* Reorder Buttons */}
                                <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => moveHighlight(index, 'up')}
                                        disabled={index === 0}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveHighlight(index, 'down')}
                                        disabled={index === highlights.length - 1}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <GripVertical className="h-4 w-4 text-gray-300" />

                                <div className="flex-1 font-medium">{highlight}</div>

                                <button
                                    type="button"
                                    onClick={() => removeHighlight(index)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                        <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No highlights added yet</p>
                        <p className="text-sm">Add features that make your venue unique</p>
                    </div>
                )}

                {/* Suggestions */}
                <div className="pt-4 border-t">
                    <Label className="text-sm text-gray-600">Quick Add:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {['Live Music', 'Private Events', 'Happy Hour', 'Late Night', 'Outdoor Seating', 'Craft Cocktails'].map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                onClick={() => {
                                    if (!highlights.includes(suggestion)) {
                                        setValue('highlights', [...highlights, suggestion], { shouldDirty: true });
                                    }
                                }}
                                disabled={highlights.includes(suggestion)}
                                className="px-3 py-1 text-sm rounded-full border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                + {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
