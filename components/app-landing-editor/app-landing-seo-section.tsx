'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { AppLandingEditorData } from '@/lib/app-landing-editor-schema';
import { ImageUpload } from '@/components/venue-editor/image-upload';
import { storageService } from '@/lib/db/storage';

export function AppLandingSEOSection() {
    const { watch, setValue } = useFormContext<AppLandingEditorData>();

    const seo = watch('seo');
    const [keywordInput, setKeywordInput] = React.useState('');

    const updateSEO = (field: string, value: any) => {
        setValue(`seo.${field}` as any, value, { shouldDirty: true });
    };

    const addKeyword = () => {
        if (keywordInput.trim()) {
            updateSEO('metaKeywords', [...seo.metaKeywords, keywordInput.trim()]);
            setKeywordInput('');
        }
    };

    const removeKeyword = (index: number) => {
        const updatedKeywords = seo.metaKeywords.filter((_, i) => i !== index);
        updateSEO('metaKeywords', updatedKeywords);
    };

    // Helper to check if URL is valid and displayable (http/https only)
    const isValidImageUrl = (url: string | undefined) => {
        if (!url) return false;
        return url.startsWith('http://') || url.startsWith('https://');
    };

    // Handle image upload to Supabase storage
    const handleImageUpload = async (file: File) => {
        const path = storageService.getStoragePath('app-landing', 'seo', file.name);
        return await storageService.uploadImage(file, path);
    };

    return (
        <div className="space-y-6">
            {/* Basic SEO Card */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Meta Information</CardTitle>
                    <CardDescription>
                        Basic SEO settings that appear in search engines
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Meta Title */}
                    <div className="space-y-2">
                        <Label htmlFor="meta-title">Meta Title</Label>
                        <Input
                            id="meta-title"
                            value={seo.metaTitle}
                            onChange={(e) => updateSEO('metaTitle', e.target.value)}
                            placeholder="Your Venue, Your Vibe, Your Success | VenueVibe"
                            maxLength={60}
                        />
                        <p className="text-xs text-gray-500">
                            {seo.metaTitle.length}/60 characters - Recommended: 50-60 characters
                        </p>
                    </div>

                    {/* Meta Description */}
                    <div className="space-y-2">
                        <Label htmlFor="meta-description">Meta Description</Label>
                        <Textarea
                            id="meta-description"
                            value={seo.metaDescription}
                            onChange={(e) => updateSEO('metaDescription', e.target.value)}
                            placeholder="Create stunning landing pages for your nightclub, bar, or restaurant..."
                            rows={3}
                            maxLength={160}
                        />
                        <p className="text-xs text-gray-500">
                            {seo.metaDescription.length}/160 characters - Recommended: 150-160 characters
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
                            <Button
                                type="button"
                                onClick={addKeyword}
                                variant="outline"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {seo.metaKeywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {seo.metaKeywords.map((keyword, index) => (
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
                </CardContent>
            </Card>

            {/* Open Graph Card */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Open Graph / Social Media</CardTitle>
                    <CardDescription>
                        How your page appears when shared on social media platforms
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* OG Image */}
                    <div className="space-y-2">
                        <Label>Social Media Image</Label>
                        <ImageUpload
                            value={seo.ogImage}
                            onChange={(value) => updateSEO('ogImage', value)}
                            placeholder="Enter image URL (1200x630px recommended)..."
                            onUpload={handleImageUpload}
                        />
                        <p className="text-xs text-gray-500">
                            Recommended size: 1200x630px for optimal display across platforms
                        </p>
                    </div>

                    {/* OG Title */}
                    <div className="space-y-2">
                        <Label htmlFor="og-title">Social Media Title</Label>
                        <Input
                            id="og-title"
                            value={seo.ogTitle}
                            onChange={(e) => updateSEO('ogTitle', e.target.value)}
                            placeholder="VenueVibe - Landing Page Builder for Venues"
                            maxLength={70}
                        />
                        <p className="text-xs text-gray-500">
                            {seo.ogTitle.length}/70 characters - Can be different from meta title
                        </p>
                    </div>

                    {/* OG Description */}
                    <div className="space-y-2">
                        <Label htmlFor="og-description">Social Media Description</Label>
                        <Textarea
                            id="og-description"
                            value={seo.ogDescription}
                            onChange={(e) => updateSEO('ogDescription', e.target.value)}
                            placeholder="Build beautiful, high-converting landing pages for your venue in minutes..."
                            rows={3}
                            maxLength={200}
                        />
                        <p className="text-xs text-gray-500">
                            {seo.ogDescription.length}/200 characters
                        </p>
                    </div>

                    {/* Preview */}
                    <div className="space-y-2 pt-4 border-t">
                        <Label>Social Media Preview</Label>
                        <div className="border rounded-lg overflow-hidden max-w-md">
                            {isValidImageUrl(seo.ogImage) && (
                                <img
                                    src={seo.ogImage}
                                    alt="OG Preview"
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4 bg-gray-50">
                                <div className="font-semibold text-sm mb-1">
                                    {seo.ogTitle || 'No title set'}
                                </div>
                                <div className="text-xs text-gray-600 line-clamp-2">
                                    {seo.ogDescription || 'No description set'}
                                </div>
                                <div className="text-xs text-gray-400 mt-2">
                                    {seo.ogImage ? 'yourdomain.com' : 'Add an image above'}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Technical SEO Tips */}
            <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        SEO Best Practices
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Keep meta titles under 60 characters to avoid truncation</li>
                        <li>Write compelling descriptions that include target keywords naturally</li>
                        <li>Use high-quality images (1200x630px) for social media</li>
                        <li>Ensure OG title and description accurately represent your page</li>
                        <li>Test your social media preview using Facebook Debugger & Twitter Card Validator</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
