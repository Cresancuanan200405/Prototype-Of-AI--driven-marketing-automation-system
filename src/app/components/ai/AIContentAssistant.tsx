import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Copy, Image as ImageIcon, RefreshCw, Upload } from "lucide-react";

interface Props {
  caption?: string;
  onApplyCaption: (text: string) => void;
  onApplyImage?: (imageData: string) => void;
  prefill?: {
    brandTone?: string;
    businessName?: string;
  };
}

export default function AIContentAssistant({ caption, onApplyCaption, onApplyImage, prefill }: Props) {
  const [product, setProduct] = useState(prefill?.businessName ? `${prefill.businessName} post` : "");
  const [tone, setTone] = useState(prefill?.brandTone || "Friendly");
  const [captionVariants, setCaptionVariants] = useState<string[]>([]);
  const [variantIndex, setVariantIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [uploadedImagePreview, setUploadedImagePreview] = useState("");
  const [generatedImagePreview, setGeneratedImagePreview] = useState("");

  useEffect(() => {
    setProduct(prefill?.businessName ? `${prefill.businessName} post` : "");
    setTone(prefill?.brandTone || "Friendly");
  }, [prefill?.businessName, prefill?.brandTone]);

  const activeCaption = useMemo(() => captionVariants[variantIndex] || caption || "Generate a caption to see suggestions here.", [captionVariants, variantIndex, caption]);

  const generateCaption = async () => {
    setLoading(true);

    await new Promise((resolve) => window.setTimeout(resolve, 500));

    const base = `${product || "Your product"} with a ${tone.toLowerCase()} tone. Here is a polished caption.`;
    const variants = [base, `${base} Variant two.`, `${base} Variant three.`];

    setCaptionVariants(variants);
    setVariantIndex(0);
    setLoading(false);
  };

  const applyCaption = () => {
    const caption = captionVariants[variantIndex] || "";
    if (caption) {
      onApplyCaption(caption);
    }
  };

  const nextVariant = () => {
    if (captionVariants.length === 0) {
      return;
    }

    setVariantIndex((current) => (current + 1) % captionVariants.length);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setUploadedImageName("");
      setUploadedImagePreview("");
      setGeneratedImagePreview("");
      return;
    }

    setUploadedImageName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setUploadedImagePreview(result);
      setGeneratedImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const generateImageFromUpload = () => {
    if (!uploadedImagePreview) {
      setGeneratedImagePreview("");
      return;
    }

    setGeneratedImagePreview(uploadedImagePreview);
    onApplyImage?.(uploadedImagePreview);
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Caption & Image Generator</h3>
          <p className="text-sm text-muted-foreground">Generate a caption and an image based on your upload.</p>
        </div>
        <button type="button" onClick={generateCaption} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">
          <RefreshCw className="h-4 w-4" />
          {loading ? "Generating..." : "Generate AI Content"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">AI-Generated Caption</p>
                <p className="text-xs text-muted-foreground">Maintain your original palette and keep the tone on-brand.</p>
              </div>
              <button type="button" onClick={nextVariant} className="inline-flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2 text-sm font-medium text-secondary hover:bg-secondary/15">
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </button>
            </div>

            <div className="space-y-4 rounded-xl border border-border bg-background p-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Product or context</label>
                <input
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
                  placeholder="Coffee promotion, new service, event, etc."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Brand tone</label>
                <input value={tone} onChange={(event) => setTone(event.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" />
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-sm leading-7 text-foreground">{activeCaption}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={applyCaption} className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-3 text-sm font-medium text-primary hover:bg-primary/20">
                  <Copy className="h-4 w-4" />
                  Apply Caption
                </button>
                <button type="button" onClick={generateCaption} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">
                  <RefreshCw className="h-4 w-4" />
                  Generate Again
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-900">Suggested Hashtags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["#SmallBusiness", "#BrandGrowth", "#MarketingIdeas", "#AIContent"].map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-sm text-blue-700 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50">
                <Copy className="h-4 w-4" />
                Copy Caption + Hashtags
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">Selected platform context</p>
            <p className="mt-1 text-sm text-muted-foreground">This keeps the generator aligned with the post you are creating.</p>
            <div className="mt-4 rounded-xl border border-border bg-muted/20 p-4 text-sm text-foreground">
              Your caption will appear in the main Publish caption field after you apply it.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <div className="border-b border-border p-5">
              <p className="text-lg font-semibold text-foreground">Post Preview</p>
              <p className="text-sm text-muted-foreground">How your post will look</p>
            </div>

            <div className="p-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-border p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {(prefill?.businessName || "B").slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{prefill?.businessName || "Your Business"}</p>
                    <p className="text-sm text-muted-foreground">Brand preview</p>
                  </div>
                </div>

                <div className="bg-secondary/10 p-5">
                  <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-secondary/30 bg-white/70 p-4 text-center">
                    {generatedImagePreview ? (
                      <img src={generatedImagePreview} alt="Generated AI preview based on uploaded image" className="max-h-[320px] w-full rounded-xl object-contain" />
                    ) : (
                      <div className="space-y-3 text-secondary">
                        <ImageIcon className="mx-auto h-12 w-12" />
                        <p className="font-semibold">Your AI Image</p>
                        <p className="text-sm text-secondary/80">Upload a reference photo and generate an image based on it.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4 rounded-xl border border-border bg-background p-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Upload image to guide AI</label>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-secondary/30 bg-secondary/5 px-4 py-5 text-sm text-secondary transition-colors hover:border-secondary hover:bg-secondary/10">
                    <Upload className="h-4 w-4" />
                    {uploadedImageName || "Choose an image to generate from"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>

                <button type="button" onClick={generateImageFromUpload} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60" disabled={!uploadedImagePreview}>
                  <ImageIcon className="h-4 w-4" />
                  Generate AI Image from Upload
                </button>

                <button type="button" onClick={() => generatedImagePreview && onApplyImage?.(generatedImagePreview)} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-3 text-sm font-medium text-primary hover:bg-primary/20" disabled={!generatedImagePreview}>
                  Use This Image in Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}