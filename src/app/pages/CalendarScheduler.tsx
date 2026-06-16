import { ChevronLeft, ChevronRight, Plus, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

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

export function CalendarScheduler() {
  const [currentMonth] = useState("May 2026");

  const getPostColor = (type: string) => {
    switch (type) {
      case "scheduled":
        return "bg-chart-1";
      case "published":
        return "bg-chart-2";
      case "missed":
        return "bg-red-500";
      case "holiday":
        return "bg-chart-4";
      default:
        return "bg-chart-5";
    }
  };

  const missedCount = calendarDays.filter((d) =>
    d.posts.some((p) => p.type === "missed"),
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Calendar</h1>
          <p className="text-gray-600">Plan, schedule, and recover your social media posts</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Missed posts indicator */}
          {missedCount > 0 && (
            <Link
              to="/app/missed-posts"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-amber-200 bg-amber-50 text-amber-800 text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{missedCount} missed</span>
            </Link>
          )}
          <Link
            to="/app/publishing"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule Post
          </Link>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-xl shadow-sm border-border p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{currentMonth}</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent rounded-lg transition-colors">
              Today
            </button>
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-semibold text-gray-700 py-2 text-sm">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className={`min-h-24 p-2 rounded-lg border-2 transition-colors ${
                dayData.month === "current"
                  ? "bg-card border-border hover:border-primary/30"
                  : "bg-accent/50 border-border/50"
              } ${
                dayData.posts.some((p) => p.type === "missed")
                  ? "ring-2 ring-red-200 border-red-200"
                  : ""
              }`}
            >
              <div
                className={`text-sm font-medium mb-1 ${
                  dayData.month === "current" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{dayData.day}</span>
                  {dayData.posts.some((p) => p.type === "missed") && (
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                  )}
                </div>
              </div>
              <div className="space-y-1">
                {dayData.posts.map((post, idx) => (
                  <Link
                    key={idx}
                    to={post.type === "missed" ? "/app/missed-posts" : "/app/publishing"}
                    className={`text-xs px-2 py-1 rounded ${getPostColor(post.type)} text-white truncate block hover:opacity-80 transition-opacity`}
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-1"></div>
            <span className="text-sm text-muted-foreground">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-2"></div>
            <span className="text-sm text-muted-foreground">Published</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm text-muted-foreground">Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-4"></div>
            <span className="text-sm text-muted-foreground">Holiday Campaign</span>
          </div>
        </div>
      </div>
    </div>
  );
}