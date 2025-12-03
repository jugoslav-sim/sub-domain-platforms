import type { Metadata } from 'next';
import { AdminDashboard } from './dashboard';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export const metadata: Metadata = {
  title: 'Dashboard | VenueVibe',
  description: 'VenueVibe SaaS Edition Dashboard'
};

export default async function AdminPage() {
  // TODO: You can add authentication here with your preferred auth provider

  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  );
}
