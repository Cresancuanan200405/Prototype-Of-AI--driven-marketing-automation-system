import { FileText, Folder, Clock, Star } from "lucide-react";

export function ContentStudio() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Studio</h1>
          <p className="text-gray-600">Manage all your content in one place</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90">
          Create New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: FileText, title: "All Content", count: 156, color: "blue" },
          { icon: Clock, title: "Drafts", count: 12, color: "yellow" },
          { icon: Star, title: "Published", count: 98, color: "green" },
          { icon: Folder, title: "Templates", count: 46, color: "purple" },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <Icon className={`w-8 h-8 text-${item.color}-600 mb-3`} />
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.count}</h3>
              <p className="text-sm text-gray-600">{item.title}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Library Coming Soon</h3>
        <p className="text-gray-600">
          Organize and manage all your content assets in one centralized location
        </p>
      </div>
    </div>
  );
}
