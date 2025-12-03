'use client';

import { MetricCard } from '@/components/dashboard/metric-card';
import { VisitorTrendsChart } from '@/components/dashboard/visitor-trends-chart';
import { SentimentChart } from '@/components/dashboard/sentiment-chart';
import { dashboardMetrics, visitorTrendsData, sentimentData } from '@/lib/mock-data';
import { Users, Sparkles, DollarSign, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          Welcome back to VenueVibe. Here's what's happening this week.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Users}
          label="Total Visitors"
          value={dashboardMetrics.totalVisitors.value.toLocaleString()}
          trend={dashboardMetrics.totalVisitors.trend}
          isPositive={dashboardMetrics.totalVisitors.isPositive}
          trendLabel={dashboardMetrics.totalVisitors.label}
          iconColor="text-purple-600"
        />

        <MetricCard
          icon={Sparkles}
          label="Vibe Score"
          value={dashboardMetrics.vibeScore.value}
          unit={dashboardMetrics.vibeScore.unit}
          trend={dashboardMetrics.vibeScore.trend}
          isPositive={dashboardMetrics.vibeScore.isPositive}
          trendLabel={dashboardMetrics.vibeScore.label}
          iconColor="text-pink-600"
        />

        <MetricCard
          icon={DollarSign}
          label="Revenue"
          value={`$${dashboardMetrics.revenue.value.toLocaleString()}`}
          trend={dashboardMetrics.revenue.trend}
          isPositive={dashboardMetrics.revenue.isPositive}
          trendLabel={dashboardMetrics.revenue.label}
          iconColor="text-green-600"
        />

        <MetricCard
          icon={TrendingUp}
          label="Avg. Spend"
          value={`$${dashboardMetrics.avgSpend.value}`}
          trend={dashboardMetrics.avgSpend.trend}
          isPositive={dashboardMetrics.avgSpend.isPositive}
          trendLabel={dashboardMetrics.avgSpend.label}
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitorTrendsChart data={visitorTrendsData} />
        <SentimentChart data={sentimentData} />
      </div>
    </div>
  );
}
