import { BadgeCheck, Check } from "lucide-react";
import { useState } from "react";

const platforms = [
  {
    id: "facebook",
    name: "Facebook",
    color: "from-[#1e3a8a] to-[#172f71]",
    icon: (
      <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "from-pink-500 via-purple-500 to-orange-500",
    icon: (
      <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export function OnboardingSocial() {
  const [connected, setConnected] = useState<Set<string>>(new Set());

  const toggleConnection = (platformId: string) => {
    const newConnected = new Set(connected);
    if (newConnected.has(platformId)) {
      newConnected.delete(platformId);
    } else {
      newConnected.add(platformId);
    }
    setConnected(newConnected);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e3a8a] to-[#6b21a8] rounded-xl flex items-center justify-center">
              <BadgeCheck className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Connect your social accounts</h1>
          <p className="text-lg text-gray-600">Link your platforms to start publishing</p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-32 h-2 bg-[#1e3a8a]/50 rounded-full"></div>
            <div className="w-32 h-2 bg-[#1e3a8a]/50 rounded-full"></div>
            <div className="w-32 h-2 bg-[#1e3a8a]/50 rounded-full"></div>
            <div className="w-32 h-2 bg-[#1e3a8a]/50 rounded-full"></div>
            <div className="w-32 h-2 bg-[#1e3a8a]/50 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-3">Step 5 of 5</p>
        </div>

        {/* Platform Cards */}
        <div className="space-y-4 mb-8">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                    {connected.has(platform.id) ? (
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Connected
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">Not connected</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleConnection(platform.id)}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                    connected.has(platform.id)
                      ? "border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      : "bg-gradient-to-r from-[#1e3a8a] to-[#6b21a8] text-white hover:opacity-90"
                  }`}
                >
                  {connected.has(platform.id) ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Skip Option */}
        <div className="bg-[#1e3a8a]/5 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-900">
            You can connect more platforms later in Settings
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => (window.location.href = "/onboarding/brand")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-8 py-3 bg-gradient-to-r from-[#1e3a8a] to-[#6b21a8] text-white rounded-lg font-medium hover:opacity-90"
          >
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
}

