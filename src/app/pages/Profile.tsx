import { Edit, MapPin, Users, Calendar, CheckCircle, Image } from "lucide-react";

export function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Profile</h1>
        <p className="text-gray-600">Manage your business information and branding</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-primary"></div>

        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="flex items-start gap-6 -mt-16 mb-6">
            <div className="w-32 h-32 rounded-xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-gray-700">
              SC
            </div>
            <div className="flex-1 mt-20">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Sunrise Coffee Shop</h2>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                A cozy neighborhood coffee shop serving artisan coffee and fresh pastries. Creating
                memorable moments one cup at a time.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">Food & Beverage</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">Coffee Shop</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Tone</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">Friendly</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Marketing Goal</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">Increase Engagement</div>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Connected Social Accounts</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <Users className="w-6 h-6 icon-on-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">Facebook</h4>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">@sunrisecoffeeshop</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Image className="w-6 h-6 icon-on-primary" />
                  </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">Instagram</h4>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">@sunrisecoffeeshop</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              Manage
            </button>
          </div>
        </div>

        <button className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 transition-colors">
          + Connect Another Account
        </button>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Activity</h3>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">247</p>
            <p className="text-sm text-gray-600">Total Posts</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">45.2K</p>
            <p className="text-sm text-gray-600">Total Reach</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">8.5%</p>
            <p className="text-sm text-gray-600">Avg Engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
