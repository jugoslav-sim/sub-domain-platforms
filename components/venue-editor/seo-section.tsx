'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { VenueEditorData } from '@/lib/venue-editor-schema';
import { ImageUpload } from './image-upload';

export function SEOSection() {
    const { watch, setValue } = useFormContext<VenueEditorData>();

    const metaTitle = watch('metaTitle') || '';
    const metaDescription = watch('metaDescription') || '';
    const metaKeywords = watch('metaKeywords') || [];
    const ogImage = watch('ogImage' as any) || '';
    const venueName = watch('venueName');
    const venueType = watch('venueType');
    const heroDescription = watch('heroDescription');

    const [keywordInput, setKeywordInput] = React.useState('');

    const addKeyword = () => {
        if (keywordInput.trim() && !metaKeywords.includes(keywordInput.trim())) {
            setValue('metaKeywords', [...metaKeywords, keywordInput.trim()], { shouldDirty: true });
            setKeywordInput('');
        }
    };

    const removeKeyword = (index: number) => {
        const updated = metaKeywords.filter((_: string, i: number) => i !== index);
        setValue('metaKeywords', updated, { shouldDirty: true });
    };

    // Auto-generate suggestion based on venue data
    const generateSuggestions = () => {
        if (!metaTitle && venueName) {
            setValue('metaTitle', `${venueName} | ${venueType || 'Your Local Venue'}`, { shouldDirty: true });
        }
        if (!metaDescription && heroDescription) {
            setValue('metaDescription', heroDescription.slice(0, 155), { shouldDirty: true });
        }
    };

    return (
        <div className="space-y-6">
            {/* Meta Information Card */}
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Meta Information</CardTitle>
                            <CardDescription>
                                How your venue appears in search engine results
                            </CardDescription>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={generateSuggestions}>
                            Auto-Generate
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Meta Title */}
                    <div className="space-y-2">
                        <Label htmlFor="meta-title">Meta Title</Label>
                        <Input
                            id="meta-title"
                            value={metaTitle}
                            onChange={(e) => setValue('metaTitle', e.target.value, { shouldDirty: true })}
                            placeholder={`${venueName || 'Your Venue'} | ${venueType || 'Experience'}`}
                            maxLength={60}
                        />
                        <p className="text-xs text-gray-500">
                            {metaTitle.length}/60 characters - Recommended: 50-60 characters
                        </p>
                    </div>

                    {/* Meta Description */}
                    <div className="space-y-2">
                        <Label htmlFor="meta-description">Meta Description</Label>
                        <Textarea
                            id="meta-description"
                            value={metaDescription}
                            onChange={(e) => setValue('metaDescription', e.target.value, { shouldDirty: true })}
                            placeholder="Describe your venue in a compelling way for search results..."
                            rows={3}
                            maxLength={160}
                        />
                        <p className="text-xs text-gray-500">
                            {metaDescription.length}/160 characters - Recommended: 150-160 characters
                        </p>
                    </div>

                    {/* Meta Keywords */}
                    <div className="space-y-2">
                        <Label htmlFor="meta-keywords">Meta Keywords</Label>
                        <div className="flex gap-2">
                            <Input
                                id="meta-keywords"
                                value={keywordInput}
                                onChange={(e) => setKeywordInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addKeyword();
                                    }
                                }}
                                placeholder="Add keyword and press Enter"
                            />
                            <Button type="button" onClick={addKeyword} variant="outline">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {metaKeywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {metaKeywords.map((keyword: string, index: number) => (
                                    <div
                                        key={index}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                                    >
                                        <span>{keyword}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeKeyword(index)}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Preview */}
                    <div className="space-y-2 pt-4 border-t">
                        <Label>Search Engine Preview</Label>
                        <div className="p-4 bg-white border rounded-lg">
                            <div className="text-blue-700 text-lg hover:underline cursor-pointer">
                                {metaTitle || `${venueName || 'Your Venue'} | ${venueType || 'Experience'}`}
                            </div>
                            <div className="text-green-700 text-sm">
                                yourdomain.com/{venueName?.toLowerCase().replace(/\s+/g, '-') || 'venue'}
                            </div>
                            <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                                {metaDescription || heroDescription || 'Add a meta description to improve your search appearance.'}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Open Graph / Social Card */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Social Media Preview</CardTitle>
                    <CardDescription>
                        How your venue appears when shared on social platforms
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* OG Image */}
                    <div className="space-y-2">
                        <Label>Share Image</Label>
                        <ImageUpload
                            value={ogImage}
                            onChange={(value) => setValue('ogImage' as any, value, { shouldDirty: true })}
                            placeholder="Enter image URL (1200x630px recommended)..."
                        />
                        <p className="text-xs text-gray-500">
                            Recommended: 1200x630px for optimal display on all platforms
                        </p>
                    </div>

                    {/* Social Preview */}
                    <div className="space-y-2 pt-4 border-t">
                        <Label>Social Media Preview</Label>
                        <div className="border rounded-lg overflow-hidden max-w-md">
                            {ogImage ? (
                                <img
                                    src={ogImage}
                                    alt="Social preview"
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                                    Add an image above
                                </div>
                            )}
                            <div className="p-4 bg-gray-50">
                                <div className="font-semibold text-sm mb-1">
                                    {metaTitle || `${venueName || 'Your Venue'}`}
                                </div>
                                <div className="text-xs text-gray-600 line-clamp-2">
                                    {metaDescription || 'Add a description to preview'}
                                </div>
                                <div className="text-xs text-gray-400 mt-2">
                                    yourvenue.com
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* SEO Tips */}
            <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        SEO Best Practices
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Include your venue name and type in the title</li>
                        <li>Write a compelling description with your location</li>
                        <li>Use keywords relevant to your venue (e.g., "rooftop bar", "live music")</li>
                        <li>Use a high-quality image for social sharing</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
