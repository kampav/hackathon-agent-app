import FeatureGate from '@/components/FeatureGate'
import DashboardCharts from '@/components/DashboardCharts'

export default function DashboardPage() {
  return (
    <FeatureGate
      feature="DASHBOARD"
      fallback={<div className="text-center py-32 text-slate-400">Dashboard is disabled.</div>}
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Live metrics and data visualisation</p>
        </div>
        <DashboardCharts />
      </div>
    </FeatureGate>
  )
}
