import { useMemo, useState } from "react";
import { Calendar, Image, Save, Send, Upload, Users, Video } from "lucide-react";

const drafts = [
  { title: "Weekend Special Promo", platform: "Both", lastEdited: "2 hours ago" },
  { title: "New Product Teaser", platform: "Instagram", lastEdited: "Yesterday" },
  { title: "Customer Appreciation Post", platform: "Facebook", lastEdited: "3 days ago" },
];

export function SocialPublishing() {
  const [caption, setCaption] = useState("");
  const [product, setProduct] = useState("Your Business post");
  const [tone, setTone] = useState("Friendly");
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: true,
    instagram: true,
  });

  const suggestedHashtags = useMemo(
    () => ["#SmallBusiness", "#BrandGrowth", "#MarketingIdeas", "#AIContent"],
    [],
  );

  const generateCaption = () => {
    const generated = `${product} with a ${tone.toLowerCase()} tone. Here is a polished caption.`;
    setCaption(generated);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Social Media Publishing</h1>
        <p className="max-w-2xl text-gray-600">A minimal workflow for generating content, scheduling it, and publishing it.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Create Post</h3>

            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setSelectedPlatforms((p) => ({ ...p, facebook: !p.facebook }))
                }
                className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                  selectedPlatforms.facebook
                    ? "bg-blue-50/60 border-blue-300"
                    : "bg-secondary/10 border-secondary"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedPlatforms.facebook}
                  readOnly
                  className={`h-5 w-5 rounded pointer-events-none ${
                  selectedPlatforms.facebook ? "text-blue-600" : "text-gray-500"
                  }`}
                />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Users className="h-5 w-5 icon-on-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Facebook</h4>
                    <p className="text-sm text-gray-600">@yourbusiness</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedPlatforms((p) => ({ ...p, instagram: !p.instagram }))
                }
                className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                  selectedPlatforms.instagram
                    ? "bg-blue-50/60 border-blue-300"
                    : "bg-secondary/10 border-secondary"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedPlatforms.instagram}
                  readOnly
                  className={`h-5 w-5 rounded pointer-events-none ${
                    selectedPlatforms.instagram ? "text-blue-600" : "text-gray-500"
                  }`}
                />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Image className="h-5 w-5 icon-on-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Instagram</h4>
                    <p className="text-sm text-gray-600">@yourbusiness</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="mb-5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition-colors hover:border-blue-500">
              <Upload className="mx-auto mb-3 h-10 w-10 text-blue-500" />
              <p className="font-medium text-gray-900">Upload media</p>
              <p className="text-sm text-gray-500">Images, videos, or GIFs up to 50MB</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Image className="h-4 w-4" />
                  Images
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Video className="h-4 w-4" />
                  Videos
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-gray-900">Caption</h3>
                <button type="button" onClick={generateCaption} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                  Generate Caption
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Product or context</label>
                  <input
                    value={product}
                    onChange={(event) => setProduct(event.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Coffee promotion, new service, event, etc."
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Brand tone</label>
                  <input
                    value={tone}
                    onChange={(event) => setTone(event.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Friendly"
                  />
                </div>
              </div>
              <textarea
                rows={5}
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                placeholder="Write or generate your caption..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center justify-between text-sm">
                <p className="text-gray-500">0 / 2,200 characters</p>
                <p className="text-blue-600">Editable before publishing</p>
              </div>
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-900">Suggested Hashtags</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestedHashtags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1 text-sm text-blue-700 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <button type="button" className="mt-4 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50">
                  Copy Caption + Hashtags
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Time</label>
                  <input type="time" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <p className="rounded-lg border border-secondary/20 bg-secondary/10 p-3 text-sm text-secondary/90">
                Best time to post: 6:00 PM - 8:00 PM (Peak engagement)
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50">
                <Save className="h-5 w-5" />
                Save Draft
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground hover:opacity-90">
                <Calendar className="h-5 w-5" />
                Schedule
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground hover:opacity-90">
                <Send className="h-5 w-5" />
                Publish
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Preview</h3>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="flex items-center gap-3 border-b border-gray-200 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">B</div>
                <div>
                  <p className="font-semibold text-gray-900">Your Business</p>
                  <p className="text-sm text-gray-500">Brand preview</p>
                </div>
              </div>
              <div className="flex min-h-[260px] items-center justify-center bg-secondary/10 p-6 text-center">
                <div className="space-y-3 text-secondary">
                  <Upload className="mx-auto h-12 w-12" />
                  <p className="font-semibold">AI Image Preview</p>
                  <p className="text-sm text-secondary/80">Upload a reference image above and generate a matching AI image.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Drafts</h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">3</span>
            </div>
            <div className="space-y-3">
              {drafts.map((draft, index) => (
                <div key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h4 className="font-medium text-gray-900">{draft.title}</h4>
                  <p className="text-sm text-gray-600">
                    {draft.platform} • Last edited {draft.lastEdited}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}