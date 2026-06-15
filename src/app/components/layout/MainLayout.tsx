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
  Search,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import BrandMark from "./BrandMark";
import { AppBreadcrumbs } from "./AppBreadcrumbs";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", path: "/app", icon: LayoutDashboard },
  { name: "Publish", path: "/app/publishing", icon: Share2 },
  { name: "Campaigns", path: "/app/campaigns", icon: Megaphone },
  { name: "Analytics", path: "/app/analytics", icon: BarChart3 },
  { name: "Notifications", path: "/app/notifications", icon: Bell },
];

const bottomNavigation = [
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

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-background" : "bg-background text-foreground"}`}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-transform ${
          sidebarOpen ? "w-64" : "w-20"
        } ${darkMode ? "bg-card border-border" : "bg-card border-border"} border-r`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center">
                  <BrandMark className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className={`font-semibold text-foreground`}>AI Marketing</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-accent text-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : darkMode
                      ? "text-muted-foreground hover:bg-accent hover:text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-border p-3 space-y-1">
            {bottomNavigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : darkMode
                      ? "text-muted-foreground hover:bg-accent hover:text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => (window.location.href = "/login")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                darkMode
                  ? "text-muted-foreground hover:bg-accent hover:text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} transition-transform`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background">
          <div className="flex flex-col gap-3 px-6 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1 space-y-2">
              <AppBreadcrumbs />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-accent text-foreground"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
