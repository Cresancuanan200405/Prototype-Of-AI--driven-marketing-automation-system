import { Megaphone, Plus } from "lucide-react";

const campaigns = [
  { name: "Summer Sale 2026", status: "Active", posts: 12, reach: "45.2K", engagement: "8.5%" },
  { name: "Mother's Day Campaign", status: "Scheduled", posts: 8, reach: "0", engagement: "0%" },
  { name: "Spring Collection", status: "Completed", posts: 15, reach: "62.3K", engagement: "12.1%" },
];

export function Campaigns() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
          <p className="text-gray-600">Organize your marketing into strategic campaigns</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-[#1e3a8a] to-[#6b21a8] text-white rounded-lg font-medium hover:opacity-90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1e3a8a] to-[#6b21a8] flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      campaign.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : campaign.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                View Details
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Posts</p>
                <p className="font-semibold text-gray-900">{campaign.posts}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Reach</p>
                <p className="font-semibold text-gray-900">{campaign.reach}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Engagement</p>
                <p className="font-semibold text-gray-900">{campaign.engagement}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

