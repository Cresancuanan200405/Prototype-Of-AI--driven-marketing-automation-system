import { Check, Users, Image } from "lucide-react";
import BrandMark from "../../components/layout/BrandMark";
import { useState } from "react";

const platforms = [
  {
    id: "facebook",
    name: "Facebook",
    color: "bg-secondary",
    icon: <Users className="w-6 h-6 icon-on-primary" />,
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "bg-secondary",
    icon: <Image className="w-6 h-6 icon-on-primary" />,
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
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <BrandMark className="icon icon-lg icon-on-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Connect your social accounts</h1>
          <p className="text-lg text-gray-600">Link your platforms to start publishing</p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
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
                  <div className={`w-14 h-14 rounded-xl ${platform.color} flex items-center justify-center`}>
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
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {connected.has(platform.id) ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Skip Option */}
        <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 mb-8">
          <p className="text-sm text-secondary/90">
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
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90"
          >
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
}
