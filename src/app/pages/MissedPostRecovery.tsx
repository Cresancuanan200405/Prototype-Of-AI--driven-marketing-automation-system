import { AlertCircle, Lightbulb, Clock, TrendingUp, CheckCircle, AlertTriangle, ArrowRight, CalendarDays, BarChart3 } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

const missedOpportunities = [
  {
    id: "missed-1",
    title: "Mother's Day Weekend Post",
    missedDate: "May 9, 2026",
    reason: "Peak engagement time (6:00 PM)",
    impact: "Estimated 1,200 potential reach lost",
    status: "critical" as const,
    recovered: false,
  },
  {
    id: "missed-2",
    title: "Friday Happy Hour Promo",
    missedDate: "May 8, 2026",
    reason: "Scheduled but not published",
    impact: "Estimated 800 potential reach lost",
    status: "high" as const,
    recovered: false,
  },
  {
    id: "missed-3",
    title: "Midweek Motivation Post",
    missedDate: "May 7, 2026",
    reason: "Content not prepared in time",
    impact: "Estimated 500 potential reach lost",
    status: "medium" as const,
    recovered: false,
  },
];

const recoveryStrategies = [
  {
    id: "strategy-1",
    opportunity: "Mother's Day Weekend Post",
    strategy: "Re-purpose for Memorial Day",
    suggestedTime: "May 26, 2026 at 6:00 PM",
    expectedImpact: "+40% engagement",
    aiGenerated: true,
  },
  {
    id: "strategy-2",
    opportunity: "Friday Happy Hour Promo",
    strategy: "Post as 'Weekend Kickoff' special",
    suggestedTime: "May 15, 2026 at 5:00 PM",
    expectedImpact: "+35% engagement",
    aiGenerated: true,
  },
];

// Mock timeline data for heatmap
const timelineData = [
  { day: "Mon", date: "May 4", posts: 0, missed: 0 },
  { day: "Tue", date: "May 5", posts: 1, missed: 0 },
  { day: "Wed", date: "May 6", posts: 0, missed: 0 },
  { day: "Thu", date: "May 7", posts: 0, missed: 1 },
  { day: "Fri", date: "May 8", posts: 1, missed: 1 },
  { day: "Sat", date: "May 9", posts: 0, missed: 1 },
  { day: "Sun", date: "May 10", posts: 1, missed: 0 },
];

