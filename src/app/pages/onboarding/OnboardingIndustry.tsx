import { Sparkles, Coffee, ShoppingBag, Heart, Cpu, Dumbbell, Hotel, Palette, GraduationCap, Car, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const industries = [
  { id: "food", name: "Food & Beverage", icon: Coffee, color: "from-orange-400 to-red-500" },
  { id: "retail", name: "Retail & E-Commerce", icon: ShoppingBag, color: "from-blue-400 to-cyan-500" },
  { id: "beauty", name: "Beauty & Personal Care", icon: Heart, color: "from-pink-400 to-purple-500" },
  { id: "technology", name: "Technology", icon: Cpu, color: "from-indigo-400 to-blue-500" },
  { id: "fitness", name: "Health & Fitness", icon: Dumbbell, color: "from-green-400 to-emerald-500" },
  { id: "hospitality", name: "Hospitality", icon: Hotel, color: "from-yellow-400 to-orange-500" },
  { id: "creative", name: "Creative Services", icon: Palette, color: "from-purple-400 to-pink-500" },
  { id: "education", name: "Education", icon: GraduationCap, color: "from-teal-400 to-cyan-500" },
  { id: "automotive", name: "Automotive", icon: Car, color: "from-gray-400 to-slate-500" },
  { id: "other", name: "Other", icon: MoreHorizontal, color: "from-slate-400 to-gray-500" },
];

export function OnboardingIndustry() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">What's your industry?</h1>
          <p className="text-lg text-gray-600">
            Help us personalize your AI marketing experience
          </p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-32 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-3">Step 1 of 5</p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <button
                key={industry.id}
                onClick={() => setSelected(industry.id)}
                className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                  selected === industry.id
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${industry.color} mx-auto mb-3 flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900 text-center">{industry.name}</p>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => (window.location.href = "/register")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back
          </button>
          <button
            onClick={() => (window.location.href = "/onboarding/category")}
            disabled={!selected}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              selected
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
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
