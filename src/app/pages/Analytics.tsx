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
  { name: "Facebook", value: 55, color: "#3b5998" },
  { name: "Instagram", value: 45, color: "#E1306C" },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your social media performance and insights</p>
        </div>
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Engagement Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Trend (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={engagementTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line type="monotone" dataKey="likes" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="comments" stroke="#8b5cf6" strokeWidth={2} />
            <Line type="monotone" dataKey="shares" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Platform & Posting Times */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Best Posting Times</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bestPostingTimes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="engagement" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Posts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Post Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Platform</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Engagement</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Reach</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{post.title}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {post.platform}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-900">{post.engagement.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right text-gray-900">{post.reach.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
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
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-8 text-center">
        <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Audience Activity Heatmap</h3>
        <p className="text-gray-600 mb-4">
          Upgrade to Premium to unlock detailed audience activity patterns
        </p>
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
