import {
  TrendingUp,
  Users,
  Calendar,
  ArrowUp,
  AlertTriangle,
  Lightbulb,
  Clock,
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

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Missed Opportunities Alert — Red Urgency */}
      <Link
        to="/app/missed-posts"
        className="block rounded-xl border-2 border-red-300 bg-red-50 p-4 hover:bg-red-100 transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-red-800 text-sm">
              You have 3 missed promotional opportunities this week
            </p>
            <p className="text-sm text-red-600 truncate">
              Recover ~2.5K potential reach with AI-suggested re-scheduling
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span>View Recovery Plans</span>
            <span>→</span>
          </div>
        </div>
      </Link>

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