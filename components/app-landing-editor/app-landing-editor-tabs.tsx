'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AppLandingHeroSection } from './app-landing-hero-section';

export function AppLandingEditorTabs() {
    const [activeTab, setActiveTab] = React.useState("hero");

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <TabsList className="bg-white border">
                    <TabsTrigger value="hero">Hero</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="hero">
                <AppLandingHeroSection />
            </TabsContent>

            <TabsContent value="features">
                <div className="p-8 text-center text-muted-foreground bg-gray-50 rounded-lg border border-dashed">
                    Features customization coming soon
                </div>
            </TabsContent>

            <TabsContent value="branding">
                <div className="p-8 text-center text-muted-foreground bg-gray-50 rounded-lg border border-dashed">
                    Branding options coming soon
                </div>
            </TabsContent>

            <TabsContent value="layout">
                <div className="p-8 text-center text-muted-foreground bg-gray-50 rounded-lg border border-dashed">
                    Layout options coming soon
                </div>
            </TabsContent>

            <TabsContent value="seo">
                <div className="p-8 text-center text-muted-foreground bg-gray-50 rounded-lg border border-dashed">
                    SEO settings coming soon
                </div>
            </TabsContent>
        </Tabs>
    );
}
