'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// Most commonly used icons for features
const popularIcons = [
    'Zap', 'Rocket', 'Star', 'Heart', 'Award', 'Shield',
    'Users', 'TrendingUp', 'BarChart', 'Activity', 'Globe', 'Phone',
    'Mail', 'MessageSquare', 'Calendar', 'Clock', 'Lock', 'Key',
    'Settings', 'Tool', 'Package', 'ShoppingCart', 'CreditCard', 'DollarSign',
    'Search', 'Filter', 'Download', 'Upload', 'Share', 'Eye',
    'Smartphone', 'Laptop', 'Monitor', 'Tablet', 'Watch', 'Cpu',
    'Database', 'Server', 'Cloud', 'Wifi', 'Bluetooth', 'Radio',
    'Palette', 'Image', 'Video', 'Music', 'Mic', 'Camera',
    'MapPin', 'Navigation', 'Compass', 'Map', 'Flag', 'Bookmark'
];

export function IconPicker({ value, onChange, open, onOpenChange }: IconPickerProps) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredIcons = React.useMemo(() => {
        if (!searchQuery) return popularIcons;
        return popularIcons.filter(iconName =>
            iconName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleIconSelect = (iconName: string) => {
        onChange(iconName);
        onOpenChange(false);
        setSearchQuery('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[600px]">
                <DialogHeader>
                    <DialogTitle>Choose an Icon</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        placeholder="Search icons..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />

                    <div className="grid grid-cols-8 gap-2 overflow-y-auto max-h-[400px] pr-2">
                        {filteredIcons.map((iconName) => {
                            const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                            if (!IconComponent) return null;

                            return (
                                <button
                                    key={iconName}
                                    type="button"
                                    onClick={() => handleIconSelect(iconName)}
                                    className={`
                                        p-3 rounded-lg border-2 transition-all hover:border-pink-500 hover:bg-pink-50
                                        ${value === iconName ? 'border-pink-600 bg-pink-100' : 'border-gray-200'}
                                    `}
                                    title={iconName}
                                >
                                    <IconComponent className="h-6 w-6 mx-auto" />
                                </button>
                            );
                        })}
                    </div>

                    {filteredIcons.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No icons found matching &quot;{searchQuery}&quot;
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
