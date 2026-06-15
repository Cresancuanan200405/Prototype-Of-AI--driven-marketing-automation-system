import { Briefcase, Heart, Crown, TrendingUp, Smile } from "lucide-react";
import BrandMark from "../../components/layout/BrandMark";
import { useState } from "react";

const tones = [
  { id: "professional", name: "Professional", icon: Briefcase, description: "Formal and business-focused" },
  { id: "friendly", name: "Friendly", icon: Smile, description: "Warm and approachable" },
  { id: "luxury", name: "Luxury", icon: Crown, description: "Premium and exclusive" },
  { id: "trendy", name: "Trendy", icon: TrendingUp, description: "Modern and cutting-edge" },
  { id: "fun", name: "Fun", icon: Heart, description: "Playful and energetic" },
];

const goals = [
  { id: "sales", name: "Increase Sales", description: "Drive more conversions and revenue" },
  { id: "engagement", name: "Increase Engagement", description: "Boost likes, comments, and shares" },
  { id: "products", name: "Promote Products", description: "Showcase your offerings" },
  { id: "followers", name: "Gain Followers", description: "Grow your audience" },
];

export function OnboardingBrand() {
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <BrandMark className="icon icon-lg icon-on-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Define your brand</h1>
          <p className="text-lg text-gray-600">Help AI understand your brand voice and goals</p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-3">Step 4 of 5</p>
        </div>

        {/* Brand Tone */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Brand Tone</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tones.map((tone) => {
              const Icon = tone.icon;
              return (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`p-5 rounded-xl border-2 transition-all text-left ${
                    selectedTone === tone.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{tone.name}</h3>
                  <p className="text-sm text-gray-600">{tone.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Marketing Goal */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Marketing Goal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`p-5 rounded-xl border-2 transition-all text-left ${
                  selectedGoal === goal.id
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{goal.name}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => (window.location.href = "/onboarding/profile")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back
          </button>
          <button
            onClick={() => (window.location.href = "/onboarding/social")}
            disabled={!selectedTone || !selectedGoal}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              selectedTone && selectedGoal
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
