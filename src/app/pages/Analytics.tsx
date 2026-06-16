import { Clock3, FileText, Target, TrendingUp, BarChart3 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const comparisonData = [
  { metric: "Reach", Facebook: 82, Instagram: 76 },
  { metric: "Engagement", Facebook: 68, Instagram: 84 },
  { metric: "Clicks", Facebook: 71, Instagram: 63 },
  { metric: "Shares", Facebook: 59, Instagram: 66 },
];

const platformSummary = [
  { name: "Facebook", reach: "8.5K", engagement: "6.8%", clicks: "1.4K" },
  { name: "Instagram", reach: "7.9K", engagement: "8.4%", clicks: "1.1K" },
];

const recommendations = [
  {
    title: "Best posting time",
    icon: Clock3,
    description: "6:00 PM to 8:00 PM shows the strongest combined Facebook and Instagram response.",
  },
  {
    title: "Best content type",
    icon: FileText,
    description: "Short product highlights and carousel posts perform best across both platforms.",
  },
  {
    title: "Best strategy",
    icon: Target,
    description: "Post Facebook updates midweek and use Instagram for visual-led weekend promotions.",
  },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#1e3a8a] to-[#6b21a8] p-8 text-white shadow-xl">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/75">Analytics</p>
        <h1 className="text-3xl font-bold">Cross-Platform Analytics and Recommendation Engine</h1>
        <p className="mt-2 max-w-2xl text-white/80">Compare Facebook and Instagram performance, then use the recommendation engine to guide the next posting move.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#1e3a8a]/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e3a8a]/10 text-[#1e3a8a]">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">1. Cross-Platform Analytics</h2>
              <p className="text-sm text-slate-500">Compare Facebook and Instagram performance.</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="metric" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="Facebook" fill="#1e3a8a" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Instagram" fill="#059669" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {platformSummary.map((platform) => (
              <div key={platform.name} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">{platform.name}</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p>Reach: {platform.reach}</p>
                  <p>Engagement: {platform.engagement}</p>
                  <p>Clicks: {platform.clicks}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#1e3a8a]/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4af37]/15 text-[#1e3a8a]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">2. AI Recommendation Engine</h2>
              <p className="text-sm text-slate-500">Suggest best posting time, content type, and strategy.</p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e3a8a]/10 text-[#1e3a8a]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
