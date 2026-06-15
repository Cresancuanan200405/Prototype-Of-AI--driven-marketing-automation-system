import { Fragment, useMemo } from "react";
import { Link, useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const routeLabels: Record<string, string> = {
  "/app": "Dashboard",
  "/app/ai-generator": "AI Generator",
  "/app/content-studio": "Drafts",
  "/app/campaigns": "Campaigns",
  "/app/calendar": "Calendar",
  "/app/publishing": "Publish",
  "/app/analytics": "Analytics",
  "/app/notifications": "Notifications",
  "/app/holiday-marketing": "Holiday Marketing",
  "/app/missed-posts": "Missed Post Recovery",
  "/app/profile": "Profile",
  "/app/settings": "Settings",
};

function toLabel(pathname: string) {
  return routeLabels[pathname] ?? pathname
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    ?? "Dashboard";
}

export function AppBreadcrumbs() {
  const { pathname } = useLocation();

  const items = useMemo(() => {
    if (!pathname.startsWith("/app")) {
      return [];
    }

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 1) {
      return [{ path: "/app", label: "Dashboard" }];
    }

    const breadcrumbs = [{ path: "/app", label: "Dashboard" }];

    for (let index = 1; index < segments.length; index += 1) {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      breadcrumbs.push({ path, label: toLabel(path) });
    }

    return breadcrumbs;
  }, [pathname]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}