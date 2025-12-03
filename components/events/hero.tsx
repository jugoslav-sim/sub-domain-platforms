import { Button } from '@/components/ui/button';

export function Hero() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            From Sold-Out Shows to Standing-Room Only.
                        </h1>
                        <p className="text-xl text-gray-600 max-w-xl">
                            Our integrated Events page is a simple way to promote and manage all your venue's events, ensuring potential guests see everything you have to offer.
                        </p>
                        <Button
                            size="lg"
                            className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-rose-500/25 transition-all hover:scale-105"
                        >
                            Explore Events
                        </Button>
                    </div>

                    {/* Image Placeholder */}
                    <div className="flex-1 w-full flex justify-center lg:justify-end">
                        <div className="w-full max-w-lg aspect-[3/2] bg-gray-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200">
                            <span className="text-4xl font-bold text-gray-300">600 × 400</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
