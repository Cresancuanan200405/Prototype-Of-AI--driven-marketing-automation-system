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
/*  Platform Icons — Real Facebook & Instagram logos                   */
/* ------------------------------------------------------------------ */

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
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

  const platformKey = selectedPlatforms.facebook && selectedPlatforms.instagram
    ? "both"
    : selectedPlatforms.facebook
      ? "facebook"
      : selectedPlatforms.instagram
        ? "instagram"
        : null;

  const suggestedHashtags = useMemo(() => generateHashtags(caption), [caption]);

  const charCount = caption.length;
  const charLimit = 2200;
  const isNearLimit = charCount > charLimit - 200;

  const generateCaption = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const templates = [
        `✨ ${product} \n\nExperience the best with our latest offering! With a ${tone.toLowerCase()} approach, we bring you closer to your goals. Try it today and see the difference. \n\n#${product.replace(/\s+/g, "")} #${tone}Vibes`,
        `🔥 Big news! ${product} \n\nOur team has been working hard to bring you something special. With a ${tone.toLowerCase()} touch, we're redefining what's possible. \n\nTag someone who needs to see this! 👇`,
        `💫 ${product} \n\nWe believe in a ${tone.toLowerCase()} experience for our community. This is more than just a post — it's an invitation to be part of something bigger. \n\nShare this with your network! 🌟`,
        `📢 Announcing: ${product} \n\nGet ready for a ${tone.toLowerCase()} journey ahead. Whether you're a long-time fan or new here, there's something for everyone. \n\nDrop a ❤️ if you're excited!`,
      ];
      setCaption(templates[Math.floor(Math.random() * templates.length)]);
      setIsGenerating(false);
      toast.success("Caption generated successfully!");
    }, 600);
  }, [product, tone]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) { toast.error("Please select an image or video file"); return; }
    if (file.size > 50 * 1024 * 1024) { toast.error("File too large. Maximum size is 50MB."); return; }
    setMedia({ name: file.name, url: URL.createObjectURL(file), type: isImage ? "image" : "video" });
    toast.success(`${isImage ? "Image" : "Video"} uploaded successfully`);
  }, []);

  const removeMedia = useCallback(() => {
    if (media) { URL.revokeObjectURL(media.url); setMedia(null); }
  }, [media]);

  const saveDraft = useCallback(() => {
    const newDraft: Draft = {
      id: `draft-${Date.now()}`,
      title: product || "Untitled Draft",
      platform: selectedPlatforms.facebook && selectedPlatforms.instagram ? "Both" : selectedPlatforms.facebook ? "Facebook" : "Instagram",
      lastEdited: formatTimestamp(),
      caption, product, tone,
      date: scheduledDate, time: scheduledTime,
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
    if (draft.platforms) setSelectedPlatforms(draft.platforms);
    toast.success(`Loaded draft: ${draft.title}`);
  }, []);

  const deleteDraft = useCallback((id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    toast.success("Draft deleted");
  }, []);

  const handlePublish = useCallback(() => {
    if (!caption.trim()) { toast.error("Please write or generate a caption before publishing"); return; }
    if (!platformKey) { toast.error("Please select at least one platform"); return; }
    const platformLabel = platformKey === "both" ? "Facebook & Instagram" : platformKey;
    toast.success(`Posted successfully to ${platformLabel}! 🎉`);
    setCaption(""); setProduct("Your Business post"); setTone("Friendly");
    setScheduledDate(""); setScheduledTime(""); setSelectedHashtags([]);
    removeMedia();
  }, [caption, platformKey, removeMedia]);

  const handleSchedule = useCallback(() => {
    if (!caption.trim()) { toast.error("Please write or generate a caption before scheduling"); return; }
    if (!scheduledDate || !scheduledTime) { toast.error("Please select both a date and time to schedule"); return; }
    if (!platformKey) { toast.error("Please select at least one platform"); return; }
    const platformLabel = platformKey === "both" ? "Facebook & Instagram" : platformKey;
    toast.success(`Scheduled for ${scheduledDate} at ${scheduledTime} on ${platformLabel} 📅`);
  }, [caption, scheduledDate, scheduledTime, platformKey]);

  const copyToClipboard = useCallback(() => {
    const hashtagStr = selectedHashtags.length > 0 ? "\n\n" + selectedHashtags.join(" ") : suggestedHashtags.length > 0 ? "\n\n" + suggestedHashtags.join(" ") : "";
    navigator.clipboard.writeText(caption + hashtagStr).then(() => toast.success("Copied to clipboard!")).catch(() => toast.error("Failed to copy"));
  }, [caption, selectedHashtags, suggestedHashtags]);

  const toggleHashtag = useCallback((tag: string) => {
    setSelectedHashtags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Missed Opportunities Alert — Red Urgency */}
      <Link to="/app/missed-posts" className="block rounded-xl border-2 border-red-300 bg-red-50 p-3 hover:bg-red-100 transition-colors group">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 flex-shrink-0"><AlertTriangle className="h-4 w-4 text-red-600" /></div>
          <div className="flex-1 min-w-0"><p className="font-semibold text-red-700 text-xs sm:text-sm">You have 3 missed promotional opportunities this week</p></div>
          <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><span>Recover now</span><span>→</span></div>
        </div>
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Social Media Publishing</h1>
        <p className="max-w-2xl text-muted-foreground">AI-powered content creation and scheduling for your marketing campaigns.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Create Post</h3>

            {/* Platform selection — Gold accent */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {([
                { key: "facebook" as const, label: "Facebook", icon: FacebookIcon },
                { key: "instagram" as const, label: "Instagram", icon: InstagramIcon },
              ]).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedPlatforms((p) => ({ ...p, [key]: !p[key as keyof typeof selectedPlatforms] }))}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                    selectedPlatforms[key as keyof typeof selectedPlatforms]
                      ? "bg-secondary/10 border-secondary ring-1 ring-secondary/30"
                      : "bg-card border-border hover:border-secondary/30"
                  }`}
                >
                  <div className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors ${
                    selectedPlatforms[key as keyof typeof selectedPlatforms] ? "border-secondary bg-secondary text-secondary-foreground" : "border-border"
                  }`}>
                    {selectedPlatforms[key as keyof typeof selectedPlatforms] && <Check className="h-4 w-4" />}
                  </div>
                  <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    selectedPlatforms[key as keyof typeof selectedPlatforms]
                      ? key === "facebook"
                        ? "bg-[#1877F2]"
                        : "bg-gradient-to-br from-[#F77737] to-[#E4405F]"
                      : "bg-muted"
                  }`}>
                    <Icon className={`h-5 w-5 ${selectedPlatforms[key as keyof typeof selectedPlatforms] ? "text-white" : "text-muted-foreground"}`} />
                  </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{label}</h4>
                      <p className="text-sm text-muted-foreground">@yourbusiness</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Media upload — Gold hover */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
              role="button" tabIndex={0}
              className="mb-5 cursor-pointer rounded-xl border-2 border-dashed border-border bg-muted p-8 text-center transition-colors hover:border-secondary hover:bg-secondary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileSelect} className="hidden" />
              {media ? (
                <div className="space-y-3">
                  {media.type === "image" ? <img src={media.url} alt={`Uploaded ${media.name}`} className="mx-auto max-h-48 rounded-lg object-contain" /> : <video src={media.url} className="mx-auto max-h-48 rounded-lg" controls><track kind="captions" label="No captions" /></video>}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Image className="h-4 w-4" /><span className="truncate max-w-[200px]">{media.name}</span>
                    <button type="button" onClick={(e) => { e.stopPropagation(); removeMedia(); }} className="ml-2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Remove media"><X className="h-4 w-4" /></button>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto mb-3 h-10 w-10 text-secondary" />
                  <p className="font-medium text-foreground">Upload media</p>
                  <p className="text-sm text-muted-foreground">Click to browse — Images, videos, or GIFs up to 50MB</p>
                </>
              )}
            </div>

            {/* Caption section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Caption</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="product-input" className="mb-2 block text-sm font-medium text-foreground/70">Product or context</label>
                  <input id="product-input" value={product} onChange={(e) => setProduct(e.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Coffee promotion, new service, event, etc." />
                </div>
                <div>
                  <label htmlFor="tone-input" className="mb-2 block text-sm font-medium text-foreground/70">Brand tone</label>
                  <input id="tone-input" value={tone} onChange={(e) => setTone(e.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Friendly" />
                </div>
              </div>

              <button type="button" onClick={generateCaption} disabled={isGenerating || !product.trim()} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <BrainCircuit className="h-4 w-4" />}
                {isGenerating ? "Generating..." : "Generate Caption"}
              </button>

              <textarea rows={5} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write or generate your caption..." className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />

              <div className="flex items-center justify-between text-sm">
                <p className={isNearLimit ? "text-secondary font-medium" : "text-muted-foreground"}>{charCount.toLocaleString()} / {charLimit.toLocaleString()} characters{isNearLimit && " (nearing limit)"}</p>
              </div>

              {suggestedHashtags.length > 0 && (
                <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4">
                  <p className="text-sm font-medium text-secondary">Suggested Hashtags</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestedHashtags.map((tag) => {
                      const isSelected = selectedHashtags.includes(tag);
                      return (
                        <button key={tag} type="button" onClick={() => toggleHashtag(tag)} className={`rounded-full px-3 py-1 text-sm shadow-sm transition-colors cursor-pointer ${isSelected ? "bg-secondary text-secondary-foreground" : "bg-card text-secondary border border-secondary/20 hover:bg-secondary/5"}`}>{tag}</button>
                      );
                    })}
                  </div>
                  <button type="button" onClick={copyToClipboard} disabled={!caption.trim()} className="mt-4 flex items-center gap-2 rounded-lg border border-secondary/20 bg-card px-4 py-2 text-sm font-medium text-secondary hover:bg-secondary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><Copy className="h-4 w-4" />Copy Caption + Hashtags</button>
                </div>
              )}
            </div>

            {/* Schedule — Gold tip */}
            <div className="mt-5 space-y-4 rounded-xl border border-border bg-muted p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="schedule-date" className="mb-2 block text-sm font-medium text-foreground/70">Date</label>
                  <div className="relative">
                    <input id="schedule-date" type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} className="w-full rounded-lg border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
                    {scheduledDate && <button type="button" onClick={() => setScheduledDate("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Clear date"><X className="h-4 w-4" /></button>}
                  </div>
                </div>
                <div>
                  <label htmlFor="schedule-time" className="mb-2 block text-sm font-medium text-foreground/70">Time</label>
                  <div className="relative">
                    <input id="schedule-time" type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="w-full rounded-lg border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
                    {scheduledTime && <button type="button" onClick={() => setScheduledTime("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Clear time"><X className="h-4 w-4" /></button>}
                  </div>
                </div>
              </div>
              {platformKey && (
                <div className="flex items-start gap-2 rounded-lg border border-secondary/20 bg-secondary/5 p-3 text-sm text-secondary/80">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" /><span>{PLATFORM_TIPS[platformKey]}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button type="button" onClick={saveDraft} className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"><Save className="h-5 w-5" />Save Draft</button>
              <button type="button" onClick={handleSchedule} disabled={!scheduledDate || !scheduledTime} className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"><Calendar className="h-5 w-5" />Schedule</button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button type="button" className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"><Send className="h-5 w-5" />Publish</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Publish</AlertDialogTitle>
                    <AlertDialogDescription>
                      This post will be published immediately{platformKey ? ` to ${platformKey === "both" ? "Facebook & Instagram" : platformKey}` : ""}.
                      {scheduledDate && scheduledTime ? ` It is scheduled for ${scheduledDate} at ${scheduledTime}.` : " No date/time is set — it will post now."}
                      Are you sure you want to proceed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePublish}>Publish Now</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Preview</h3>
            {caption.trim() || media ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-3 border-b border-border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">B</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">Your Business</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Brand preview</span>
                      {platformKey && <><span>•</span><span className="capitalize">{platformKey}</span></>}
                    </div>
                  </div>
                </div>
                {media && (
                  <div className="border-b border-border">
                    {media.type === "image" ? <img src={media.url} alt={`Post media: ${media.name}`} className="w-full max-h-64 object-cover" /> : <video src={media.url} className="w-full max-h-64 object-cover" controls><track kind="captions" label="No captions" /></video>}
                  </div>
                )}
                <div className="p-4">
                  {caption.trim() ? <p className="whitespace-pre-wrap text-sm text-foreground/80 leading-relaxed">{caption.length > 280 ? caption.slice(0, 280) + "..." : caption}</p> : <p className="text-sm text-muted-foreground italic">Write or generate a caption to see preview...</p>}
                  {selectedHashtags.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{selectedHashtags.map((tag) => <span key={tag} className="text-sm text-secondary">{tag}</span>)}</div>}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted p-6 text-center">
                <div className="space-y-2 text-muted-foreground"><Send className="mx-auto h-8 w-8" /><p className="text-sm font-medium">Your post preview will appear here</p><p className="text-xs">Add content in the editor to see a live preview</p></div>
              </div>
            )}
          </div>

          {/* Drafts — Gold accent */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-foreground">Drafts</h3>
              <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">{drafts.length}</span>
            </div>
            {drafts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted p-6 text-center"><Save className="mx-auto mb-2 h-6 w-6 text-muted-foreground" /><p className="text-sm text-muted-foreground">No drafts yet</p><p className="text-xs text-muted-foreground/70 mt-1">Create a post and click "Save Draft"</p></div>
            ) : (
              <div className="space-y-3">
                {drafts.map((draft) => (
                  <div key={draft.id} className="group relative rounded-xl border border-border bg-muted p-4 transition-colors hover:border-secondary/20 hover:bg-secondary/5">
                    <div className="flex items-start justify-between gap-2">
                      <button type="button" onClick={() => loadDraft(draft)} className="min-w-0 flex-1 text-left">
                        <h4 className="font-medium text-foreground truncate">{draft.title}</h4>
                        <p className="text-sm text-muted-foreground">{draft.platform} • Last edited {draft.lastEdited}</p>
                      </button>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" onClick={() => loadDraft(draft)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-card hover:text-secondary transition-colors" aria-label={`Load draft: ${draft.title}`}><Send className="h-4 w-4" /></button>
                        <button type="button" onClick={() => deleteDraft(draft.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-card hover:text-destructive transition-colors" aria-label={`Delete draft: ${draft.title}`}><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                    {draft.caption && <p className="mt-2 text-xs text-muted-foreground line-clamp-1">{draft.caption}</p>}
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