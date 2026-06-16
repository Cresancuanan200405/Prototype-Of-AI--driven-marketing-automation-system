import { useMemo, useState, type ChangeEvent } from "react";
import {
  Calendar,
  Copy,
  Check,
  Image as ImageIcon,
  Save,
  Send,
  Upload,
  Tag,
  RefreshCw,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import BrandMark from "../components/layout/BrandMark";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const tones = ["Professional", "Friendly", "Luxury", "Trendy", "Fun"];

const themes = [
  { id: "modern-minimal", name: "Modern Minimal" },
  { id: "bold-promo", name: "Bold Promo" },
  { id: "warm-seasonal", name: "Warm Seasonal" },
  { id: "luxury-premium", name: "Luxury Premium" },
  { id: "playful-social", name: "Playful Social" },
];

const holidays = [
  "None",
  "Mother's Day",
  "Memorial Day",
  "Summer Sale",
  "Back to School",
  "Father's Day",
  "Holiday Season",
  "Grand Opening",
];

const platforms = ["Facebook", "Instagram", "Both"];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function buildHolidayTaglines(productName: string, holidayEvent: string, brandTone: string) {
  const tone = brandTone.toLowerCase();
  if (holidayEvent === "Mother's Day") return [`Celebrate mom with ${productName} in a ${tone} way.`, `Make Mother's Day special with ${productName} and a heartfelt touch.`, `A ${tone} Mother's Day feature for ${productName} that feels personal and warm.`];
  if (holidayEvent === "Memorial Day") return [`Make the long weekend count with ${productName} and a special offer.`, `Memorial Day is better with ${productName} and a timely deal.`, `Highlight ${productName} with a ${tone} Memorial Day promotion.`];
  if (holidayEvent === "Father's Day") return [`Treat dad to ${productName} with a thoughtful holiday spotlight.`, `Father's Day feels better with ${productName} at the center of the offer.`, `Give the day a ${tone} twist with ${productName}.`];
  if (holidayEvent === "Summer Sale") return [`Turn up the season with ${productName} and summer energy.`, `Summer just got brighter with ${productName} and a hot deal.`, `A ${tone} summer promo powered by ${productName}.`];
  if (holidayEvent === "Back to School") return [`Start the season strong with ${productName} and a fresh look.`, `Back-to-school style begins with ${productName}.`, `A ${tone} back-to-school spotlight for ${productName}.`];
  if (holidayEvent === "Holiday Season") return [`Wrap the season in ${productName} and a festive promotion.`, `Holiday season shine starts with ${productName}.`, `Give your seasonal campaign a ${tone} lift with ${productName}.`];
  if (holidayEvent === "Grand Opening") return [`Announce your launch with ${productName} and a memorable first impression.`, `Open strong with ${productName} and a ${tone} welcome.`, `Make the first reveal of ${productName} impossible to ignore.`];
  return [`Timely promotions featuring ${productName}.`, `${productName} deserves a ${tone} spotlight right now.`, `Build momentum with ${productName} and a seasonal message.`];
}

function buildCaption(productName: string, price: string, tone: string, holiday: string, tagline: string) {
  const holidayLine = holiday !== "None" ? `Perfect for ${holiday.toLowerCase()} promotions.` : "Built for everyday conversions.";
  const intro = `${productName} is here to make your day better.`;
  const offer = price ? `Starting at ${price}.` : "Now available.";
  const closing = tagline || `Experience a ${tone.toLowerCase()} way to market your brand.`;
  return [intro, holidayLine, offer, closing].join(" ");
}

function buildHashtags(productName: string, themeName: string, holiday: string) {
  const productTag = `#${productName.replace(/[^a-zA-Z0-9]+/g, "") || "Brand"}`;
  const themeTag = `#${themeName.replace(/[^a-zA-Z0-9]+/g, "")}`;
  const holidayTag = holiday !== "None" ? `#${holiday.replace(/[^a-zA-Z0-9]+/g, "")}` : "#Marketing";
  return [productTag, themeTag, holidayTag, "#AIContent", "#SocialMediaMarketing"];
}

/* ------------------------------------------------------------------ */
/*  Collapsible Section                                                */
/* ------------------------------------------------------------------ */

function Section({ step, title, defaultOpen = true, children }: { step: number; title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="cursor-pointer w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors">
        <span className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold flex-shrink-0">{step}</span>
        <span className="text-sm font-semibold text-foreground flex-1">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AIGenerator() {
  const [productName, setProductName] = useState("Caramel Macchiato");
  const [description, setDescription] = useState("Rich, creamy caramel coffee with latte art — our signature drink that customers love.");
  const [price, setPrice] = useState("₱180");
  const [brandTone, setBrandTone] = useState("Friendly");
  const [theme, setTheme] = useState("modern-minimal");
  const [holiday, setHoliday] = useState("None");
  const [tagline, setTagline] = useState("Your daily moment of caramel bliss.");
  const [generateTaglineFromHoliday, setGenerateTaglineFromHoliday] = useState(false);
  const [referenceImageName, setReferenceImageName] = useState("");
  const [referenceImagePreview, setReferenceImagePreview] = useState("");
  const [activeTab, setActiveTab] = useState<"caption" | "image" | "preview">("caption");
  const [action, setAction] = useState<"draft" | "schedule" | "publish" | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("Facebook");
  const [taglineVariant, setTaglineVariant] = useState(0);
  const [captionVariant, setCaptionVariant] = useState(0);
  const [hashtagVariant, setHashtagVariant] = useState(0);
  const [previewCaption, setPreviewCaption] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [generated, setGenerated] = useState<{
    caption: string; hashtags: string[]; cta: string; campaignIdea: string;
    imagePrompt: string; imageHeadline: string; imageStyle: string; tagline: string;
  } | null>(null);

  const selectedTheme = useMemo(() => themes.find((t) => t.id === theme), [theme]);

  const canGenerate =
    productName.trim().length > 0 && description.trim().length > 0 && price.trim().length > 0 &&
    brandTone.trim().length > 0 && theme.trim().length > 0 && holiday.trim().length > 0 &&
    (generateTaglineFromHoliday || tagline.trim().length > 0);

  const taglineOptions = useMemo(() => buildHolidayTaglines(productName || "your product", holiday, brandTone || "friendly"), [productName, holiday, brandTone]);
  const resolvedTagline = generateTaglineFromHoliday ? tagline.trim() || taglineOptions[taglineVariant % taglineOptions.length] : tagline.trim();

  const captionOptions = useMemo(() => {
    const cp = productName || "your product"; const cpr = price || "your price";
    return [
      buildCaption(cp, cpr, brandTone || "Friendly", holiday, resolvedTagline),
      `${cp} is now available with a ${brandTone.toLowerCase() || "friendly"} tone and a ${theme || "modern"} look. ${resolvedTagline || "A fresh way to promote your offer."}`,
      `Meet ${cp}, priced at ${cpr}, designed to stand out this ${holiday.toLowerCase()}. ${resolvedTagline || "Perfect for your next campaign."}`,
    ];
  }, [productName, price, brandTone, holiday, theme, resolvedTagline]);

  const hashtagOptions = useMemo(() => {
    const tn = selectedTheme?.name || "Modern"; const base = buildHashtags(productName || "Brand", tn, holiday);
    return [
      base,
      [base[0], base[1], "#PromoDesign", "#AIMarketing", "#SmallBusiness", "#ContentCreator"],
      [base[0], base[2], "#BrandGrowth", "#MarketingIdeas", "#SocialMediaPromo", "#DigitalMarketing"],
    ];
  }, [productName, holiday, selectedTheme]);

  const activeCaption = captionOptions[captionVariant % captionOptions.length];
  const activeHashtags = hashtagOptions[hashtagVariant % hashtagOptions.length];

  const handleReferenceImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { setReferenceImageName(""); setReferenceImagePreview(""); return; }
    setReferenceImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => setReferenceImagePreview(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    if (!canGenerate || !selectedTheme || isGenerating) return;
    setIsGenerating(true);
    setTimeout(() => {
      const imagePrompt = [
        `Create a ${selectedTheme.name.toLowerCase()} marketing image for ${productName}.`,
        `Use this description as the visual direction: ${description.trim()}.`,
        `Show the price clearly as ${price}.`,
        `Use a ${brandTone.toLowerCase()} visual tone.`,
        holiday !== "None" ? `Include holiday cues for ${holiday}.` : "Keep it versatile for evergreen use.",
        referenceImageName ? "Use the uploaded reference image as a visual guide." : "No reference image provided.",
      ].join(" ");
      setGenerated({
        caption: activeCaption, hashtags: activeHashtags,
        cta: `Use now and get ${price.trim()} value from ${productName.trim()}.`,
        campaignIdea: holiday !== "None"
          ? `Create a ${holiday} themed campaign using the ${selectedTheme.name.toLowerCase()} design style and a strong price-first visual.`
          : `Run a ${selectedTheme.name.toLowerCase()} launch campaign centered on ${productName.trim()} and its price point.`,
        imagePrompt, imageHeadline: resolvedTagline, imageStyle: `${selectedTheme.name} / ${brandTone}`, tagline: resolvedTagline,
      });
      setPreviewCaption(activeCaption); setActiveTab("caption"); setAction(null); setIsGenerating(false);
    }, 800);
  };

  const regenerateTagline = () => { if (holiday === "None") return; const next = taglineVariant + 1; setTaglineVariant(next); setTagline(taglineOptions[next % taglineOptions.length]); setGenerateTaglineFromHoliday(true); };
  const regenerateCaption = () => { const next = captionVariant + 1; setCaptionVariant(next); if (generated) { const nc = captionOptions[next % captionOptions.length]; setGenerated({ ...generated, caption: nc }); setPreviewCaption(nc); } };
  const regenerateHashtags = () => { const next = hashtagVariant + 1; setHashtagVariant(next); if (generated) setGenerated({ ...generated, hashtags: hashtagOptions[next % hashtagOptions.length] }); };

  const copyText = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Content Generator</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Create caption and image concepts from your product details, tone, theme, and event.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT: Form */}
        <div className="space-y-4">
          <Section step={1} title="Product Details">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Product/Service Name</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g., Caramel Macchiato" className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Description</label>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the product visually." className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., ₱180" className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Holiday/Event</label>
                <select value={holiday} onChange={(e) => setHoliday(e.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  {holidays.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </Section>

          <Section step={2} title="Content Style">
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Brand Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button key={t} type="button" onClick={() => setBrandTone(t)} className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${brandTone === t ? "border-secondary bg-secondary/10 text-secondary shadow-sm" : "border-border hover:border-secondary/30 hover:bg-secondary/5 text-muted-foreground"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Theme</label>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((t) => (
                  <button key={t.id} type="button" onClick={() => setTheme(t.id)} className={`cursor-pointer rounded-lg border px-3 py-2 text-xs font-medium text-left transition-all ${theme === t.id ? "border-secondary bg-secondary/10 text-secondary shadow-sm" : "border-border hover:border-secondary/30 hover:bg-secondary/5 text-muted-foreground"}`}>
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section step={3} title="Tagline & Reference" defaultOpen={false}>
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <label className="text-xs font-medium text-muted-foreground">Tagline</label>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs text-muted-foreground">
                  <input type="checkbox" checked={generateTaglineFromHoliday} onChange={(e) => setGenerateTaglineFromHoliday(e.target.checked)} className="h-3.5 w-3.5 rounded border-border accent-[var(--color-secondary)]" />
                  Auto-generate
                </label>
                <button type="button" onClick={regenerateTagline} disabled={holiday === "None"} className="cursor-pointer rounded-md p-1 text-muted-foreground hover:text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Regenerate tagline">
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
              <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Write a short tagline" className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Reference Image (Optional)</label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-4 text-center transition-colors hover:border-secondary hover:bg-secondary/5">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Upload a visual reference</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleReferenceImageChange} />
              </label>
              {referenceImageName && (
                <div className="mt-2 flex items-center gap-3 rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground">
                  {referenceImagePreview && (
                    <img src={referenceImagePreview} alt="Reference" className="h-10 w-10 rounded-md object-cover border border-border flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <ImageIcon className="h-3.5 w-3.5 text-secondary inline mr-1.5" />
                    <span className="font-medium truncate">{referenceImageName}</span>
                  </div>
                </div>
              )}
            </div>
          </Section>

          {!canGenerate && (
            <p className="rounded-lg border border-secondary/30 bg-secondary/5 px-4 py-2.5 text-xs text-secondary">
              Fill in product name, description, price, tone, theme, and holiday to generate.
            </p>
          )}
        </div>

        {/* RIGHT: Results */}
        <div className="space-y-4">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3.5 text-sm font-semibold transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:shadow-md"
          >
            {isGenerating ? (
              <><div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" /> Generating...</>
            ) : (
              <><Sparkles className="h-4 w-4" /> Generate Content</>
            )}
          </button>

          {!generated && !isGenerating && (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <BrandMark className="mx-auto mb-4 h-14 w-14 text-muted-foreground/20" />
              <h3 className="mb-2 text-base font-semibold text-foreground">Ready to create content?</h3>
              <p className="text-sm text-muted-foreground">Fill in the form and click Generate to see your results here.</p>
            </div>
          )}

          {isGenerating && (
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4 mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded-full w-20" />
                  <div className="h-6 bg-muted rounded-full w-24" />
                  <div className="h-6 bg-muted rounded-full w-16" />
                </div>
              </div>
            </div>
          )}

          {generated && !isGenerating && (
            <>
              <div className="rounded-xl border border-border bg-card p-1.5">
                <div className="grid grid-cols-3 gap-1.5">
                  {(["caption", "image", "preview"] as const).map((tab) => (
                    <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`cursor-pointer rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${activeTab === tab ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/60"}`}>
                      {tab === "caption" ? "Caption & Hashtags" : tab === "image" ? "Image Preview" : "Edit & Preview"}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === "caption" && (
                <>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-foreground">AI-Generated Caption</h3>
                      <div className="flex items-center gap-2">
                        <button onClick={() => copyText(generated.caption, "caption")} className="cursor-pointer flex items-center gap-1 text-xs text-secondary hover:opacity-80 transition-opacity">
                          {copiedField === "caption" ? <><Check className="h-3.5 w-3.5" /> Copied!</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                        </button>
                        <button onClick={regenerateCaption} className="cursor-pointer flex items-center gap-1 text-xs text-secondary hover:opacity-80 transition-opacity">
                          <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                        </button>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4 mb-4">
                      <p className="text-sm text-foreground leading-relaxed">{generated.caption}</p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Hashtags</h4>
                        <div className="flex items-center gap-2">
                          <button onClick={() => copyText(generated.hashtags.join(" "), "hashtags")} className="cursor-pointer flex items-center gap-1 text-xs text-secondary hover:opacity-80 transition-opacity">
                            {copiedField === "hashtags" ? <><Check className="h-3.5 w-3.5" /> Copied!</> : <><Copy className="h-3.5 w-3.5" /> Copy All</>}
                          </button>
                          <button onClick={regenerateHashtags} className="cursor-pointer flex items-center gap-1 text-xs text-secondary hover:opacity-80 transition-opacity">
                            <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {generated.hashtags.map((tag) => (
                          <span key={tag} className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs text-secondary font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-4 w-4 text-secondary" />
                      <h3 className="text-sm font-semibold text-foreground">Call to Action</h3>
                    </div>
                    <div className="rounded-lg bg-secondary/5 border border-secondary/10 px-4 py-3">
                      <p className="text-sm font-medium text-foreground">{generated.cta}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-4 w-4 text-secondary" />
                      <h3 className="text-sm font-semibold text-foreground">Campaign Idea</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{generated.campaignIdea}</p>
                  </div>
                </>
              )}

              {activeTab === "image" && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="rounded-2xl bg-primary p-8 text-primary-foreground min-h-[320px] flex flex-col justify-center items-center text-center space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">Tagline</p>
                      <p className="text-xl font-semibold">{generated.tagline}</p>
                    </div>
                    <div className="w-16 h-px bg-white/20" />
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">Price</p>
                      <p className="text-4xl font-black tracking-tight">{price}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground text-center">Style: {generated.imageStyle}</p>
                </div>
              )}

              {activeTab === "preview" && (
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Editable Caption</label>
                    <textarea rows={5} value={previewCaption} onChange={(e) => setPreviewCaption(e.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  </div>
                  <div className="rounded-2xl bg-primary p-8 text-primary-foreground min-h-[280px] flex flex-col justify-center items-center text-center space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">Tagline</p>
                      <p className="text-xl font-semibold">{generated.tagline}</p>
                    </div>
                    <div className="w-16 h-px bg-white/20" />
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">Price</p>
                      <p className="text-4xl font-black tracking-tight">{price}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <label className="text-xs font-medium text-muted-foreground">Platform:</label>
                  <div className="flex gap-1.5">
                    {platforms.map((p) => (
                      <button key={p} type="button" onClick={() => setSelectedPlatform(p)} className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${selectedPlatform === p ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setAction(action === "draft" ? null : "draft")} className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${action === "draft" ? "bg-primary text-primary-foreground shadow-sm" : "border border-border text-muted-foreground hover:bg-muted"}`}>
                    <Save className="h-3.5 w-3.5" /> Save Draft
                  </button>
                  <button type="button" onClick={() => setAction(action === "schedule" ? null : "schedule")} className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${action === "schedule" ? "bg-secondary text-secondary-foreground shadow-sm" : "border border-border text-muted-foreground hover:bg-muted"}`}>
                    <Calendar className="h-3.5 w-3.5" /> Schedule
                  </button>
                  <button type="button" onClick={() => setAction(action === "publish" ? null : "publish")} className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${action === "publish" ? "bg-primary text-primary-foreground shadow-sm" : "border border-border text-muted-foreground hover:bg-muted"}`}>
                    <Send className="h-3.5 w-3.5" /> Publish
                  </button>
                </div>

                {action && (
                  <div className="mt-3 rounded-lg bg-secondary/5 border border-secondary/10 px-4 py-2.5 text-xs text-muted-foreground">
                    {action === "draft" && <>Draft saved to your content library.</>}
                    {action === "schedule" && <>Ready to schedule for <span className="font-semibold text-foreground">{selectedPlatform}</span>.</>}
                    {action === "publish" && <>Publishing now to <span className="font-semibold text-foreground">{selectedPlatform}</span>.</>}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}