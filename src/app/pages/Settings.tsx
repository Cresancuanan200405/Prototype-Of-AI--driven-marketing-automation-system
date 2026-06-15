import { User, Lock, Bell, Palette, Link2, Code } from "lucide-react";

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Password & Security */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Password & Security</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: "Email notifications for new posts", checked: true },
            { label: "Push notifications for engagement milestones", checked: true },
            { label: "Weekly performance reports", checked: true },
            { label: "Holiday marketing reminders", checked: true },
            { label: "Missed post alerts", checked: false },
          ].map((item, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={item.checked}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* AI Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">AI Preferences</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Creativity Level
            </label>
            <input type="range" min="1" max="10" defaultValue="7" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Hashtag Count
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>3-5 hashtags</option>
              <option>5-7 hashtags</option>
              <option>7-10 hashtags</option>
            </select>
          </div>
        </div>
      </div>

      {/* Social Media Integrations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Link2 className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Social Media Integrations</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Manage your connected social media accounts from the Profile page
        </p>
        <button
          onClick={() => (window.location.href = "/profile")}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Go to Profile
        </button>
      </div>

      {/* Theme Customization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Theme Customization</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50">
            <div className="w-full h-20 bg-white rounded mb-2"></div>
            <p className="text-sm font-medium text-gray-900">Light</p>
          </button>
          <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300">
            <div className="w-full h-20 bg-gray-900 rounded mb-2"></div>
            <p className="text-sm font-medium text-gray-900">Dark</p>
          </button>
          <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300">
            <div className="w-full h-20 bg-gradient-to-br from-gray-900 to-white rounded mb-2"></div>
            <p className="text-sm font-medium text-gray-900">Auto</p>
          </button>
        </div>
      </div>

      {/* API Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">API Management</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Generate API keys to integrate with third-party tools
        </p>
        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Generate API Key
        </button>
      </div>
    </div>
  );
}
