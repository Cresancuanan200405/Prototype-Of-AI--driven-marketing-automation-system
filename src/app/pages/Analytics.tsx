import { TrendingUp, Users, Heart, MessageCircle, Share2, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { name: "Total Engagement", value: "12.5K", change: "+18%", icon: Heart },
  { name: "Likes", value: "8.2K", change: "+12%", icon: Heart },
  { name: "Comments", value: "2.1K", change: "+25%", icon: MessageCircle },
  { name: "Shares", value: "2.2K", change: "+15%", icon: Share2 },
];

const engagementTrend = [
  { date: "May 1", likes: 450, comments: 120, shares: 80 },
  { date: "May 2", likes: 520, comments: 150, shares: 95 },
  { date: "May 3", likes: 480, comments: 130, shares: 85 },
  { date: "May 4", likes: 600, comments: 180, shares: 110 },
  { date: "May 5", likes: 550, comments: 160, shares: 100 },
  { date: "May 6", likes: 680, comments: 200, shares: 130 },
  { date: "May 7", likes: 720, comments: 220, shares: 145 },
];

const platformData = [
  { name: "Facebook", value: 55, color: "var(--color-chart-1)" },
  { name: "Instagram", value: 45, color: "var(--color-chart-5)" },
];

const bestPostingTimes = [
  { hour: "6 AM", engagement: 30 },
  { hour: "9 AM", engagement: 55 },
  { hour: "12 PM", engagement: 75 },
  { hour: "3 PM", engagement: 85 },
  { hour: "6 PM", engagement: 95 },
  { hour: "9 PM", engagement: 80 },
];

const topPosts = [
  { title: "Summer Sale Announcement", engagement: 1250, reach: 8500, platform: "Facebook" },
  { title: "New Product Showcase", engagement: 980, reach: 6200, platform: "Instagram" },
  { title: "Customer Success Story", engagement: 850, reach: 5800, platform: "Facebook" },
  { title: "Behind the Scenes Video", engagement: 720, reach: 4900, platform: "Instagram" },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your social media performance and insights
          </p>
        </div>

        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-colors flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-card text-card-foreground rounded-lg border border-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-emerald-700">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Engagement Trend */}
      <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-6">
          Engagement Trend (Last 7 Days)
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={engagementTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
            <XAxis dataKey="date" stroke="rgba(0,0,0,0.55)" />
            <YAxis stroke="rgba(0,0,0,0.55)" />
            <Tooltip />
            <Line type="monotone" dataKey="likes" stroke="var(--color-chart-1)" strokeWidth={2} />
            <Line type="monotone" dataKey="comments" stroke="var(--color-chart-2)" strokeWidth={2} />
            <Line type="monotone" dataKey="shares" stroke="var(--color-chart-4)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Platform & Posting Times */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Distribution */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-6">Platform Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="var(--color-chart-1)"
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Best Posting Times */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-6">Best Posting Times</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bestPostingTimes}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="hour" stroke="rgba(0,0,0,0.55)" />
              <YAxis stroke="rgba(0,0,0,0.55)" />
              <Tooltip />
              <Bar dataKey="engagement" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-card text-card-foreground rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-6">Top Performing Posts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                  Post Title
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                  Platform
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                  Engagement
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                  Reach
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, index) => (
                <tr key={index} className="border-b border-border last:border-b-0 hover:bg-accent/20">
                  <td className="py-4 px-4">
                    <p className="font-medium">{post.title}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium border border-border/60">
                      {post.platform}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">{post.engagement.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">{post.reach.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary"
                          style={{ width: `${(post.engagement / 1250) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audience Activity Heatmap Placeholder */}
      <div className="bg-card text-card-foreground rounded-lg border border-border p-8 text-center">
        <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">
          Audience Activity Heatmap
        </h3>
        <p className="text-muted-foreground mb-4">
          Upgrade to Premium to unlock detailed audience activity patterns
        </p>
        <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-colors">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
