import { Link } from "react-router";
import BrandMark from "../../components/layout/BrandMark";

export function Register() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
              <BrandMark className="icon icon-md icon-on-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">AI Marketing</span>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
            <p className="mt-2 text-gray-600">Start automating your marketing today</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm text-gray-600">Account</span>
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm text-gray-400">Setup</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={() => (window.location.href = "/onboarding/industry")}
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Create account
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex items-center justify-center bg-primary p-12">
        <div className="max-w-lg text-primary-foreground space-y-6">
          <BrandMark className="icon icon-lg icon-on-primary" />
          <h2 className="text-4xl font-bold">Join thousands of businesses</h2>
          <p className="text-lg text-primary-foreground/90">
            Save time and grow faster with AI-powered marketing automation. No technical skills
            required.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-blue-100">Posts Generated</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-blue-100">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm text-blue-100">Time Saved</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold">4.9★</div>
              <div className="text-sm text-blue-100">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
