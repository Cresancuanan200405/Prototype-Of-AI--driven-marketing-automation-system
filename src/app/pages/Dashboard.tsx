import {
  TrendingUp,
  Users,
  Calendar,
  ArrowUp,
  AlertTriangle,
  Lightbulb,
  Clock,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const stats = [
  {
    name: "Engagement Rate",
    value: "8.5%",
    change: "+2.3%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    name: "Total Reach",
    value: "45.2K",
    change: "+18%",
    trend: "up" as const,
    icon: Users,
  },
  {
    name: "Scheduled Posts",
    value: "18",
    change: "+5",
    trend: "up" as const,
    icon: Calendar,
  },
  {
    name: "Followers Growth",
    value: "+1,234",
    change: "+8%",
    trend: "up" as const,
    icon: Users,
  },
];

const engagementData = [
  { name: "Mon", engagement: 65, reach: 120 },
  { name: "Tue", engagement: 78, reach: 145 },
  { name: "Wed", engagement: 90, reach: 160 },
  { name: "Thu", engagement: 81, reach: 140 },
  { name: "Fri", engagement: 95, reach: 180 },
  { name: "Sat", engagement: 120, reach: 220 },
  { name: "Sun", engagement: 110, reach: 200 },
];

const upcomingPosts = [
  {
    title: "Summer Sale Announcement",
    platform: "Facebook",
    time: "Today, 3:00 PM",
  },
  {
    title: "New Product Showcase",
    platform: "Instagram",
    time: "Tomorrow, 10:00 AM",
  },
  {
    title: "Customer Testimonial",
    platform: "Facebook",
    time: "May 12, 2:00 PM",
  },
];

const missedPosts = [
  {
    title: "Mother's Day Weekend Post",
    missedDate: "May 9, 2026",
    reachLost: "1.2K",
    platform: "Facebook",
  },
  {
    title: "Friday Happy Hour Promo",
    missedDate: "May 8, 2026",
    reachLost: "800",
    platform: "Instagram",
  },
  {
    title: "Midweek Motivation Post",
    missedDate: "May 7, 2026",
    reachLost: "500",
    platform: "Facebook",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Missed Post Card — Red Urgency */}
      <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-[0_6px_20px_rgba(239,68,68,0.12)] hover:border-red-300/40 transition-all duration-200">
        <div className="flex flex-col md:flex-row">
          {/* Left: Summary */}
          <div className="flex items-center gap-4 p-5 md:p-6 md:border-r border-border/60 md:w-72 flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Missed Posts</h3>
              <p className="text-xs text-muted-foreground mt-0.5">This week</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-lg font-bold text-red-600">3</span>
                <span className="text-xs text-red-500/80 font-medium">posts</span>
              </div>
            </div>
          </div>

          {/* Right: Missed Post List */}
          <div className="flex-1 divide-y divide-border/50">
            {missedPosts.map((post, index) => (
              <Link
                key={index}
                to="/app/missed-posts"
                className="flex items-center gap-4 px-5 md:px-6 py-3.5 hover:bg-red-50/40 transition-colors duration-150 group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover/item:text-red-700 transition-colors">
                    {post.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.platform} · {post.missedDate}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-xs font-semibold text-red-500">-{post.reachLost}</span>
                  <span className="text-xs text-red-400/70">reach</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 md:px-6 py-3 bg-red-50/30 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Recover ~2.5K potential reach with AI-suggested re-scheduling
          </p>
          <Link
            to="/app/missed-posts"
            className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Recover Now →
          </Link>
        </div>
      </div>

      {/* Hero Stats — 4 key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-[0_6px_20px_rgba(11,27,58,0.08)] hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                  <ArrowUp className="w-3.5 h-3.5" />
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Engagement & Reach — Full Width Chart */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-foreground">Engagement & Reach</h3>
            <p className="text-xs text-muted-foreground mt-0.5">This week's performance overview</p>
          </div>
          <Link
            to="/app/analytics"
            className="text-xs font-medium text-secondary hover:underline"
          >
            View analytics →
          </Link>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
            <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
              }}
            />
            <Line
              name="Engagement"
              type="monotone"
              dataKey="engagement"
              stroke="var(--color-chart-1)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "var(--color-chart-1)" }}
              activeDot={{ r: 6 }}
            />
            <Line
              name="Reach"
              type="monotone"
              dataKey="reach"
              stroke="var(--color-chart-2)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "var(--color-chart-2)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row: Upcoming Posts + Today's Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Upcoming Posts — 3/5 width */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Upcoming Posts</h3>
            <Link
              to="/app/calendar"
              className="text-xs font-medium text-secondary hover:underline"
            >
              View calendar →
            </Link>
          </div>
          <div className="space-y-0">
            {upcomingPosts.map((post, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0"
              >
                <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.platform}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{post.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Focus — 2/5 width */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Today's Focus</h3>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your audience is most active on <span className="font-semibold text-foreground">Saturdays at 6 PM</span>. Schedule your weekend posts now to maximize engagement.
            </p>
            <Link
              to="/app/publishing"
              className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Schedule Now
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}