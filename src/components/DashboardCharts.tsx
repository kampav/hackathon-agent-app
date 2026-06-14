'use client'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const lineData = [
  { month: 'Jan', value: 40 }, { month: 'Feb', value: 65 },
  { month: 'Mar', value: 52 }, { month: 'Apr', value: 80 },
  { month: 'May', value: 74 }, { month: 'Jun', value: 95 },
]

const barData = [
  { name: 'Category A', count: 12 }, { name: 'Category B', count: 28 },
  { name: 'Category C', count: 19 }, { name: 'Category D', count: 35 },
]

const pieData = [
  { name: 'Group 1', value: 400 }, { name: 'Group 2', value: 300 },
  { name: 'Group 3', value: 200 }, { name: 'Group 4', value: 100 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">{title}</h3>
      {children}
    </div>
  )
}

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Trend Over Time">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Category Breakdown">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Distribution">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Key Metrics">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total Items',    value: '1,284' },
            { label: 'Active Now',     value: '42' },
            { label: 'Success Rate',   value: '94%' },
            { label: 'Avg. Response',  value: '1.2s' },
          ].map(m => (
            <div key={m.label} className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-400">{m.label}</p>
              <p className="text-2xl font-bold text-brand-700 mt-1">{m.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
