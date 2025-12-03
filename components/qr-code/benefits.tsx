import { Zap, Users, Sparkles } from 'lucide-react';

export function Benefits() {
    const benefits = [
        {
            icon: Zap,
            title: 'Effortless Access',
            description: 'Visitors simply scan your QR code to instantly connect to your venue without typing a URL.',
        },
        {
            icon: Users,
            title: 'Boost Engagement',
            description: 'One-step access to your Menu, Events, and Social media links increases customer engagement.',
        },
        {
            icon: Sparkles,
            title: 'Branded For You',
            description: 'Generate QR codes that seamlessly align with your venue\'s aesthetic and brand identity.',
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        QR Codes That Work For You
                    </h2>
                    <p className="text-gray-600">
                        Drive real-world results with a feature that's fun for customers and great for business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow text-center group">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white border-2 border-rose-100 flex items-center justify-center group-hover:border-rose-500 transition-colors">
                                <benefit.icon className="w-8 h-8 text-[#E11D48]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
