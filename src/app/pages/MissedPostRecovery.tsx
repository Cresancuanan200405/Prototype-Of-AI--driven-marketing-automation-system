import { useState } from "react";
import { Link } from "react-router";
import {
  AlertCircle,
  Target,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  X,
} from "lucide-react";

const initialOpportunities = [
  {
    id: "missed-1",
    title: "Mother's Day Weekend Post",
    missedDate: "May 9, 2026",
    reason: "Peak engagement time (6:00 PM)",
    impact: "Estimated 1,200 potential reach lost",
    status: "critical" as const,
    recovered: false,
    dismissed: false,
  },
  {
    id: "missed-2",
    title: "Friday Happy Hour Promo",
    missedDate: "May 8, 2026",
    reason: "Scheduled but not published",
    impact: "Estimated 800 potential reach lost",
    status: "high" as const,
    recovered: false,
    dismissed: false,
  },
  {
    id: "missed-3",
    title: "Midweek Motivation Post",
    missedDate: "May 7, 2026",
    reason: "Content not prepared in time",
    impact: "Estimated 500 potential reach lost",
    status: "medium" as const,
    recovered: false,
    dismissed: false,
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
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [recovering, setRecovering] = useState(false);

  const activeOpportunities = opportunities.filter((o) => !o.dismissed);
  const totalMissed = activeOpportunities.length;
  const recoveredCount = activeOpportunities.filter((o) => o.recovered).length;
  const recoveryRate =
    totalMissed > 0 ? Math.round((recoveredCount / totalMissed) * 100) : 0;
  const totalImpact = activeOpportunities.reduce((sum, o) => {
    const match = o.impact.match(/([\d,.]+)/);
    return sum + (match ? parseInt(match[1].replace(/,/g, "")) : 0);
  }, 0);

  const handleRecoverAll = () => {
    setRecovering(true);
    setTimeout(() => {
      setOpportunities((prev) =>
        prev.map((o) => (!o.dismissed ? { ...o, recovered: true } : o)),
      );
      setRecovering(false);
    }, 800);
  };

  const handleRecoverOne = (id: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, recovered: true } : o)),
    );
  };

  const handleDismiss = (id: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, dismissed: true } : o)),
    );
  };

  const visibleOpportunities = opportunities.filter((o) => !o.dismissed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Missed Post Recovery
        </h1>
        <p className="text-muted-foreground">
          Recover from missed opportunities with AI-powered suggestions
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Missed Posts</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-foreground">{totalMissed}</h3>
            <span className="text-sm font-medium text-destructive">↓</span>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Potential Reach Lost</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-foreground">
              {(totalImpact / 1000).toFixed(1)}K
            </h3>
            <span className="text-sm font-medium text-destructive">↓</span>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Recovery Rate</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-foreground">{recoveryRate}%</h3>
            <span className="text-sm font-medium text-primary">↑</span>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Recovered</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-foreground">
              {recoveredCount}/{totalMissed}
            </h3>
            <span className="text-sm font-medium text-primary">↑</span>
          </div>
        </div>
      </div>

      {/* Timeline Heatmap */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            This Week Overview
          </h2>
        </div>
        <div className="grid grid-cols-7 gap-3">
          {timelineData.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-xs font-medium text-muted-foreground mb-1">{day.day}</p>
              <p className="text-[10px] text-muted-foreground/60 mb-2">{day.date}</p>
              <div className="space-y-1">
                {day.posts > 0 && (
                  <div className="h-6 rounded bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">
                    {day.posts}P
                  </div>
                )}
                {day.missed > 0 && (
                  <div className="h-6 rounded bg-red-100 flex items-center justify-center text-xs text-red-600 font-medium">
                    {day.missed}M
                  </div>
                )}
                {day.posts === 0 && day.missed === 0 && (
                  <div className="h-6 rounded bg-muted border border-border/50" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missed Opportunities Alert — Red Urgency */}
      {totalMissed > 0 && (
        <div className="rounded-xl border-2 border-red-300 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                {totalMissed} Missed Promotional Opportunities This Week
              </h3>
              <p className="text-red-600 mb-4">
                Don't worry! AI has analyzed these missed opportunities and
                generated recovery strategies to help you regain potential
                engagement.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="#recovery-strategies"
                  className="inline-flex px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  View All Recovery Plans
                </a>
                <button
                  onClick={handleRecoverAll}
                  disabled={recovering || recoveredCount === totalMissed}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4" />
                  {recovering
                    ? "Recovering..."
                    : recoveredCount === totalMissed
                    ? "All Recovered"
                    : "Recover All"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Missed Posts List */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Recent Missed Posts
          </h2>
          {opportunities.filter((o) => o.dismissed).length > 0 && (
            <button
              onClick={() =>
                setOpportunities((prev) =>
                  prev.map((o) => ({ ...o, dismissed: false })),
                )
              }
              className="text-sm text-secondary font-medium hover:opacity-80"
            >
              Show dismissed ({opportunities.filter((o) => o.dismissed).length})
            </button>
          )}
        </div>
        <div className="space-y-4">
          {visibleOpportunities.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-primary/40 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">All clear!</p>
              <p className="text-sm text-muted-foreground/60">
                No missed posts to recover.
              </p>
            </div>
          ) : (
            visibleOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className={`p-5 rounded-xl border-2 transition-all ${
                  opportunity.recovered
                    ? "border-primary/20 bg-primary/5"
                    : "border-red-200 bg-red-50/60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {opportunity.recovered ? (
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                      <h3 className="font-semibold text-foreground truncate">
                        {opportunity.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          opportunity.recovered
                            ? "bg-primary/10 text-primary"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {opportunity.recovered
                          ? "Recovered"
                          : opportunity.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Missed on {opportunity.missedDate}</span>
                      </div>
                      <p>Reason: {opportunity.reason}</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-destructive" />
                        <span>{opportunity.impact}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 flex-shrink-0">
                    {!opportunity.recovered ? (
                      <button
                        onClick={() => handleRecoverOne(opportunity.id)}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Recover
                      </button>
                    ) : (
                      <Link
                        to="/app/publishing"
                        className="inline-flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Create Post
                      </Link>
                    )}
                    <button
                      onClick={() => handleDismiss(opportunity.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label={`Dismiss ${opportunity.title}`}
                      title="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AI Recovery Strategies */}
      {recoveryStrategies.length > 0 && (
        <div
          id="recovery-strategies"
          className="bg-card rounded-xl shadow-sm border border-border p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-secondary" />
            <h2 className="text-xl font-semibold text-foreground">
              AI-Generated Recovery Strategies
            </h2>
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
                      <h3 className="font-semibold text-foreground">
                        {strategy.opportunity}
                      </h3>
                      {strategy.aiGenerated && (
                        <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                          AI Generated
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{strategy.strategy}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Suggested Time</p>
                        <p className="font-medium text-foreground">
                          {strategy.suggestedTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Expected Impact</p>
                        <p className="font-medium text-primary">
                          {strategy.expectedImpact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    to="/app/publishing"
                    className="inline-flex px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Schedule Recovery Post
                  </Link>
                  <Link
                    to="/app/publishing"
                    className="inline-flex px-6 py-2 border border-border text-muted-foreground rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    Customize Strategy
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Prevent Future Missed Posts
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>
                  Enable AI auto-scheduling to post during peak engagement times
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>
                  Set up calendar reminders for important holidays and events
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>
                  Maintain a content library with pre-approved posts ready to go
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>
                  Review your content calendar weekly to stay ahead
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}