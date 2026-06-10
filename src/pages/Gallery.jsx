import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const filters = ["All", "Interiors", "Exteriors", "Amenities", "Aerial", "Neighbourhood"];

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=85", tag: "Interior", title: "Karen Villa — living room", cls: "m1" },
  { id: 2, src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80", tag: "Exterior", title: "Runda estate", cls: "m2" },
  { id: 3, src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500&q=80", tag: "Interior", title: "Westlands penthouse", cls: "m3" },
  { id: 4, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80", tag: "Amenities", title: "Chef's kitchen", cls: "m4" },
  { id: 5, src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80", tag: "Interior", title: "Master bedroom suite", cls: "m5" },
  { id: 6, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", tag: "Exterior", title: "Karen luxury villa", cls: "m6" },
  { id: 7, src: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&q=80", tag: "Aerial", title: "Muthaiga overview", cls: "m7" },
  { id: 8, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80", tag: "Exterior", title: "Garden terrace", cls: "m8" },
  { id: 9, src: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=500&q=80", tag: "Amenities", title: "Infinity pool", cls: "m9" },
  { id: 10, src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", tag: "Interior", title: "Kilimani apartment — open plan", cls: "m10" },
  { id: 11, src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80", tag: "Exterior", title: "Runda driveway entrance", cls: "m11" },
  { id: 12, src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&q=80", tag: "Interior", title: "En-suite bathroom", cls: "m12" },
  { id: 13, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80", tag: "Interior", title: "Study / home office", cls: "m13" },
  { id: 14, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80", tag: "Amenities", title: "Private gym", cls: "m14" },
];

const locations = [
  { name: "Karen", count: 14, src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&q=80" },
  { name: "Westlands", count: 9, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80" },
  { name: "Kilimani", count: 11, src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80" },
  { name: "Runda", count: 7, src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&q=80" },
];

const stats = [
  { num: "01", label: "Properties photographed", value: "38 estates" },
  { num: "02", label: "Neighbourhoods", value: "6 locations" },
  { num: "03", label: "Photography style", value: "Architectural" },
];

// CSS-in-JS for the mosaic grid spans (can't use dynamic Tailwind classes)
const mosaicStyles = `
  .mosaic { display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: 80px; gap: 2px; padding: 2px; }
  .m1  { grid-column: span 5; grid-row: span 6; }
  .m2  { grid-column: span 4; grid-row: span 4; }
  .m3  { grid-column: span 3; grid-row: span 4; }
  .m4  { grid-column: span 3; grid-row: span 4; }
  .m5  { grid-column: span 4; grid-row: span 4; }
  .m6  { grid-column: span 5; grid-row: span 5; }
  .m7  { grid-column: span 4; grid-row: span 5; }
  .m8  { grid-column: span 3; grid-row: span 3; }
  .m9  { grid-column: span 3; grid-row: span 3; }
  .m10 { grid-column: span 6; grid-row: span 4; }
  .m11 { grid-column: span 6; grid-row: span 4; }
  .m12 { grid-column: span 4; grid-row: span 3; }
  .m13 { grid-column: span 4; grid-row: span 3; }
  .m14 { grid-column: span 4; grid-row: span 3; }
`;

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const visible = active === "All" ? images : images.filter(i => i.tag === active);

  return (
    <main className="bg-[#F7F3EC] text-[#0F0E0C]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
      <style>{mosaicStyles}</style>

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#E0DAD0]">
        <div className="p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#E0DAD0]">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-5 h-px bg-[#C4603A]" />
            <span className="text-[10px] tracking-[0.26em] uppercase text-[#C4603A]">Visual portfolio</span>
          </div>
          <h1
            className="font-light leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(52px,6.5vw,84px)", letterSpacing: "-0.01em" }}
          >
            Spaces<br />
            <span style={{ fontStyle: "normal" }}>that speak.</span>
          </h1>
        </div>
        <div className="p-14 lg:p-16 flex flex-col justify-between">
          <div
            className="text-[#EDE8DF] leading-none select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "88px", letterSpacing: "0.02em" }}
          >
            124
          </div>
          <p className="text-[14px] text-[#9A9488] leading-[1.85] max-w-[360px]">
            A curated edit of interiors, exteriors, and perspectives from our most exceptional properties across Nairobi and beyond.
          </p>
        </div>
      </div>

      {/* ── FILTER BAR ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-14 py-5 border-b border-[#E0DAD0] flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-[11px] tracking-[0.08em] px-5 py-2 border transition-all duration-180 ${
                active === f
                  ? "bg-[#0F0E0C] text-[#F7F3EC] border-[#0F0E0C]"
                  : "bg-transparent text-[#9A9488] border-[#E0DAD0] hover:border-[#CAC5BB] hover:text-[#0F0E0C]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-[#9A9488] tracking-wider">
          {visible.length} images
        </span>
      </div>

      {/* ── MOSAIC GALLERY ───────────────────────────────────────────── */}
      {active === "All" ? (
        <div className="mosaic">
          {images.map(img => (
            <div
              key={img.id}
              className={`${img.cls} overflow-hidden cursor-pointer relative group`}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.06]"
                style={{ transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: "rgba(15,14,12,0.55)" }}
              >
                <div
                  className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <div className="text-[9px] tracking-[0.22em] uppercase text-[#E07A52] mb-1">{img.tag}</div>
                  <div
                    className="text-[#F7F3EC] text-[16px] leading-[1.2]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
                  >
                    {img.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Uniform grid for filtered view */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px p-px">
          {visible.map(img => (
            <div
              key={img.id}
              className="overflow-hidden cursor-pointer relative group"
              style={{ height: "280px" }}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(15,14,12,0.55)" }}
              >
                <div className="text-[9px] tracking-[0.22em] uppercase text-[#E07A52] mb-1">{img.tag}</div>
                <div
                  className="text-[#F7F3EC] text-[16px] leading-[1.2]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
                >
                  {img.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── EDITORIAL STRIP ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-[#E0DAD0]">
        {stats.map((s, i) => (
          <div
            key={s.num}
            className={`px-10 py-10 flex flex-col gap-3 ${i < 2 ? "border-b md:border-b-0 md:border-r border-[#E0DAD0]" : ""}`}
          >
            <div
              className="text-[11px] tracking-[0.22em] text-[#CAC5BB]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {s.num} — Collection
            </div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#9A9488]">{s.label}</div>
            <div
              className="font-light text-[28px] text-[#0F0E0C] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* ── BY LOCATION ──────────────────────────────────────────────── */}
      <div className="px-14 pt-14 pb-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="block w-5 h-px bg-[#C4603A]" />
          <span className="text-[10px] tracking-[0.26em] uppercase text-[#C4603A]">Browse by location</span>
        </div>
        <h2
          className="font-light leading-none mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.01em" }}
        >
          Find your <span style={{ fontStyle: "normal" }}>neighbourhood.</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-[#E0DAD0]">
        {locations.map((loc, i) => (
          <div
            key={loc.name}
            className={`relative overflow-hidden cursor-pointer group ${i < 3 ? "border-r border-[#E0DAD0]" : ""}`}
            style={{ height: "280px" }}
          >
            <img
              src={loc.src}
              alt={loc.name}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-500"
              style={{ filter: "saturate(0.5)", transition: "filter 0.4s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}
              onMouseEnter={e => e.currentTarget.style.filter = "saturate(0.8)"}
              onMouseLeave={e => e.currentTarget.style.filter = "saturate(0.5)"}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-5"
              style={{ background: "linear-gradient(to top, rgba(15,14,12,0.75), transparent)" }}
            >
              <div
                className="text-[#F7F3EC] text-[20px] font-light leading-none mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
              >
                {loc.name}
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(247,243,236,0.55)" }}>
                {loc.count} properties
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(15,14,12,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl w-full mx-8" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.src.replace(/w=\d+/, "w=1400")}
              alt={lightbox.title}
              className="w-full object-contain"
              style={{ maxHeight: "80vh" }}
            />
            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="text-[9px] tracking-[0.24em] uppercase text-[#E07A52] mb-1">{lightbox.tag}</div>
                <div
                  className="text-[#F7F3EC] text-[18px]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
                >
                  {lightbox.title}
                </div>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-[11px] tracking-[0.2em] uppercase text-[rgba(247,243,236,0.4)] hover:text-[#F7F3EC] transition-colors px-4 py-2 border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.4)]"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER STRIP ─────────────────────────────────────────────── */}
      <div className="border-t border-[#E0DAD0] px-14 py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] text-[#CAC5BB]">
          <MapPin size={12} className="text-[#C4603A]" />
          Karen · Westlands · Kilimani · Runda · Muthaiga · and beyond
        </div>
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#CAC5BB]">
          VistaHaven © {new Date().getFullYear()}
        </div>
      </div>
    </main>
  );
}