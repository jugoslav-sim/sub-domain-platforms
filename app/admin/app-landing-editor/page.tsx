'use client';

import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AppLandingEditorTabs } from '@/components/app-landing-editor/app-landing-editor-tabs';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { AppLandingEditorData, defaultAppLandingData } from '@/lib/app-landing-editor-schema';

export default function AppLandingEditorPage() {
    const [isSaving, setIsSaving] = React.useState(false);
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null);

    const methods = useForm<AppLandingEditorData>({
        defaultValues: defaultAppLandingData,
        mode: 'onChange'
    });

    const { formState: { isDirty } } = methods;

    const onSubmit = async (data: AppLandingEditorData) => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Saved data:', data);
        setLastSaved(new Date());
        setIsSaving(false);
        methods.reset(data); // Reset dirty state
    };

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 pb-24 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">App Landing Page</h1>
                    <p className="text-sm md:text-base text-gray-600 mt-1">
                        Manage the content and appearance of your main marketing page.
                    </p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <AppLandingEditorTabs />

                        {/* Sticky Save Bar */}
                        <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-white border-t p-4 flex items-center justify-between z-10 shadow-lg">
                            <div className="text-sm text-muted-foreground">
                                {lastSaved ? (
                                    <>Last saved: {lastSaved.toLocaleTimeString()}</>
                                ) : (
                                    <>Unsaved changes</>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => methods.reset()}
                                    disabled={!isDirty || isSaving}
                                >
                                    Discard
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-pink-600 hover:bg-pink-700 text-white min-w-[120px]"
                                    disabled={!isDirty || isSaving}
                                >
                                    {isSaving ? (
                                        <>Saving...</>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save All Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </DashboardLayout>
    );
}
