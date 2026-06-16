import { User, Lock, Bell, Palette, Link2, Code } from "lucide-react";

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account and application preferences</p>
      </div>

      {/* Account Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Account Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity duration-200">
            Save Changes
          </button>
        </div>
      </div>

      {/* Password & Security */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Password & Security</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity duration-200">
            Update Password
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Notification Preferences</h2>
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
                className="w-4 h-4 rounded border-border accent-[var(--color-secondary)]"
              />
              <span className="text-sm text-foreground">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* AI Preferences */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-foreground">AI Preferences</h2>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Content Creativity Level</label>
            <input type="range" min="1" max="10" defaultValue="7" className="w-full accent-[var(--color-secondary)]" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Default Hashtag Count</label>
            <select className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>3-5 hashtags</option>
              <option>5-7 hashtags</option>
              <option>7-10 hashtags</option>
            </select>
          </div>
        </div>
      </div>

      {/* Social Media Integrations */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <Link2 className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Social Media Integrations</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your connected social media accounts from the Profile page
        </p>
        <button
          onClick={() => (window.location.href = "/profile")}
          className="px-6 py-2.5 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors duration-200"
        >
          Go to Profile
        </button>
      </div>

      {/* Theme Customization */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Theme Customization</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 rounded-lg border-2 border-secondary bg-secondary/10">
            <div className="w-full h-20 bg-card border border-border rounded mb-2"></div>
            <p className="text-sm font-medium text-foreground">Light</p>
          </button>
          <button className="p-4 rounded-lg border-2 border-border hover:border-primary/30 transition-colors duration-200">
            <div className="w-full h-20 bg-primary rounded mb-2"></div>
            <p className="text-sm font-medium text-foreground">Dark</p>
          </button>
          <button className="p-4 rounded-lg border-2 border-border hover:border-primary/30 transition-colors duration-200">
            <div className="w-full h-20 bg-muted rounded mb-2"></div>
            <p className="text-sm font-medium text-foreground">Auto</p>
          </button>
        </div>
      </div>

      {/* API Management */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <Code className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-foreground">API Management</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Generate API keys to integrate with third-party tools
        </p>
        <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity duration-200">
          Generate API Key
        </button>
      </div>
    </div>
  );
}