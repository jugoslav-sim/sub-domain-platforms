export function Showcase() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Showcase Every Detail
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Give potential clients all the information they need with beautiful listings that figure everything from pricing to floor capacity.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Example Listing Card */}
                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                        <div className="w-full aspect-[3/2] bg-gray-200 rounded-2xl flex items-center justify-center mb-6">
                            <span className="text-4xl font-bold text-gray-400">600 × 400</span>
                        </div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Velvet Lounge</h3>
                            <div className="flex justify-center gap-8 text-gray-600">
                                <div>
                                    <p className="text-sm text-gray-500">Capacity</p>
                                    <p className="font-semibold">50 guests</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Starting at</p>
                                    <p className="font-semibold">$500/night</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
