import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Images, LogOut, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { photos as seedPhotos, type GalleryCategory, type Photo } from "@/lib/site-data";
import { API_BASE, authHeader } from "@/lib/api";

const categories: GalleryCategory[] = ["WEDDING", "CATERING", "EVENTS", "DECORATION"];
const field =
  "w-full border border-input bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary";

const STUDIO = {
  name: "GS EVENTS & CATERING",
  address: "Gandhi Nagar 5th Lane, near Prasanti Clinic, Brahmapur-760001",
  phone: "+91 99370 78889",
  email: "rozexeventmanagement@gmail.com",
  bankName: "HDFC Bank",
  accountName: "GS Events & Catering",
  accountNumber: "50200012345678",
  ifsc: "HDFC0001234",
  branch: "Gachibowli",
};

type InvoiceStatus = "DRAFT" | "SENT" | "PAID";
type EventTypeOption = "HOUSEWARMING CEREMONY" | "BABY SHOWER" | "BIRTHDAY" | "WEDDING" | "OTHER";
type ServiceKey = "DECORATION" | "EVENT MANAGEMENT" | "CATERING";

type ServiceItem = {
  category: ServiceKey;
  description: string;
  date: string;
  time: string;
  rate: number;
  quantity: number;
};

const serviceDefaults: Record<ServiceKey, string> = {
  DECORATION: "Stage Decoration, Floral Setup, Lighting",
  "EVENT MANAGEMENT": "Coordination, Setup, Anchor",
  CATERING: "Buffet Service, Live Counters, Staff",
};

const defaultServices = (): ServiceItem[] => [
  {
    category: "DECORATION",
    description: serviceDefaults.DECORATION,
    date: "2026-12-18",
    time: "18:00",
    rate: 35000,
    quantity: 1,
  },
  {
    category: "EVENT MANAGEMENT",
    description: serviceDefaults["EVENT MANAGEMENT"],
    date: "2026-12-18",
    time: "16:00",
    rate: 25000,
    quantity: 1,
  },
  {
    category: "CATERING",
    description: serviceDefaults.CATERING,
    date: "2026-12-18",
    time: "19:00",
    rate: 850,
    quantity: 80,
  },
];

export function StudioDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"photos" | "bill-generator">("photos");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("studio_session")) {
      navigate("/atelier-suite-9x4f");
      return;
    }
    setReady(true);
  }, [navigate]);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f9f3eb_0%,#f7f3ec_100%)]">
      <header className="border-b border-border bg-espresso">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 md:px-8">
          <div className="min-w-0">
            <p className="eyebrow text-[oklch(0.72_0.02_80)]">GS Events & Catering</p>
            <h1 className="mt-1 truncate font-serif text-xl tracking-wide text-primary">Studio Dashboard</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem("studio_session");
              sessionStorage.removeItem("studio_token");
              navigate("/");
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/40 px-4 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="soft-panel rounded-[26px] p-3 sm:p-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTab("photos")}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.2em] transition-all ${
                tab === "photos" ? "border-primary bg-primary text-primary-foreground shadow-[0_18px_30px_-22px_rgba(184,134,59,0.85)]" : "border-border bg-transparent text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              <Images className="size-3.5" /> Photos
            </button>
            <button
              type="button"
              onClick={() => setTab("bill-generator")}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.2em] transition-all ${
                tab === "bill-generator" ? "border-primary bg-primary text-primary-foreground shadow-[0_18px_30px_-22px_rgba(184,134,59,0.85)]" : "border-border bg-transparent text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              <FileText className="size-3.5" /> Bill Generator
            </button>
          </div>
        </div>

        <div className="mt-10">{tab === "photos" ? <PhotoManager /> : <AdminBillGenerator />}</div>
      </div>
    </div>
  );
}

