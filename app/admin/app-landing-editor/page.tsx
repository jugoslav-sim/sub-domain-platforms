'use client';

import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AppLandingEditorTabs } from '@/components/app-landing-editor/app-landing-editor-tabs';
import { Button } from '@/components/ui/button';
import { Save, ExternalLink, Loader2 } from 'lucide-react';
import { AppLandingEditorData, defaultAppLandingData } from '@/lib/app-landing-editor-schema';
import { saveAppLandingData, getAppLandingData } from '@/app/app-landing-actions';

export default function AppLandingEditorPage() {
    const [isSaving, setIsSaving] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
    const [saveError, setSaveError] = React.useState<string | null>(null);

    const methods = useForm<AppLandingEditorData>({
        defaultValues: defaultAppLandingData,
        mode: 'onChange'
    });

    const { formState: { isDirty } } = methods;

    // Load initial data from server
    React.useEffect(() => {
        async function loadData() {
            try {
                const data = await getAppLandingData();
                methods.reset(data);
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [methods]);

    const onSubmit = async (data: AppLandingEditorData) => {
        setIsSaving(true);
        setSaveError(null);

        const result = await saveAppLandingData(data);

        if (result.success) {
            setLastSaved(new Date());
            methods.reset(data); // Reset dirty state
        } else {
            setSaveError(result.error || 'Failed to save');
        }

        setIsSaving(false);
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-96">
                    <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
                    <span className="ml-2 text-gray-600">Loading editor...</span>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 pb-24 max-w-7xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">App Landing Page</h1>
                        <p className="text-sm md:text-base text-gray-600 mt-1">
                            Manage the content and appearance of your main marketing page.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => window.open('/', '_blank')}
                        className="hidden md:flex"
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Preview Live Page
                    </Button>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <AppLandingEditorTabs />

                        {/* Sticky Save Bar */}
                        <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-white border-t p-4 flex items-center justify-between z-10 shadow-lg">
                            <div className="text-sm text-muted-foreground">
                                {saveError ? (
                                    <span className="text-red-600">{saveError}</span>
                                ) : lastSaved ? (
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
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
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
