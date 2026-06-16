import { TrendingUp, Users, Heart, MessageCircle, Share2, Download, BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { name: "Total Reach", value: "45.2K", change: "+18%", icon: Users },
  { name: "Total Engagement", value: "12.5K", change: "+18%", icon: Heart },
  { name: "Engagement Rate", value: "8.5%", change: "+2.3%", icon: TrendingUp },
  { name: "Follower Growth", value: "+1,234", change: "+8%", icon: Users },
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

const crossPlatformData = [
  { metric: "Reach", facebook: 24800, instagram: 20400 },
  { metric: "Engagement", facebook: 6900, instagram: 5600 },
  { metric: "Likes", facebook: 4500, instagram: 3700 },
  { metric: "Comments", facebook: 1200, instagram: 900 },
];

const platformStats = {
  facebook: {
    reach: "24.8K",
    engagement: "6.9K",
    rate: "9.2%",
    followers: "+680",
    topPost: "Summer Sale Announcement",
    topPostEngagement: "1,250",
  },
  instagram: {
    reach: "20.4K",
    engagement: "5.6K",
    rate: "7.8%",
    followers: "+554",
    topPost: "New Product Showcase",
    topPostEngagement: "980",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const FB_BLUE = "#1877F2";
const IG_PINK = "#E4405F";

function platformBadgeColor(platform: string) {
  return platform === "Facebook"
    ? { bg: "bg-[#1877F2]/10", text: "text-[#1877F2]", border: "border-[#1877F2]/20" }
    : { bg: "bg-[#E4405F]/10", text: "text-[#E4405F]", border: "border-[#E4405F]/20" };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track your social media performance and insights
          </p>
        </div>
        <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
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
                <span className="text-xs font-semibold text-primary">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Engagement Trend */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-foreground">Engagement Trend</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Last 7 days performance</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={engagementTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
            <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
              }}
            />
            <Line name="Likes" type="monotone" dataKey="likes" stroke="var(--color-chart-1)" strokeWidth={2} dot={{ r: 3 }} />
            <Line name="Comments" type="monotone" dataKey="comments" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 3 }} />
            <Line name="Shares" type="monotone" dataKey="shares" stroke="var(--color-chart-4)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cross-Platform Analytics */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Section Header */}
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Cross-Platform Analytics</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Compare Facebook and Instagram performance</p>
            </div>
          </div>
        </div>

        {/* Platform Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Facebook Card */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${FB_BLUE}15` }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill={FB_BLUE}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Facebook</h4>
                <p className="text-xs text-muted-foreground">@sunrisecoffeeshop</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Reach</p>
                <p className="text-lg font-bold text-foreground">{platformStats.facebook.reach}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                <p className="text-lg font-bold text-foreground">{platformStats.facebook.engagement}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Engagement Rate</p>
                <p className="text-lg font-bold" style={{ color: FB_BLUE }}>{platformStats.facebook.rate}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">New Followers</p>
                <p className="text-lg font-bold text-foreground">{platformStats.facebook.followers}</p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground mb-1">Top Performing Post</p>
              <p className="text-sm font-medium text-foreground">{platformStats.facebook.topPost}</p>
              <p className="text-xs mt-1" style={{ color: FB_BLUE }}>{platformStats.facebook.topPostEngagement} engagement</p>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${IG_PINK}15` }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill={IG_PINK}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Instagram</h4>
                <p className="text-xs text-muted-foreground">@sunrisecoffeeshop</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Reach</p>
                <p className="text-lg font-bold text-foreground">{platformStats.instagram.reach}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                <p className="text-lg font-bold text-foreground">{platformStats.instagram.engagement}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Engagement Rate</p>
                <p className="text-lg font-bold" style={{ color: IG_PINK }}>{platformStats.instagram.rate}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">New Followers</p>
                <p className="text-lg font-bold text-foreground">{platformStats.instagram.followers}</p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground mb-1">Top Performing Post</p>
              <p className="text-sm font-medium text-foreground">{platformStats.instagram.topPost}</p>
              <p className="text-xs mt-1" style={{ color: IG_PINK }}>{platformStats.instagram.topPostEngagement} engagement</p>
            </div>
          </div>
        </div>

        {/* Comparison Bar Chart */}
        <div className="px-6 py-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-4">Platform Comparison</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={crossPlatformData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="metric" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.5rem",
                  fontSize: "0.8rem",
                }}
              />
              <Bar dataKey="facebook" name="Facebook" fill={FB_BLUE} radius={[6, 6, 0, 0]} />
              <Bar dataKey="instagram" name="Instagram" fill={IG_PINK} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Best Posting Times + Top Performing Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Best Posting Times — 2/5 width */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">Best Posting Times</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Peak engagement hours</p>
          </div>
          <div className="mt-5">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bestPostingTimes}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} />
                <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.5rem",
                    fontSize: "0.8rem",
                  }}
                />
                <Bar dataKey="engagement" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Posts — 3/5 width */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-foreground">Top Performing Posts</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Best content across platforms</p>
          </div>
          <div className="space-y-0">
            {topPosts.map((post, index) => {
              const colors = platformBadgeColor(post.platform);
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 py-3.5 border-b border-border/50 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
                        {post.platform}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.reach.toLocaleString()} reach</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-foreground">{post.engagement.toLocaleString()}</p>
                    <p className="text-[11px] text-muted-foreground">engagement</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}