export function MissedPostRecovery() {
  const [opportunities, setOpportunities] = useState(missedOpportunities);
  const [recovering, setRecovering] = useState(false);

  const totalMissed = opportunities.length;
  const recoveredCount = opportunities.filter((o) => o.recovered).length;
  const recoveryRate = totalMissed > 0 ? Math.round((recoveredCount / totalMissed) * 100) : 0;
  const totalImpact = opportunities.reduce((sum, o) => {
    const match = o.impact.match(/([\d,.]+)/);
    return sum + (match ? parseInt(match[1].replace(/,/g, "")) : 0);
  }, 0);

  const handleRecoverAll = () => {
    setRecovering(true);
    setTimeout(() => {
      setOpportunities((prev) => prev.map((o) => ({ ...o, recovered: true })));
      setRecovering(false);
    }, 800);
  };

  const handleRecoverOne = (id: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, recovered: true } : o)),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Missed Post Recovery</h1>
        <p className="text-gray-600">Recover from missed opportunities with AI-powered suggestions</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Total Missed Posts</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-gray-900">{totalMissed}</h3>
            <span className="text-sm font-medium text-red-600">↓</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Potential Reach Lost</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-gray-900">{(totalImpact / 1000).toFixed(1)}K</h3>
            <span className="text-sm font-medium text-red-600">↓</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Recovery Rate</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-gray-900">{recoveryRate}%</h3>
            <span className="text-sm font-medium text-emerald-600">↑</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Recovered</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-gray-900">{recoveredCount}/{totalMissed}</h3>
            <span className="text-sm font-medium text-emerald-600">↑</span>
          </div>
        </div>
      </div>

      {/* Timeline Heatmap */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">This Week Overview</h2>
        </div>
        <div className="grid grid-cols-7 gap-3">
          {timelineData.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-xs font-medium text-gray-500 mb-1">{day.day}</p>
              <p className="text-[10px] text-gray-400 mb-2">{day.date}</p>
              <div className="space-y-1">
                {day.posts > 0 && (
                  <div className="h-6 rounded bg-emerald-100 flex items-center justify-center text-xs text-emerald-700 font-medium">
                    {day.posts}P
                  </div>
                )}
                {day.missed > 0 && (
                  <div className="h-6 rounded bg-red-100 flex items-center justify-center text-xs text-red-700 font-medium">
                    {day.missed}M
                  </div>
                )}
                {day.posts === 0 && day.missed === 0 && (
                  <div className="h-6 rounded bg-gray-50 border border-gray-100" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missed Opportunities Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-red-900 mb-2">
              {totalMissed} Missed Promotional Opportunities This Week
            </h3>
            <p className="text-red-700 mb-4">
              Don't worry! AI has analyzed these missed opportunities and generated recovery strategies
              to help you regain potential engagement.
            </p>
            <div className="flex gap-3">
              <a
                href="#recovery-strategies"
                className="inline-flex px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                View All Recovery Plans
              </a>
              <button
                onClick={handleRecoverAll}
                disabled={recovering || recoveredCount === totalMissed}
                className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4" />
                {recovering ? "Recovering..." : recoveredCount === totalMissed ? "All Recovered" : "Recover All"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Missed Posts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Missed Posts</h2>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className={`p-5 rounded-xl border-2 transition-all ${
                opportunity.recovered
                  ? "border-emerald-200 bg-emerald-50"
                  : opportunity.status === "critical"
                  ? "border-red-200 bg-red-50"
                  : opportunity.status === "high"
                  ? "border-orange-200 bg-orange-50"
                  : "border-yellow-200 bg-yellow-50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {opportunity.recovered ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className={`w-5 h-5 ${
                        opportunity.status === "critical" ? "text-red-600" :
                        opportunity.status === "high" ? "text-orange-600" :
                        "text-yellow-600"
                      }`} />
                    )}
                    <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        opportunity.recovered
                          ? "bg-emerald-100 text-emerald-700"
                          : opportunity.status === "critical"
                          ? "bg-red-100 text-red-700"
                          : opportunity.status === "high"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {opportunity.recovered ? "Recovered" : opportunity.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Missed on {opportunity.missedDate}</span>
                    </div>
                    <p>Reason: {opportunity.reason}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                      <span>{opportunity.impact}</span>
                    </div>
                  </div>
                </div>
                {!opportunity.recovered ? (
                  <button
                    onClick={() => handleRecoverOne(opportunity.id)}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Recover
                  </button>
                ) : (
                  <Link
                    to="/app/publishing"
                    className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Create Post
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recovery Strategies */}
      <div id="recovery-strategies" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-semibold text-gray-900">AI-Generated Recovery Strategies</h2>
        </div>

        <div className="space-y-4">
          {recoveryStrategies.map((strategy) => (
            <div
              key={strategy.id}
              className="p-6 rounded-xl border-2 border-border bg-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{strategy.opportunity}</h3>
                    {strategy.aiGenerated && (
                      <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                        AI Generated
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3">{strategy.strategy}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Suggested Time</p>
                      <p className="font-medium text-gray-900">{strategy.suggestedTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Expected Impact</p>
                      <p className="font-medium text-emerald-600">{strategy.expectedImpact}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/app/publishing"
                  className="inline-flex px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Schedule Recovery Post
                </Link>
                <Link
                  to="/app/publishing"
                  className="inline-flex px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-white transition-colors"
                >
                  Customize Strategy
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-card rounded-xl border border-emerald-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Prevent Future Missed Posts</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>Enable AI auto-scheduling to post during peak engagement times</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>Set up calendar reminders for important holidays and events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>Maintain a content library with pre-approved posts ready to go</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>Review your content calendar weekly to stay ahead</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}