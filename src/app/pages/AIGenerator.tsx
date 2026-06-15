import { useMemo, useState, type ChangeEvent } from "react";
import { Calendar, Copy, Image as ImageIcon, Save, Send, Upload, Tag, Cpu, RefreshCw, Lightbulb } from "lucide-react";
import BrandMark from "../components/layout/BrandMark";

const tones = ["Professional", "Friendly", "Luxury", "Trendy", "Fun"];

const themes = [
  { id: "modern-minimal", name: "Modern Minimal", gradient: "from-slate-900 via-slate-700 to-slate-500" },
  { id: "bold-promo", name: "Bold Promo", gradient: "from-orange-500 via-red-500 to-pink-500" },
  { id: "warm-seasonal", name: "Warm Seasonal", gradient: "from-rose-500 via-orange-500 to-amber-400" },
  { id: "luxury-premium", name: "Luxury Premium", gradient: "from-amber-700 via-stone-800 to-slate-900" },
  { id: "playful-social", name: "Playful Social", gradient: "from-cyan-500 via-sky-500 to-indigo-500" },
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
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brandTone, setBrandTone] = useState("");
  const [theme, setTheme] = useState("");
  const [holiday, setHoliday] = useState("None");
  const [tagline, setTagline] = useState("");
  const [generateTaglineFromHoliday, setGenerateTaglineFromHoliday] = useState(false);
  const [referenceImageName, setReferenceImageName] = useState("");
  const [referenceImagePreview, setReferenceImagePreview] = useState("");
  const [activeTab, setActiveTab] = useState<ResultTab>("caption");
  const [action, setAction] = useState<ActionType>(null);
  const [generated, setGenerated] = useState<GeneratedState | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState("Facebook");
  const [taglineVariant, setTaglineVariant] = useState(0);
  const [captionVariant, setCaptionVariant] = useState(0);
  const [hashtagVariant, setHashtagVariant] = useState(0);
  const [previewCaption, setPreviewCaption] = useState("");

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
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">AI Content Generator</h1>
          <p className="text-gray-600">Create caption and image concepts from your product details, tone, theme, and event.</p>
        </div>
        <div className="flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          <button type="button" onClick={() => setActiveTab("caption")} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === "caption" ? "bg-secondary text-secondary-foreground" : "text-gray-600 hover:text-gray-900"}`}>Generator</button>
          <button type="button" onClick={() => generated && setActiveTab("image")} disabled={!generated} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === "image" ? "bg-secondary text-secondary-foreground" : "text-gray-600 hover:text-gray-900"} ${!generated ? "cursor-not-allowed opacity-40" : ""}`}>Results</button>
          <button type="button" onClick={() => generated && setActiveTab("preview")} disabled={!generated} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === "preview" ? "bg-secondary text-secondary-foreground" : "text-gray-600 hover:text-gray-900"} ${!generated ? "cursor-not-allowed opacity-40" : ""}`}>Preview</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Product/Service Name</label>
              <input type="text" value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="e.g., Caramel Macchiato" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
              <textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the product visually. This will guide the image generation only." className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Price</label>
                <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="e.g., $12.99" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Holiday/Event</label>
                <select value={holiday} onChange={(event) => setHoliday(event.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {holidays.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-sm font-medium text-gray-700">Tagline</label>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={generateTaglineFromHoliday} onChange={(event) => setGenerateTaglineFromHoliday(event.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                    Generate from holiday event
                  </label>
                  <button type="button" onClick={regenerateTagline} disabled={holiday === "None"} className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50">
                    Generate another tagline
                  </button>
                </div>
              </div>
              <input type="text" value={tagline} onChange={(event) => setTagline(event.target.value)} placeholder="Write a short tagline for the generated image" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {generateTaglineFromHoliday && holiday !== "None" && <p className="mt-2 text-sm text-gray-500">Holiday-based tagline mode is on, but you can still edit the text manually.</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Brand Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button key={tone} type="button" onClick={() => setBrandTone(tone)} className={`rounded-lg border px-4 py-2 transition-colors ${brandTone === tone ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"}`}>
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Theme</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {themes.map((themeOption) => (
                  <button key={themeOption.id} type="button" onClick={() => setTheme(themeOption.id)} className={`rounded-lg border px-4 py-3 text-left transition-colors ${theme === themeOption.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"}`}>
                    {themeOption.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Reference Image (Optional)</label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-500 hover:bg-blue-50">
                <Upload className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">Upload an image to use as a visual reference</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleReferenceImageChange} />
              </label>
              {referenceImageName && (
                <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{referenceImageName}</span>
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleGenerate} disabled={!canGenerate} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-3 font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <Cpu className="h-5 w-5" />
              Generate Content
            </button>

            {!canGenerate && <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">Fill in the product name, description, price, brand tone, theme, and holiday/event before generating.</p>}
          </div>
        </div>

        <div className="space-y-6">
            {!generated ? (
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
              <BrandMark className="mx-auto mb-4 h-16 w-16 text-gray-200" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Ready to create a caption and image concept?</h3>
              <p className="text-gray-600">Fill in the required fields and click Generate Content to see both results.</p>
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setActiveTab("caption")} className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "caption" ? "bg-secondary text-secondary-foreground" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Caption Result</button>
                  <button type="button" onClick={() => setActiveTab("image")} className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "image" ? "bg-secondary text-secondary-foreground" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Image Result</button>
                  <button type="button" onClick={() => setActiveTab("preview")} className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "preview" ? "bg-secondary text-secondary-foreground" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Preview</button>
                </div>
              </div>

              {activeTab === "caption" ? (
                <>
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">AI-Generated Caption</h3>
                    <div className="mb-4 rounded-lg bg-gray-50 p-4"><p className="text-gray-800">{generated.caption}</p></div>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => copyText(generated.caption)} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"><Copy className="h-4 w-4" />Copy Caption</button>
                      <button onClick={regenerateCaption} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"><RefreshCw className="h-4 w-4" />Generate Another Caption</button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Suggested Hashtags</h3>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {generated.hashtags.map((tag) => (<span key={tag} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">{tag}</span>))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => copyText(generated.hashtags.join(" "))} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"><Copy className="h-4 w-4" />Copy All Hashtags</button>
                      <button onClick={regenerateHashtags} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"><RefreshCw className="h-4 w-4" />Generate Another Hashtags Set</button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Call to Action</h3>
                    <div className="mb-4 rounded-lg bg-accent p-4"><p className="font-medium text-accent-foreground">{generated.cta}</p></div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="mb-3 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-accent-foreground" /><h3 className="text-lg font-semibold text-foreground">Campaign Idea</h3></div>
                    <p className="text-sm text-muted-foreground">{generated.campaignIdea}</p>
                  </div>
                </>
              ) : activeTab === "image" ? (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className={`rounded-3xl border border-border bg-primary p-10 text-primary-foreground shadow-lg min-h-[340px] flex flex-col justify-center items-center text-center space-y-8`}>
                    <div className="space-y-3"><p className="text-xs uppercase tracking-[0.2em] text-white/70">Tagline</p><p className="text-2xl font-semibold">{generated.tagline}</p></div>
                    <div className="space-y-3"><p className="text-xs uppercase tracking-[0.2em] text-white/70">Price</p><p className="text-5xl font-black tracking-tight">{price}</p></div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Editable Caption Preview</label>
                    <textarea rows={6} value={previewCaption} onChange={(event) => setPreviewCaption(event.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div className={`rounded-3xl border border-border bg-primary p-10 text-primary-foreground shadow-lg min-h-[340px] flex flex-col justify-center items-center text-center space-y-8`}>
                    <div className="space-y-3"><p className="text-xs uppercase tracking-[0.2em] text-white/70">Tagline</p><p className="text-2xl font-semibold">{generated.tagline}</p></div>
                    <div className="space-y-3"><p className="text-xs uppercase tracking-[0.2em] text-white/70">Price</p><p className="text-5xl font-black tracking-tight">{price}</p></div>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => setAction("draft")} className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${action === "draft" ? "bg-gray-900 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}><Save className="h-5 w-5" />Save Draft</button>
                  <button type="button" onClick={() => setAction("schedule")} className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${action === "schedule" ? "bg-secondary text-secondary-foreground" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}><Calendar className="h-5 w-5" />Schedule Post</button>
                  <button type="button" onClick={() => setAction("publish")} className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${action === "publish" ? "bg-primary text-primary-foreground" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}><Send className="h-5 w-5" />Publish Now</button>
                </div>

                {(action === "schedule" || action === "publish") && (
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">Choose platform</h4>
                        <p className="text-sm text-gray-600">This appears only when you choose to schedule or publish.</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700">{action === "publish" ? "Publish now" : "Schedule post"}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {platforms.map((platform) => (
                        <button key={platform} type="button" onClick={() => setSelectedPlatform(platform)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${selectedPlatform === platform ? "border-blue-500 bg-white text-blue-700" : "border-gray-300 bg-white text-gray-700 hover:border-blue-400"}`}>
                          {platform}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-gray-600">Selected platform: <span className="font-semibold text-gray-900">{selectedPlatform}</span></p>
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