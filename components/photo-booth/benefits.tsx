import { Rocket, TrendingUp, Smartphone } from 'lucide-react';

export function Benefits() {
    const benefits = [
        {
            icon: Rocket,
            title: 'Go Viral Organically',
            description: 'Every photo shared is a digital high five, reaching hundreds of friends and followers for each guest who participates.',
        },
        {
            icon: TrendingUp,
            title: 'Increase Brand Awareness',
            description: 'Each branded photo expands your venue\'s reach, putting your name in front of new audiences organically.',
        },
        {
            icon: Smartphone,
            title: 'Zero Extra Hardware',
            description: 'No bulky equipment or tablets needed. Guests use their own phones, making it seamless and completely touchless.',
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        More Than Just a Photo
                    </h2>
                    <p className="text-gray-600">
                        Unlike traditional photo booths, this feature turns guests into brand ambassadors.
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
