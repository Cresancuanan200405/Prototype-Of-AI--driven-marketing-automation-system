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

function getNotificationColors(type: string) {
  switch (type) {
    case "success":
      return { bg: "bg-primary/10", text: "text-primary" };
    case "alert":
      return { bg: "bg-red-100", text: "text-red-600" };
    case "warning":
      return { bg: "bg-secondary/10", text: "text-secondary" };
    default:
      return { bg: "bg-muted", text: "text-muted-foreground" };
  }
}

export function Notifications() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Stay updated with your marketing activities</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-secondary hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          const colors = getNotificationColors(notification.type);
          return (
            <div
              key={index}
              className={`p-5 hover:bg-muted/50 transition-colors duration-200 ${
                notification.unread ? "bg-secondary/[0.03]" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}
                >
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-sm text-foreground">{notification.title}</h3>
                    {notification.unread && (
                      <span className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1.5">{notification.message}</p>
                  <p className="text-xs text-muted-foreground/60">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}