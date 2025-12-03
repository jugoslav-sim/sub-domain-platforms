export function TryItLive() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Try it Live!</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Scan the QR code with your phone's camera to open a live demo of the Photo Booth and take a sample branded photo.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="bg-white p-12 rounded-3xl shadow-xl">
                        {/* QR Code Placeholder */}
                        <div className="w-64 h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                                <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="currentColor">
                                    {/* Simple QR code pattern */}
                                    <rect x="0" y="0" width="30" height="30" />
                                    <rect x="70" y="0" width="30" height="30" />
                                    <rect x="0" y="70" width="30" height="30" />
                                    <rect x="40" y="40" width="20" height="20" />
                                    <rect x="10" y="40" width="10" height="10" />
                                    <rect x="40" y="10" width="10" height="10" />
                                    <rect x="80" y="40" width="10" height="10" />
                                    <rect x="40" y="80" width="10" height="10" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
