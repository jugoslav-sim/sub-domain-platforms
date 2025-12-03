export function CalendarPreview() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        A Calendar That Captivates
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Display your events with style. Your guests will be captivated by the beautiful event calendar on your live page.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-md aspect-[1/2] bg-gray-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200">
                        <span className="text-4xl font-bold text-gray-300">400 × 800</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
