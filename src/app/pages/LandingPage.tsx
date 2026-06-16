import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  Menu,
  Megaphone,
  Target,
  TrendingUp,
  Users,
  X,
  Share2,
} from "lucide-react";

const features = [
  { icon: Megaphone, title: "Content Generation", description: "Create captions, campaign ideas, and post-ready copy in one workspace." },
  { icon: Calendar, title: "Smart Scheduling", description: "Plan content across your calendar and keep the posting flow organized." },
  { icon: Share2, title: "Multi-Platform Publishing", description: "Send approved content to Facebook and Instagram from a single dashboard." },
  { icon: BarChart3, title: "Cross-Platform Analytics", description: "Compare platform performance and measure what content drives results." },
  { icon: Target, title: "Campaign Planning", description: "Organize campaigns by business goals, promotions, and seasonal moments." },
  { icon: TrendingUp, title: "Optimization Engine", description: "Use insights to refine posting time, content type, and strategy." },
];

const workflowSteps = [
  { step: "01", title: "Set up your business", description: "Register, onboard, and define your brand profile." },
  { step: "02", title: "Create and schedule", description: "Generate content and place it on the publishing calendar." },
  { step: "03", title: "Publish and optimize", description: "Review analytics, adjust strategy, and keep improving." },
];

const testimonials = [
  {
    name: "Maria Santos",
    role: "Owner, Kape ni Maria",
    initials: "MS",
    quote: "AdMatrix keeps our posting process organized and makes it easier to stay consistent.",
  },
  {
    name: "Carlo Reyes",
    role: "Founder, GrowthPH Agency",
    initials: "CR",
    quote: "We can manage content, publishing, and reports from one clean workspace.",
  },
  {
    name: "Ana Villanueva",
    role: "Marketing Head, NovaBrand PH",
    initials: "AV",
    quote: "The dashboard is simple to understand and the analytics are easy to compare.",
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-[#1e3a8a]/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e3a8a] text-sm font-bold text-white">
              AM
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900">AdMatrix</span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {["Features", "Workflow", "Testimonials"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-[#1e3a8a]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-[#1e3a8a]"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="rounded-xl bg-[#1e3a8a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#172f71]"
            >
              Get started
            </button>
          </div>

          <button className="p-2 text-slate-600 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
            <div className="space-y-3">
              {["Features", "Workflow", "Testimonials"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-sm font-medium text-slate-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="border-t border-slate-100 pt-3 space-y-2">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full rounded-xl bg-[#1e3a8a] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="bg-gradient-to-br from-[#1e3a8a] via-[#6b21a8] to-[#0f766e] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
              Marketing automation for SMEs
            </p>
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Grow your brand with a clear, organized marketing workspace
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/80">
              AdMatrix helps businesses plan content, schedule posts, publish across platforms, and review analytics from a single system.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-[#1e3a8a] transition-colors hover:bg-[#f8fafc]"
              >
                Get started free
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="rounded-xl border border-white/30 px-8 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
              >
                Sign in
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {["Content planning", "Cross-platform publishing", "Analytics and optimization"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1e3a8a]/60">AdMatrix Overview</p>
              <h2 className="mt-2 text-2xl font-bold">A clean workflow from setup to reporting</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Build your profile, create content, publish on schedule, and compare performance without switching tools.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {workflowSteps.map((step) => (
                <div key={step.step} className="rounded-2xl bg-white/15 p-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{step.step}</p>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-white/75">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Everything you need in one workspace</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              AdMatrix focuses on content operations, platform publishing, analytics, and brand consistency.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-[#1e3a8a]/10 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e3a8a]/10 text-[#1e3a8a]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {workflowSteps.map((step) => (
              <div key={step.step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-full bg-[#d4af37]/15 px-3 py-1 text-xs font-semibold text-[#1e3a8a]">
                  {step.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Trusted by growing businesses</h2>
            <p className="mt-3 text-slate-500">Simple tools, clear analytics, and a smoother workflow for every team.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm leading-relaxed text-slate-600">"{item.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] text-sm font-bold text-white">
                    {item.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#6b21a8] px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Ready to organize your marketing workflow?</h2>
          <p className="mt-4 text-white/80">Create your account and start planning content, publishing posts, and tracking results in AdMatrix.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/register")}
              className="rounded-xl bg-white px-8 py-3.5 font-semibold text-[#1e3a8a] transition-colors hover:bg-[#f8fafc]"
            >
              Create account
            </button>
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl border border-white/30 px-8 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
            >
              Sign in
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e3a8a] text-xs font-bold text-white">AM</div>
            <span className="font-bold text-slate-900">AdMatrix</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 AdMatrix</p>
          <div className="flex gap-6">
            {["Features", "Workflow", "Testimonials"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-slate-500 transition-colors hover:text-[#1e3a8a]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
