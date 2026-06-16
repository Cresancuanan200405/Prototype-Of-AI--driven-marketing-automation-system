import { AlertCircle, BarChart3, Calendar, FileText, Target, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const stats = [
  { name: "Total Posts", value: "247", change: "+12%", icon: FileText },
  { name: "Scheduled Posts", value: "18", change: "+5", icon: Calendar },
  { name: "Engagement Rate", value: "8.5%", change: "+2.3%", icon: TrendingUp },
  { name: "Total Reach", value: "45.2K", change: "+18%", icon: Users },
  { name: "Follower Growth", value: "+1,234", change: "+8%", icon: BarChart3 },
  { name: "Missed Post", value: "3", change: "-2", icon: AlertCircle },
];

const platformComparison = [
  { metric: "Reach", Facebook: 82, Instagram: 76 },
  { metric: "Engagement", Facebook: 68, Instagram: 84 },
  { metric: "Clicks", Facebook: 71, Instagram: 63 },
  { metric: "Shares", Facebook: 59, Instagram: 66 },
];

const upcomingPosts = [
  { title: "Summer Sale Announcement", platform: "Facebook", time: "Today, 3:00 PM", status: "Scheduled" },
  { title: "New Product Showcase", platform: "Instagram", time: "Tomorrow, 10:00 AM", status: "Scheduled" },
  { title: "Customer Testimonial", platform: "Facebook", time: "May 12, 2:00 PM", status: "Scheduled" },
];

const campaignQueue = [
  { title: "Summer Launch Campaign", progress: "68%", status: "In Progress" },
  { title: "Weekend Promo Batch", progress: "42%", status: "Drafting" },
  { title: "Brand Awareness Sprint", progress: "91%", status: "Ready" },
];

const recommendations = [
  "Schedule more posts between 6-8 PM for stronger engagement.",
  "Use product showcase visuals for the best response on Instagram.",
  "Keep Facebook captions concise and action-focused for better clicks.",
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#1e3a8a] via-[#6b21a8] to-[#0f766e] p-8 text-white shadow-xl">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/75">AdMatrix Dashboard</p>
        <h1 className="mb-2 text-3xl font-bold">Welcome back, John</h1>
        <p className="max-w-2xl text-white/80">Monitor content performance, compare platforms, and keep your publishing workflow moving.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="rounded-2xl border border-[#1e3a8a]/10 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a8a]/10">
                  <Icon className="h-6 w-6 text-[#1e3a8a]" />
                </div>
                <span className="rounded-full bg-[#d4af37]/15 px-3 py-1 text-xs font-semibold text-[#1e3a8a]">{stat.change}</span>
              </div>
              <h3 className="mb-1 text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm text-slate-600">{stat.name}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#1e3a8a]/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e3a8a]/10 text-[#1e3a8a]">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Cross-Platform Snapshot</h2>
              <p className="text-sm text-slate-500">Facebook and Instagram performance at a glance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="metric" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="Facebook" fill="#1e3a8a" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Instagram" fill="#6b21a8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-[#1e3a8a]/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#059669]/10 text-[#059669]">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Upcoming Posts</h2>
              <p className="text-sm text-slate-500">Scheduled content for the next publishing cycle</p>
            </div>
          </div>
          <div className="space-y-4">
            {upcomingPosts.map((post) => (
              <div key={post.title} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-slate-900">{post.title}</h3>
                  <span className="rounded-full bg-[#d4af37]/15 px-2.5 py-1 text-xs font-semibold text-[#1e3a8a]">{post.status}</span>
                </div>
                <p className="text-sm text-slate-600">{post.platform}</p>
                <p className="text-xs text-slate-500">{post.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#1e3a8a]/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4af37]/15 text-[#1e3a8a]">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Campaign Queue</h2>
              <p className="text-sm text-slate-500">Track what is in drafting, review, and ready-to-publish states</p>
            </div>
          </div>
          <div className="space-y-3">
            {campaignQueue.map((campaign) => (
              <div key={campaign.title} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                <div>
                  <h3 className="font-medium text-slate-900">{campaign.title}</h3>
                  <p className="text-sm text-slate-500">{campaign.status}</p>
                </div>
                <span className="rounded-full bg-[#1e3a8a]/10 px-3 py-1 text-sm font-semibold text-[#1e3a8a]">{campaign.progress}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#1e3a8a]/10 bg-gradient-to-br from-[#f8fafc] to-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6b21a8]/10 text-[#6b21a8]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">AdMatrix Recommendations</h2>
              <p className="text-sm text-slate-500">Actionable suggestions to improve performance</p>
            </div>
          </div>
          <div className="space-y-3">
            {recommendations.map((item) => (
              <div key={item} className="rounded-xl bg-white p-4 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
