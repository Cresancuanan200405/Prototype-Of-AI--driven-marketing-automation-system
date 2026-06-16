import { useState } from "react";
import { useSearchParams } from "react-router";
import {
  Edit,
  MapPin,
  Users,
  Calendar,
  CheckCircle,
  Image,
  LogOut,
  User,
  Lock,
  Bell,
  Palette,
  Link2,
  Code,
  AlertTriangle,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Brand Icons                                                        */
/* ------------------------------------------------------------------ */

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Logout Confirmation Modal                                          */
/* ------------------------------------------------------------------ */

function LogoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-sm mx-4 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-foreground text-center mb-2">Logout</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Are you sure you want to logout? You will need to sign in again to access your account.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
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
  );
}

/* ------------------------------------------------------------------ */
/*  Profile Tab                                                        */
/* ------------------------------------------------------------------ */

function ProfileTab() {
  return (
    <div className="space-y-6">
      {/* Business Details */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-5">Business Details</h3>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Industry</label>
            <div className="px-4 py-3 bg-muted rounded-lg text-sm text-foreground">Food & Beverage</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Category</label>
            <div className="px-4 py-3 bg-muted rounded-lg text-sm text-foreground">Coffee Shop</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Brand Tone</label>
            <div className="px-4 py-3 bg-muted rounded-lg text-sm text-foreground">Friendly</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Marketing Goal</label>
            <div className="px-4 py-3 bg-muted rounded-lg text-sm text-foreground">Increase Engagement</div>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-5">Connected Social Accounts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-border rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#1877F2] text-white flex items-center justify-center">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-foreground">Facebook</h4>
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">@sunrisecoffeeshop</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#E4405F] text-white flex items-center justify-center">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-foreground">Instagram</h4>
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">@sunrisecoffeeshop</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Manage
            </button>
          </div>
        </div>

        <button className="mt-4 w-full py-3 border-2 border-dashed border-border text-muted-foreground rounded-xl font-medium hover:border-secondary hover:text-secondary transition-colors duration-200">
          + Connect Another Account
        </button>
      </div>

      {/* Statistics */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-5">Your Activity</h3>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground tracking-tight mb-1">247</p>
            <p className="text-xs text-muted-foreground">Total Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground tracking-tight mb-1">45.2K</p>
            <p className="text-xs text-muted-foreground">Total Reach</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground tracking-tight mb-1">8.5%</p>
            <p className="text-xs text-muted-foreground">Avg Engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings Tab                                                       */
/* ------------------------------------------------------------------ */

function SettingsTab() {
  return (
    <div className="space-y-6">
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

      {/* Danger Zone */}
      <div className="bg-card rounded-xl border-2 border-red-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-red-700">Danger Zone</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-6 py-2.5 border-2 border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200">
          Delete Account
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Profile Component                                             */
/* ------------------------------------------------------------------ */

export function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "settings" ? "settings" : "profile";
  const [logoutOpen, setLogoutOpen] = useState(false);

  const setTab = (tab: string) => {
    if (tab === "settings") {
      setSearchParams({ tab: "settings" });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-primary"></div>

        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="flex items-start gap-6 -mt-16 mb-6">
            <div className="w-32 h-32 rounded-xl bg-card border-4 border-card shadow-lg flex items-center justify-center text-4xl font-bold text-foreground">
              SC
            </div>
            <div className="flex-1 mt-20">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-foreground tracking-tight">Sunrise Coffee Shop</h2>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors duration-200 flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setLogoutOpen(true)}
                    className="px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                A cozy neighborhood coffee shop serving artisan coffee and fresh pastries. Creating
                memorable moments one cup at a time.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Young professionals, college students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined May 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-0">
          <button
            onClick={() => setTab("profile")}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "profile"
                ? "border-secondary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setTab("settings")}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "settings"
                ? "border-secondary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" ? <ProfileTab /> : <SettingsTab />}

      {/* Logout Modal */}
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </div>
  );
}