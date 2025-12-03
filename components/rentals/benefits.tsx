import { Users, CalendarCheck, Search, DollarSign } from 'lucide-react';

export function Benefits() {
    const benefits = [
        {
            icon: Users,
            title: 'Attract New Clients',
            description: 'Event planners and groups actively search for unique rental spaces. Get your venue in front of them.',
        },
        {
            icon: CalendarCheck,
            title: 'Streamline Reservations',
            description: 'Let clients see availability, pricing, and amenities all in one place. No more endless back-and-forth emails.',
        },
        {
            icon: Search,
            title: 'Searchable Listings',
            description: 'Each rental is a searchable, shareable listing that clients can discover and share with decision-makers.',
        },
        {
            icon: DollarSign,
            title: 'Transparent Pricing & Terms',
            description: 'Set clear pricing, capacity, and booking terms. Transparency builds trust and speeds up bookings.',
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        More Bookings, Less Hassle
                    </h2>
                    <p className="text-gray-600">
                        Our rental listings help you maximize revenue while minimizing the administrative burden.
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
