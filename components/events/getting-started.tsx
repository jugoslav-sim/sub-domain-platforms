export function GettingStarted() {
    const steps = [
        {
            number: '1',
            title: 'Sign Up',
            description: 'Create your VenueVibe account.',
        },
        {
            number: '2',
            title: 'Add Your Events',
            description: 'List all your upcoming shows and events.',
        },
        {
            number: '3',
            title: 'Go Live',
            description: 'Publish and share your event calendar with the world.',
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Getting Started is Simple
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#E11D48] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-rose-500/20">
                                <span className="text-3xl font-bold text-white">{step.number}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
