export function InteractiveDemo() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">See The Magic Happen</h2>
                    <p className="text-gray-600">
                        Our interactive tools let you preview your design changes in real-time. What you see is what you get.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Panel: Theme Options */}
                        <div className="lg:col-span-1 space-y-6">
                            <h3 className="font-bold text-gray-900 mb-4">Theme Options</h3>

                            {/* Primary Color */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Primary Color</label>
                                <div className="flex gap-3">
                                    <button className="w-12 h-12 rounded-full bg-[#E11D48] border-4 border-rose-200 shadow-sm"></button>
                                    <button className="w-12 h-12 rounded-full bg-blue-500 border-2 border-gray-200 shadow-sm"></button>
                                    <button className="w-12 h-12 rounded-full bg-green-500 border-2 border-gray-200 shadow-sm"></button>
                                </div>
                            </div>

                            {/* Font Style */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Font Style</label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-700">
                                    Elegant
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Live Preview */}
                        <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center min-h-[400px]">
                            <span className="text-gray-400 text-lg">Live Preview Updates Here</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
