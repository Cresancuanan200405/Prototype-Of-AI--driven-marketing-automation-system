import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  AlertCircle,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router";

const stats = [
  {
    name: "Total Posts",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: FileText,
    link: "/app/content-studio",
  },
  {
    name: "Scheduled Posts",
    value: "18",
    change: "+5",
    trend: "up",
    icon: Calendar,
    link: "/app/calendar",
  },
  {
    name: "Engagement Rate",
    value: "8.5%",
    change: "+2.3%",
    trend: "up",
    icon: TrendingUp,
    link: "/app/analytics",
  },
  {
    name: "Total Reach",
    value: "45.2K",
    change: "+18%",
    trend: "up",
    icon: Users,
    link: "/app/analytics",
  },
  {
    name: "Followers Growth",
    value: "+1,234",
    change: "+8%",
    trend: "up",
    icon: Users,
    link: "/app/analytics",
  },
  {
    name: "Missed Promotions",
    value: "3",
    change: "-2",
    trend: "down",
    icon: AlertCircle,
    link: "/app/missed-posts",
    highlight: true,
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

const postsData = [
  { name: "Week 1", posts: 12 },
  { name: "Week 2", posts: 15 },
  { name: "Week 3", posts: 18 },
  { name: "Week 4", posts: 20 },
];

const upcomingPosts = [
  {
    title: "Summer Sale Announcement",
    platform: "Facebook",
    time: "Today, 3:00 PM",
    status: "scheduled",
  },
  {
    title: "New Product Showcase",
    platform: "Instagram",
    time: "Tomorrow, 10:00 AM",
    status: "scheduled",
  },
  {
    title: "Customer Testimonial",
    platform: "Facebook",
    time: "May 12, 2:00 PM",
    status: "scheduled",
  },
];

const aiRecommendations = [
  "Post engagement is highest on weekends. Consider scheduling more content for Saturdays.",
  "Your audience is most active between 6-8 PM. Optimize posting times.",
  "Product showcase posts get 40% more engagement. Create more visual content.",
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Missed Opportunities Alert */}
      <Link
        to="/app/missed-posts"
        className="block rounded-xl border-2 border-amber-200 bg-amber-50 p-4 hover:bg-amber-100/80 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-amber-900 text-sm">
              You have 3 missed promotional opportunities this week
            </p>
            <p className="text-sm text-amber-700 truncate">
              Recover ~2.5K potential reach with AI-suggested re-scheduling
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-amber-800 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View Recovery Plans</span>
            <span>→</span>
          </div>
        </div>
      </Link>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          const CardContent = (
            <div
              className={`bg-card text-card-foreground rounded-lg border p-6 transition-all ${
                stat.highlight
                  ? "border-amber-200 hover:border-amber-300 hover:shadow-md"
                  : "border-border hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.highlight
                      ? "bg-amber-100 text-amber-700"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
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

          return stat.link ? (
            <Link key={stat.name} to={stat.link} className="block">
              {CardContent}
            </Link>
          ) : (
            <div key={stat.name}>{CardContent}</div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Engagement & Reach</h3>
            <Link
              to="/app/analytics"
              className="text-sm text-primary hover:underline"
            >
              View full analytics →
            </Link>
          </div>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Posts Published</h3>
            <Link
              to="/app/analytics"
              className="text-sm text-primary hover:underline"
            >
              View full analytics →
            </Link>
          </div>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Upcoming Posts</h3>
            <Link
              to="/app/calendar"
              className="text-sm text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingPosts.map((post, index) => (
              <div
                key={index}
                className="pb-4 border-b border-border/60 last:border-0"
              >
                <h4 className="font-medium mb-1">{post.title}</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  {post.platform}
                </p>
                <p className="text-xs text-muted-foreground/80">{post.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold">AI Recommendations</h3>
          </div>

          <div className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-3 text-sm text-foreground border border-border/60 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/app/publishing"
              className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/60 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Create New Post</p>
                <p className="text-xs text-muted-foreground">
                  Go to Publishing
                </p>
              </div>
            </Link>
            <Link
              to="/app/ai-generator"
              className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/60 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Generate AI Content</p>
                <p className="text-xs text-muted-foreground">
                  Open AI Generator
                </p>
              </div>
            </Link>
            <Link
              to="/app/missed-posts"
              className="flex items-center gap-3 p-3 rounded-lg bg-background border border-amber-200 hover:border-amber-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Recover Missed Posts</p>
                <p className="text-xs text-muted-foreground">
                  3 opportunities waiting
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}