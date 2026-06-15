import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Megaphone,
  Calendar,
  Share2,
  BarChart3,
  Bell,
  Gift,
  AlertCircle,
  User,
  Settings,
  LogOut,
  Search,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", path: "/app", icon: LayoutDashboard },
  { name: "AI Generator", path: "/app/ai-generator", icon: Sparkles },
  { name: "Content Studio", path: "/app/content-studio", icon: FileText },
  { name: "Campaigns", path: "/app/campaigns", icon: Megaphone },
  { name: "Calendar Scheduler", path: "/app/calendar", icon: Calendar },
  { name: "Social Media Publishing", path: "/app/publishing", icon: Share2 },
  { name: "Analytics", path: "/app/analytics", icon: BarChart3 },
  { name: "Holiday Marketing", path: "/app/holiday-marketing", icon: Gift },
  { name: "Missed Post Recovery", path: "/app/missed-posts", icon: AlertCircle },
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
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-950" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-transform ${
          sidebarOpen ? "w-64" : "w-20"
        } ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border-r`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  AI Marketing
                </span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
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
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : darkMode
                      ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-3 space-y-1">
            {bottomNavigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : darkMode
                      ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              );
            })}
            <button
              onClick={() => (window.location.href = "/login")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                darkMode
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} transition-all`}>
        {/* Top Navbar */}
        <header
          className={`sticky top-0 z-30 h-16 border-b ${
            darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex h-full items-center justify-between px-6">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-800 text-yellow-500" : "bg-gray-100 text-gray-600"
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <Link
                to="/app/notifications"
                className={`relative p-2 rounded-lg ${
                  darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={`p-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
