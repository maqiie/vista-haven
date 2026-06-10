import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import PropertyCard from "../components/property/PropertyCard";
import { properties } from "../data/properties";

const featured = properties.filter(p => p.featured);

const services = [
  { num: "01", title: "Investment advisory", desc: "Data-driven insights to identify high-yield opportunities across Nairobi's evolving real estate landscape." },
  { num: "02", title: "Full transaction support", desc: "From legal due diligence to title transfer, we handle every step so your purchase is secure and seamless." },
  { num: "03", title: "Premium listings", desc: "Exclusive access to off-market properties and curated listings not found on public platforms." },
];

const locations = ["Karen", "Westlands", "Kilimani", "Runda", "Muthaiga"];

export default function Home() {
  return (
    <main className="bg-[#F7F3EC] text-[#0F0E0C]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh] border-b border-[#E0DAD0]">

        {/* Left */}
        <div className="flex flex-col justify-between p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#E0DAD0]">
          {/* Giant counter as background texture */}
          <div
            className="text-[#EDE8DF] select-none leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(120px,18vw,210px)", letterSpacing: "-0.01em" }}
          >
            400
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-5 h-px bg-[#C4603A]" />
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#C4603A]">Nairobi's premier platform</span>
            </div>
            <h1
              className="text-[clamp(52px,6vw,80px)] font-light leading-[1.0] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", letterSpacing: "-0.01em" }}
            >
              Every property.<br />
              <span style={{ fontStyle: "normal" }}>One destination.</span>
            </h1>
            <p className="text-[14px] text-[#9A9488] max-w-[380px] leading-[1.85] mb-10">
              Residential, commercial, and investment properties — curated for buyers, tenants, and investors who know what they want.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/properties"
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-normal px-8 py-4 bg-[#C4603A] text-white hover:bg-[#E07A52] transition-all duration-200"
              >
                Browse properties
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-normal px-7 py-4 border border-[#E0DAD0] text-[#0F0E0C] hover:border-[#0F0E0C] transition-all duration-200"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>

        {/* Right — split into image + stats */}
        <div className="grid grid-rows-[1fr_auto]">
          <div className="overflow-hidden min-h-[320px] border-b border-[#E0DAD0] group">
            <img
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=85"
              alt="Featured property"
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
            />
          </div>
          <div className="bg-[#0F0E0C] px-12 py-10 flex flex-col justify-between gap-6">
            <span className="text-[10px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.3)]">Track record</span>
            <div className="flex gap-10 flex-wrap">
              {[{ v: "12", s: "yrs", l: "Market experience" }, { v: "98", s: "%", l: "Client satisfaction" }, { v: "2B", s: "+", l: "KSh transactions" }].map((stat, i) => (
                <div key={i}>
                  <div
                    className="text-[#F7F3EC] leading-none mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px", letterSpacing: "0.04em" }}
                  >
                    {stat.v}<span style={{ fontSize: "22px" }}>{stat.s}</span>
                  </div>
                  <div className="text-[9px] tracking-[0.24em] uppercase text-[#CAC5BB]">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LISTINGS ────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-[240px_1fr] border-b border-[#E0DAD0]">
        {/* Sidebar */}
        <aside className="p-12 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#E0DAD0] flex flex-col gap-8">
          <div
            className="text-[13px] tracking-[0.2em] uppercase text-[#9A9488]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Filter
          </div>
          {[
            { label: "Type", pills: ["All", "For sale", "To let"] },
            { label: "Category", pills: ["All", "Residential", "Commercial"] },
            { label: "Area", pills: locations },
          ].map(group => (
            <div key={group.label} className="flex flex-col gap-3">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#9A9488]">{group.label}</div>
              <div className="flex flex-wrap gap-2">
                {group.pills.map((pill, i) => (
                  <span
                    key={pill}
                    className={`text-[11px] tracking-[0.06em] px-3 py-1.5 cursor-pointer transition-all ${
                      i === 0
                        ? "bg-[#0F0E0C] text-[#F7F3EC]"
                        : "bg-[#EDE8DF] text-[#0F0E0C] hover:bg-[#E0DAD0]"
                    }`}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Listings grid */}
        <div className="p-10 lg:p-12">
          <div className="flex items-baseline justify-between mb-10">
            <h2
              className="font-light leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,3.5vw,38px)", fontStyle: "italic" }}
            >
              Featured <span style={{ fontStyle: "normal" }}>properties</span>
            </h2>
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#9A9488] cursor-pointer">Sort by price ↕</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featured.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section className="border-b border-[#E0DAD0]">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#E0DAD0]">
          <div className="p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#E0DAD0]">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-5 h-px bg-[#C4603A]" />
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#C4603A]">What we offer</span>
            </div>
            <h2
              className="font-light leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(44px,6vw,68px)", letterSpacing: "-0.01em" }}
            >
              Beyond<br />the listing.
            </h2>
          </div>
          <div className="overflow-hidden min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.55) brightness(0.9)" }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.num}
              className={`p-12 hover:bg-[#EDE8DF] transition-colors duration-250 ${i < 2 ? "border-b md:border-b-0 md:border-r border-[#E0DAD0]" : ""}`}
            >
              <div
                className="text-[#E0DAD0] leading-none mb-5 select-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "64px" }}
              >
                {s.num}
              </div>
              <h3
                className="font-light text-[22px] text-[#0F0E0C] mb-3 leading-[1.2]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
              >
                {s.title}
              </h3>
              <p className="text-[12px] text-[#9A9488] leading-[1.9]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#0F0E0C] p-14 lg:p-16 flex flex-col justify-between gap-14">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-5 h-px bg-[#C4603A]" />
              <span className="text-[10px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.35)]">List with us</span>
            </div>
            <h2
              className="font-light leading-[1.08] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(36px,4.5vw,54px)", color: "#F7F3EC" }}
            >
              Have a property to sell or let?
            </h2>
            <p className="text-[14px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.4)" }}>
              List with VistaHaven and reach thousands of verified buyers and tenants. We handle the presentation — you make the decision.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-normal px-8 py-4 bg-[#C4603A] text-white hover:bg-[#E07A52] transition-all duration-200"
            >
              Get in touch
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/properties"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-normal px-7 py-4 border text-[rgba(255,255,255,0.6)] hover:text-white transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              View listings
            </Link>
          </div>
        </div>
        <div className="overflow-hidden min-h-[360px] relative">
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.5)" }}
          />
        </div>
      </section>

      {/* ── FOOTER STRIP ────────────────────────────────────────────── */}
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