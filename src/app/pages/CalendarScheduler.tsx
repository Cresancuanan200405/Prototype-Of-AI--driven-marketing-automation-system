import { ChevronLeft, ChevronRight, Plus, AlertTriangle, X } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";

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
  dateStr: string;
}

/* ------------------------------------------------------------------ */
/*  Seed Data — June & July 2026                                       */
/* ------------------------------------------------------------------ */

const MOCK_POSTS: Record<string, CalendarPost[]> = {
  "2026-06-01": [{ title: "June Kickoff Special", type: "published" }],
  "2026-06-02": [{ title: "Iced Coffee Launch", type: "published" }],
  "2026-06-04": [{ title: "Behind the Scenes", type: "published" }],
  "2026-06-05": [{ title: "Customer Spotlight", type: "published" }],
  "2026-06-07": [{ title: "Weekend Brunch Promo", type: "published" }],
  "2026-06-09": [{ title: "New Pastry Flavors", type: "published" }],
  "2026-06-10": [{ title: "Midweek Motivation", type: "published" }],
  "2026-06-16": [{ title: "Summer Drink Feature", type: "scheduled" }],
  "2026-06-18": [{ title: "Throwback Thursday", type: "scheduled" }],
  "2026-06-19": [{ title: "Friday Happy Hour Deal", type: "scheduled" }],
  "2026-06-20": [{ title: "Weekend Special", type: "scheduled" }],
  "2026-06-23": [{ title: "Loyalty Rewards Post", type: "scheduled" }],
  "2026-06-25": [{ title: "Staff Pick of the Week", type: "scheduled" }],
  "2026-06-27": [{ title: "Saturday Promo", type: "scheduled" }],
  "2026-06-30": [{ title: "End of Month Sale", type: "scheduled" }],
  "2026-06-21": [{ title: "Father's Day Promo", type: "holiday" }],
  "2026-06-22": [{ title: "Father's Day Thank You", type: "holiday" }],
  "2026-06-03": [{ title: "Flash Sale Alert", type: "missed" }],
  "2026-06-11": [{ title: "Rainy Day Special", type: "missed" }],
  "2026-06-14": [{ title: "Sunday Promo Post", type: "missed" }],
  "2026-07-01": [{ title: "July 4th Campaign Start", type: "scheduled" }],
  "2026-07-02": [{ title: "Independence Day Promo", type: "holiday" }],
  "2026-07-04": [{ title: "July 4th Sale", type: "holiday" }],
  "2026-07-06": [{ title: "New Month Kickoff", type: "scheduled" }],
  "2026-07-08": [{ title: "Midweek Boost", type: "scheduled" }],
  "2026-07-10": [{ title: "Summer Vibes Post", type: "scheduled" }],
  "2026-07-13": [{ title: "Product Spotlight", type: "scheduled" }],
  "2026-07-15": [{ title: "Hump Day Special", type: "scheduled" }],
  "2026-07-18": [{ title: "Weekend Kickoff", type: "scheduled" }],
  "2026-07-20": [{ title: "Monday Motivation", type: "scheduled" }],
  "2026-07-22": [{ title: "Customer Review Post", type: "scheduled" }],
  "2026-07-25": [{ title: "Flash Friday Deal", type: "scheduled" }],
  "2026-07-28": [{ title: "Last Week of July Promo", type: "scheduled" }],
  "2026-07-30": [{ title: "Month-End Clearance", type: "scheduled" }],
};

/* ------------------------------------------------------------------ */
/*  Calendar Logic                                                     */
/* ------------------------------------------------------------------ */

