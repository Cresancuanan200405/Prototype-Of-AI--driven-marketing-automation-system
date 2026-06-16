import { Upload, Image, Video, Calendar, Send, Save } from "lucide-react";

const drafts = [
  { title: "Weekend Special Promo", platform: "Both", lastEdited: "2 hours ago" },
  { title: "New Product Teaser", platform: "Instagram", lastEdited: "Yesterday" },
  { title: "Customer Appreciation Post", platform: "Facebook", lastEdited: "3 days ago" },
];

export function SocialPublishing() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Media Publishing</h1>
        <p className="text-gray-600">Create and publish content across multiple platforms</p>
      </div>

      {/* Platform Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Platforms</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 border-2 border-[#1e3a8a] bg-[#1e3a8a]/5 rounded-xl">
            <input type="checkbox" checked className="w-5 h-5 text-[#1e3a8a] rounded" readOnly />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e3a8a] to-[#172f71] flex items-center justify-center">
                <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Facebook</h4>
                <p className="text-sm text-gray-600">@yourbusiness</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border-2 border-[#1e3a8a] bg-[#1e3a8a]/5 rounded-xl">
            <input type="checkbox" checked className="w-5 h-5 text-[#1e3a8a] rounded" readOnly />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
                <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Instagram</h4>
                <p className="text-sm text-gray-600">@yourbusiness</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Upload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Media</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#1e3a8a] transition-colors cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-900 font-medium mb-1">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500 mb-4">
            Images, videos, or GIFs up to 50MB
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Image className="w-4 h-4" />
              Images
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Video className="w-4 h-4" />
              Videos
            </button>
          </div>
        </div>
      </div>

      {/* Caption Editor */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Caption</h3>
        <textarea
          rows={6}
          placeholder="Write your caption here... Use AI Generator to create engaging content!"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] mb-3"
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">0 / 2,200 characters</p>
          <button className="text-sm text-[#1e3a8a] hover:text-[#172f71] font-medium">
            Use AI Generator
          </button>
        </div>
      </div>

      {/* Scheduling */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="time"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>
        </div>
        <div className="mt-4 p-3 bg-[#1e3a8a]/5 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            Best time to post: 6:00 PM - 8:00 PM (Peak engagement)
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <button className="py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Save Draft
        </button>
        <button className="py-3 bg-[#1e3a8a] text-white rounded-lg font-medium hover:bg-[#172f71] transition-colors flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          Schedule Post
        </button>
        <button className="py-3 bg-gradient-to-r from-[#1e3a8a] to-[#6b21a8] text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Send className="w-5 h-5" />
          Publish Now
        </button>
      </div>

      {/* Drafts Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Drafts</h3>
        <div className="space-y-3">
          {drafts.map((draft, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h4 className="font-medium text-gray-900">{draft.title}</h4>
                <p className="text-sm text-gray-600">
                  {draft.platform} • Last edited {draft.lastEdited}
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-[#1e3a8a] hover:text-[#172f71]">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

