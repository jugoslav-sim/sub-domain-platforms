import { Palette, Type, Sparkles, LayoutGrid } from 'lucide-react';

export function CustomizationFeatures() {
    const features = [
        {
            icon: Palette,
            title: 'Your Exact Brand Colors',
            description: 'Use our intuitive color pickers to apply your exact primary, background, and accent colors across your entire page.',
        },
        {
            icon: Type,
            title: 'Curated Font Themes',
            description: 'Select from a collection of elegant, modern, and classic font pairings to perfectly match your venue\'s personality.',
        },
        {
            icon: Sparkles,
            title: 'Logo & AI Banner',
            description: 'Upload your logo and banner, or let our AI generate a stunning, unique banner image from a simple text description.',
        },
        {
            icon: LayoutGrid,
            title: 'Control Your Layout',
            description: 'Easily reorder and toggle page sections like Menu, Events, and About Us to highlight what\'s most important.',
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-6">
                        Customization Tools
                    </span>
                    <h2 className="text-4xl font-bold text-gray-900">
                        Total Customization at Your Fingertips
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 mb-6 rounded-full bg-white border-2 border-rose-100 flex items-center justify-center">
                                <feature.icon className="w-8 h-8 text-[#E11D48]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
