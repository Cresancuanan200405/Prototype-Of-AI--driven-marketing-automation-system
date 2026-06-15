import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calendarDays = [
  { day: 28, month: "prev", posts: [] },
  { day: 29, month: "prev", posts: [] },
  { day: 30, month: "prev", posts: [] },
  { day: 1, month: "current", posts: [] },
  { day: 2, month: "current", posts: [] },
  { day: 3, month: "current", posts: [{ title: "Summer Sale", type: "scheduled" }] },
  { day: 4, month: "current", posts: [] },
  { day: 5, month: "current", posts: [{ title: "Product Launch", type: "published" }] },
  { day: 6, month: "current", posts: [] },
  { day: 7, month: "current", posts: [] },
  { day: 8, month: "current", posts: [] },
  { day: 9, month: "current", posts: [{ title: "Mother's Day Campaign", type: "holiday" }] },
  { day: 10, month: "current", posts: [] },
  { day: 11, month: "current", posts: [{ title: "Mother's Day", type: "holiday" }] },
  { day: 12, month: "current", posts: [{ title: "Customer Testimonial", type: "scheduled" }] },
  { day: 13, month: "current", posts: [] },
  { day: 14, month: "current", posts: [] },
  { day: 15, month: "current", posts: [] },
  { day: 16, month: "current", posts: [] },
  { day: 17, month: "current", posts: [{ title: "Weekend Special", type: "scheduled" }] },
  { day: 18, month: "current", posts: [] },
  { day: 19, month: "current", posts: [] },
  { day: 20, month: "current", posts: [] },
  { day: 21, month: "current", posts: [{ title: "Flash Sale Alert", type: "missed" }] },
  { day: 22, month: "current", posts: [] },
  { day: 23, month: "current", posts: [] },
  { day: 24, month: "current", posts: [] },
  { day: 25, month: "current", posts: [] },
  { day: 26, month: "current", posts: [{ title: "Memorial Day Sale", type: "holiday" }] },
  { day: 27, month: "current", posts: [] },
  { day: 28, month: "current", posts: [] },
  { day: 29, month: "current", posts: [] },
  { day: 30, month: "current", posts: [] },
  { day: 31, month: "current", posts: [] },
  { day: 1, month: "next", posts: [] },
];

const upcomingCampaigns = [
  { title: "Mother's Day Campaign", date: "May 11", status: "scheduled", color: "bg-yellow-100 text-yellow-700" },
  { title: "Summer Collection Launch", date: "May 15", status: "draft", color: "bg-gray-100 text-gray-700" },
  { title: "Memorial Day Sale", date: "May 26", status: "scheduled", color: "bg-yellow-100 text-yellow-700" },
  { title: "End of Month Recap", date: "May 31", status: "draft", color: "bg-gray-100 text-gray-700" },
];

export function CalendarScheduler() {
  const [currentMonth] = useState("May 2026");

  const getPostColor = (type: string) => {
    switch (type) {
      case "scheduled":
        return "bg-chart-1";
      case "published":
        return "bg-chart-2";
      case "missed":
        return "bg-chart-3";
      case "holiday":
        return "bg-chart-4";
      default:
        return "bg-chart-5";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Calendar</h1>
          <p className="text-gray-600">Plan and schedule your social media posts</p>
        </div>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="icon icon-sm icon-on-primary" />
          Schedule Post
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-xl shadow-sm border-border p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{currentMonth}</h2>
            <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ChevronLeft className="icon icon-sm icon-muted" />
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent rounded-lg transition-colors">
              Today
            </button>
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ChevronRight className="icon icon-sm icon-muted" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-semibold text-gray-700 py-2">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className={`min-h-24 p-2 rounded-lg border-2 transition-colors ${
                dayData.month === "current"
                  ? "bg-card border-border hover:border-border"
                  : "bg-accent border-border"
              }`}
            >
              <div
                className={`text-sm font-medium mb-1 ${
                  dayData.month === "current" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {dayData.day}
              </div>
              <div className="space-y-1">
                {dayData.posts.map((post, idx) => (
                  <div
                    key={idx}
                    className={`text-xs px-2 py-1 rounded ${getPostColor(post.type)} text-white truncate`}
                  >
                    {post.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-1"></div>
            <span className="text-sm text-muted-foreground">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-2"></div>
            <span className="text-sm text-muted-foreground">Published</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-3"></div>
            <span className="text-sm text-muted-foreground">Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-4"></div>
            <span className="text-sm text-muted-foreground">Holiday Campaign</span>
          </div>
        </div>
      </div>

      {/* Upcoming Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Campaigns</h3>
        <div className="space-y-3">
          {upcomingCampaigns.map((campaign, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                <p className="text-sm text-gray-600">{campaign.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${campaign.color}`}>
                {campaign.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
