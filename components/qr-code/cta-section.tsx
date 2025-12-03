import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Ready to Get Connected?
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Sign up today and instantly get a custom QR code for your new venue page.
                </p>
                <Link href="/signup">
                    <Button
                        size="lg"
                        className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-rose-500/25 transition-all hover:scale-105"
                    >
                        Get Started for Free
                    </Button>
                </Link>
            </div>
        </section>
    );
}
