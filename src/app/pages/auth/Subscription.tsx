import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, Check, Zap, Building2, Rocket } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    tagline: "Perfect for solopreneurs & small businesses",
    monthlyPrice: 29,
    annualPrice: 23,
    color: "from-blue-500 to-blue-600",
    highlight: false,
    features: [
      "3 social media accounts",
      "50 AI-generated posts/month",
      "Basic analytics dashboard",
      "Content calendar",
      "Holiday marketing suggestions",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    icon: Rocket,
    tagline: "Best for growing teams & agencies",
    monthlyPrice: 79,
    annualPrice: 63,
    color: "from-blue-500 to-purple-600",
    highlight: true,
    features: [
      "15 social media accounts",
      "Unlimited AI-generated content",
      "Advanced analytics & reporting",
      "Full calendar scheduling",
      "Campaign manager",
      "Missed post recovery",
      "Custom brand voice training",
      "Priority chat support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    tagline: "For large brands & enterprises",
    monthlyPrice: 199,
    annualPrice: 159,
    color: "from-purple-600 to-purple-700",
    highlight: false,
    features: [
      "Unlimited social media accounts",
      "Unlimited AI content + custom models",
      "White-label reporting",
      "Dedicated account manager",
      "API access & webhooks",
      "SSO & team permissions",
      "Onboarding & training sessions",
      "SLA uptime guarantee",
    ],
  },
];

export function Subscription() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);
  const [selected, setSelected] = useState("growth");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-2">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">AI Marketing</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Start free for 14 days. No credit card required. Upgrade or cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 bg-gray-100 rounded-xl p-1 mt-6">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                !annual
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                annual
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Annual
              <span className="ml-2 text-xs font-semibold text-green-600">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selected === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`relative rounded-2xl border-2 cursor-pointer transition-all ${
                  plan.highlight
                    ? isSelected
                      ? "border-blue-500 shadow-xl shadow-blue-100 scale-105"
                      : "border-blue-300 shadow-lg scale-105"
                    : isSelected
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 shadow-sm"
                } bg-white`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}

                <div className="p-7">
                  {/* Icon + name */}
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-5">{plan.tagline}</p>

                  {/* Price */}
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-gray-400 font-medium text-lg">$</span>
                    <span className="text-5xl font-bold text-gray-900 leading-none">
                      {annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-400 text-sm mb-1">/mo</span>
                  </div>
                  {annual && (
                    <p className="text-green-600 text-xs font-semibold mb-5">
                      Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                    </p>
                  )}
                  {!annual && <div className="mb-5" />}

                  {/* Divider */}
                  <div className="border-t border-gray-100 mb-5" />

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-600">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={() => navigate("/onboarding/industry")}
            className="px-10 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-blue-200"
          >
            Get started with{" "}
            {plans.find((p) => p.id === selected)?.name} —{" "}
            {annual
              ? `$${plans.find((p) => p.id === selected)?.annualPrice}/mo`
              : `$${plans.find((p) => p.id === selected)?.monthlyPrice}/mo`}
          </button>
          <p className="text-sm text-gray-400">
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
