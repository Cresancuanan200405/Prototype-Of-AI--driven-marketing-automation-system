import { Upload } from "lucide-react";
import BrandMark from "../../components/layout/BrandMark";

export function OnboardingProfile() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <BrandMark className="icon icon-lg icon-on-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Tell us about your business</h1>
          <p className="text-lg text-gray-600">This helps us create better content for you</p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-3">Step 3 of 5</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              placeholder="e.g., Sunrise Coffee Shop"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Description
            </label>
            <textarea
              rows={4}
              placeholder="Tell us what makes your business unique..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              placeholder="e.g., New York, NY"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <input
              type="text"
              placeholder="e.g., Young professionals, college students"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => (window.location.href = "/onboarding/category")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back
          </button>
          <button
            onClick={() => (window.location.href = "/onboarding/brand")}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
