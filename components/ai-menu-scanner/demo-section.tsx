import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export function DemoSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">See it in Action</h2>
                    <p className="text-gray-600">
                        Upload a sample menu or use ours to see the AI instantly extract the data.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Image Upload */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">1. Your Menu Image</h3>
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 h-[600px] flex flex-col items-center justify-center bg-gray-50 relative">
                                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                                    <span className="text-4xl font-bold text-gray-400">400 × 550</span>
                                </div>
                                <div className="absolute bottom-8">
                                    <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload a Different Image
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Extracted Data */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">2. Extracted Data</h3>
                            <div className="bg-gray-50 rounded-2xl p-8 h-[600px] overflow-y-auto border border-gray-100">
                                <div className="space-y-8">
                                    {/* Mains Category */}
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg mb-4 pb-2 border-b border-gray-200">Mains</h4>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h5 className="font-bold text-gray-900">Classic Burger</h5>
                                                    <p className="text-sm text-gray-500 mt-1">Juicy beef patty, lettuce, tomato, pickles, and our special sauce.</p>
                                                </div>
                                                <span className="font-bold text-gray-900">$12.99</span>
                                            </div>
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h5 className="font-bold text-gray-900">Grilled Salmon</h5>
                                                    <p className="text-sm text-gray-500 mt-1">Served with roasted asparagus and a lemon-dill sauce.</p>
                                                </div>
                                                <span className="font-bold text-gray-900">$18.50</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sides Category */}
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg mb-4 pb-2 border-b border-gray-200">Sides</h4>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h5 className="font-bold text-gray-900">Truffle Fries</h5>
                                                    <p className="text-sm text-gray-500 mt-1">Crispy fries tossed in truffle oil and parmesan cheese.</p>
                                                </div>
                                                <span className="font-bold text-gray-900">$7.50</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
