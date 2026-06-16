import { useMemo, useState, useRef, useCallback } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Image,
  Save,
  Send,
  Upload,
  Users,
  Video,
  X,
  Check,
  Copy,
  Clock,
  Loader2,
  Trash2,
  BrainCircuit,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface Draft {
  id: string;
  title: string;
  platform: "Facebook" | "Instagram" | "Both";
  lastEdited: string;
  caption?: string;
  product?: string;
  tone?: string;
  date?: string;
  time?: string;
  platforms?: { facebook: boolean; instagram: boolean };
}

interface UploadedMedia {
  name: string;
  url: string;
  type: "image" | "video";
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const PLATFORM_TIPS: Record<string, string> = {
  facebook: "Best time to post: 6:00 PM – 8:00 PM (Peak engagement)",
  instagram: "Best time to post: 7:00 PM – 9:00 PM (Peak engagement)",
  both: "Best time to post: 6:00 PM – 9:00 PM (High cross-platform reach)",
};

function generateHashtags(caption: string): string[] {
  if (!caption.trim()) return [];
  const words = caption.toLowerCase().split(/\s+/);
  const tagCandidates: string[] = [];

  const commonTags = [
    "#SmallBusiness",
    "#BrandGrowth",
    "#MarketingIdeas",
    "#AIContent",
    "#DigitalMarketing",
    "#SocialMediaTips",
    "#BusinessGrowth",
    "#ContentCreation",
    "#MarketingStrategy",
    "#OnlinePresence",
  ];

  // Pick tags based on keywords found in the caption
  const keywordMap: Record<string, string[]> = {
    business: ["#SmallBusiness", "#BusinessGrowth"],
    brand: ["#BrandGrowth", "#OnlinePresence"],
    market: ["#MarketingIdeas", "#DigitalMarketing", "#MarketingStrategy"],
    content: ["#AIContent", "#ContentCreation"],
    social: ["#SocialMediaTips", "#DigitalMarketing"],
    ai: ["#AIContent", "#ContentCreation"],
    digital: ["#DigitalMarketing", "#MarketingStrategy"],
    growth: ["#BusinessGrowth", "#BrandGrowth"],
    tip: ["#SocialMediaTips"],
    promote: ["#MarketingIdeas"],
    product: ["#SmallBusiness"],
  };

  const matched = new Set<string>();
  for (const word of words) {
    for (const [key, tags] of Object.entries(keywordMap)) {
      if (word.includes(key)) {
        tags.forEach((t) => matched.add(t));
      }
    }
  }

  tagCandidates.push(...matched);

  // Fill up to 4 with defaults
  if (tagCandidates.length < 4) {
    const defaults = ["#SmallBusiness", "#BrandGrowth", "#MarketingIdeas", "#AIContent"];
    for (const d of defaults) {
      if (tagCandidates.length >= 4) break;
      if (!tagCandidates.includes(d)) tagCandidates.push(d);
    }
  }

  return tagCandidates.slice(0, 4);
}

function formatTimestamp(): string {
  const now = new Date();
  const diff = Math.floor((Date.now() - now.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  return `${Math.floor(diff / 3600)} hours ago`;
}

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */

const INITIAL_DRAFTS: Draft[] = [
  {
    id: "draft-1",
    title: "Weekend Special Promo",
    platform: "Both",
    lastEdited: "2 hours ago",
    caption: "Don't miss our weekend special!",
    product: "Weekend Promo",
    tone: "Excited",
    platforms: { facebook: true, instagram: true },
  },
  {
    id: "draft-2",
    title: "New Product Teaser",
    platform: "Instagram",
    lastEdited: "Yesterday",
    caption: "Something new is coming... stay tuned!",
    product: "New Product Launch",
    tone: "Mysterious",
    platforms: { facebook: false, instagram: true },
  },
  {
    id: "draft-3",
    title: "Customer Appreciation Post",
    platform: "Facebook",
    lastEdited: "3 days ago",
    caption: "Thank you to all our amazing customers!",
    product: "Customer Appreciation",
    tone: "Grateful",
    platforms: { facebook: true, instagram: false },
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */

export function SocialPublishing() {
  /* ---- state ---------------------------------------------------- */
  const [caption, setCaption] = useState("");
  const [product, setProduct] = useState("Your Business post");
  const [tone, setTone] = useState("Friendly");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: true,
    instagram: true,
  });
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [media, setMedia] = useState<UploadedMedia | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>(INITIAL_DRAFTS);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---- derived -------------------------------------------------- */
  const platformKey = selectedPlatforms.facebook && selectedPlatforms.instagram
    ? "both"
    : selectedPlatforms.facebook
      ? "facebook"
      : selectedPlatforms.instagram
        ? "instagram"
        : null;

  const suggestedHashtags = useMemo(
    () => generateHashtags(caption),
    [caption],
  );

  const charCount = caption.length;
  const charLimit = 2200;
  const isNearLimit = charCount > charLimit - 200;

  /* ---- handlers ------------------------------------------------- */

  // Caption generation
  const generateCaption = useCallback(() => {
    setIsGenerating(true);
    // Simulate AI generation with a short delay
    setTimeout(() => {
      const templates = [
        `✨ ${product} \n\nExperience the best with our latest offering! With a ${tone.toLowerCase()} approach, we bring you closer to your goals. Try it today and see the difference. \n\n#${product.replace(/\s+/g, "")} #${tone}Vibes`,
        `🔥 Big news! ${product} \n\nOur team has been working hard to bring you something special. With a ${tone.toLowerCase()} touch, we're redefining what's possible. \n\nTag someone who needs to see this! 👇`,
        `💫 ${product} \n\nWe believe in a ${tone.toLowerCase()} experience for our community. This is more than just a post — it's an invitation to be part of something bigger. \n\nShare this with your network! 🌟`,
        `📢 Announcing: ${product} \n\nGet ready for a ${tone.toLowerCase()} journey ahead. Whether you're a long-time fan or new here, there's something for everyone. \n\nDrop a ❤️ if you're excited!`,
      ];
      const generated = templates[Math.floor(Math.random() * templates.length)];
      setCaption(generated);
      setIsGenerating(false);
      toast.success("Caption generated successfully!");
    }, 600);
  }, [product, tone]);

  // Media upload
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast.error("Please select an image or video file");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 50MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    setMedia({
      name: file.name,
      url,
      type: isImage ? "image" : "video",
    });
    toast.success(`${isImage ? "Image" : "Video"} uploaded successfully`);
  }, []);

  const removeMedia = useCallback(() => {
    if (media) {
      URL.revokeObjectURL(media.url);
      setMedia(null);
    }
  }, [media]);

  // Drafts
  const saveDraft = useCallback(() => {
    const newDraft: Draft = {
      id: `draft-${Date.now()}`,
      title: product || "Untitled Draft",
      platform: selectedPlatforms.facebook && selectedPlatforms.instagram
        ? "Both"
        : selectedPlatforms.facebook
          ? "Facebook"
          : "Instagram",
      lastEdited: formatTimestamp(),
      caption,
      product,
      tone,
      date: scheduledDate,
      time: scheduledTime,
      platforms: { ...selectedPlatforms },
    };
    setDrafts((prev) => [newDraft, ...prev]);
    toast.success("Draft saved!");
  }, [product, caption, tone, scheduledDate, scheduledTime, selectedPlatforms]);

  const loadDraft = useCallback((draft: Draft) => {
    setCaption(draft.caption || "");
    setProduct(draft.product || "Your Business post");
    setTone(draft.tone || "Friendly");
    setScheduledDate(draft.date || "");
    setScheduledTime(draft.time || "");
    if (draft.platforms) {
      setSelectedPlatforms(draft.platforms);
    }
    toast.success(`Loaded draft: ${draft.title}`);
  }, []);

  const deleteDraft = useCallback((id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    toast.success("Draft deleted");
  }, []);

  // Publish
  const handlePublish = useCallback(() => {
    if (!caption.trim()) {
      toast.error("Please write or generate a caption before publishing");
      return;
    }
    if (!platformKey) {
      toast.error("Please select at least one platform");
      return;
    }
    const platformLabel = platformKey === "both" ? "Facebook & Instagram" : platformKey;
    toast.success(`Posted successfully to ${platformLabel}! 🎉`);
    // Reset form
    setCaption("");
    setProduct("Your Business post");
    setTone("Friendly");
    setScheduledDate("");
    setScheduledTime("");
    setSelectedHashtags([]);
    removeMedia();
  }, [caption, platformKey, removeMedia]);

  // Schedule
  const handleSchedule = useCallback(() => {
    if (!caption.trim()) {
      toast.error("Please write or generate a caption before scheduling");
      return;
    }
    if (!scheduledDate || !scheduledTime) {
      toast.error("Please select both a date and time to schedule");
      return;
    }
    if (!platformKey) {
      toast.error("Please select at least one platform");
      return;
    }
    const platformLabel = platformKey === "both" ? "Facebook & Instagram" : platformKey;
    toast.success(`Scheduled for ${scheduledDate} at ${scheduledTime} on ${platformLabel} 📅`);
  }, [caption, scheduledDate, scheduledTime, platformKey]);

  // Copy
  const copyToClipboard = useCallback(() => {
    const hashtagStr = selectedHashtags.length > 0
      ? "\n\n" + selectedHashtags.join(" ")
      : suggestedHashtags.length > 0
        ? "\n\n" + suggestedHashtags.join(" ")
        : "";
    const fullText = caption + hashtagStr;
    navigator.clipboard.writeText(fullText).then(() => {
      toast.success("Copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy");
    });
  }, [caption, selectedHashtags, suggestedHashtags]);

  // Toggle hashtag selection
  const toggleHashtag = useCallback((tag: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  /* ---- render ---------------------------------------------------- */
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Missed Opportunities Alert */}
      <Link
        to="/app/missed-posts"
        className="block rounded-xl border-2 border-amber-200 bg-amber-50 p-3 hover:bg-amber-100/80 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 flex-shrink-0">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-amber-900 text-xs sm:text-sm">
              You have 3 missed promotional opportunities this week
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-amber-800 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Recover now</span>
            <span>→</span>
          </div>
        </div>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Social Media Publishing
        </h1>
        <p className="max-w-2xl text-gray-600">
          AI-powered content creation and scheduling for your marketing campaigns.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* ---- Main column ---------------------------------------- */}
        <div className="space-y-6">
          {/* Create Post card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Create Post
            </h3>

            {/* Platform selection */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setSelectedPlatforms((p) => ({ ...p, facebook: !p.facebook }))
                }
                className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                  selectedPlatforms.facebook
                    ? "bg-blue-50/80 border-blue-400 ring-1 ring-blue-400/30"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors ${
                    selectedPlatforms.facebook
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPlatforms.facebook && <Check className="h-4 w-4" />}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      selectedPlatforms.facebook ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <Users
                      className={`h-5 w-5 ${
                        selectedPlatforms.facebook
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Facebook</h4>
                    <p className="text-sm text-gray-500">@yourbusiness</p>
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
                    ? "bg-blue-50/80 border-blue-400 ring-1 ring-blue-400/30"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors ${
                    selectedPlatforms.instagram
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPlatforms.instagram && <Check className="h-4 w-4" />}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      selectedPlatforms.instagram
                        ? "bg-gradient-to-br from-purple-500 to-pink-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <Image
                      className={`h-5 w-5 ${
                        selectedPlatforms.instagram
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Instagram</h4>
                    <p className="text-sm text-gray-500">@yourbusiness</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Media upload */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              className="mb-5 cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition-colors hover:border-blue-500 hover:bg-blue-50/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {media ? (
                <div className="space-y-3">
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={`Uploaded ${media.name}`}
                      className="mx-auto max-h-48 rounded-lg object-contain"
                    />
                  ) : (
                    <video
                      src={media.url}
                      className="mx-auto max-h-48 rounded-lg"
                      controls
                    >
                      <track kind="captions" label="No captions" />
                    </video>
                  )}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Image className="h-4 w-4" />
                    <span className="truncate max-w-[200px]">{media.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMedia();
                      }}
                      className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                      aria-label="Remove media"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto mb-3 h-10 w-10 text-blue-500" />
                  <p className="font-medium text-gray-900">Upload media</p>
                  <p className="text-sm text-gray-500">
                    Click to browse — Images, videos, or GIFs up to 50MB
                  </p>
                </>
              )}
            </div>

            {/* Caption section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Caption</h3>

              {/* Product and tone inputs */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="product-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Product or context
                  </label>
                  <input
                    id="product-input"
                    value={product}
                    onChange={(event) => setProduct(event.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Coffee promotion, new service, event, etc."
                  />
                </div>
                <div>
                  <label
                    htmlFor="tone-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Brand tone
                  </label>
                  <input
                    id="tone-input"
                    value={tone}
                    onChange={(event) => setTone(event.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Friendly"
                  />
                </div>
              </div>

              {/* Generate button */}
              <button
                type="button"
                onClick={generateCaption}
                disabled={isGenerating || !product.trim()}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <BrainCircuit className="h-4 w-4" />
                )}
                {isGenerating ? "Generating..." : "Generate Caption"}
              </button>

              {/* Textarea */}
              <textarea
                rows={5}
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                placeholder="Write or generate your caption..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Character count */}
              <div className="flex items-center justify-between text-sm">
                <p
                  className={
                    isNearLimit ? "text-amber-600 font-medium" : "text-gray-500"
                  }
                >
                  {charCount.toLocaleString()} / {charLimit.toLocaleString()}{" "}
                  characters
                  {isNearLimit && " (nearing limit)"}
                </p>
              </div>

              {/* Hashtags */}
              {suggestedHashtags.length > 0 && (
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-900">
                    Suggested Hashtags
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestedHashtags.map((tag) => {
                      const isSelected = selectedHashtags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleHashtag(tag)}
                          className={`rounded-full px-3 py-1 text-sm shadow-sm transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-white text-blue-700 hover:bg-blue-100"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    disabled={!caption.trim()}
                    className="mt-4 flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Caption + Hashtags
                  </button>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div className="mt-5 space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="schedule-date"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <input
                      id="schedule-date"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {scheduledDate && (
                      <button
                        type="button"
                        onClick={() => setScheduledDate("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-700"
                        aria-label="Clear date"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="schedule-time"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <input
                      id="schedule-time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {scheduledTime && (
                      <button
                        type="button"
                        onClick={() => setScheduledTime("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-700"
                        aria-label="Clear time"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {platformKey && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{PLATFORM_TIPS[platformKey]}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={saveDraft}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <Save className="h-5 w-5" />
                Save Draft
              </button>
              <button
                type="button"
                onClick={handleSchedule}
                disabled={!scheduledDate || !scheduledTime}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Calendar className="h-5 w-5" />
                Schedule
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <Send className="h-5 w-5" />
                    Publish
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Publish</AlertDialogTitle>
                    <AlertDialogDescription>
                      This post will be published immediately
                      {platformKey ? ` to ${platformKey === "both" ? "Facebook & Instagram" : platformKey}` : ""}.
                      {scheduledDate && scheduledTime
                        ? ` It is scheduled for ${scheduledDate} at ${scheduledTime}.`
                        : " No date/time is set — it will post now."}
                      Are you sure you want to proceed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePublish}>
                      Publish Now
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* ---- Sidebar -------------------------------------------- */}
        <aside className="space-y-6">
          {/* Live Preview */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Preview
            </h3>

            {caption.trim() || media ? (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-gray-200 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    B
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900">Your Business</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Brand preview</span>
                      {platformKey && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{platformKey}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Media */}
                {media && (
                  <div className="border-b border-gray-200">
                    {media.type === "image" ? (
                      <img
                        src={media.url}
                        alt={`Post media: ${media.name}`}
                        className="w-full max-h-64 object-cover"
                      />
                    ) : (
                      <video
                        src={media.url}
                        className="w-full max-h-64 object-cover"
                        controls
                      >
                        <track kind="captions" label="No captions" />
                      </video>
                    )}
                  </div>
                )}

                {/* Caption */}
                <div className="p-4">
                  {caption.trim() ? (
                    <p className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                      {caption.length > 280
                        ? caption.slice(0, 280) + "..."
                        : caption}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      Write or generate a caption to see preview...
                    </p>
                  )}

                  {/* Selected hashtags in preview */}
                  {selectedHashtags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {selectedHashtags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm text-blue-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center">
                <div className="space-y-2 text-gray-400">
                  <Send className="mx-auto h-8 w-8" />
                  <p className="text-sm font-medium text-gray-500">
                    Your post preview will appear here
                  </p>
                  <p className="text-xs">
                    Add content in the editor to see a live preview
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Drafts */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Drafts</h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {drafts.length}
              </span>
            </div>

            {drafts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
                <Save className="mx-auto mb-2 h-6 w-6 text-gray-400" />
                <p className="text-sm text-gray-500">No drafts yet</p>
                <p className="text-xs text-gray-400 mt-1">
                  Create a post and click "Save Draft"
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="group relative rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/30"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => loadDraft(draft)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <h4 className="font-medium text-gray-900 truncate">
                          {draft.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {draft.platform} • Last edited{" "}
                          {draft.lastEdited}
                        </p>
                      </button>

                      {/* Actions menu */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => loadDraft(draft)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-white hover:text-blue-600 transition-colors"
                          aria-label={`Load draft: ${draft.title}`}
                        >
                          <Send className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteDraft(draft.id)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-white hover:text-red-600 transition-colors"
                          aria-label={`Delete draft: ${draft.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Draft preview snippet */}
                    {draft.caption && (
                      <p className="mt-2 text-xs text-gray-400 line-clamp-1">
                        {draft.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}