function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: CalendarDay[] = [];

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    days.push({ day, month: "prev", posts: MOCK_POSTS[dateStr] || [], isToday: false, dateStr });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
    days.push({ day, month: "current", posts: MOCK_POSTS[dateStr] || [], isToday, dateStr });
  }

  const remaining = 42 - days.length;
  for (let day = 1; day <= remaining; day++) {
    const nextMonth = month + 2 > 12 ? 1 : month + 2;
    const nextYear = month + 2 > 12 ? year + 1 : year;
    const dateStr = `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    days.push({ day, month: "next", posts: MOCK_POSTS[dateStr] || [], isToday: false, dateStr });
  }

  return days;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getPostColor(type: string) {
  switch (type) {
    case "scheduled": return "bg-chart-1";
    case "published": return "bg-chart-2";
    case "missed": return "bg-red-500";
    case "holiday": return "bg-chart-4";
    default: return "bg-chart-5";
  }
}

function getPostLabel(type: string) {
  switch (type) {
    case "scheduled": return "Scheduled";
    case "published": return "Published";
    case "missed": return "Missed";
    case "holiday": return "Holiday Campaign";
    default: return type;
  }
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

/* ------------------------------------------------------------------ */
/*  Day Detail Popup                                                   */
/* ------------------------------------------------------------------ */

function DayDetailPopup({
  dayData,
  onClose,
}: {
  dayData: CalendarDay | null;
  onClose: () => void;
}) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dayData) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dayData, onClose]);

  if (!dayData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Popup Card */}
      <div
        ref={popupRef}
        className="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h3 className="text-base font-semibold text-foreground">{formatDate(dayData.dateStr)}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {dayData.posts.length} {dayData.posts.length === 1 ? "post" : "posts"} scheduled
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {dayData.posts.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No posts scheduled for this day</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Click "Schedule Post" to add one</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayData.posts.map((post, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border p-4 ${post.type === "missed" ? "border-red-200 bg-red-50/50" : "border-border bg-muted/30"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${getPostColor(post.type)} text-white`}>
                      {getPostLabel(post.type)}
                    </span>
                    {post.type === "missed" && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-red-600">
                        <AlertTriangle className="w-3 h-3" />
                        Action needed
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground">{post.title}</p>
                  {post.type === "missed" && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      This post was not published on time. Visit Missed Opportunities to recover it.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {dayData.posts.length > 0 && (
          <div className="px-6 py-4 border-t border-border">
            <Link
              to="/app/publishing"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Schedule New Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CalendarScheduler() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const calendarDays = useMemo(
    () => generateCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

  const missedCount = calendarDays.filter((d) => d.posts.some((p) => p.type === "missed")).length;

  const goToPrevMonth = () => {
    if (currentMonth === 0) { setCurrentYear((y) => y - 1); setCurrentMonth(11); }
    else { setCurrentMonth((m) => m - 1); }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) { setCurrentYear((y) => y + 1); setCurrentMonth(0); }
    else { setCurrentMonth((m) => m + 1); }
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  const handleDayClick = (dayData: CalendarDay) => {
    setSelectedDay(dayData);
  };

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Content Calendar</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Plan, schedule, and recover your social media posts</p>
        </div>
        <div className="flex items-center gap-3">
          {missedCount > 0 && (
            <button onClick={() => navigate("/app/missed-posts")} className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-red-300 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition-colors">
              <AlertTriangle className="w-4 h-4" />
              <span>{missedCount} missed</span>
            </button>
          )}
          <Link to="/app/publishing" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Schedule Post
          </Link>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-xl border border-border p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">{monthNames[currentMonth]} {currentYear}</h2>
          <div className="flex items-center gap-2">
            <button onClick={goToPrevMonth} className="p-2 hover:bg-accent rounded-lg transition-colors" aria-label="Previous month">
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button onClick={goToToday} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent rounded-lg transition-colors">
              Today
            </button>
            <button onClick={goToNextMonth} className="p-2 hover:bg-accent rounded-lg transition-colors" aria-label="Next month">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-semibold text-muted-foreground py-2 text-sm">{day}</div>
          ))}

          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              onClick={() => handleDayClick(dayData)}
              className={`min-h-[5.5rem] p-2 rounded-lg border-2 transition-colors cursor-pointer ${
                dayData.month === "current"
                  ? "bg-card border-border hover:border-primary/30"
                  : "bg-muted/50 border-border/50"
              } ${dayData.posts.some((p) => p.type === "missed") ? "ring-2 ring-red-200 border-red-200" : ""}`}
            >
              <div className={`text-sm font-medium mb-1 ${dayData.month === "current" ? "text-foreground" : "text-muted-foreground/40"}`}>
                <div className="flex items-center justify-between">
                  <span className={dayData.isToday ? "flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold" : ""}>
                    {dayData.day}
                  </span>
                  {dayData.isToday && <span className="text-[10px] font-bold text-primary uppercase">Today</span>}
                  {dayData.posts.some((p) => p.type === "missed") && <AlertTriangle className="w-3 h-3 text-red-500" />}
                </div>
              </div>
              <div className="space-y-1">
                {dayData.posts.map((post, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] px-2 py-1 rounded ${getPostColor(post.type)} text-white truncate block`}
                  >
                    {post.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border flex-wrap">
          <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded bg-chart-1" /><span className="text-xs text-muted-foreground">Scheduled</span></div>
          <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded bg-chart-2" /><span className="text-xs text-muted-foreground">Published</span></div>
          <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded bg-red-500" /><span className="text-xs text-muted-foreground">Missed</span></div>
          <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded bg-chart-4" /><span className="text-xs text-muted-foreground">Holiday Campaign</span></div>
        </div>
      </div>

      {/* Day Detail Popup */}
      <DayDetailPopup dayData={selectedDay} onClose={() => setSelectedDay(null)} />
    </div>
  );
}