import { Gift, Lightbulb, Calendar, TrendingUp } from "lucide-react";

const upcomingHolidays = [
  {
    name: "Mother's Day",
    date: "May 11, 2026",
    daysUntil: 2,
    color: "from-pink-500 to-rose-500",
    engagement: "High",
  },
  {
    name: "Memorial Day",
    date: "May 26, 2026",
    daysUntil: 17,
    color: "from-blue-500 to-indigo-500",
    engagement: "Medium",
  },
  {
    name: "Father's Day",
    date: "June 15, 2026",
    daysUntil: 37,
    color: "from-cyan-500 to-blue-500",
    engagement: "High",
  },
  {
    name: "Independence Day",
    date: "July 4, 2026",
    daysUntil: 56,
    color: "from-red-500 to-blue-500",
    engagement: "Very High",
  },
];

const aiCampaigns = [
  {
    holiday: "Mother's Day",
    title: "Mother's Day Special - Show Your Love",
    description: "A heartwarming campaign featuring customer stories and special discounts for mom",
    prediction: "95% engagement increase expected",
    templates: 5,
  },
  {
    holiday: "Memorial Day",
    title: "Memorial Day Weekend Sale",
    description: "Patriotic-themed promotion with exclusive offers and free shipping",
    prediction: "70% engagement increase expected",
    templates: 4,
  },
];

const seasonalTemplates = [
  { name: "Spring Collection Launch", category: "Product Launch", uses: 234 },
  { name: "Summer Sale Countdown", category: "Promotion", uses: 567 },
  { name: "Holiday Gift Guide", category: "Educational", uses: 421 },
  { name: "Thank You Message", category: "Engagement", uses: 892 },
];

export function HolidayMarketing() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Holiday Marketing</h1>
        <p className="text-gray-600">Plan and execute seasonal campaigns with AI assistance</p>
      </div>

      {/* Upcoming Holidays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {upcomingHolidays.map((holiday, index) => (
          <div
            key={index}
            className="bg-card rounded-xl shadow-sm border-border overflow-hidden"
          >
            <div className="h-2 bg-accent" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="icon icon-md icon-muted" />
                <h3 className="font-semibold text-foreground">{holiday.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{holiday.date}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-foreground">{holiday.daysUntil}</span>
                <span className="text-sm text-muted-foreground">days until</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Expected engagement</span>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent text-accent-foreground">{holiday.engagement}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI-Generated Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
                  <Lightbulb className="icon icon-md icon-muted" />
            <h2 className="text-xl font-semibold text-gray-900">AI-Generated Campaign Ideas</h2>
          </div>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
            Generate More Ideas
          </button>
        </div>

        <div className="space-y-4">
          {aiCampaigns.map((campaign, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium mb-2">
                    {campaign.holiday}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                </div>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-colors">
                  Use This Campaign
                </button>
              </div>
              <p className="text-gray-600 mb-4">{campaign.description}</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="icon icon-sm icon-muted" />
                  <span className="text-sm text-muted-foreground">{campaign.prediction}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="icon icon-sm icon-muted" />
                  <span className="text-sm text-muted-foreground">{campaign.templates} ready-to-use templates</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Seasonal Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seasonalTemplates.map((template, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">Used by {template.uses.toLocaleString()} businesses</p>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Recommendations */}
      <div className="bg-card rounded-xl border-border p-8">
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Lightbulb className="icon icon-md icon-on-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">AI Promo Recommendations</h3>
            <p className="text-muted-foreground mb-4">
              Based on your business category and past performance, we recommend a 15-20% discount
              for Mother's Day with a "gift with purchase" incentive. This strategy has shown 40%
              higher conversion rates in similar businesses.
            </p>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                Create Campaign
              </button>
              <button className="px-6 py-2 border border-border text-muted-foreground rounded-lg font-medium hover:bg-card transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
