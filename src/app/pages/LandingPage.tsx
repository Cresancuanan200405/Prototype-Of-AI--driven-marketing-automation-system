import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Sparkles,
  Check,
  Zap,
  Rocket,
  Building2,
  BarChart3,
  Calendar,
  Share2,
  Brain,
  Target,
  Gift,
  ArrowRight,
  CheckCircle2,
  Star,
  Menu,
  X,
} from "lucide-react";

const features = [
  { icon: Brain, title: "AI Content Generation", description: "Generate captions, posts, and campaigns in seconds tailored to your brand voice." },
  { icon: Calendar, title: "Smart Scheduling", description: "Schedule content at peak engagement times across all your platforms automatically." },
  { icon: BarChart3, title: "Performance Analytics", description: "Track reach, engagement, and growth with easy-to-read reports and insights." },
  { icon: Share2, title: "Multi-Platform Publishing", description: "Publish to Facebook, Instagram, Twitter, LinkedIn, and TikTok from one place." },
  { icon: Target, title: "Campaign Manager", description: "Plan and track full marketing campaigns with A/B testing built in." },
  { icon: Gift, title: "Holiday Marketing", description: "Never miss a seasonal opportunity with automated holiday campaign suggestions." },
];

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    tagline: "For solopreneurs & small businesses",
    monthlyPrice: 29,
    annualPrice: 23,
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
    tagline: "For growing teams & agencies",
    monthlyPrice: 79,
    annualPrice: 63,
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

const testimonials = [
  {
    name: "Maria Santos",
    role: "Owner, Kape ni Maria",
    initials: "MS",
    quote: "Our Facebook engagement tripled in just 2 months. The AI writes better captions than I ever could!",
    rating: 5,
  },
  {
    name: "Carlo Reyes",
    role: "Founder, GrowthPH Agency",
    initials: "CR",
    quote: "Managing 20+ client accounts from one dashboard saves us hours every week. Game changer for our agency.",
    rating: 5,
  },
  {
    name: "Ana Villanueva",
    role: "Marketing Head, NovaBrand PH",
    initials: "AV",
    quote: "The holiday marketing calendar alone is worth the subscription. We haven't missed a campaign since.",
    rating: 5,
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AI Marketing</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Testimonials"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm font-semibold px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Get started free
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-4 space-y-3 bg-white">
            {["Features", "Pricing", "Testimonials"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-sm font-medium text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <button
                onClick={() => navigate("/login")}
                className="w-full text-sm font-medium text-gray-700 py-2 text-left"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full text-sm font-semibold py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
              >
                Get started free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by GPT-4</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            AI-Powered Marketing
            <br />
            for Filipino SMEs
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Automate your social media marketing with AI. Create engaging content,
            schedule posts, and grow your business effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start free 14-day trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-8 py-3.5 border-2 border-white/40 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
            >
              Sign in
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-5">
            No credit card required · Cancel anytime · Setup in 2 minutes
          </p>

          {/* Feature bullets */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {["AI-generated content and captions", "Smart scheduling and analytics", "Multi-platform publishing"].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm text-blue-100">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything you need to grow</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              One platform to create, schedule, publish, and analyze all your social media marketing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple, transparent pricing</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-8">
              Start free for 14 days. No credit card required. Upgrade or cancel anytime.
            </p>
            {/* Billing toggle */}
            <div className="inline-flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  !annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Annual
                <span className="ml-2 text-xs font-semibold text-green-600">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 transition-all bg-white ${
                    plan.highlight
                      ? "border-blue-500 shadow-xl shadow-blue-100 scale-105"
                      : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-7">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mb-5">{plan.tagline}</p>

                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-gray-400 text-lg font-medium">$</span>
                      <span className="text-5xl font-bold text-gray-900 leading-none">
                        {annual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-400 text-sm mb-1">/mo</span>
                    </div>
                    {annual ? (
                      <p className="text-green-600 text-xs font-semibold mb-5">
                        Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                      </p>
                    ) : (
                      <div className="mb-5" />
                    )}

                    <button
                      onClick={() => navigate("/register")}
                      className={`w-full py-3 rounded-xl text-sm font-semibold mb-6 transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 shadow-md"
                          : "border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      {plan.id === "enterprise" ? "Contact Sales" : "Start free trial"}
                    </button>

                    <div className="border-t border-gray-100 mb-5" />

                    <ul className="space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-blue-500" : "text-gray-400"}`} />
                          <span className="text-sm text-gray-600">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Loved by Filipino businesses</h2>
            <p className="text-gray-500">Thousands of SMEs trust us to grow their online presence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, initials, quote, rating }) => (
              <div key={name} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {initials}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{name}</div>
                    <div className="text-gray-500 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <Sparkles className="w-10 h-10 mx-auto mb-5 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to grow your negosyo?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Join thousands of Filipino SMEs using AI Marketing to publish smarter and grow faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start free trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3.5 border-2 border-white/40 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
            >
              Sign in
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-5">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">AI Marketing</span>
          </div>
          <p className="text-gray-400 text-sm">© 2026 AI Marketing · Privacy · Terms</p>
          <div className="flex gap-6">
            {["Features", "Pricing", "Testimonials"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
