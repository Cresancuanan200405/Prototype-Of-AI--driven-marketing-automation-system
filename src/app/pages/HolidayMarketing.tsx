import { Gift, Lightbulb, Calendar, TrendingUp } from "lucide-react";

const upcomingHolidays = [
  {
    name: "Mother's Day",
    date: "May 11, 2026",
    daysUntil: 2,
    engagement: "High",
  },
  {
    name: "Memorial Day",
    date: "May 26, 2026",
    daysUntil: 17,
    engagement: "Medium",
  },
  {
    name: "Father's Day",
    date: "June 15, 2026",
    daysUntil: 37,
    engagement: "High",
  },
  {
    name: "Independence Day",
    date: "July 4, 2026",
    daysUntil: 56,
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
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Holiday Marketing</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Plan and execute seasonal campaigns with AI assistance</p>
      </div>

      {/* Upcoming Holidays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {upcomingHolidays.map((holiday, index) => (
          <div
            key={index}
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-[0_6px_20px_rgba(11,27,58,0.08)] hover:border-primary/20 transition-all duration-200"
          >
            <div className="h-1 bg-secondary" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm text-foreground">{holiday.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{holiday.date}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-foreground tracking-tight">{holiday.daysUntil}</span>
                <span className="text-xs text-muted-foreground">days until</span>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/10 text-secondary">{holiday.engagement}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI-Generated Campaigns */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-secondary" />
            <h2 className="text-base font-semibold text-foreground">AI-Generated Campaign Ideas</h2>
          </div>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200">
            Generate More Ideas
          </button>
        </div>

        <div className="space-y-4">
          {aiCampaigns.map((campaign, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-border hover:border-secondary/30 transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium mb-2">
                    {campaign.holiday}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{campaign.title}</h3>
                </div>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200">
                  Use This Campaign
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{campaign.prediction}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{campaign.templates} ready-to-use templates</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Templates */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-base font-semibold text-foreground mb-5">Seasonal Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {seasonalTemplates.map((template, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-border hover:border-secondary/30 hover:bg-muted/30 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm text-foreground">{template.name}</h3>
                <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium">
                  {template.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Used by {template.uses.toLocaleString()} businesses</p>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Recommendations */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-2">AI Promo Recommendations</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Based on your business category and past performance, we recommend a 15-20% discount
              for Mother's Day with a "gift with purchase" incentive. This strategy has shown 40%
              higher conversion rates in similar businesses.
            </p>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200">
                Create Campaign
              </button>
              <button className="px-5 py-2.5 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors duration-200">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}