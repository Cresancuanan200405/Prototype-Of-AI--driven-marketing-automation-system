import { Bell, CheckCircle, AlertCircle, TrendingUp, Clock } from "lucide-react";

const notifications = [
  {
    type: "success",
    icon: CheckCircle,
    title: "Post Published Successfully",
    message: "Your 'Summer Sale Announcement' post is now live on Facebook and Instagram",
    time: "2 minutes ago",
    unread: true,
  },
  {
    type: "alert",
    icon: AlertCircle,
    title: "Missed Posting Opportunity",
    message: "You missed the optimal posting time for today. Schedule recovery post?",
    time: "1 hour ago",
    unread: true,
  },
  {
    type: "info",
    icon: TrendingUp,
    title: "Engagement Milestone Reached",
    message: "Your post reached 1,000 likes! Keep up the great content.",
    time: "3 hours ago",
    unread: false,
  },
  {
    type: "warning",
    icon: Clock,
    title: "Scheduled Post Reminder",
    message: "You have 3 posts scheduled for tomorrow. Review them in Calendar.",
    time: "5 hours ago",
    unread: false,
  },
];

export function Notifications() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with your marketing activities</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          return (
            <div
              key={index}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                notification.unread ? "bg-blue-50/30" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification.type === "success"
                      ? "bg-green-100"
                      : notification.type === "alert"
                      ? "bg-red-100"
                      : notification.type === "warning"
                      ? "bg-yellow-100"
                      : "bg-blue-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      notification.type === "success"
                        ? "text-green-600"
                        : notification.type === "alert"
                        ? "text-red-600"
                        : notification.type === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    {notification.unread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
