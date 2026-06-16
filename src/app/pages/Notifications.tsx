import { CheckCheck, CircleAlert, Clock3, MessageSquare, Bell } from "lucide-react";
import { useMemo, useState } from "react";

type NotificationItem = {
  id: number;
  type: "success" | "alert" | "info" | "warning";
  icon: typeof Bell;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  selected: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    type: "success",
    icon: MessageSquare,
    title: "Post published successfully",
    message: "Your Summer Sale Announcement is now live on Facebook and Instagram.",
    time: "2 minutes ago",
    unread: true,
    selected: false,
    id: 1,
  },
  {
    type: "alert",
    icon: CircleAlert,
    title: "Recovery suggestion ready",
    message: "A new recovery post has been prepared for a missed promotional slot.",
    time: "1 hour ago",
    unread: true,
    selected: false,
    id: 2,
  },
  {
    type: "info",
    icon: Bell,
    title: "Engagement milestone reached",
    message: "Your latest post reached a new engagement high this week.",
    time: "3 hours ago",
    unread: false,
    selected: false,
    id: 3,
  },
  {
    type: "warning",
    icon: Clock3,
    title: "Scheduled post reminder",
    message: "You have 3 posts scheduled for tomorrow. Review the queue when ready.",
    time: "5 hours ago",
    unread: false,
    selected: false,
    id: 4,
  },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(() => notifications.filter((item) => item.unread).length, [notifications]);
  const selectedCount = useMemo(() => notifications.filter((item) => item.selected).length, [notifications]);

  const toggleSelected = (id: number) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, selected: !item.selected, unread: false } : item,
      ),
    );
  };

  const selectAll = () => {
    setNotifications((current) => current.map((item) => ({ ...item, selected: true, unread: false })));
  };

  const markAllAsRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, unread: false })));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#1e3a8a] to-[#6b21a8] p-8 text-white shadow-xl">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/75">AdMatrix Notifications</p>
        <h1 className="text-3xl font-bold">Notification Center</h1>
        <p className="mt-2 text-white/80">Review alerts, select multiple items, and mark everything as read from one place.</p>
      </div>

      <div className="rounded-2xl border border-[#1e3a8a]/10 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Notification List</h2>
            <p className="text-sm text-slate-500">{selectedCount} selected - {unreadCount} unread - {notifications.length} total</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="inline-flex items-center gap-2 rounded-xl border border-[#1e3a8a]/10 px-4 py-2 text-sm font-semibold text-[#1e3a8a] hover:bg-[#1e3a8a]/5"
            >
              <CheckCheck className="h-4 w-4" />
              Select all
            </button>
            <button
              type="button"
              onClick={markAllAsRead}
              className="rounded-xl bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#172f71]"
            >
              Mark all as read
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            const selected = notification.selected;
            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => toggleSelected(notification.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                  selected ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selected}
                    readOnly
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1e3a8a]"
                  />
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${notification.type === "success" ? "bg-emerald-100" : notification.type === "alert" ? "bg-red-100" : notification.type === "warning" ? "bg-amber-100" : "bg-[#1e3a8a]/10"}`}>
                    <Icon className={`h-5 w-5 ${notification.type === "success" ? "text-emerald-600" : notification.type === "alert" ? "text-red-600" : notification.type === "warning" ? "text-amber-600" : "text-[#1e3a8a]"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">{notification.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{notification.message}</p>
                      </div>
                      {notification.unread && <span className="mt-1 h-2 w-2 rounded-full bg-[#d4af37]" />}
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{notification.time}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[#1e3a8a]/10 bg-[#f8fafc] p-5 text-sm text-slate-600">
        Use the notification icon in the top bar for the dropdown view, or open this page to review the full list.
      </div>
    </div>
  );
}
