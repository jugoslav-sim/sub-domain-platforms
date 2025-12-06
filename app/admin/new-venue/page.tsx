'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Sparkles, Store, Music, Utensils, GlassWater, Building2 } from 'lucide-react';
import { createVenueAction } from './actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const venueTypes = [
    { value: 'nightclub', label: 'Nightclub', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { value: 'bar', label: 'Bar', icon: GlassWater, color: 'from-amber-500 to-orange-500' },
    { value: 'restaurant', label: 'Restaurant', icon: Utensils, color: 'from-green-500 to-emerald-500' },
    { value: 'lounge', label: 'Lounge', icon: Music, color: 'from-blue-500 to-cyan-500' },
    { value: 'cafe', label: 'Café', icon: Store, color: 'from-rose-500 to-red-500' },
    { value: 'other', label: 'Other', icon: Building2, color: 'from-gray-500 to-slate-500' },
];

export default function NewVenuePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const [name, setName] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [venueType, setVenueType] = React.useState('');
    const [tagTouched, setTagTouched] = React.useState(false);

    // Auto-generate tag from name
    React.useEffect(() => {
        if (!tagTouched && name) {
            const generatedTag = name
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .slice(0, 30);
            setTag(generatedTag);
        }
    }, [name, tagTouched]);

    const handleTagChange = (value: string) => {
        setTagTouched(true);
        setTag(value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const result = await createVenueAction({ name, tag, venueType });

        if (result.success && result.venue) {
            router.push(`/admin/venue-editor?venue=${result.venue.tag}`);
        } else {
            setError(result.error || 'Failed to create venue');
            setIsSubmitting(false);
        }
    };

    const isValid = name.length >= 2 && tag.length >= 3 && venueType;

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Create New Venue</h1>
                    <p className="text-gray-600 mt-1">
                        Set up your venue's presence on VenueVibe in just a few steps.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Venue Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-semibold">Venue Name *</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., The Blue Lounge"
                            className="text-lg h-12"
                            required
                        />
                    </div>

                    {/* Venue Tag */}
                    <div className="space-y-2">
                        <Label htmlFor="tag" className="text-base font-semibold">Venue Tag *</Label>
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-4 h-12 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                venuvibe.com/s/
                            </span>
                            <Input
                                id="tag"
                                value={tag}
                                onChange={(e) => handleTagChange(e.target.value)}
                                placeholder="blue-lounge"
                                className="rounded-l-none text-lg h-12"
                                required
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            This will be your venue's unique URL. Lowercase letters, numbers, and hyphens only.
                        </p>
                    </div>

                    {/* Venue Type */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">Venue Type *</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {venueTypes.map((type) => {
                                const Icon = type.icon;
                                const isSelected = venueType === type.value;
                                return (
                                    <button
                                        key={type.value}
                                        type="button"
                                        onClick={() => setVenueType(type.value)}
                                        className={cn(
                                            'relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200',
                                            isSelected
                                                ? 'border-purple-500 bg-purple-50 shadow-md'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        )}
                                    >
                                        <div className={cn(
                                            'w-12 h-12 rounded-xl flex items-center justify-center mb-2',
                                            isSelected ? `bg-gradient-to-br ${type.color}` : 'bg-gray-100'
                                        )}>
                                            <Icon className={cn(
                                                'h-6 w-6',
                                                isSelected ? 'text-white' : 'text-gray-500'
                                            )} />
                                        </div>
                                        <span className={cn(
                                            'font-medium text-sm',
                                            isSelected ? 'text-purple-700' : 'text-gray-700'
                                        )}>
                                            {type.label}
                                        </span>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 w-3 h-3 bg-purple-500 rounded-full" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Venue'}
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
