'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GripVertical, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { AppLandingEditorData, PageSection, NavigationLink } from '@/lib/app-landing-editor-schema';

const navigationStyles = [
    { value: 'sticky', label: 'Sticky', description: 'Stays at top when scrolling' },
    { value: 'transparent', label: 'Transparent', description: 'Overlay on hero section' },
    { value: 'solid', label: 'Solid', description: 'Always visible with background' }
] as const;

export function AppLandingLayoutSection() {
    const { watch, setValue } = useFormContext<AppLandingEditorData>();

    const layout = watch('layout');

    const updateLayout = (field: string, value: any) => {
        setValue(`layout.${field}` as any, value, { shouldDirty: true });
    };

    const toggleSectionVisibility = (sectionId: string) => {
        const updatedSections = layout.sections.map(section =>
            section.id === sectionId ? { ...section, visible: !section.visible } : section
        );
        updateLayout('sections', updatedSections);
    };

    const moveSectionUp = (index: number) => {
        if (index === 0) return;
        const newSections = [...layout.sections];
        [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
        // Update order numbers
        const reorderedSections = newSections.map((s, i) => ({ ...s, order: i + 1 }));
        updateLayout('sections', reorderedSections);
    };

    const moveSectionDown = (index: number) => {
        if (index === layout.sections.length - 1) return;
        const newSections = [...layout.sections];
        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        // Update order numbers
        const reorderedSections = newSections.map((s, i) => ({ ...s, order: i + 1 }));
        updateLayout('sections', reorderedSections);
    };

    // Navigation Links Management
    const addNavigationLink = () => {
        const newLink: NavigationLink = {
            id: `nav-${Date.now()}`,
            label: 'New Link',
            href: '#section',
            order: layout.navigation.links.length + 1
        };
        updateLayout('navigation.links', [...layout.navigation.links, newLink]);
    };

    const updateNavigationLink = (index: number, field: keyof NavigationLink, value: string) => {
        const updatedLinks = [...layout.navigation.links];
        updatedLinks[index] = { ...updatedLinks[index], [field]: value };
        updateLayout('navigation.links', updatedLinks);
    };

    const removeNavigationLink = (index: number) => {
        const updatedLinks = layout.navigation.links.filter((_, i) => i !== index);
        // Update order numbers
        const reorderedLinks = updatedLinks.map((link, i) => ({ ...link, order: i + 1 }));
        updateLayout('navigation.links', reorderedLinks);
    };

    return (
        <div className="space-y-6">
            {/* Page Sections Card */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Page Sections</CardTitle>
                    <CardDescription>
                        Control which sections appear on your landing page and their order
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {layout.sections.map((section, index) => (
                            <div
                                key={section.id}
                                className="flex items-center gap-3 p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                            >
                                {/* Reorder Buttons */}
                                <div className="flex flex-col gap-1">
                                    <button
                                        type="button"
                                        onClick={() => moveSectionUp(index)}
                                        disabled={index === 0}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Move up"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveSectionDown(index)}
                                        disabled={index === layout.sections.length - 1}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Move down"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Drag Handle (Visual only for now) */}
                                <GripVertical className="h-5 w-5 text-gray-400" />

                                {/* Section Info */}
                                <div className="flex-1">
                                    <div className="font-medium">{section.name}</div>
                                    <div className="text-sm text-gray-500">Order: {section.order}</div>
                                </div>

                                {/* Visibility Toggle */}
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => toggleSectionVisibility(section.id)}
                                        className={`
                                            p-2 rounded transition-colors
                                            ${section.visible
                                                ? 'text-green-600 bg-green-50 hover:bg-green-100'
                                                : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                                            }
                                        `}
                                        title={section.visible ? 'Hide section' : 'Show section'}
                                    >
                                        {section.visible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                    </button>
                                    <span className="text-sm text-gray-600 w-16">
                                        {section.visible ? 'Visible' : 'Hidden'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Navigation Settings Card */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Navigation Settings</CardTitle>
                    <CardDescription>
                        Configure your navigation bar style and links
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Navigation Style */}
                    <div className="space-y-3">
                        <Label>Navigation Style</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {navigationStyles.map((style) => (
                                <button
                                    key={style.value}
                                    type="button"
                                    onClick={() => updateLayout('navigation.style', style.value)}
                                    className={`
                                        p-4 rounded-lg border-2 text-left transition-all
                                        ${layout.navigation.style === style.value
                                            ? 'border-pink-600 bg-pink-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <div className="font-medium">{style.label}</div>
                                    <div className="text-sm text-gray-600 mt-1">{style.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Navigation Links</Label>
                            <Button
                                type="button"
                                onClick={addNavigationLink}
                                size="sm"
                                variant="outline"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Link
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {layout.navigation.links.map((link, index) => (
                                <div key={link.id} className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50">
                                    <div className="flex-1 grid grid-cols-2 gap-3">
                                        <Input
                                            value={link.label}
                                            onChange={(e) => updateNavigationLink(index, 'label', e.target.value)}
                                            placeholder="Link label"
                                        />
                                        <Input
                                            value={link.href}
                                            onChange={(e) => updateNavigationLink(index, 'href', e.target.value)}
                                            placeholder="#section or /page"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeNavigationLink(index)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button Settings */}
                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="show-cta" className="text-base">CTA Button</Label>
                                <p className="text-sm text-gray-500 mt-1">Show a call-to-action button in navigation</p>
                            </div>
                            <input
                                type="checkbox"
                                id="show-cta"
                                checked={layout.navigation.showCTA}
                                onChange={(e) => updateLayout('navigation.showCTA', e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer"
                            />
                        </div>

                        {layout.navigation.showCTA && (
                            <div className="grid grid-cols-2 gap-3 pl-6 border-l-2 border-pink-200">
                                <div className="space-y-2">
                                    <Label htmlFor="cta-text" className="text-sm">Button Text</Label>
                                    <Input
                                        id="cta-text"
                                        value={layout.navigation.ctaText}
                                        onChange={(e) => updateLayout('navigation.ctaText', e.target.value)}
                                        placeholder="Get Started"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cta-href" className="text-sm">Button Link</Label>
                                    <Input
                                        id="cta-href"
                                        value={layout.navigation.ctaHref}
                                        onChange={(e) => updateLayout('navigation.ctaHref', e.target.value)}
                                        placeholder="/signup"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
