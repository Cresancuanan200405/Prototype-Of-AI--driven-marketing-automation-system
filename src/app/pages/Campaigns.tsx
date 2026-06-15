import { Megaphone, Plus } from "lucide-react";

const campaigns = [
  {
    name: "Summer Sale 2026",
    status: "Active",
    posts: 12,
    reach: "45.2K",
    engagement: "8.5%",
  },
  {
    name: "Mother's Day Campaign",
    status: "Scheduled",
    posts: 8,
    reach: "0",
    engagement: "0%",
  },
  {
    name: "Spring Collection",
    status: "Completed",
    posts: 15,
    reach: "62.3K",
    engagement: "12.1%",
  },
];

export function Campaigns() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Campaigns</h1>
          <p className="text-muted-foreground">
            Organize your marketing into strategic campaigns
          </p>
        </div>

        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground rounded-lg border border-border p-6"
          >
            <div className="flex items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
                  <Megaphone className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{campaign.name}</h3>

                  <span className="inline-flex items-center text-sm px-2 py-1 rounded-full border border-border/60 bg-accent text-accent-foreground">
                    {campaign.status}
                  </span>
                </div>
              </div>

              <button className="px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-accent/20 transition-colors">
                View Details
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Posts</p>
                <p className="font-semibold">{campaign.posts}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Total Reach</p>
                <p className="font-semibold">{campaign.reach}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Engagement</p>
                <p className="font-semibold">{campaign.engagement}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
