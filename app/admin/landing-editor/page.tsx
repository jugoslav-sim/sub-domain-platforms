'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export default function LandingEditorPage() {
    return (
        <DashboardLayout>
            <div className="p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">SaaS Landing Editor</h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                    Manage the content of your main landing page.
                </p>
                <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500">Landing page editor functionality is coming soon.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
