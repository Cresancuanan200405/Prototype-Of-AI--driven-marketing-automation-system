import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  AlertCircle,
  Lightbulb,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Link } from "react-router";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { name: "Total Posts", value: "247", change: "+12%", trend: "up", icon: FileText },
  { name: "Scheduled Posts", value: "18", change: "+5", trend: "up", icon: Calendar },
  { name: "Engagement Rate", value: "8.5%", change: "+2.3%", trend: "up", icon: TrendingUp },
  { name: "Total Reach", value: "45.2K", change: "+18%", trend: "up", icon: Users },
  { name: "Followers Growth", value: "+1,234", change: "+8%", trend: "up", icon: Users },
  { name: "Missed Promotions", value: "3", change: "-2", trend: "down", icon: AlertCircle },
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

const postsData = [
  { name: "Week 1", posts: 12 },
  { name: "Week 2", posts: 15 },
  { name: "Week 3", posts: 18 },
  { name: "Week 4", posts: 20 },
];

const upcomingPosts = [
  { title: "Summer Sale Announcement", platform: "Facebook", time: "Today, 3:00 PM", status: "scheduled" },
  { title: "New Product Showcase", platform: "Instagram", time: "Tomorrow, 10:00 AM", status: "scheduled" },
  { title: "Customer Testimonial", platform: "Facebook", time: "May 12, 2:00 PM", status: "scheduled" },
];

const holidays = [
  { name: "Mother's Day", date: "May 11", status: "upcoming" },
  { name: "Memorial Day", date: "May 26", status: "planned" },
  { name: "Father's Day", date: "Jun 15", status: "planned" },
];

const aiRecommendations = [
  "Post engagement is highest on weekends. Consider scheduling more content for Saturdays.",
  "Your audience is most active between 6-8 PM. Optimize posting times.",
  "Product showcase posts get 40% more engagement. Create more visual content.",
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-8 border border-border">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-primary-foreground/80">
            Here's what's happening with your marketing today
          </p>
        </div>
      </div>

      {/* Missed Posts Alert */}
      <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-destructive/15">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>

          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold text-destructive">3 Missed Promotional Opportunities</h3>
            <p className="mb-4 text-sm text-destructive/80">
              You missed posting during peak engagement times this week. AI can help you recover these opportunities.
            </p>

            <Link
              to="/app/missed-posts"
              className="inline-flex rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              View Recovery Suggestions
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.name}
              className="bg-card text-card-foreground rounded-lg border border-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>

                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-700" : "text-destructive"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Engagement & Reach</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="name" stroke="rgba(0,0,0,0.55)" />
              <YAxis stroke="rgba(0,0,0,0.55)" />
              <Tooltip />
              <Line
                name="Engagement"
                type="monotone"
                dataKey="engagement"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
              />
              <Line
                name="Reach"
                type="monotone"
                dataKey="reach"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Posts Chart */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Posts Published</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={postsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="name" stroke="rgba(0,0,0,0.55)" />
              <YAxis stroke="rgba(0,0,0,0.55)" />
              <Tooltip />
              <Bar
                name="Posts"
                dataKey="posts"
                fill="var(--color-chart-1)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Posts */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Posts</h3>
          <div className="space-y-4">
            {upcomingPosts.map((post, index) => (
              <div
                key={index}
                className="pb-4 border-b border-border/60 last:border-0"
              >
                <h4 className="font-medium mb-1">{post.title}</h4>
                <p className="text-sm text-muted-foreground mb-1">{post.platform}</p>
                <p className="text-xs text-muted-foreground/80">{post.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Holiday Suggestions */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Holiday Marketing</h3>
          <div className="space-y-4">
            {holidays.map((holiday, index) => (
              <div
                key={index}
                className="pb-4 border-b border-border/60 last:border-0"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{holiday.name}</h4>

                  <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                    {holiday.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">{holiday.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-secondary-foreground" />
            <h3 className="text-lg font-semibold">Recommendations</h3>
          </div>

          <div className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-3 text-sm text-foreground border border-border/60"
              >
                {rec}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
