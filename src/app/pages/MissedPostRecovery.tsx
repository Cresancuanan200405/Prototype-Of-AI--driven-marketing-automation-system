import { AlertCircle, Lightbulb, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router";

const missedOpportunities = [
  {
    title: "Mother's Day Weekend Post",
    missedDate: "May 9, 2026",
    reason: "Peak engagement time (6:00 PM)",
    impact: "Estimated 1,200 potential reach lost",
    status: "critical",
  },
  {
    title: "Friday Happy Hour Promo",
    missedDate: "May 8, 2026",
    reason: "Scheduled but not published",
    impact: "Estimated 800 potential reach lost",
    status: "high",
  },
  {
    title: "Midweek Motivation Post",
    missedDate: "May 7, 2026",
    reason: "Content not prepared in time",
    impact: "Estimated 500 potential reach lost",
    status: "medium",
  },
];

const recoveryStrategies = [
  {
    opportunity: "Mother's Day Weekend Post",
    strategy: "Re-purpose for Memorial Day",
    suggestedTime: "May 26, 2026 at 6:00 PM",
    expectedImpact: "+40% engagement",
    aiGenerated: true,
  },
  {
    opportunity: "Friday Happy Hour Promo",
    strategy: "Post as 'Weekend Kickoff' special",
    suggestedTime: "May 15, 2026 at 5:00 PM",
    expectedImpact: "+35% engagement",
    aiGenerated: true,
  },
];

const analytics = [
  { metric: "Total Missed Posts", value: "3", trend: "down" },
  { metric: "Potential Reach Lost", value: "2.5K", trend: "down" },
  { metric: "Recovery Rate", value: "67%", trend: "up" },
  { metric: "Avg Recovery Time", value: "2 days", trend: "up" },
];

export function MissedPostRecovery() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Missed Post Recovery</h1>
        <p className="text-gray-600">Recover from missed opportunities with AI-powered suggestions</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analytics.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">{stat.metric}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? "↑" : "↓"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Missed Opportunities Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-red-900 mb-2">
              3 Missed Promotional Opportunities This Week
            </h3>
            <p className="text-red-700 mb-4">
              Don't worry! AI has analyzed these missed opportunities and generated recovery strategies
              to help you regain potential engagement.
            </p>
            <a
              href="#recovery-strategies"
              className="inline-flex px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              View All Recovery Plans
            </a>
          </div>
        </div>
      </div>

      {/* Missed Posts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Missed Posts</h2>
        <div className="space-y-4">
          {missedOpportunities.map((opportunity, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl border-2 ${
                opportunity.status === "critical"
                  ? "border-red-200 bg-red-50"
                  : opportunity.status === "high"
                  ? "border-orange-200 bg-orange-50"
                  : "border-yellow-200 bg-yellow-50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        opportunity.status === "critical"
                          ? "bg-red-100 text-red-700"
                          : opportunity.status === "high"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {opportunity.status}
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
                <Link
                  to="/app/publishing"
                  className="inline-flex px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
                >
                  Recover
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recovery Strategies */}
      <div id="recovery-strategies" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="icon icon-md icon-muted" />
          <h2 className="text-xl font-semibold text-gray-900">AI-Generated Recovery Strategies</h2>
        </div>

        <div className="space-y-4">
          {recoveryStrategies.map((strategy, index) => (
            <div
              key={index}
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
                      <p className="font-medium text-green-600">{strategy.expectedImpact}</p>
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
      <div className="bg-card rounded-xl border border-green-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Prevent Future Missed Posts</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Enable AI auto-scheduling to post during peak engagement times</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Set up calendar reminders for important holidays and events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Maintain a content library with pre-approved posts ready to go</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Review your content calendar weekly to stay ahead</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
