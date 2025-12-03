import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-[#E91E63]/30">
            <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-lg bg-[#E91E63]/10 flex items-center justify-center mb-4 group-hover:bg-[#E91E63]/20 transition-colors">
                    <Icon className="h-7 w-7 text-[#E91E63]" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </CardContent>
        </Card>
    );
}
