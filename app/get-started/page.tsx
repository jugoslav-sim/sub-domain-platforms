import Link from 'next/link';
import { SubdomainForm } from '../subdomain-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GetStartedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Back to Home</span>
                        </Link>
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            VenueVibe
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Create Your Subdomain
                        </h1>
                        <p className="text-lg text-gray-600">
                            Choose a unique subdomain and emoji for your venue
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                        <SubdomainForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
