import { ReactNode } from 'react';
import { Sidebar } from './sidebar';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Hide sidebar on mobile, show on md and up */}
            <div className="hidden md:block">
                <Sidebar />
            </div>
            <main className="flex-1 overflow-auto w-full">
                {children}
            </main>
        </div>
    );
}
