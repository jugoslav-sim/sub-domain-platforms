import { QrCode, Camera, Share2 } from 'lucide-react';

export function HowItWorks() {
    const steps = [
        {
            icon: QrCode,
            title: '1. Scan a Code',
            description: 'Guests simply scan your unique QR code to access the photo booth on their own phones.',
        },
        {
            icon: Camera,
            title: '2. Strike a Pose',
            description: 'They snap a selfie or group photo with customizable branded filters and overlays.',
        },
        {
            icon: Share2,
            title: '3. Download & Share',
            description: 'They download their branded photo and instantly share it with friends and followers.',
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-6">
                        How It Works
                    </span>
                    <h2 className="text-4xl font-bold text-gray-900">
                        Simple for Customers, Powerful for You
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#E11D48] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-rose-500/20">
                                <step.icon className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
