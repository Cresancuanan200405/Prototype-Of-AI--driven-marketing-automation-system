import { useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  Bell,
  CheckCheck,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  UserRound,
  LayoutDashboard,
  FileText,
  Megaphone,
  Calendar,
  Share2,
  BarChart3,
  AlertCircle,
  CircleUserRound,
  Wand2,
} from "lucide-react";

type AppNotification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  selected: boolean;
};

const navigation = [
  { name: "Dashboard", path: "/app", icon: LayoutDashboard },
  { name: "AI Generator", path: "/app/ai-generator", icon: Wand2 },
  { name: "Content Studio", path: "/app/content-studio", icon: FileText },
  { name: "Campaigns", path: "/app/campaigns", icon: Megaphone },
  { name: "Calendar Scheduler", path: "/app/calendar", icon: Calendar },
  { name: "Social Publishing", path: "/app/publishing", icon: Share2 },
  { name: "Analytics", path: "/app/analytics", icon: BarChart3 },
  { name: "Missed Post Recovery", path: "/app/missed-posts", icon: AlertCircle },
];

const initialNotifications: AppNotification[] = [
  {
    id: 1,
    title: "Post published successfully",
    message: "Summer Sale Announcement is now live on Facebook and Instagram.",
    time: "2 minutes ago",
    read: false,
    selected: false,
  },
  {
    id: 2,
    title: "Scheduled post reminder",
    message: "You have 3 posts scheduled for tomorrow morning.",
    time: "1 hour ago",
    read: false,
    selected: false,
  },
  {
    id: 3,
    title: "Analytics update",
    message: "Instagram engagement increased by 14% this week.",
    time: "3 hours ago",
    read: true,
    selected: false,
  },
  {
    id: 4,
    title: "Recovery suggestion ready",
    message: "A new recovery post has been suggested for a missed campaign.",
    time: "5 hours ago",
    read: true,
    selected: false,
  },
];

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const selectedCount = useMemo(() => notifications.filter((item) => item.selected).length, [notifications]);

  const toggleNotificationSelection = (id: number) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, selected: !item.selected, read: true } : item,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  };

  const selectAllNotifications = () => {
    setNotifications((current) => current.map((item) => ({ ...item, selected: true, read: true })));
  };

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className={darkMode ? "min-h-screen bg-slate-950 text-white" : "min-h-screen bg-[#f8fafc] text-slate-900"}>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen border-r transition-all ${
          sidebarOpen ? "w-72" : "w-20"
        } bg-[#1e3a8a] border-white/10 text-white`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37] text-sm font-bold text-[#1e3a8a]">
                  AM
                </div>
                <div>
                  <span className="text-lg font-semibold">AdMatrix</span>
                </div>
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37] text-sm font-bold text-[#1e3a8a]">
                AM
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                    active ? "bg-[#d4af37] text-[#1e3a8a]" : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className={`${sidebarOpen ? "ml-72" : "ml-20"} transition-all`}>
        <header className="sticky top-0 z-30 border-b border-[#1e3a8a]/10 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-6">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search content, campaigns, or insights"
                  className="w-full rounded-xl border border-[#1e3a8a]/10 bg-[#f8fafc] px-4 py-2.5 pl-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-xl border border-[#1e3a8a]/10 bg-[#f8fafc] p-2.5 text-[#1e3a8a] transition-colors hover:bg-[#1e3a8a] hover:text-white"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationOpen((current) => !current);
                    setUserMenuOpen(false);
                  }}
                  className="relative rounded-xl border border-[#1e3a8a]/10 bg-[#f8fafc] p-2.5 text-[#1e3a8a] transition-colors hover:bg-[#1e3a8a] hover:text-white"
                  aria-label="Open notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-[#1e3a8a]">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-3 w-[22rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">Notifications</h3>
                        <p className="text-xs text-slate-500">{selectedCount} selected</p>
                      </div>
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1e3a8a] hover:bg-[#1e3a8a]/5"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
                      <button
                        type="button"
                        onClick={selectAllNotifications}
                        className="inline-flex items-center gap-2 font-medium text-[#1e3a8a]"
                      >
                        <CheckCheck className="h-4 w-4" />
                        Select all
                      </button>
                      <span>{notifications.length} total</span>
                    </div>
                    <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                      {notifications.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleNotificationSelection(item.id)}
                          className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                            item.selected ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-100 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input type="checkbox" checked={item.selected} readOnly className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1e3a8a]" />
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                                {!item.read && <span className="mt-1 h-2 w-2 rounded-full bg-[#d4af37]" />}
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.message}</p>
                              <p className="mt-2 text-[11px] text-slate-400">{item.time}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 border-t border-slate-100 pt-3">
                      <Link
                        to="/app/notifications"
                        onClick={() => setNotificationOpen(false)}
                        className="block rounded-xl bg-[#1e3a8a] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#1b3278]"
                      >
                        See all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen((current) => !current);
                    setNotificationOpen(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#1e3a8a]/10 bg-[#f8fafc] px-3 py-2.5 text-[#1e3a8a] transition-colors hover:bg-[#1e3a8a] hover:text-white"
                >
                  <CircleUserRound className="h-5 w-5" />
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                    <Link
                      to="/app/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <UserRound className="h-4 w-4 text-[#1e3a8a]" />
                      Profile
                    </Link>
                    <Link
                      to="/app/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Settings className="h-4 w-4 text-[#1e3a8a]" />
                      Settings
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <LogOut className="h-4 w-4 text-[#1e3a8a]" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className={`p-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
