import Link from 'next/link';
import { Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Branding } from '@/lib/app-landing-editor-schema';

interface HeaderProps {
  branding?: Branding;
}

export function Header({ branding }: HeaderProps) {
  const logoUrl = branding?.logoUrl;
  const logoWidth = branding?.logoWidth || 120;
  const logoPosition = branding?.logoPosition || 'left';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className={`flex items-center h-16 ${logoPosition === 'center'
            ? 'justify-center'
            : logoPosition === 'right'
              ? 'justify-end gap-4'
              : 'justify-between'
          }`}>
          {/* Logo */}
          {logoPosition === 'right' && (
            <div className="flex items-center gap-4 mr-auto">
              <NavigationItems />
            </div>
          )}

          <Link href="/" className={`flex items-center ${logoPosition === 'center' ? 'absolute left-1/2 -translate-x-1/2' : ''
            }`}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                style={{ width: logoWidth, height: 'auto' }}
                className="max-h-12 object-contain"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-900">VenueVibe</span>
            )}
          </Link>

          {/* Navigation */}
          {logoPosition !== 'right' && (
            <div className="flex items-center gap-4">
              <NavigationItems />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NavigationItems() {
  return (
    <>
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
    </>
  );
}
