'use client';

import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { VenueEditorTabs } from '@/components/venue-editor/venue-editor-tabs';
import { Button } from '@/components/ui/button';
import { Save, Check, AlertCircle } from 'lucide-react';
import { VenueEditorData, defaultVenueData as schemaDefault } from '@/lib/venue-editor-schema';
import { saveVenueAction } from './actions';

interface VenueEditorClientProps {
    initialData: VenueEditorData | null;
}

export function VenueEditorClient({ initialData }: VenueEditorClientProps) {
    const [isSaving, setIsSaving] = React.useState(false);
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
    const [saveStatus, setSaveStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

    // Use initialData from DB/Redis, fallback to schema default if completely empty
    const defaultValues = initialData || schemaDefault;

    const methods = useForm<VenueEditorData>({
        defaultValues,
        mode: 'onChange'
    });

    const { formState: { isDirty } } = methods;

    const onSubmit = async (data: VenueEditorData) => {
        setIsSaving(true);
        setSaveStatus('idle');
        try {
            const result = await saveVenueAction(data);
            if (result.success) {
                setLastSaved(new Date());
                methods.reset(data); // Reset dirty state with new data
                setSaveStatus('success');
                // Reset status after 3s
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                console.error('Save failed:', result.error);
                setSaveStatus('error');
            }
        } catch (error) {
            console.error('Save error:', error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 pb-24 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Venue Site Editor</h1>
                    <p className="text-sm md:text-base text-gray-600 mt-1">
                        Customize the look and feel of your public venue page.
                    </p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <VenueEditorTabs />

                        {/* Sticky Save Bar */}
                        <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-white border-t p-4 flex items-center justify-between z-10 shadow-lg">
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                {saveStatus === 'success' && (
                                    <span className="flex items-center gap-1 text-green-600">
                                        <Check className="h-4 w-4" />
                                        Saved successfully
                                    </span>
                                )}
                                {saveStatus === 'error' && (
                                    <span className="flex items-center gap-1 text-red-600">
                                        <AlertCircle className="h-4 w-4" />
                                        Failed to save
                                    </span>
                                )}
                                {saveStatus === 'idle' && lastSaved && (
                                    <>Last saved: {lastSaved.toLocaleTimeString()}</>
                                )}
                                {saveStatus === 'idle' && !lastSaved && isDirty && (
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
                                            Save Changes
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
