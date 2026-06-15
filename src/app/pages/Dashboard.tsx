import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  AlertCircle,
  Sparkles,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
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
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-blue-100">Here's what's happening with your marketing today</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement & Reach</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line name="Engagement" type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} />
              <Line name="Reach" type="monotone" dataKey="reach" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Posts Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Posts Published</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={postsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar name="Posts" dataKey="posts" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Posts</h3>
          <div className="space-y-4">
            {upcomingPosts.map((post, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{post.platform}</p>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Holiday Suggestions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Holiday Marketing</h3>
          <div className="space-y-4">
            {holidays.map((holiday, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{holiday.name}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      holiday.status === "upcoming"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {holiday.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{holiday.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-lg p-3 text-sm text-gray-700">
                {rec}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Missed Posts Alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">3 Missed Promotional Opportunities</h3>
            <p className="text-sm text-red-700 mb-3">
              You missed posting during peak engagement times this week. AI can help you recover these opportunities.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              View Recovery Suggestions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
