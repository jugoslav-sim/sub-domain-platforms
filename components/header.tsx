import Link from 'next/link';
import { Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">VenueVibe</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Toggle dark mode"
            >
              <Moon className="h-5 w-5" />
            </button>

            {/* Log In */}
            <Link href="/admin">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Log In
              </Button>
            </Link>

            {/* Get Started */}
            <Link href="/get-started">
              <Button className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
