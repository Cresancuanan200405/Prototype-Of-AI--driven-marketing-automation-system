import { ChevronLeft, ChevronRight, Plus, AlertTriangle } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarPost {
  title: string;
  type: "scheduled" | "published" | "missed" | "holiday";
}

interface CalendarDay {
  day: number;
  month: "prev" | "current" | "next";
  posts: CalendarPost[];
  isToday: boolean;
}

// Mock posts keyed by date string "YYYY-MM-DD"
const MOCK_POSTS: Record<string, CalendarPost[]> = {
  "2026-05-03": [{ title: "Summer Sale", type: "scheduled" }],
  "2026-05-05": [{ title: "Product Launch", type: "published" }],
  "2026-05-09": [{ title: "Mother's Day Campaign", type: "holiday" }],
  "2026-05-11": [{ title: "Mother's Day", type: "holiday" }],
  "2026-05-12": [{ title: "Customer Testimonial", type: "scheduled" }],
  "2026-05-17": [{ title: "Weekend Special", type: "scheduled" }],
  "2026-05-21": [{ title: "Flash Sale Alert", type: "missed" }],
  "2026-05-26": [{ title: "Memorial Day Sale", type: "holiday" }],
};

function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: CalendarDay[] = [];

  // Previous month days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    days.push({
      day,
      month: "prev",
      posts: MOCK_POSTS[dateStr] || [],
      isToday: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday =
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate();
    days.push({
      day,
      month: "current",
      posts: MOCK_POSTS[dateStr] || [],
      isToday,
    });
  }

  // Next month days to fill 6 rows (42 cells)
  const remaining = 42 - days.length;
  for (let day = 1; day <= remaining; day++) {
    const dateStr = `${year}-${String(month + 2).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    days.push({
      day,
      month: "next",
      posts: MOCK_POSTS[dateStr] || [],
      isToday: false,
    });
  }

  return days;
}

export function CalendarScheduler() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const calendarDays = useMemo(
    () => generateCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

  const missedCount = calendarDays.filter((d) =>
    d.posts.some((p) => p.type === "missed"),
  ).length;

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Content Calendar
          </h1>
          <p className="text-gray-600">
            Plan, schedule, and recover your social media posts
          </p>
        </div>
        <div className="flex items-center gap-3">
          {missedCount > 0 && (
            <Link
              to="/app/missed-posts"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-yellow-600/30 bg-yellow-50 text-yellow-800 text-sm font-medium hover:bg-yellow-100 transition-colors"
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
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevMonth}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent rounded-lg transition-colors"
            >
              Today
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-700 py-2 text-sm"
            >
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
                  <span
                    className={
                      dayData.isToday
                        ? "flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold"
                        : ""
                    }
                  >
                    {dayData.isToday ? "" : ""}
                    {dayData.day}
                  </span>
                  {dayData.isToday && (
                    <span className="text-[10px] font-bold text-primary uppercase">
                      Today
                    </span>
                  )}
                  {dayData.posts.some((p) => p.type === "missed") && (
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                  )}
                </div>
              </div>
              <div className="space-y-1">
                {dayData.posts.map((post, idx) => (
                  <Link
                    key={idx}
                    to={
                      post.type === "missed"
                        ? "/app/missed-posts"
                        : "/app/publishing"
                    }
                    className={`text-xs px-2 py-1 rounded ${getPostColor(
                      post.type,
                    )} text-white truncate block hover:opacity-80 transition-opacity`}
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
            <span className="text-sm text-muted-foreground">
              Holiday Campaign
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}