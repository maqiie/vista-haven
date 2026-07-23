import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import PropertyCard from "../components/property/PropertyCard";
import { properties } from "../data/properties";

const featured = properties.filter(p => p.featured);

const services = [
  { num: "01", title: "Investment advisory",       desc: "Data-driven insights to identify high-yield opportunities across Nairobi's evolving real estate landscape." },
  { num: "02", title: "Full transaction support",  desc: "From legal due diligence to title transfer, we handle every step so your purchase is secure and seamless." },
  { num: "03", title: "Premium listings",          desc: "Exclusive access to off-market properties and curated listings not found on public platforms." },
];

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=85",  tag: "Interior",  title: "Karen Villa — living room",   col: "1 / span 5", row: "1 / span 2" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80",  tag: "Exterior",  title: "Runda estate",                col: "6 / span 4", row: "1 / span 1" },
  { src: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=500&q=80",  tag: "Amenities", title: "Infinity pool",               col: "10 / span 3", row: "1 / span 1" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",    tag: "Amenities", title: "Chef's kitchen",              col: "6 / span 3", row: "2 / span 1" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", tag: "Exterior",  title: "Karen luxury villa",          col: "9 / span 4", row: "2 / span 1" },
];

const locations = ["Karen", "Westlands", "Kilimani", "Runda", "Muthaiga"];

const neighborhoods = [
  { name: "Karen",      desc: "Leafy acreage living, minutes from the city on horseback or by road.",         img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80" },
  { name: "Westlands",  desc: "Nairobi's commercial pulse, with high-rise living above the noise.",           img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=700&q=80" },
  { name: "Kilimani",   desc: "Dense, walkable, and increasingly vertical — a favourite with professionals.", img: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=700&q=80" },
  { name: "Runda",      desc: "Diplomatic quiet behind hedges, on some of the city's largest private plots.", img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=700&q=80" },
];

const testimonials = [
  { quote: "They found us a villa in Karen before it ever hit the public listings. Worth every shilling.", name: "A. Mwangi",  role: "Buyer, Karen" },
  { quote: "Due diligence was airtight. Title transfer closed in three weeks, no surprises.",              name: "S. Odhiambo", role: "Investor, Kilimani" },
  { quote: "We listed on a Friday and had three serious offers by Monday.",                                 name: "N. Wafula",   role: "Seller, Westlands" },
];

const process = [
  { num: "01", title: "Consultation",         desc: "We start with your budget, timeline, and non-negotiables." },
  { num: "02", title: "Curated shortlist",    desc: "A short list of properties that actually match, including off-market options." },
  { num: "03", title: "Viewings & diligence", desc: "Site visits, legal checks, and title verification, handled end to end." },
  { num: "04", title: "Close & handover",     desc: "Contracts, transfer, and keys in hand — with support after you move in." },
];

const F = "'Cormorant Garamond', Georgia, serif";
const B = "'Bebas Neue', sans-serif";
const RUST = "#C4603A";
const RUST2 = "#D06B43";
const INK  = "#0D0C0A";
const SAND = "#F7F3ED";
const RULE = "#DDD8CF";
const MUTE = "#9A9488";
const DIM  = "#B8B3AB";

/* ---------- scroll-reveal hook ---------- */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setVisible(true); return; }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(node);
        }
      },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

const Reveal = ({ children, delay = 0, style, as: Tag = "div" }) => {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};

const Eyebrow = ({ children, light }) => (
  <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"1.6rem" }}>
    <span style={{ display:"block", width:"24px", height:"1px", background: light ? "rgba(255,255,255,0.35)" : RUST, flexShrink:0 }} />
    <span style={{ fontSize:"9.5px", letterSpacing:"0.3em", textTransform:"uppercase", color: light ? "rgba(255,255,255,0.4)" : RUST, fontWeight:400 }}>{children}</span>
  </div>
);

