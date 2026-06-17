import {
  Edit,
  MapPin,
  Users,
  Calendar,
  CheckCircle,
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
/*  Profile Content                                                    */
/* ------------------------------------------------------------------ */

export function Profile() {
  return (
    <div className="space-y-6">
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