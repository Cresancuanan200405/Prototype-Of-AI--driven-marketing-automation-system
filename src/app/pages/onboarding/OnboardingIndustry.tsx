import { Coffee, ShoppingBag, Heart, Cpu, Dumbbell, Hotel, Palette, GraduationCap, Car, MoreHorizontal } from "lucide-react";
import BrandMark from "../../components/layout/BrandMark";
import { useState } from "react";

const industries = [
  { id: "food", name: "Food & Beverage", icon: Coffee },
  { id: "retail", name: "Retail & E-Commerce", icon: ShoppingBag },
  { id: "beauty", name: "Beauty & Personal Care", icon: Heart },
  { id: "technology", name: "Technology", icon: Cpu },
  { id: "fitness", name: "Health & Fitness", icon: Dumbbell },
  { id: "hospitality", name: "Hospitality", icon: Hotel },
  { id: "creative", name: "Creative Services", icon: Palette },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "automotive", name: "Automotive", icon: Car },
  { id: "other", name: "Other", icon: MoreHorizontal },
];

export function OnboardingIndustry() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <BrandMark className="icon icon-lg icon-on-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">What's your industry?</h1>
          <p className="text-lg text-gray-600">
            Help us personalize your AI marketing experience
          </p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-32 h-2 bg-secondary rounded-full"></div>
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
                    ? "border-secondary bg-secondary/10 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary mx-auto mb-3 flex items-center justify-center">
                  <Icon className="w-6 h-6 icon-on-primary" />
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
