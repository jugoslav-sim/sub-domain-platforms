import { Clock, Edit3, Zap } from 'lucide-react';

export function BenefitsSection() {
    const benefits = [
        {
            icon: Clock,
            title: 'Save Hours of Work',
            description: 'Eliminate tedious data entry and get your menu online in minutes, not days. Focus on what you do best.',
        },
        {
            icon: Edit3,
            title: 'Keep Your Menu Updated',
            description: 'Seasonal changes or new prices? Simply rescan your menu anytime to keep your digital presence current.',
        },
        {
            icon: Zap,
            title: 'Increase Customer Engagement',
            description: 'A beautiful, mobile-friendly digital menu improves the customer experience on your venue page.',
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why You'll Love It</h2>
                    <p className="text-gray-600">
                        VenueVibe is designed to be powerful for your business and simple for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow text-center group">
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