const Btn = ({ to, filled, children, light }) => {
  const [hover, setHover] = useState(false);
  const base = {
    display:"inline-flex", alignItems:"center", gap:"10px",
    fontSize:"10.5px", letterSpacing:"0.22em", textTransform:"uppercase",
    padding:"14px 28px", textDecoration:"none", transition:"all 0.18s", fontWeight:400,
  };
  const styles = filled
    ? { ...base, background: hover ? RUST2 : RUST, color:"#fff", boxShadow: hover ? "0 8px 22px -8px rgba(196,96,58,0.55)" : "0 4px 14px -8px rgba(196,96,58,0.35)" }
    : light
      ? { ...base, border:`1px solid ${hover ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.16)"}`, color: hover ? "#fff" : "rgba(255,255,255,0.52)" }
      : { ...base, border:`1px solid ${hover ? INK : RULE}`, color: INK };
  return (
    <Link to={to} className="vh-btn" style={styles} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
    </Link>
  );
};

export default function Home() {
  const [hov, setHov] = useState(null);
  const [filt, setFilt] = useState({ type:"All", category:"All", area:"All" });

  return (
    <main className="vh-home" style={{ background: SAND, color: INK, fontFamily:"'Inter', sans-serif", fontWeight:300, lineHeight:1 }}>
      <style>{`
        .vh-home *:focus-visible {
          outline: 2px solid ${RUST};
          outline-offset: 2px;
        }
        .vh-btn:focus-visible { outline-offset: 3px; }

        .vh-hero { display:grid; grid-template-columns: 55fr 45fr; min-height:100vh; border-bottom:1px solid ${RULE}; }
        .vh-hero-left { border-right:1px solid ${RULE}; }
        .vh-hero-right-photo img { transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); }
        .vh-hero-right-photo:hover img { transform: scale(1.05); }
        .vh-stats { display:grid; grid-template-columns:repeat(3,1fr); }

        .vh-listings { display:grid; grid-template-columns:200px 1fr; border-bottom:1px solid ${RULE}; }
        .vh-listings-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:18px; }

        .vh-services-header { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid ${RULE}; }
        .vh-services-cards { display:grid; grid-template-columns:repeat(3,1fr); }
        .vh-service-card { transition: background 0.22s, transform 0.22s; }
        .vh-service-card:hover { background:#EDE8DF; transform: translateY(-3px); }
        .vh-service-card:hover .vh-service-arrow { opacity: 0.65 !important; transform: translate(2px,-2px); }
        .vh-service-arrow { transition: opacity 0.2s, transform 0.2s; }

        .vh-gallery-header { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid ${RULE}; }
        .vh-gallery-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; }
        .vh-mosaic { display:grid; grid-template-columns:repeat(12,1fr); grid-auto-rows:120px; gap:2px; background:${INK}; }
        .vh-mosaic-item img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s; }

        .vh-loc-strip { display:flex; border-top:1px solid ${RULE}; overflow-x:auto; scrollbar-width:none; }
        .vh-loc-strip::-webkit-scrollbar { display:none; }

        .vh-cta { display:grid; grid-template-columns:1fr 1fr; }

        .vh-footer { border-top:1px solid ${RULE}; padding:1.25rem 4rem; display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; }

        /* ---- modern touches: bento radius, glow, marquee ---- */
        .vh-mosaic-item { border-radius: 8px; }

        .vh-glow { position:absolute; width:420px; height:420px; border-radius:50%; filter: blur(70px); pointer-events:none; z-index:0; }

        @keyframes vh-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .vh-marquee-wrap { overflow: hidden; }
        .vh-marquee-track { display:flex; align-items:center; gap:56px; width:max-content; animation: vh-marquee 26s linear infinite; }
        .vh-marquee-wrap:hover .vh-marquee-track { animation-play-state: paused; }

        /* Neighborhoods */
        .vh-neigh-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; background:${RULE}; }
        .vh-neigh-card { background:${SAND}; }
        .vh-neigh-img { overflow:hidden; border-radius:10px; margin:14px 14px 0; position:relative; height:200px; }
        .vh-neigh-img img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .vh-neigh-card:hover .vh-neigh-img img { transform: scale(1.07); }

        /* Process timeline */
        .vh-process-row { position:relative; display:grid; grid-template-columns:repeat(4,1fr); }
        .vh-process-line { position:absolute; top:4px; left:0; right:0; height:1px; background:${RULE}; z-index:0; }
        .vh-process-step { position:relative; z-index:1; padding:0 2rem; }
        .vh-process-step:first-child { padding-left:0; }
        .vh-process-dot { width:9px; height:9px; border-radius:50%; background:${RUST}; margin-bottom:1.4rem; }

        /* Testimonials */
        .vh-testi-section { position:relative; overflow:hidden; background:${INK}; }
        .vh-testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5px; background:rgba(255,255,255,0.06); position:relative; z-index:1; }
        .vh-testi-card { background:${INK}; padding:2.75rem 2.5rem; transition: background 0.25s; }
        .vh-testi-card:hover { background:#17140F; }

        /* ---------------- Tablet ---------------- */
        @media (max-width: 1024px) {
          .vh-hero { grid-template-columns: 1fr; min-height: auto; }
          .vh-hero-left { border-right:none; border-bottom:1px solid ${RULE}; }
          .vh-hero-content { padding: 3rem 2.5rem 3.5rem !important; }
          .vh-hero-right { grid-template-rows: 340px 120px !important; }

          .vh-listings { grid-template-columns: 1fr; }
          .vh-listings-sidebar { border-right:none !important; border-bottom:1px solid ${RULE}; flex-direction:row !important; flex-wrap:wrap; gap:1.5rem !important; padding:1.5rem 2rem !important; }
          .vh-listings-content { padding: 2.5rem 2rem !important; }
          .vh-listings-grid { grid-template-columns:repeat(2,1fr); }

          .vh-services-header { grid-template-columns:1fr; }
          .vh-services-header > div:first-child { border-right:none !important; border-bottom:1px solid ${RULE}; padding:3rem 2.5rem !important; }
          .vh-services-cards { grid-template-columns:1fr; }
          .vh-service-card { border-right:none !important; border-bottom:1px solid ${RULE}; padding:2.5rem !important; }
          .vh-service-card:last-child { border-bottom:none; }

          .vh-neigh-grid { grid-template-columns:repeat(2,1fr); }
          .vh-process-row { grid-template-columns:repeat(2,1fr); row-gap:2.5rem; }
          .vh-process-line { display:none; }
          .vh-testi-grid { grid-template-columns:1fr; }

          .vh-gallery-header { grid-template-columns:1fr; }
          .vh-gallery-header > div:first-child { border-right:none !important; border-bottom:1px solid ${RULE}; }
          .vh-gallery-header, .vh-gallery-header > div { padding: 3rem 2.5rem !important; }

          .vh-cta { grid-template-columns:1fr; }
          .vh-cta > div:first-child { padding: 3.5rem 2.5rem !important; }
        }

        /* ---------------- Mobile ---------------- */
        @media (max-width: 640px) {
          .vh-hero-content { padding: 2.5rem 1.5rem 3rem !important; }
          .vh-stats { grid-template-columns: 1fr !important; }
          .vh-stats > div { border-left:none !important; border-top:1px solid rgba(255,255,255,0.08); padding: 1.1rem 1.5rem !important; }
          .vh-stats > div:first-child { border-top:none; }

          .vh-listings-sidebar { padding:1.25rem 1.5rem !important; }
          .vh-listings-content { padding: 2rem 1.5rem !important; }
          .vh-listings-grid { grid-template-columns:1fr; }

          .vh-services-header > div:first-child,
          .vh-services-header img { padding:2.5rem 1.5rem !important; }
          .vh-service-card { padding:2rem 1.5rem !important; }

          .vh-neigh-grid { grid-template-columns:1fr; }
          .vh-process-row { grid-template-columns:1fr; row-gap:2rem; }

          .vh-gallery-header, .vh-gallery-header > div { padding:2.5rem 1.5rem !important; }
          .vh-gallery-stats { grid-template-columns:repeat(3,1fr); gap:1rem !important; }
          .vh-mosaic { grid-auto-rows:100px; }
          .vh-mosaic-item { grid-column: span 6 !important; grid-row: span 1 !important; }

          .vh-testi-card { padding:2.25rem 1.5rem !important; }

          .vh-cta > div:first-child { padding:2.5rem 1.5rem !important; }

          .vh-footer { padding:1.25rem 1.5rem !important; justify-content:center !important; text-align:center; }
        }
      `}</style>

      {/* ════════════════════════════════ HERO */}
      <section className="vh-hero">
        <div className="vh-hero-left" style={{ display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
          <div style={{ height:"72px", flexShrink:0 }} />
          <div aria-hidden style={{
            position:"absolute", top:"-28px", left:"-12px",
            fontFamily:B, fontSize:"clamp(140px,24vw,320px)",
            color:"rgba(200,193,182,0.28)", lineHeight:1, letterSpacing:"-0.02em",
            userSelect:"none", pointerEvents:"none", zIndex:0,
          }}>400</div>
          <div className="vh-hero-content" style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"4rem 4.5rem 5rem", position:"relative", zIndex:1 }}>
            <Reveal><Eyebrow>Nairobi's premier platform</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h1 style={{
                fontFamily:F, fontStyle:"italic", fontWeight:300,
                fontSize:"clamp(40px,5.2vw,78px)", lineHeight:1.01,
                letterSpacing:"-0.025em", marginBottom:"1.6rem", color:INK,
              }}>
                Every property.<br />
                <span style={{ fontStyle:"normal" }}>One destination.</span>
              </h1>
            </Reveal>
            <div style={{ width:"40px", height:"2px", background:RUST, marginBottom:"1.6rem" }} />
            <Reveal delay={140}>
              <p style={{ fontSize:"13px", color:MUTE, maxWidth:"350px", lineHeight:1.85, marginBottom:"2.8rem", letterSpacing:"0.01em" }}>
                Residential, commercial, and investment — curated for buyers, tenants, and investors who know what they want.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                <Btn to="/properties" filled>Browse properties <ArrowRight size={12} /></Btn>
                <Btn to="/contact">Contact us</Btn>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="vh-hero-right" style={{ display:"grid", gridTemplateRows:"1fr 120px" }}>
          <div className="vh-hero-right-photo" style={{ overflow:"hidden", position:"relative" }}>
            <img
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=960&q=88"
              alt="Featured property"
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
            />
            <div style={{ position:"absolute", bottom:"20px", left:"20px", background:"rgba(13,12,10,0.7)", backdropFilter:"blur(10px)", padding:"10px 16px" }}>
              <div style={{ fontSize:"8.5px", letterSpacing:"0.26em", textTransform:"uppercase", color:RUST, marginBottom:"4px" }}>Featured</div>
              <div style={{ fontFamily:F, fontStyle:"italic", fontSize:"14px", color:"#F7F3ED" }}>Karen Villa</div>
            </div>
            <div style={{ position:"absolute", top:"20px", right:"20px", width:"36px", height:"36px", border:"1px solid rgba(255,255,255,0.22)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:B, fontSize:"14px", color:"rgba(255,255,255,0.7)", letterSpacing:"0.04em" }}>01</span>
            </div>
          </div>
          <div className="vh-stats" style={{ background:INK }}>
            {[{ v:"12", s:"yrs", l:"Experience" }, { v:"98", s:"%", l:"Satisfaction" }, { v:"2B", s:"+", l:"KSh closed" }].map((st, i) => (
              <div key={st.l} style={{ padding:"0 2rem", display:"flex", flexDirection:"column", justifyContent:"center", borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.08)` : "none" }}>
                <div style={{ fontFamily:B, fontSize:"34px", letterSpacing:"0.04em", color:"#F7F3ED", lineHeight:1, marginBottom:"5px" }}>
                  {st.v}<span style={{ fontSize:"18px", color:RUST }}>{st.s}</span>
                </div>
                <div style={{ fontSize:"8.5px", letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ LISTINGS */}
      <section className="vh-listings">
        <aside className="vh-listings-sidebar" style={{ padding:"2.5rem 2rem", borderRight:`1px solid ${RULE}`, display:"flex", flexDirection:"column", gap:"2rem" }}>
          <span style={{ fontSize:"9px", letterSpacing:"0.26em", textTransform:"uppercase", color:DIM }}>Filter by</span>
          {[
            { label:"Type",     key:"type",     pills:["All","For sale","To let"] },
            { label:"Category", key:"category", pills:["All","Residential","Commercial"] },
            { label:"Area",     key:"area",     pills:locations },
          ].map(g => (
            <div key={g.label} style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              <span style={{ fontSize:"8.5px", letterSpacing:"0.22em", textTransform:"uppercase", color:"#C5BFB7" }}>{g.label}</span>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                {g.pills.map(p => {
                  const on = filt[g.key] === p;
                  return (
                    <button key={p} onClick={() => setFilt(f => ({ ...f, [g.key]:p }))} style={{
                      fontSize:"9.5px", letterSpacing:"0.06em", padding:"5px 10px",
                      cursor:"pointer", border:"none", fontFamily:"'Inter', sans-serif", fontWeight:300,
                      transition:"all 0.14s", background: on ? INK : "#EAE5DC", color: on ? "#F7F3ED" : "#6B6660",
                    }}>{p}</button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        <div className="vh-listings-content" style={{ padding:"3rem 3.5rem" }}>
          <Reveal>
            <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"2rem", paddingBottom:"1.25rem", borderBottom:`1px solid ${RULE}`, flexWrap:"wrap", gap:"0.5rem" }}>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(26px,2.8vw,36px)", fontWeight:300, lineHeight:1 }}>
                Featured <span style={{ fontStyle:"normal" }}>properties</span>
              </h2>
              <span style={{ fontSize:"9.5px", letterSpacing:"0.18em", textTransform:"uppercase", color:MUTE }}>{featured.length} listings</span>
            </div>
          </Reveal>
          <div className="vh-listings-grid">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop:"2rem", display:"flex", justifyContent:"flex-end" }}>
            <Link to="/properties" style={{ display:"inline-flex", alignItems:"center", gap:"7px", fontSize:"9.5px", letterSpacing:"0.2em", textTransform:"uppercase", color:INK, textDecoration:"none", borderBottom:`1px solid ${INK}`, paddingBottom:"2px" }}>
              View all listings <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ SERVICES */}
      <section style={{ borderBottom:`1px solid ${RULE}` }}>
        <div className="vh-services-header">
          <div style={{ padding:"4.5rem 4.5rem", borderRight:`1px solid ${RULE}`, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
            <Reveal><Eyebrow>What we offer</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(36px,5.2vw,68px)", fontWeight:300, lineHeight:1.0, letterSpacing:"-0.025em" }}>
                Beyond<br />the listing.
              </h2>
            </Reveal>
          </div>
          <div style={{ position:"relative", overflow:"hidden", minHeight:"280px" }}>
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=960&q=80" alt=""
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"saturate(0.35) brightness(0.82)" }} />
            <div style={{ position:"absolute", top:0, bottom:0, right:0, width:"3px", background:RUST }} />
          </div>
        </div>
        <div className="vh-services-cards">
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 90} style={{ height: "100%" }}>
              <div
                className="vh-service-card"
                style={{ padding:"3rem 3.5rem", borderRight: i < 2 ? `1px solid ${RULE}` : "none", cursor:"default", position:"relative", height:"100%", boxSizing:"border-box" }}
              >
                <div style={{ fontFamily:B, fontSize:"80px", lineHeight:1, color:RULE, marginBottom:"1.25rem", userSelect:"none", letterSpacing:"-0.01em" }}>{s.num}</div>
                <div style={{ width:"20px", height:"1px", background:RUST, marginBottom:"1rem" }} />
                <h3 style={{ fontFamily:F, fontStyle:"italic", fontSize:"21px", fontWeight:300, color:INK, marginBottom:"0.75rem", lineHeight:1.2 }}>{s.title}</h3>
                <p style={{ fontSize:"12px", color:MUTE, lineHeight:1.92, letterSpacing:"0.01em" }}>{s.desc}</p>
                <div className="vh-service-arrow" style={{ position:"absolute", bottom:"2.5rem", right:"2.5rem", opacity:0.3 }}>
                  <ArrowUpRight size={14} color={INK} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════ NEIGHBORHOODS */}
      <section style={{ borderBottom:`1px solid ${RULE}` }}>
        <div style={{ padding:"4rem 4.5rem 2.5rem", display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem" }}>
          <Reveal>
            <div>
              <Eyebrow>Where we operate</Eyebrow>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(32px,4.4vw,58px)", fontWeight:300, lineHeight:1, letterSpacing:"-0.02em" }}>
                Nairobi's finest <span style={{ fontStyle:"normal" }}>addresses.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link to="/properties" style={{ display:"inline-flex", alignItems:"center", gap:"7px", fontSize:"9.5px", letterSpacing:"0.2em", textTransform:"uppercase", color:INK, textDecoration:"none", borderBottom:`1px solid ${INK}`, paddingBottom:"2px" }}>
              Explore all areas <ArrowRight size={11} />
            </Link>
          </Reveal>
        </div>
        <div className="vh-neigh-grid">
          {neighborhoods.map((n, i) => (
            <Reveal key={n.name} delay={i * 80}>
              <div className="vh-neigh-card">
                <div className="vh-neigh-img">
                  <img src={n.img} alt={n.name} />
                </div>
                <div style={{ padding:"1.1rem 14px 1.6rem" }}>
                  <h3 style={{ fontFamily:F, fontStyle:"italic", fontSize:"19px", fontWeight:300, marginBottom:"0.4rem" }}>{n.name}</h3>
                  <p style={{ fontSize:"11px", color:MUTE, lineHeight:1.7 }}>{n.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════ GALLERY TEASER */}
      <section style={{ borderBottom:`1px solid ${RULE}` }}>
        <div className="vh-gallery-header">
          <div style={{ padding:"4rem 4.5rem", borderRight:`1px solid ${RULE}` }}>
            <Reveal><Eyebrow>Visual portfolio</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(32px,4.8vw,62px)", fontWeight:300, lineHeight:1.0, letterSpacing:"-0.02em", marginBottom:"1.2rem" }}>
                Spaces that<br /><span style={{ fontStyle:"normal" }}>speak.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ fontSize:"12.5px", color:MUTE, lineHeight:1.9, maxWidth:"320px" }}>
                Every property we represent is photographed with architectural precision.
              </p>
            </Reveal>
          </div>
          <div style={{ padding:"4rem 4.5rem", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"2rem" }}>
            <div className="vh-gallery-stats">
              {[{ v:"124", l:"Images" }, { v:"38", l:"Properties" }, { v:"6", l:"Locations" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily:B, fontSize:"clamp(34px,4vw,52px)", letterSpacing:"0.01em", color:INK, lineHeight:1, marginBottom:"7px" }}>{s.v}</div>
                  <div style={{ fontSize:"8.5px", letterSpacing:"0.24em", textTransform:"uppercase", color:MUTE }}>{s.l}</div>
                </div>
              ))}
            </div>
            <Btn to="/gallery">View full gallery <ArrowUpRight size={12} /></Btn>
          </div>
        </div>

        <div className="vh-mosaic">
          {galleryItems.map((img, i) => (
            <div key={i}
              className="vh-mosaic-item"
              style={{ gridColumn:img.col, gridRow:img.row, overflow:"hidden", position:"relative", cursor:"pointer" }}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
              <img src={img.src} alt={img.title} style={{
                width:"100%", height:"100%", objectFit:"cover", display:"block",
                transform: hov === i ? "scale(1.08)" : "scale(1.01)",
                filter: hov === i ? "saturate(0.95) brightness(0.82)" : "saturate(0.5) brightness(0.9)",
              }} />
              <div style={{
                position:"absolute", inset:0, display:"flex", flexDirection:"column",
                justifyContent:"flex-end", padding:"16px",
                background: hov === i ? "linear-gradient(to top, rgba(13,12,10,0.62) 0%, transparent 55%)" : "transparent",
                transition:"background 0.3s",
              }}>
                {hov === i && <>
                  <span style={{ fontSize:"8.5px", letterSpacing:"0.26em", textTransform:"uppercase", color:"#E07A52", marginBottom:"3px" }}>{img.tag}</span>
                  <span style={{ fontFamily:F, fontStyle:"italic", fontSize:"14px", color:"#F7F3ED", lineHeight:1.2 }}>{img.title}</span>
                </>}
              </div>
            </div>
          ))}
        </div>

        <div className="vh-loc-strip">
          {[...locations, "All locations →"].map((loc, i, arr) => (
            <Link key={loc} to="/properties"
              style={{
                flexShrink:0, padding:"16px 30px", fontSize:"9.5px", letterSpacing:"0.22em",
                textTransform:"uppercase", textDecoration:"none", whiteSpace:"nowrap",
                color: i === arr.length-1 ? RUST : MUTE,
                borderRight: i < arr.length-1 ? `1px solid ${RULE}` : "none",
                marginLeft: i === arr.length-1 ? "auto" : 0,
                transition:"color 0.18s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = i === arr.length-1 ? RUST2 : INK}
              onMouseLeave={e => e.currentTarget.style.color = i === arr.length-1 ? RUST : MUTE}>
              {loc}
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════ PROCESS */}
      <section style={{ padding:"5rem 4.5rem", borderBottom:`1px solid ${RULE}` }}>
        <Reveal>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"3.5rem", flexWrap:"wrap", gap:"1.5rem" }}>
            <div>
              <Eyebrow>How it works</Eyebrow>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(32px,4vw,52px)", fontWeight:300, lineHeight:1, letterSpacing:"-0.02em" }}>
                From first call<br /><span style={{ fontStyle:"normal" }}>to handover.</span>
              </h2>
            </div>
            <p style={{ fontSize:"12.5px", color:MUTE, maxWidth:"280px", lineHeight:1.9 }}>
              A structured process built for buyers who don't have time to waste.
            </p>
          </div>
        </Reveal>
        <div className="vh-process-row">
          <div className="vh-process-line" />
          {process.map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="vh-process-step">
                <div className="vh-process-dot" />
                <div style={{ fontFamily:B, fontSize:"11px", letterSpacing:"0.14em", color:RUST, marginBottom:"0.9rem" }}>{s.num}</div>
                <h3 style={{ fontFamily:F, fontStyle:"italic", fontSize:"19px", fontWeight:300, marginBottom:"0.6rem" }}>{s.title}</h3>
                <p style={{ fontSize:"11.5px", color:MUTE, lineHeight:1.85 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════ TESTIMONIALS */}
      <section className="vh-testi-section">
        <div className="vh-glow" style={{ top:"-120px", left:"-80px", background:"radial-gradient(circle, rgba(196,96,58,0.35), transparent 70%)" }} />
        <div className="vh-glow" style={{ bottom:"-140px", right:"-100px", background:"radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)" }} />
        <div style={{ padding:"4.5rem 4.5rem 3rem", position:"relative", zIndex:1 }}>
          <Reveal><Eyebrow light>Client voices</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(32px,4.4vw,58px)", fontWeight:300, lineHeight:1.03, color:"#F7F3ED", letterSpacing:"-0.02em", maxWidth:"640px" }}>
              Trusted by buyers <span style={{ fontStyle:"normal" }}>who expect more.</span>
            </h2>
          </Reveal>
        </div>
        <div className="vh-testi-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="vh-testi-card">
                <div style={{ fontFamily:F, fontStyle:"italic", fontSize:"17px", color:"#F1EDE5", lineHeight:1.6, marginBottom:"1.5rem" }}>
                  “{t.quote}”
                </div>
                <div style={{ width:"20px", height:"1px", background:RUST, marginBottom:"0.9rem" }} />
                <div style={{ fontSize:"11.5px", color:"#F7F3ED", letterSpacing:"0.04em" }}>{t.name}</div>
                <div style={{ fontSize:"9.5px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.14em", textTransform:"uppercase", marginTop:"3px" }}>{t.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="vh-marquee-wrap" style={{ borderTop:"1px solid rgba(255,255,255,0.08)", padding:"1.1rem 0", position:"relative", zIndex:1 }}>
          <div className="vh-marquee-track">
            {[0, 1].flatMap((dup) =>
              ["Karen", "Westlands", "Kilimani", "Runda", "Muthaiga", "Lavington", "Kitisuru"].map((loc) => (
                <span key={`${dup}-${loc}`} style={{ fontSize:"9.5px", letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", whiteSpace:"nowrap" }}>
                  Active listings — {loc}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ CTA */}
      <section className="vh-cta">
        <div style={{ background:INK, padding:"5rem 4.5rem", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"2.5rem" }}>
          <div>
            <Reveal><Eyebrow light>List with us</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(30px,3.8vw,54px)", fontWeight:300, lineHeight:1.08, color:"#F7F3ED", marginBottom:"1.5rem", letterSpacing:"-0.02em" }}>
                Have a property<br />to sell or let?
              </h2>
            </Reveal>
            <div style={{ width:"32px", height:"1px", background:RUST, marginBottom:"1.5rem" }} />
            <Reveal delay={140}>
              <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.36)", lineHeight:1.9, maxWidth:"360px" }}>
                List with VistaHaven and reach thousands of verified buyers and tenants. We handle the presentation — you make the decision.
              </p>
            </Reveal>
          </div>
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            <Btn to="/contact" filled>Get in touch <ArrowRight size={12} /></Btn>
            <Btn to="/properties" light>View listings</Btn>
          </div>
        </div>

        <div className="vh-hero-right-photo" style={{ position:"relative", overflow:"hidden", minHeight:"340px" }}>
          <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=960&q=80" alt=""
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"saturate(0.4) brightness(0.92)" }} />
          <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"3px", background:RUST }} />
          <div style={{ position:"absolute", top:"24px", left:"24px" }}>
            <span style={{ fontSize:"8.5px", letterSpacing:"0.26em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", fontFamily:"'Inter', sans-serif" }}>Nairobi, Kenya</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ FOOTER STRIP */}
      <div className="vh-footer">
        <div style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"10.5px", color:DIM, letterSpacing:"0.06em" }}>
          <MapPin size={11} style={{ color:RUST, flexShrink:0 }} />
          {locations.join(" · ")} · and beyond
        </div>
        <span style={{ fontSize:"9.5px", letterSpacing:"0.2em", textTransform:"uppercase", color:DIM }}>
          VistaHaven © {new Date().getFullYear()}
        </span>
      </div>
    </main>
  );
}