import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AppLandingHeroSection } from './app-landing-hero-section';
import { AppLandingFeaturesSection } from './app-landing-features-section';
import { AppLandingBrandingSection } from './app-landing-branding-section';
import { AppLandingLayoutSection } from './app-landing-layout-section';
import { AppLandingSEOSection } from './app-landing-seo-section';

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
                <AppLandingFeaturesSection />
            </TabsContent>

            <TabsContent value="branding">
                <AppLandingBrandingSection />
            </TabsContent>

            <TabsContent value="layout">
                <AppLandingLayoutSection />
            </TabsContent>

            <TabsContent value="seo">
                <AppLandingSEOSection />
            </TabsContent>
        </Tabs>
    );
}
