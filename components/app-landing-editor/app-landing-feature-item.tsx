'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Feature } from '@/lib/app-landing-editor-schema';
import { IconPicker } from './icon-picker';

interface FeatureItemProps {
    feature: Feature;
    onChange: (feature: Feature) => void;
    onRemove: () => void;
    dragHandleProps?: any;
}

export function FeatureItem({ feature, onChange, onRemove, dragHandleProps }: FeatureItemProps) {
    const [iconPickerOpen, setIconPickerOpen] = React.useState(false);

    const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

    return (
        <Card className="relative">
            <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                    {/* Drag Handle */}
                    <div {...dragHandleProps} className="cursor-move pt-2">
                        <GripVertical className="h-5 w-5 text-gray-400" />
                    </div>

                    {/* Icon Display */}
                    <div className="flex-shrink-0">
                        <button
                            type="button"
                            onClick={() => setIconPickerOpen(true)}
                            className="w-16 h-16 rounded-lg border-2 border-gray-200 hover:border-pink-500 transition-colors flex items-center justify-center bg-gray-50"
                        >
                            {IconComponent ? (
                                <IconComponent className="h-8 w-8 text-pink-600" />
                            ) : (
                                <span className="text-xs text-gray-400">Icon</span>
                            )}
                        </button>
                        <p className="text-xs text-center mt-1 text-gray-500">Click to change</p>
                    </div>

                    {/* Fields */}
                    <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor={`feature-title-${feature.id}`}>Feature Title</Label>
                            <Input
                                id={`feature-title-${feature.id}`}
                                value={feature.title}
                                onChange={(e) => onChange({ ...feature, title: e.target.value })}
                                placeholder="e.g. Lightning Fast Setup"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`feature-description-${feature.id}`}>Description</Label>
                            <Textarea
                                id={`feature-description-${feature.id}`}
                                value={feature.description}
                                onChange={(e) => onChange({ ...feature, description: e.target.value })}
                                placeholder="Describe this feature..."
                                className="h-20"
                            />
                        </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onRemove}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>

            {/* Icon Picker Dialog */}
            <IconPicker
                value={feature.icon}
                onChange={(iconName) => onChange({ ...feature, icon: iconName })}
                open={iconPickerOpen}
                onOpenChange={setIconPickerOpen}
            />
        </Card>
    );
}
