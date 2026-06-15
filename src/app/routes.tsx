import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layout/MainLayout";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Subscription } from "./pages/auth/Subscription";
import { OnboardingIndustry } from "./pages/onboarding/OnboardingIndustry";
import { OnboardingCategory } from "./pages/onboarding/OnboardingCategory";
import { OnboardingProfile } from "./pages/onboarding/OnboardingProfile";
import { OnboardingBrand } from "./pages/onboarding/OnboardingBrand";
import { OnboardingSocial } from "./pages/onboarding/OnboardingSocial";
import { Dashboard } from "./pages/Dashboard";
import { AIGenerator } from "./pages/AIGenerator";
import { ContentStudio } from "./pages/ContentStudio";
import { Campaigns } from "./pages/Campaigns";
import { CalendarScheduler } from "./pages/CalendarScheduler";
import { SocialPublishing } from "./pages/SocialPublishing";
import { Analytics } from "./pages/Analytics";
import { Notifications } from "./pages/Notifications";
import { HolidayMarketing } from "./pages/HolidayMarketing";
import { MissedPostRecovery } from "./pages/MissedPostRecovery";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/subscribe",
    Component: Subscription,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/onboarding",
    children: [
      { path: "industry", Component: OnboardingIndustry },
      { path: "category", Component: OnboardingCategory },
      { path: "profile", Component: OnboardingProfile },
      { path: "brand", Component: OnboardingBrand },
      { path: "social", Component: OnboardingSocial },
    ],
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "ai-generator", Component: AIGenerator },
      { path: "content-studio", Component: ContentStudio },
      { path: "campaigns", Component: Campaigns },
      { path: "calendar", Component: CalendarScheduler },
      { path: "publishing", Component: SocialPublishing },
      { path: "analytics", Component: Analytics },
      { path: "notifications", Component: Notifications },
      { path: "holiday-marketing", Component: HolidayMarketing },
      { path: "missed-posts", Component: MissedPostRecovery },
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
    ],
  },
]);
