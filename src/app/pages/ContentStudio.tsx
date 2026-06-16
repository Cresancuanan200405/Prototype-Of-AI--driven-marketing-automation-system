import { useState } from "react";
import {
  FileText,
  Clock,
  Star,
  Folder,
  Sparkles,
  Send,
  Trash2,
  Search,
} from "lucide-react";
import { Link } from "react-router";

const contentItems = [
  { icon: FileText, title: "All Content", count: 156, link: "#" },
  { icon: Clock, title: "Drafts", count: 12, link: "/app/publishing" },
  { icon: Star, title: "Published", count: 98, link: "/app/analytics" },
  { icon: Folder, title: "Templates", count: 46, link: "#" },
];

const allContent = [
  { title: "Summer Sale Announcement", type: "Published", platform: "Facebook", date: "May 10, 2026" },
  { title: "Weekend Special Promo", type: "Draft", platform: "Both", date: "May 9, 2026" },
  { title: "New Product Teaser", type: "Draft", platform: "Instagram", date: "May 8, 2026" },
  { title: "Customer Appreciation Post", type: "Published", platform: "Facebook", date: "May 7, 2026" },
  { title: "Product Showcase Video", type: "Draft", platform: "Instagram", date: "May 6, 2026" },
  { title: "Holiday Campaign", type: "Template", platform: "Both", date: "May 5, 2026" },
  { title: "Behind the Scenes", type: "Published", platform: "Instagram", date: "May 4, 2026" },
  { title: "Customer Spotlight", type: "Draft", platform: "Facebook", date: "May 3, 2026" },
];

export function ContentStudio() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredContent = allContent.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.platform.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      item.type.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const statuses = ["All", "Published", "Draft", "Template"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Content Studio
          </h1>
          <p className="text-gray-600">
            Manage all your content assets in one place
          </p>
        </div>
        <Link
          to="/app/publishing"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Create New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {contentItems.map((item, index) => {
          const Icon = item.icon;
          const CardContent = (
            <div className="bg-card rounded-xl shadow-sm border-border p-6 hover:border-primary/30 transition-colors h-full">
              <div className="w-10 h-10 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {item.count}
              </h3>
              <p className="text-sm text-muted-foreground">{item.title}</p>
            </div>
          );

          return item.link ? (
            <Link key={index} to={item.link} className="block">
              {CardContent}
            </Link>
          ) : (
            <div key={index}>{CardContent}</div>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or platform..."
            className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-card rounded-xl shadow-sm border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : statusFilter !== "All"
              ? `${statusFilter} Content`
              : "All Content"}
          </h3>
        </div>
        <div className="overflow-x-auto">
          {filteredContent.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">
                No content found
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Title
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Platform
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Date
                  </th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredContent.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/30 hover:bg-accent/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            item.type === "Published"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.type === "Draft"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.type === "Published" ? (
                            <Star className="w-4 h-4" />
                          ) : item.type === "Draft" ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <Folder className="w-4 h-4" />
                          )}
                        </div>
                        <span className="font-medium text-foreground text-sm">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.type === "Published"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.type === "Draft"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {item.platform}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Edit content"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-red-600 transition-colors"
                          aria-label="Delete content"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/app/ai-generator"
          className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Generate AI Content
            </h3>
            <p className="text-sm text-muted-foreground">
              Create fresh content with AI
            </p>
          </div>
        </Link>
        <Link
          to="/app/publishing"
          className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Publish & Schedule
            </h3>
            <p className="text-sm text-muted-foreground">
              Go to publishing workflow
            </p>
          </div>
        </Link>
        <Link
          to="/app/calendar"
          className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Content Calendar</h3>
            <p className="text-sm text-muted-foreground">
              View scheduled posts
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}