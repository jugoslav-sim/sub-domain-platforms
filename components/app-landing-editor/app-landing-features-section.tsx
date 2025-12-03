'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { AppLandingEditorData, Feature } from '@/lib/app-landing-editor-schema';
import { FeatureItem } from './app-landing-feature-item';

const layoutOptions = [
    { value: '3-column', label: '3 Columns', description: 'Classic grid with 3 features per row' },
    { value: '4-column', label: '4 Columns', description: 'Compact grid with 4 features per row' },
    { value: 'icon-list', label: 'Icon List', description: 'Vertical list with icons on the left' },
    { value: 'feature-cards', label: 'Feature Cards', description: 'Cards with hover effects' }
];

export function AppLandingFeaturesSection() {
    const { watch, setValue } = useFormContext<AppLandingEditorData>();

    const features = watch('features') || [];
    const featuresLayoutStyle = watch('featuresLayoutStyle');

    const addFeature = () => {
        const newFeature: Feature = {
            id: `feature-${Date.now()}`,
            icon: 'Star',
            title: '',
            description: '',
            order: features.length + 1
        };
        setValue('features', [...features, newFeature], { shouldDirty: true });
    };

    const updateFeature = (index: number, updatedFeature: Feature) => {
        const newFeatures = [...features];
        newFeatures[index] = updatedFeature;
        setValue('features', newFeatures, { shouldDirty: true });
    };

    const removeFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        // Update order numbers
        const reorderedFeatures = newFeatures.map((f, i) => ({ ...f, order: i + 1 }));
        setValue('features', reorderedFeatures, { shouldDirty: true });
    };

    const moveFeature = (fromIndex: number, toIndex: number) => {
        const newFeatures = [...features];
        const [movedFeature] = newFeatures.splice(fromIndex, 1);
        newFeatures.splice(toIndex, 0, movedFeature);
        // Update order numbers
        const reorderedFeatures = newFeatures.map((f, i) => ({ ...f, order: i + 1 }));
        setValue('features', reorderedFeatures, { shouldDirty: true });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Features Section</CardTitle>
                    <CardDescription>
                        Showcase your key features and benefits to potential customers.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Layout Style Selector */}
                    <div className="space-y-3">
                        <Label>Layout Style</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {layoutOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setValue('featuresLayoutStyle', option.value as any, { shouldDirty: true })}
                                    className={`
                                        p-4 rounded-lg border-2 text-left transition-all
                                        ${featuresLayoutStyle === option.value
                                            ? 'border-pink-600 bg-pink-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <div className="font-medium">{option.label}</div>
                                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Feature Items */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Feature Items ({features.length})</h3>
                    <Button
                        type="button"
                        onClick={addFeature}
                        className="bg-pink-600 hover:bg-pink-700"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                    </Button>
                </div>

                {features.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            <p className="mb-4">No features added yet</p>
                            <Button
                                type="button"
                                onClick={addFeature}
                                variant="outline"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Feature
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <FeatureItem
                                key={feature.id}
                                feature={feature}
                                onChange={(updatedFeature) => updateFeature(index, updatedFeature)}
                                onRemove={() => removeFeature(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