function PhotoManager() {
  const [items, setItems] = useState<Photo[]>(seedPhotos.slice(0, 8));
  const [category, setCategory] = useState<GalleryCategory>("WEDDING");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("studio_token");
    if (!token) return;

    fetch(`${API_BASE}/api/photos`, {
      headers: authHeader(token),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load photos");
        const data = (await response.json()) as Photo[];
        if (data.length) setItems(data);
      })
      .catch(() => {
        toast.error("Unable to load existing photos");
      });
  }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Choose an image first");
      return;
    }

    const token = sessionStorage.getItem("studio_token");
    if (!token) {
      toast.error("Please sign in again");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("category", category);
    formData.append("alt", file.name);

    try {
      const response = await fetch(`${API_BASE}/api/photos`, {
        method: "POST",
        headers: authHeader(token),
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to upload photo");

      setItems((prev) => [payload as Photo, ...prev]);
      setFile(null);
      toast.success("Photo added to the gallery");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const deletePhoto = async (id: string) => {
    const token = sessionStorage.getItem("studio_token");
    if (!token) return toast.error("Please sign in again");
    try {
      const resp = await fetch(`${API_BASE}/api/photos/${id}`, {
        method: "DELETE",
        headers: authHeader(token),
      });
      if (!resp.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((x) => x.id !== id));
      toast.success("Photo deleted");
    } catch (e) {
      toast.error("Unable to delete photo");
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
      <form onSubmit={upload} className="space-y-5 border border-border bg-card p-7 shadow-soft">
        <h2 className="font-serif text-xl tracking-wide">Upload Photo</h2>
        <div>
          <label className="eyebrow block" htmlFor="cat">
            Category
          </label>
          <select id="cat" className={`mt-2 ${field}`} value={category} onChange={(e) => setCategory(e.target.value as GalleryCategory)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="eyebrow block" htmlFor="file">
            Image
          </label>
          <input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className={`mt-2 ${field}`} />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className="inline-flex w-full items-center justify-center gap-2 bg-secondary px-6 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Upload className="size-3.5" />
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div>
        <h2 className="font-serif text-xl tracking-wide">All Photos ({items.length})</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((p) => (
            <figure key={p.id} className="group relative overflow-hidden border border-border">
              <img src={p.src} alt={p.alt} loading="lazy" className="aspect-square w-full object-cover" />
              <figcaption className="flex items-center justify-between gap-2 bg-card px-3 py-2 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="truncate">{p.category}</span>
                <button type="button" aria-label="Delete photo" onClick={() => deletePhoto(p.id)} className="shrink-0 text-destructive">
                  <Trash2 className="size-3.5" />
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminBillGenerator() {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [eventType, setEventType] = useState<EventTypeOption>("WEDDING");
  const [eventTypeOther, setEventTypeOther] = useState("");
  const [clientName, setClientName] = useState("Aarav & Naina");
  const [mobile, setMobile] = useState("+91 99370 78889");
  const [location, setLocation] = useState("The Grand Orchid, Hyderabad");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-014");
  const [invoiceDate, setInvoiceDate] = useState("2026-08-14");
  const [status, setStatus] = useState<InvoiceStatus>("DRAFT");
  const [isDownloading, setIsDownloading] = useState(false);
  const [advancePaid, setAdvancePaid] = useState(25000);
  const [paymentNotes, setPaymentNotes] = useState("Advance received against event package.");
  const [remarks, setRemarks] = useState("Please include floral palette as per shared mood board.");
  const [services, setServices] = useState<ServiceItem[]>(defaultServices());

  const activeServiceCategories = services.map((entry) => entry.category);

  const updateService = (category: ServiceKey, key: keyof ServiceItem, value: string | number) => {
    setServices((current) =>
      current.map((item) =>
        item.category === category
          ? { ...item, [key]: key === "rate" || key === "quantity" ? Number(value) || 0 : value }
          : item
      )
    );
  };

  const toggleCategory = (category: ServiceKey) => {
    setServices((current) => {
      const exists = current.some((item) => item.category === category);
      if (exists) return current.filter((item) => item.category !== category);

      return [
        ...current,
        {
          category,
          description: serviceDefaults[category],
          date: invoiceDate || "2026-12-18",
          time: "18:00",
          rate: 0,
          quantity: 1,
        },
      ];
    });
  };

  const subtotal = services.reduce((sum, item) => sum + Number(item.rate || 0) * Number(item.quantity || 0), 0);
  const totalAmount = subtotal;
  const balanceDue = Math.max(totalAmount - Number(advancePaid || 0), 0);
  const eventLabel = eventType === "OTHER" ? eventTypeOther || "OTHER" : eventType;

  const handleDownload = async () => {
    if (typeof window === "undefined") return;

    const element = previewRef.current;
    if (!element || isDownloading) return;

    const originalWidth = element.style.width;
    const originalMargin = element.style.margin;
    const originalMaxWidth = element.style.maxWidth;

    setIsDownloading(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      element.style.width = "794px";
      element.style.maxWidth = "794px";
      element.style.margin = "0 auto";

      await new Promise((resolve) => setTimeout(resolve, 100));

      const pdfBlob = await html2pdf()
        .set({
          margin: [0.15, 0.15, 0.15, 0.15],
          filename: `invoice-${invoiceNumber || "draft"}.pdf`,
          image: {
            type: "jpeg",
            quality: 0.98,
          },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            width: 794,
            windowWidth: 794,
            scrollX: 0,
            scrollY: 0,
          },
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait",
            compress: true,
          },
          pagebreak: {
            mode: ["css", "legacy"],
          },
        })
        .from(element)
        .output("blob");

      const url = URL.createObjectURL(pdfBlob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `invoice-${invoiceNumber || "draft"}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Unable to download the invoice. Please try again.");
    } finally {
      element.style.width = originalWidth;
      element.style.maxWidth = originalMaxWidth;
      element.style.margin = originalMargin;
      setIsDownloading(false);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[440px_minmax(0,1fr)]">
      <div className="space-y-6 border border-border bg-card p-5 shadow-soft">
        <div>
          <h2 className="font-serif text-xl tracking-wide">Bill Generator</h2>
          <p className="mt-2 text-sm text-muted-foreground">Create a client invoice with live totals.</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="eyebrow block">Event Type</label>
            <select
              className={`mt-2 ${field}`}
              value={eventType}
              onChange={(e) => setEventType(e.target.value as EventTypeOption)}
            >
              <option value="HOUSEWARMING CEREMONY">HOUSEWARMING CEREMONY</option>
              <option value="BABY SHOWER">BABY SHOWER</option>
              <option value="BIRTHDAY">BIRTHDAY</option>
              <option value="WEDDING">WEDDING</option>
              <option value="OTHER">OTHER</option>
            </select>
            {eventType === "OTHER" && (
              <input
                type="text"
                value={eventTypeOther}
                onChange={(e) => setEventTypeOther(e.target.value)}
                placeholder="Please specify event type"
                className={`mt-2 ${field}`}
              />
            )}
          </div>

          <div>
            <label className="eyebrow block">Service Categories</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["DECORATION", "EVENT MANAGEMENT", "CATERING"] as ServiceKey[]).map((category) => {
                const active = activeServiceCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`rounded-full border px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] transition-colors ${
                      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-transparent text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {services.map((item) => (
              <div key={item.category} className="rounded-md border border-border bg-background p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-medium uppercase tracking-[0.12em] text-muted-foreground">{item.category}</p>
                  <button type="button" onClick={() => toggleCategory(item.category)} className="text-[0.6rem] uppercase tracking-[0.16em] text-destructive">
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="eyebrow block text-[0.62rem]">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateService(item.category, "description", e.target.value)}
                      rows={2}
                      className={`mt-1 ${field}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="eyebrow block text-[0.62rem]">Date</label>
                      <input
                        type="date"
                        value={item.date}
                        onChange={(e) => updateService(item.category, "date", e.target.value)}
                        className={`mt-1 ${field}`}
                      />
                    </div>
                    <div>
                      <label className="eyebrow block text-[0.62rem]">Time</label>
                      <input
                        type="time"
                        value={item.time}
                        onChange={(e) => updateService(item.category, "time", e.target.value)}
                        className={`mt-1 ${field}`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="eyebrow block text-[0.62rem]">Rate</label>
                      <input
                        type="number"
                        min="0"
                        value={item.rate}
                        onChange={(e) => updateService(item.category, "rate", Number(e.target.value))}
                        className={`mt-1 ${field}`}
                      />
                    </div>
                    <div>
                      <label className="eyebrow block text-[0.62rem]">Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateService(item.category, "quantity", Number(e.target.value))}
                        className={`mt-1 ${field}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="eyebrow block">Client Name</label>
              <input value={clientName} onChange={(e) => setClientName(e.target.value)} className={`mt-2 ${field}`} />
            </div>
            <div>
              <label className="eyebrow block">Mobile</label>
              <input value={mobile} onChange={(e) => setMobile(e.target.value)} className={`mt-2 ${field}`} />
            </div>
            <div className="sm:col-span-2">
              <label className="eyebrow block">Location / Venue</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} className={`mt-2 ${field}`} />
            </div>
            <div>
              <label className="eyebrow block">Invoice Number</label>
              <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className={`mt-2 ${field}`} />
            </div>
            <div>
              <label className="eyebrow block">Invoice Date</label>
              <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className={`mt-2 ${field}`} />
            </div>
            <div>
              <label className="eyebrow block">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as InvoiceStatus)} className={`mt-2 ${field}`}>
                <option value="DRAFT">DRAFT</option>
                <option value="SENT">SENT</option>
                <option value="PAID">PAID</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border border-border bg-background p-4">
            <h3 className="font-medium uppercase tracking-[0.18em] text-muted-foreground">Payment Information</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="eyebrow block">Advance Paid</label>
                <input
                  type="number"
                  min="0"
                  value={advancePaid}
                  onChange={(e) => setAdvancePaid(Number(e.target.value) || 0)}
                  className={`mt-2 ${field}`}
                />
              </div>
              <div>
                <label className="eyebrow block">Status</label>
                <input value={status} className={`mt-2 ${field}`} readOnly />
              </div>
            </div>
            <div className="mt-3">
              <label className="eyebrow block">Payment Notes</label>
              <textarea value={paymentNotes} onChange={(e) => setPaymentNotes(e.target.value)} rows={3} className={`mt-2 ${field}`} />
            </div>
          </div>

          <div>
            <label className="eyebrow block">Remarks</label>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={4} className={`mt-2 ${field}`} />
          </div>
        </div>
      </div>

      <div className="border border-border bg-card p-4 shadow-soft">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-serif text-xl tracking-wide">Live Preview</h2>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-secondary px-4 py-2 text-[0.64rem] uppercase tracking-[0.2em] text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>
        </div>

        <div style={{ width: "100%", maxWidth: 794, margin: "0 auto", overflowX: "auto" }}>
          <div
            ref={previewRef}
            style={{
              width: 794,
              minHeight: 1123,
              background: "#ffffff",
              color: "#1e1a17",
              fontFamily: '"Segoe UI", Arial, sans-serif',
              overflow: "hidden",
              lineHeight: 1.45,
              boxShadow: "0 15px 35px rgba(30,22,18,0.08)",
              border: "1px solid #eadfce",
              margin: "0 auto",
              boxSizing: "border-box",
              padding: 0,
            }}
          >
            <div style={{ padding: "20px 22px 12px", borderBottom: "1px solid #E7D7B5" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 18 }}>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 1.1, color: "#B8863B", fontFamily: "Georgia, serif" }}>
                    {STUDIO.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#6b5d4b", marginTop: 4 }}>{STUDIO.address}</div>
                  <div style={{ fontSize: 11, color: "#6b5d4b" }}>
                    {STUDIO.phone} · {STUDIO.email}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.4, color: "#8d7a65", fontWeight: 700 }}>Invoice</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#B8863B", fontFamily: "Georgia, serif" }}>BILL</div>
                </div>
              </div>
            </div>

            <div style={{ padding: "18px 22px 8px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 14 }}>
                <div style={{ border: "1px solid #e7d7b5", background: "#fffaf2", padding: 12 }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#8d7a65", fontWeight: 700 }}>Bill To</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8, fontFamily: "Georgia, serif" }}>{clientName || "Client Name"}</div>
                  <div style={{ fontSize: 11, marginTop: 6 }}>{mobile || "Mobile"}</div>
                  <div style={{ fontSize: 11 }}>{location || "Location / Venue"}</div>
                  <div style={{ fontSize: 11, marginTop: 6, color: "#B8863B", fontWeight: 600 }}>{eventLabel}</div>
                </div>

                <div style={{ border: "1px solid #e7d7b5", background: "#fffaf2", padding: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, fontSize: 11, lineHeight: 1.8 }}>
                    <span style={{ color: "#7d6955" }}>Invoice No.</span>
                    <strong>{invoiceNumber || "INV-000"}</strong>
                    <span style={{ color: "#7d6955" }}>Invoice Date</span>
                    <strong>{invoiceDate || "--"}</strong>
                    <span style={{ color: "#7d6955" }}>Status</span>
                    <strong>{status}</strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 18, border: "1px solid #e7d7b5", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: "#f7efe2" }}>
                      <th style={{ padding: "8px 8px", textAlign: "left", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, color: "#6b5849" }}>Service</th>
                      <th style={{ padding: "8px 8px", textAlign: "left", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, color: "#6b5849" }}>Description</th>
                      <th style={{ padding: "8px 8px", textAlign: "center", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, color: "#6b5849" }}>Date</th>
                      <th style={{ padding: "8px 8px", textAlign: "center", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, color: "#6b5849" }}>Time</th>
                      <th style={{ padding: "8px 8px", textAlign: "right", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, color: "#6b5849" }}>Rate</th>
                      <th style={{ padding: "8px 8px", textAlign: "center", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, color: "#6b5849" }}>Qty</th>
                      <th style={{ padding: "8px 8px", textAlign: "right", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, color: "#6b5849" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((item) => (
                      <tr key={item.category} style={{ borderTop: "1px solid #f0e0c3" }}>
                        <td style={{ padding: "8px 8px", fontWeight: 600, wordBreak: "break-word" }}>{item.category}</td>
                        <td style={{ padding: "8px 8px", wordBreak: "break-word" }}>{item.description}</td>
                        <td style={{ padding: "8px 8px", textAlign: "center", whiteSpace: "nowrap" }}>{item.date}</td>
                        <td style={{ padding: "8px 8px", textAlign: "center", whiteSpace: "nowrap" }}>{item.time}</td>
                        <td style={{ padding: "8px 8px", textAlign: "right", whiteSpace: "nowrap" }}>₹{Number(item.rate || 0).toLocaleString("en-IN")}</td>
                        <td style={{ padding: "8px 8px", textAlign: "center", whiteSpace: "nowrap" }}>{item.quantity}</td>
                        <td style={{ padding: "8px 8px", textAlign: "right", fontWeight: 600, whiteSpace: "nowrap" }}>
                          ₹{(Number(item.rate || 0) * Number(item.quantity || 0)).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ background: "#f9f3e8", fontWeight: 700 }}>
                      <td colSpan={6} style={{ padding: "9px 8px", textAlign: "right" }}>Sum Total</td>
                      <td style={{ padding: "9px 8px", textAlign: "right" }}>₹{subtotal.toLocaleString("en-IN")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 14, marginTop: 18 }}>
                <div style={{ border: "1px solid #e7d7b5", background: "#fffaf2", padding: 12 }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.4, color: "#8d7a65", fontWeight: 700 }}>Payment Information</div>
                  <div style={{ marginTop: 8, fontSize: 11, lineHeight: 1.8 }}>
                    <div><strong>Bank:</strong> {STUDIO.bankName}</div>
                    <div><strong>Account Name:</strong> {STUDIO.accountName}</div>
                    <div><strong>Account Number:</strong> {STUDIO.accountNumber}</div>
                    <div><strong>IFSC:</strong> {STUDIO.ifsc}</div>
                    <div><strong>Branch:</strong> {STUDIO.branch}</div>
                  </div>
                </div>

                <div style={{ border: "1px solid #e7d7b5", background: "#fffaf2", padding: 12 }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.4, color: "#8d7a65", fontWeight: 700 }}>Totals</div>
                  <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr auto", rowGap: 6, fontSize: 11 }}>
                    <span>Subtotal</span>
                    <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
                    <span>Total Amount</span>
                    <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
                    <span>Advance Paid</span>
                    <strong>₹{Number(advancePaid || 0).toLocaleString("en-IN")}</strong>
                    <span style={{ color: "#B8863B", fontWeight: 700 }}>Balance Due</span>
                    <strong style={{ color: "#B8863B" }}>₹{balanceDue.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>

              {remarks && remarks.trim() && (
                <div style={{ marginTop: 18, border: "1px solid #e7d7b5", padding: 12, background: "#fffaf2" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.4, color: "#8d7a65", fontWeight: 700 }}>Remarks</div>
                  <div style={{ marginTop: 8, fontSize: 11, whiteSpace: "pre-wrap" }}>{remarks}</div>
                </div>
              )}
            </div>

            <div style={{ pageBreakBefore: "always", breakBefore: "page", padding: "22px 24px 18px", background: "#fff" }}>
              <div style={{ borderTop: "1px solid #e7d7b5", paddingTop: 18 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#B8863B", fontFamily: "Georgia, serif" }}>Terms &amp; Conditions</div>
                <div style={{ marginTop: 12, fontSize: 11, lineHeight: 1.8, color: "#2c2927" }}>
                  <div><strong>Contract Terms:</strong> All services are subject to final confirmation, scheduling, and vendor availability. Any additions or modifications must be approved in writing.</div>
                  <div style={{ marginTop: 8 }}><strong>Cancellation Policy:</strong> Deposits are non-refundable once the booking has been confirmed. Any cancellation after confirmation will follow the agreed cancellation schedule as per the signed contract.</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 26 }}>
                  <div style={{ borderTop: "1px solid #b58b43", paddingTop: 8 }}>
                    <div style={{ fontSize: 11, color: "#6d5b48" }}>Customer Signature</div>
                  </div>
                  <div style={{ borderTop: "1px solid #b58b43", paddingTop: 8 }}>
                    <div style={{ fontSize: 11, color: "#6d5b48" }}>Authorised Signature</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 110, textAlign: "center", fontSize: 12, color: "#7d6955", fontStyle: "italic" }}>Thank you for your business!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


