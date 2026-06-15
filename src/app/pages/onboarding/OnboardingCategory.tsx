import { Sparkles } from "lucide-react";
import { useState } from "react";

const categories = {
  food: [
    "Coffee Shop",
    "Bakery",
    "Restaurant",
    "Milk Tea Shop",
    "Fast Food",
    "Food Truck",
    "Catering Service",
    "Bar & Lounge",
  ],
  retail: [
    "Clothing Store",
    "Gadget Store",
    "Shoe Store",
    "Furniture Shop",
    "Jewelry Store",
    "Bookstore",
    "Gift Shop",
    "Sports Equipment",
  ],
};

export function OnboardingCategory() {
  const [selected, setSelected] = useState<string | null>(null);
  const currentCategories = categories.food;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Select your business category</h1>
          <p className="text-lg text-gray-600">Choose the category that best describes your business</p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-32 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-32 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-3">Step 2 of 5</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {currentCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                selected === category
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <p className="font-medium text-gray-900 text-center">{category}</p>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => (window.location.href = "/onboarding/industry")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back
          </button>
          <button
            onClick={() => (window.location.href = "/onboarding/profile")}
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
