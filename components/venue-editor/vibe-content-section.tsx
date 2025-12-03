'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { VenueEditorData } from '@/lib/venue-editor-schema';

export function VibeContentSection() {
    const { register, watch, setValue } = useFormContext<VenueEditorData>();
    const [isGenerating, setIsGenerating] = React.useState(false);

    const description = watch('description') || '';
    const venueType = watch('venueType');
    const vibeKeywords = watch('vibeKeywords');

    const handleAutoGenerate = async () => {
        setIsGenerating(true);

        // Simulate AI generation delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple mock generation based on inputs
        const generatedText = `Welcome to the ultimate ${venueType || 'venue'} experience. ` +
            `Immerse yourself in a ${vibeKeywords || 'unique'} atmosphere designed for unforgettable moments. ` +
            `Whether you're here for the views or the vibes, we promise an evening like no other.`;

        setValue('description', generatedText, { shouldDirty: true });
        setIsGenerating(false);
    };

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-pink-500" />
                    <CardTitle className="text-lg">Vibe & Content</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                        id="tagline"
                        placeholder="e.g. Elevate your senses above the city."
                        {...register('tagline')}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="vibeKeywords">Vibe Keywords (comma separated)</Label>
                    <Input
                        id="vibeKeywords"
                        placeholder="e.g. Chill, Luxury, Sunset, House Music"
                        {...register('vibeKeywords')}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="description">Description</Label>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-pink-600 hover:text-pink-700 hover:bg-transparent font-medium"
                            onClick={handleAutoGenerate}
                            disabled={isGenerating}
                            type="button"
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-1">
                                    <Sparkles className="h-3 w-3 animate-spin" /> Generating...
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" /> Auto-Generate with AI
                                </span>
                            )}
                        </Button>
                    </div>
                    <Textarea
                        id="description"
                        placeholder="Describe your venue..."
                        className="min-h-[150px]"
                        {...register('description')}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                        {description.length} characters
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
