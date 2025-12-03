import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    unit?: string;
    trend?: number;
    isPositive?: boolean;
    trendLabel?: string;
    iconColor?: string;
}

export function MetricCard({
    icon: Icon,
    label,
    value,
    unit,
    trend,
    isPositive = true,
    trendLabel = 'vs last week',
    iconColor = 'text-purple-600'
}: MetricCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Icon className={cn('h-5 w-5', iconColor)} />
                        <span className="text-sm text-muted-foreground">{label}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-3xl font-bold">
                        {value}
                        {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
                    </div>

                    {trend !== undefined && (
                        <div className="flex items-center gap-1 text-sm">
                            <span className={cn(
                                'font-medium',
                                isPositive ? 'text-green-600' : 'text-red-600'
                            )}>
                                {isPositive ? '+' : ''}{trend}% {trendLabel}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
