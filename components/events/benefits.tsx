import { RefreshCw, TrendingUp, Grid3x3, Ticket } from 'lucide-react';

export function Benefits() {
    const benefits = [
        {
            icon: RefreshCw,
            title: 'Effortless Updates',
            description: 'Add or update events instantly from our dashboard without needing technical know-how.',
        },
        {
            icon: TrendingUp,
            title: 'Boost Attendance',
            description: 'Get an increase in reservations and interest when guests discover upcoming events on your page.',
        },
        {
            icon: Grid3x3,
            title: 'All in One Hub',
            description: 'Showcase your entire event calendar in a single, beautiful, easy-to-browse interface.',
        },
        {
            icon: Ticket,
            title: 'Drive Ticket Sales',
            description: 'Link directly to ticketing platforms or reservation pages to convert interest into attendance.',
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Why You'll Love It
                    </h2>
                    <p className="text-gray-600">
                        Be at the cutting edge of event visibility. Be unforgettable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
