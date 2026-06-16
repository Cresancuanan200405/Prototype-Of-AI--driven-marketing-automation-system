import { useMemo, useState, type ChangeEvent } from "react";
import { Calendar, Copy, Image as ImageIcon, Save, Send, Upload, Tag, Cpu, RefreshCw, Lightbulb } from "lucide-react";
import BrandMark from "../components/layout/BrandMark";

const tones = ["Professional", "Friendly", "Luxury", "Trendy", "Fun"];

const themes = [
  { id: "modern-minimal", name: "Modern Minimal" },
  { id: "bold-promo", name: "Bold Promo" },
  { id: "warm-seasonal", name: "Warm Seasonal" },
  { id: "luxury-premium", name: "Luxury Premium" },
  { id: "playful-social", name: "Playful Social" },
];

const holidays = ["None", "Mother's Day", "Memorial Day", "Summer Sale", "Back to School", "Father's Day", "Holiday Season", "Grand Opening"];
const platforms = ["Facebook", "Instagram", "Both"];

type ResultTab = "caption" | "image" | "preview";
type ActionType = "draft" | "schedule" | "publish" | null;

type GeneratedState = {
  caption: string;
  hashtags: string[];
  cta: string;
  campaignIdea: string;
  imagePrompt: string;
  imageHeadline: string;
  imageStyle: string;
  tagline: string;
};

function buildHolidayTaglines(productName: string, holidayEvent: string, brandTone: string) {
  const tone = brandTone.toLowerCase();

  if (holidayEvent === "Mother's Day") return [
    `Celebrate mom with ${productName} in a ${tone} way.`,
    `Make Mother's Day special with ${productName} and a heartfelt touch.`,
    `A ${tone} Mother's Day feature for ${productName} that feels personal and warm.`,
  ];
  if (holidayEvent === "Memorial Day") return [
    `Make the long weekend count with ${productName} and a special offer.`,
    `Memorial Day is better with ${productName} and a timely deal.`,
    `Highlight ${productName} with a ${tone} Memorial Day promotion.`,
  ];
  if (holidayEvent === "Father's Day") return [
    `Treat dad to ${productName} with a thoughtful holiday spotlight.`,
    `Father's Day feels better with ${productName} at the center of the offer.`,
    `Give the day a ${tone} twist with ${productName}.`,
  ];
  if (holidayEvent === "Summer Sale") return [
    `Turn up the season with ${productName} and summer energy.`,
    `Summer just got brighter with ${productName} and a hot deal.`,
    `A ${tone} summer promo powered by ${productName}.`,
  ];
  if (holidayEvent === "Back to School") return [
    `Start the season strong with ${productName} and a fresh look.`,
    `Back-to-school style begins with ${productName}.`,
    `A ${tone} back-to-school spotlight for ${productName}.`,
  ];
  if (holidayEvent === "Holiday Season") return [
    `Wrap the season in ${productName} and a festive promotion.`,
    `Holiday season shine starts with ${productName}.`,
    `Give your seasonal campaign a ${tone} lift with ${productName}.`,
  ];
  if (holidayEvent === "Grand Opening") return [
    `Announce your launch with ${productName} and a memorable first impression.`,
    `Open strong with ${productName} and a ${tone} welcome.`,
    `Make the first reveal of ${productName} impossible to ignore.`,
  ];

  return [
    `Timely promotions featuring ${productName}.`,
    `${productName} deserves a ${tone} spotlight right now.`,
    `Build momentum with ${productName} and a seasonal message.`,
  ];
}

function buildCaption(productName: string, price: string, tone: string, holiday: string, tagline: string) {
  const holidayLine = holiday !== "None" ? `Perfect for ${holiday.toLowerCase()} promotions.` : "Built for everyday conversions.";
  const intro = `${productName} is here to make your day better.`;
  const offer = price ? `Starting at ${price}.` : "Now available.";
  const closing = tagline ? tagline : `Experience a ${tone.toLowerCase()} way to market your brand.`;

  return [intro, holidayLine, offer, closing].join(" ");
}

