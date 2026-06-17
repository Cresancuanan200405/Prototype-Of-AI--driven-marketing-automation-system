import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  Sparkles,
  Calendar,
  AlertTriangle,
  Library,
  PartyPopper,
  Plus,
} from "lucide-react";
import BrandMark from "./BrandMark";
import { AppBreadcrumbs } from "./AppBreadcrumbs";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const mainNav: NavItem[] = [
  { name: "Dashboard", path: "/app", icon: LayoutDashboard },
];

const contentNav: NavItem[] = [
  { name: "AI Generator", path: "/app/ai-generator", icon: Sparkles },
  { name: "Content Studio", path: "/app/content-studio", icon: Library },
];

const planNav: NavItem[] = [
  { name: "Calendar", path: "/app/calendar", icon: Calendar },
  { name: "Campaigns", path: "/app/campaigns", icon: Megaphone },
  { name: "Holiday Marketing", path: "/app/holiday-marketing", icon: PartyPopper },
];

const analyzeNav: NavItem[] = [
  { name: "Analytics", path: "/app/analytics", icon: BarChart3 },
];


export function MainLayout() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notifRef = useRef<HTMLDivElement>(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const notifications = [
    {
      title: "Post Published Successfully",
      message: "Your 'Summer Sale Announcement' is now live on Facebook",
      time: "2 min ago",
      unread: true,
    },
    {
      title: "Missed Posting Opportunity",
      message: "You missed the optimal posting time for today",
      time: "1 hr ago",
      unread: true,
    },
    {
      title: "Engagement Milestone Reached",
      message: "Your post reached 1,000 likes!",
      time: "3 hrs ago",
      unread: true,
    },
  ];

  const handleMarkAllRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const closeNotif = useCallback(() => {
    setNotifOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        closeNotif();
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen, closeNotif]);

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  const NavLink = ({ item, collapsed }: { item: NavItem; collapsed: boolean }) => {
    const Icon = item.icon;
    const active = isActive(item.path);

    return (
      <Link
        to={item.path}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        }`}
      >
        <div className="relative flex-shrink-0">
          <Icon className="w-5 h-5" />
          {item.badge && item.badge > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-sidebar-primary text-sidebar-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </div>
        {!collapsed && (
          <span className="text-sm font-medium truncate">{item.name}</span>
        )}
        {item.badge && item.badge > 0 && !collapsed && (
          <span className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  const SectionLabel = ({ label, collapsed }: { label: string; collapsed: boolean }) => (
    <div className={`px-3 pt-4 pb-1 ${collapsed ? "text-center" : ""}`}>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
        {collapsed ? label.charAt(0) : label}
      </span>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-background" : "bg-background text-foreground"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-all ${
          sidebarOpen ? "w-64" : "w-20"
        } bg-sidebar text-sidebar-foreground border-r border-sidebar-border`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            {sidebarOpen && (
              <Link to="/app" className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 bg-sidebar-primary text-sidebar-primary-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                  <BrandMark className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sidebar-foreground text-sm truncate">
                  AI Marketing
                </span>
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground flex-shrink-0"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
            {/* Dashboard */}
            {mainNav.map((item) => (
              <NavLink key={item.path} item={item} collapsed={!sidebarOpen} />
            ))}

            {/* Content Section */}
            {contentNav.length > 0 && (
              <>
                <SectionLabel label="Content" collapsed={!sidebarOpen} />
                {contentNav.map((item) => (
                  <NavLink key={item.path} item={item} collapsed={!sidebarOpen} />
                ))}
              </>
            )}

            {/* Plan Section */}
            {planNav.length > 0 && (
              <>
                <SectionLabel label="Plan" collapsed={!sidebarOpen} />
                {planNav.map((item) => (
                  <NavLink key={item.path} item={item} collapsed={!sidebarOpen} />
                ))}
              </>
            )}

            {/* Analyze Section */}
            {analyzeNav.length > 0 && (
              <>
                <SectionLabel label="Analyze" collapsed={!sidebarOpen} />
                {analyzeNav.map((item) => (
                  <NavLink key={item.path} item={item} collapsed={!sidebarOpen} />
                ))}
              </>
            )}

          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`${sidebarOpen ? "ml-64" : "ml-20"} transition-all`}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="min-w-0 flex-1">
              <AppBreadcrumbs />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Quick Create Button */}
              <Link
                to="/app/publishing"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                <span>Create Post</span>
              </Link>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-accent text-foreground"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* User Avatar Dropdown */}
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setAvatarOpen((prev) => !prev)}
                  className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold hover:ring-2 hover:ring-secondary/40 transition-all"
                  aria-label="User menu"
                >
                  SC
                </button>

                {avatarOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl border border-border shadow-xl overflow-hidden z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground">Sunrise Coffee Shop</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={() => { setAvatarOpen(false); navigate("/app/profile"); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <User className="w-4 h-4 text-muted-foreground" />
                        Profile
                      </button>
                      <button
                        onClick={() => { setAvatarOpen(false); navigate("/app/settings"); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        Settings
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border py-1">
                      <button
                        onClick={() => { setAvatarOpen(false); setLogoutOpen(true); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen((prev) => !prev)}
                  className="relative p-2 rounded-lg hover:bg-accent text-foreground transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Dropdown Panel */}
                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[380px] max-h-[420px] bg-card rounded-xl border border-border shadow-xl overflow-hidden z-50">
                    {/* Dropdown Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                      <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs font-medium text-secondary hover:text-secondary/80 transition-colors"
                      >
                        Mark all as read
                      </button>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-[260px] overflow-y-auto divide-y divide-border/50">
                      {notifications.map((notif, index) => {
                        const isAlert = notif.title.toLowerCase().includes("missed");
                        return (
                          <div
                            key={index}
                            className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors duration-150 cursor-pointer ${
                              isAlert
                                ? "bg-red-50/60 border-l-2 border-l-red-400"
                                : notif.unread && unreadCount > 0
                                  ? "bg-secondary/[0.04]"
                                  : ""
                            }`}
                          >
                            <div className={`relative mt-0.5 flex-shrink-0 ${isAlert ? "text-red-500" : ""}`}>
                              <div className={`w-2 h-2 rounded-full ${isAlert ? "bg-red-500" : "bg-secondary"}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${isAlert ? "text-red-700" : "text-foreground"}`}>{notif.title}</p>
                              <p className={`text-xs mt-0.5 line-clamp-2 ${isAlert ? "text-red-600/80" : "text-muted-foreground"}`}>{notif.message}</p>
                              <p className={`text-[11px] mt-1 ${isAlert ? "text-red-500/70" : "text-muted-foreground/60"}`}>{notif.time}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dropdown Footer — See All */}
                    <div className="border-t border-border">
                      <Link
                        to="/app/notifications"
                        onClick={closeNotif}
                        className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-secondary hover:bg-muted/50 transition-colors"
                      >
                        See all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {logoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setLogoutOpen(false)} />
          <div className="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground text-center mb-2">Logout</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Are you sure you want to logout? You will need to sign in again to access your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setLogoutOpen(false)}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => (window.location.href = "/login")}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
