'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BrandingVisualsSection } from './branding-visuals-section';
import { ShareConnectSection } from './share-connect-section';
import { VibeContentSection } from './vibe-content-section';
import { HeroSection } from './hero-section';
import { HighlightsSection } from './highlights-section';
import { AdvancedBrandingSection } from './advanced-branding-section';
import { LayoutSection } from './layout-section';
import { SEOSection } from './seo-section';

export function VenueEditorTabs() {
    const [activeTab, setActiveTab] = React.useState("profile");

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <TabsList className="bg-white border">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="hero">Hero</TabsTrigger>
                    <TabsTrigger value="highlights">Highlights</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="profile" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <BrandingVisualsSection />
                        <VibeContentSection />
                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <ShareConnectSection />
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="hero">
                <HeroSection />
            </TabsContent>

            <TabsContent value="highlights">
                <HighlightsSection />
            </TabsContent>

            <TabsContent value="branding">
                <AdvancedBrandingSection />
            </TabsContent>

            <TabsContent value="layout">
                <LayoutSection />
            </TabsContent>

            <TabsContent value="seo">
                <SEOSection />
            </TabsContent>
        </Tabs>
    );
}