function buildHashtags(productName: string, themeName: string, holiday: string) {
  const productTag = `#${productName.replace(/[^a-zA-Z0-9]+/g, "") || "Brand"}`;
  const themeTag = `#${themeName.replace(/[^a-zA-Z0-9]+/g, "")}`;
  const holidayTag = holiday !== "None" ? `#${holiday.replace(/[^a-zA-Z0-9]+/g, "")}` : "#Marketing";

  return [productTag, themeTag, holidayTag, "#AIContent", "#SocialMediaMarketing"];
}

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
  const [activeTab, setActiveTab] = useState<ResultTab>("caption");
  const [action, setAction] = useState<ActionType>(null);
  const [generated, setGenerated] = useState<GeneratedState | null>({
    caption: "Caramel Macchiato is here to make your day better. Built for everyday conversions. Your daily moment of caramel bliss. Experience a friendly way to market your brand.",
    hashtags: ["#CaramelMacchiato", "#ModernMinimal", "#Marketing", "#AIContent", "#SocialMediaMarketing"],
    cta: "Use now and get ₱180 value from Caramel Macchiato.",
    campaignIdea: "Run a modern minimal launch campaign centered on Caramel Macchiato and its price point.",
    imagePrompt: "Create a modern minimal marketing image for Caramel Macchiato. Use this description as the visual direction: Rich, creamy caramel coffee with latte art — our signature drink that customers love.. Show the price clearly as ₱180. Use a friendly visual tone. Keep it versatile for evergreen use. No reference image provided.",
    imageHeadline: "Your daily moment of caramel bliss.",
    imageStyle: "Modern Minimal / Friendly",
    tagline: "Your daily moment of caramel bliss.",
  });
  const [selectedPlatform, setSelectedPlatform] = useState("Facebook");
  const [taglineVariant, setTaglineVariant] = useState(0);
  const [captionVariant, setCaptionVariant] = useState(0);
  const [hashtagVariant, setHashtagVariant] = useState(0);
  const [previewCaption, setPreviewCaption] = useState("Caramel Macchiato is here to make your day better. Built for everyday conversions. Your daily moment of caramel bliss. Experience a friendly way to market your brand.");

  const selectedTheme = useMemo(() => themes.find((item) => item.id === theme), [theme]);

  const canGenerate =
    productName.trim().length > 0 &&
    description.trim().length > 0 &&
    price.trim().length > 0 &&
    brandTone.trim().length > 0 &&
    theme.trim().length > 0 &&
    holiday.trim().length > 0 &&
    (generateTaglineFromHoliday || tagline.trim().length > 0);

  const taglineOptions = useMemo(
    () => buildHolidayTaglines(productName || "your product", holiday, brandTone || "friendly"),
    [productName, holiday, brandTone],
  );

  const resolvedTagline = generateTaglineFromHoliday
    ? tagline.trim() || taglineOptions[taglineVariant % taglineOptions.length]
    : tagline.trim();

  const captionOptions = useMemo(() => {
    const cleanProduct = productName || "your product";
    const cleanPrice = price || "your price";

    return [
      buildCaption(cleanProduct, cleanPrice, brandTone || "Friendly", holiday, resolvedTagline),
      `${cleanProduct} is now available with a ${brandTone.toLowerCase() || "friendly"} tone and a ${theme || "modern"} look. ${resolvedTagline || "A fresh way to promote your offer."}`,
      `Meet ${cleanProduct}, priced at ${cleanPrice}, designed to stand out this ${holiday.toLowerCase()}. ${resolvedTagline || "Perfect for your next campaign."}`,
    ];
  }, [productName, price, brandTone, holiday, theme, resolvedTagline]);

  const hashtagOptions = useMemo(() => {
    const themeName = selectedTheme?.name || "Modern";
    const baseHashtags = buildHashtags(productName || "Brand", themeName, holiday);
    return [
      baseHashtags,
      [baseHashtags[0], baseHashtags[1], "#PromoDesign", "#AIMarketing", "#SmallBusiness", "#ContentCreator"],
      [baseHashtags[0], baseHashtags[2], "#BrandGrowth", "#MarketingIdeas", "#SocialMediaPromo", "#DigitalMarketing"],
    ];
  }, [productName, holiday, selectedTheme]);

  const activeCaption = captionOptions[captionVariant % captionOptions.length];
  const activeHashtags = hashtagOptions[hashtagVariant % hashtagOptions.length];

  const handleReferenceImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setReferenceImageName("");
      setReferenceImagePreview("");
      return;
    }

    setReferenceImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setReferenceImagePreview(typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    if (!canGenerate || !selectedTheme) {
      return;
    }

    const imagePrompt = [
      `Create a ${selectedTheme.name.toLowerCase()} marketing image for ${productName}.`,
      `Use this description as the visual direction: ${description.trim()}.`,
      `Show the price clearly as ${price}.`,
      `Use a ${brandTone.toLowerCase()} visual tone.`,
      holiday !== "None" ? `Include holiday cues for ${holiday}.` : "Keep it versatile for evergreen use.",
      referenceImageName ? "Use the uploaded reference image as a visual guide." : "No reference image provided.",
    ].join(" ");

    const caption = activeCaption;
    const hashtags = activeHashtags;

    setGenerated({
      caption,
      hashtags,
      cta: `Use now and get ${price.trim()} value from ${productName.trim()}.`,
      campaignIdea:
        holiday !== "None"
          ? `Create a ${holiday} themed campaign using the ${selectedTheme.name.toLowerCase()} design style and a strong price-first visual.`
          : `Run a ${selectedTheme.name.toLowerCase()} launch campaign centered on ${productName.trim()} and its price point.`,
      imagePrompt,
      imageHeadline: resolvedTagline,
      imageStyle: `${selectedTheme.name} / ${brandTone}`,
      tagline: resolvedTagline,
    });

    setPreviewCaption(caption);
    setActiveTab("caption");
    setAction(null);
  };

  const regenerateTagline = () => {
    if (holiday === "None") {
      return;
    }

    const nextVariant = taglineVariant + 1;
    setTaglineVariant(nextVariant);
    setTagline(taglineOptions[nextVariant % taglineOptions.length]);
    setGenerateTaglineFromHoliday(true);
  };

  const regenerateCaption = () => {
    const nextVariant = captionVariant + 1;
    setCaptionVariant(nextVariant);
    if (generated) {
      const nextCaption = captionOptions[nextVariant % captionOptions.length];
      setGenerated({ ...generated, caption: nextCaption });
      setPreviewCaption(nextCaption);
    }
  };

  const regenerateHashtags = () => {
    const nextVariant = hashtagVariant + 1;
    setHashtagVariant(nextVariant);
    if (generated) {
      setGenerated({ ...generated, hashtags: hashtagOptions[nextVariant % hashtagOptions.length] });
    }
  };

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">AI Content Generator</h1>
        <p className="text-muted-foreground">Create caption and image concepts from your product details, tone, theme, and event.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground/70">Product/Service Name</label>
              <input type="text" value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="e.g., Caramel Macchiato" className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground/70">Description</label>
              <textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the product visually. This will guide the image generation only." className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground/70">Price</label>
                <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="e.g., $12.99" className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground/70">Holiday/Event</label>
                <select value={holiday} onChange={(event) => setHoliday(event.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring">
                  {holidays.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-sm font-medium text-foreground/70">Tagline</label>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={generateTaglineFromHoliday} onChange={(event) => setGenerateTaglineFromHoliday(event.target.checked)} className="h-4 w-4 rounded border-border accent-[var(--color-secondary)]" />
                    Generate from holiday event
                  </label>
                  <button type="button" onClick={regenerateTagline} disabled={holiday === "None"} className="rounded-md border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary transition-colors hover:bg-secondary/20 disabled:cursor-not-allowed disabled:opacity-50">
                    Generate another tagline
                  </button>
                </div>
              </div>
              <input type="text" value={tagline} onChange={(event) => setTagline(event.target.value)} placeholder="Write a short tagline for the generated image" className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
              {generateTaglineFromHoliday && holiday !== "None" && <p className="mt-2 text-sm text-muted-foreground">Holiday-based tagline mode is on, but you can still edit the text manually.</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground/70">Brand Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button key={tone} type="button" onClick={() => setBrandTone(tone)} className={`rounded-lg border px-4 py-2 transition-colors ${brandTone === tone ? "border-secondary bg-secondary/10 text-secondary" : "border-border hover:border-secondary/30 hover:bg-secondary/5"}`}>
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground/70">Theme</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {themes.map((themeOption) => (
                  <button key={themeOption.id} type="button" onClick={() => setTheme(themeOption.id)} className={`rounded-lg border px-4 py-3 text-left transition-colors ${theme === themeOption.id ? "border-secondary bg-secondary/10 text-secondary" : "border-border hover:border-secondary/30 hover:bg-secondary/5"}`}>
                    {themeOption.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground/70">Reference Image (Optional)</label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-center transition-colors hover:border-secondary hover:bg-secondary/5">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload an image to use as a visual reference</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleReferenceImageChange} />
              </label>
              {referenceImageName && (
                <div className="mt-3 rounded-lg border border-border bg-muted p-3 text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-secondary" />
                    <span className="font-medium">{referenceImageName}</span>
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleGenerate} disabled={!canGenerate} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-3 font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <Cpu className="h-5 w-5" />
              Generate Content
            </button>

            {!canGenerate && <p className="rounded-lg border border-secondary/30 bg-secondary/5 px-4 py-3 text-sm text-secondary">Fill in the product name, description, price, brand tone, theme, and holiday/event before generating.</p>}
          </div>
        </div>

        <div className="space-y-6">
            {!generated ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center shadow-sm">
              <BrandMark className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">Ready to create a caption and image concept?</h3>
              <p className="text-muted-foreground">Fill in the required fields and click Generate Content to see both results.</p>
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-border bg-card p-2 shadow-sm">
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setActiveTab("caption")} className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "caption" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>Caption Result</button>
                  <button type="button" onClick={() => setActiveTab("image")} className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "image" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>Image Result</button>
                  <button type="button" onClick={() => setActiveTab("preview")} className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "preview" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>Preview</button>
                </div>
              </div>

              {activeTab === "caption" ? (
                <>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">AI-Generated Caption</h3>
                    <div className="mb-4 rounded-lg bg-muted p-4"><p className="text-foreground">{generated.caption}</p></div>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => copyText(generated.caption)} className="flex items-center gap-1 text-sm text-secondary hover:opacity-80"><Copy className="h-4 w-4" />Copy Caption</button>
                      <button onClick={regenerateCaption} className="flex items-center gap-1 text-sm text-secondary hover:opacity-80"><RefreshCw className="h-4 w-4" />Generate Another Caption</button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Suggested Hashtags</h3>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {generated.hashtags.map((tag) => (<span key={tag} className="rounded-full bg-secondary/10 px-3 py-1 text-sm text-secondary">{tag}</span>))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => copyText(generated.hashtags.join(" "))} className="flex items-center gap-1 text-sm text-secondary hover:opacity-80"><Copy className="h-4 w-4" />Copy All Hashtags</button>
                      <button onClick={regenerateHashtags} className="flex items-center gap-1 text-sm text-secondary hover:opacity-80"><RefreshCw className="h-4 w-4" />Generate Another Hashtags Set</button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Call to Action</h3>
                    <div className="mb-4 rounded-lg bg-accent p-4"><p className="font-medium text-accent-foreground">{generated.cta}</p></div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="mb-3 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-secondary" /><h3 className="text-lg font-semibold text-foreground">Campaign Idea</h3></div>
                    <p className="text-sm text-muted-foreground">{generated.campaignIdea}</p>
                  </div>
                </>
              ) : activeTab === "image" ? (
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="rounded-3xl border border-border bg-primary p-10 text-primary-foreground shadow-lg min-h-[340px] flex flex-col justify-center items-center text-center space-y-8">
                    <div className="space-y-3"><p className="text-xs uppercase tracking-[0.2em] text-white/70">Tagline</p><p className="text-2xl font-semibold">{generated.tagline}</p></div>
                    <div className="space-y-3"><p className="text-xs uppercase tracking-[0.2em] text-white/70">Price</p><p className="text-5xl font-black tracking-tight">{price}</p></div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground/70">Editable Caption Preview</label>
                    <textarea rows={6} value={previewCaption} onChange={(event) => setPreviewCaption(event.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>

                  <div className="rounded-3xl border border-border bg-primary p-10 text-primary-foreground shadow-lg min-h-[340px] flex flex-col justify-center items-center text-center space-y-8">
                    <div className="space-y-3"><p className="text-xs uppercase tracking-[0.2em] text-white/70">Tagline</p><p className="text-2xl font-semibold">{generated.tagline}</p></div>
                    <div className="space-y-3"><p className="text-xs uppercase tracking-[0.2em] text-white/70">Price</p><p className="text-5xl font-black tracking-tight">{price}</p></div>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => setAction("draft")} className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${action === "draft" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"}`}><Save className="h-5 w-5" />Save Draft</button>
                  <button type="button" onClick={() => setAction("schedule")} className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${action === "schedule" ? "bg-secondary text-secondary-foreground" : "border border-border text-muted-foreground hover:bg-muted"}`}><Calendar className="h-5 w-5" />Schedule Post</button>
                  <button type="button" onClick={() => setAction("publish")} className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${action === "publish" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"}`}><Send className="h-5 w-5" />Publish Now</button>
                </div>

                {(action === "schedule" || action === "publish") && (
                  <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground">Choose platform</h4>
                        <p className="text-sm text-muted-foreground">This appears only when you choose to schedule or publish.</p>
                      </div>
                      <span className="rounded-full bg-card px-3 py-1 text-xs font-medium text-secondary border border-secondary/20">{action === "publish" ? "Publish now" : "Schedule post"}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {platforms.map((platform) => (
                        <button key={platform} type="button" onClick={() => setSelectedPlatform(platform)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${selectedPlatform === platform ? "border-secondary bg-card text-secondary" : "border-border bg-card text-muted-foreground hover:border-secondary/30"}`}>
                          {platform}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">Selected platform: <span className="font-semibold text-foreground">{selectedPlatform}</span></p>
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