import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Megaphone,
  Share2,
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
  Target,
  Library,
  PartyPopper,
  Plus,
} from "lucide-react";
import BrandMark from "./BrandMark";
import { AppBreadcrumbs } from "./AppBreadcrumbs";
import { useState } from "react";

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const mainNav: NavItem[] = [
  { name: "Dashboard", path: "/app", icon: LayoutDashboard },
];

const createNav: NavItem[] = [
  { name: "AI Generator", path: "/app/ai-generator", icon: Sparkles },
  { name: "Publishing", path: "/app/publishing", icon: Share2 },
  { name: "Content Studio", path: "/app/content-studio", icon: Library },
];

const planNav: NavItem[] = [
  { name: "Calendar", path: "/app/calendar", icon: Calendar },
  { name: "Campaigns", path: "/app/campaigns", icon: Megaphone },
  { name: "Holiday Marketing", path: "/app/holiday-marketing", icon: PartyPopper },
];

const analyzeNav: NavItem[] = [
  { name: "Analytics", path: "/app/analytics", icon: BarChart3 },
  { name: "Notifications", path: "/app/notifications", icon: Bell },
];

const bottomNav: NavItem[] = [
  { name: "Profile", path: "/app/profile", icon: User },
  { name: "Settings", path: "/app/settings", icon: Settings },
];

export function MainLayout() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

          {/* Quick Create (collapsed only) */}
          {!sidebarOpen && (
            <div className="px-3 py-3">
              <Link
                to="/app/publishing"
                className="flex items-center justify-center w-full h-10 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground hover:opacity-90 transition-opacity"
                aria-label="Quick create post"
              >
                <Plus className="w-5 h-5" />
              </Link>
            </div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
            {/* Dashboard */}
            {mainNav.map((item) => (
              <NavLink key={item.path} item={item} collapsed={!sidebarOpen} />
            ))}

            {/* Create Section */}
            {createNav.length > 0 && (
              <>
                <SectionLabel label="Create" collapsed={!sidebarOpen} />
                {createNav.map((item) => (
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

            {/* Missed Opportunities — Gold accent */}
            <div className="pt-3 pb-1">
              <div className="border-t border-sidebar-border/50" />
            </div>
            <Link
              to="/app/missed-posts"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive("/app/missed-posts")
                  ? "bg-sidebar-primary/20 text-sidebar-primary"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <div className="relative flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              {sidebarOpen && (
                <>
                  <span className="text-sm font-medium truncate">
                    Missed Opportunities
                  </span>
                  <span className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    3
                  </span>
                </>
              )}
              {!sidebarOpen && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-sidebar-primary rounded-full" />
              )}
            </Link>
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-sidebar-border p-3 space-y-1">
            {bottomNav.map((item) => (
              <NavLink key={item.path} item={item} collapsed={!sidebarOpen} />
            ))}
            <button
              onClick={() => (window.location.href = "/login")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
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

              {/* Notifications */}
              <Link
                to="/app/notifications"
                className="relative p-2 rounded-lg hover:bg-accent text-foreground"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}