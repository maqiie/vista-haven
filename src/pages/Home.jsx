import { useState } from "react";
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

const F = "'Cormorant Garamond', Georgia, serif";
const B = "'Bebas Neue', sans-serif";
const RUST = "#C4603A";
const RUST2 = "#D06B43";
const INK  = "#0D0C0A";
const SAND = "#F7F3ED";
const RULE = "#DDD8CF";
const MUTE = "#9A9488";
const DIM  = "#B8B3AB";

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
    ? { ...base, background: hover ? RUST2 : RUST, color:"#fff" }
    : light
      ? { ...base, border:`1px solid ${hover ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.16)"}`, color: hover ? "#fff" : "rgba(255,255,255,0.52)" }
      : { ...base, border:`1px solid ${hover ? INK : RULE}`, color: INK };
  return <Link to={to} style={styles} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{children}</Link>;
};

export default function Home() {
  const [hov, setHov] = useState(null);
  const [filt, setFilt] = useState({ type:"All", category:"All", area:"All" });

  return (
    <main style={{ background: SAND, color: INK, fontFamily:"'Inter', sans-serif", fontWeight:300, lineHeight:1 }}>

      {/* ════════════════════════════════ HERO */}
      <section style={{ display:"grid", gridTemplateColumns:"55fr 45fr", minHeight:"100vh", borderBottom:`1px solid ${RULE}` }}>

        {/* ── LEFT */}
        <div style={{ display:"flex", flexDirection:"column", padding:"0", borderRight:`1px solid ${RULE}`, position:"relative", overflow:"hidden" }}>

          {/* nav spacer */}
          <div style={{ height:"72px", flexShrink:0 }} />

          {/* giant watermark — purely decorative, clipped */}
          <div aria-hidden style={{
            position:"absolute", top:"-28px", left:"-12px",
            fontFamily:B, fontSize:"clamp(180px,24vw,320px)",
            color:"rgba(200,193,182,0.28)", lineHeight:1, letterSpacing:"-0.02em",
            userSelect:"none", pointerEvents:"none", zIndex:0,
          }}>400</div>

          {/* content block — sits in lower half */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"4rem 4.5rem 5rem", position:"relative", zIndex:1 }}>
            <Eyebrow>Nairobi's premier platform</Eyebrow>

            <h1 style={{
              fontFamily:F, fontStyle:"italic", fontWeight:300,
              fontSize:"clamp(52px,5.2vw,78px)", lineHeight:1.01,
              letterSpacing:"-0.025em", marginBottom:"1.6rem", color:INK,
            }}>
              Every property.<br />
              <span style={{ fontStyle:"normal" }}>One destination.</span>
            </h1>

            {/* thin accent rule under heading */}
            <div style={{ width:"40px", height:"2px", background:RUST, marginBottom:"1.6rem" }} />

            <p style={{ fontSize:"13px", color:MUTE, maxWidth:"350px", lineHeight:1.85, marginBottom:"2.8rem", letterSpacing:"0.01em" }}>
              Residential, commercial, and investment — curated for buyers, tenants, and investors who know what they want.
            </p>

            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              <Btn to="/properties" filled>Browse properties <ArrowRight size={12} /></Btn>
              <Btn to="/contact">Contact us</Btn>
            </div>
          </div>
        </div>

        {/* ── RIGHT */}
        <div style={{ display:"grid", gridTemplateRows:"1fr 120px" }}>

          {/* photo */}
          <div style={{ overflow:"hidden", position:"relative" }}
            onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = "scale(1)"}>
            <img
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=960&q=88"
              alt="Featured property"
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)" }}
            />
            {/* floating label */}
            <div style={{ position:"absolute", bottom:"20px", left:"20px", background:"rgba(13,12,10,0.7)", backdropFilter:"blur(10px)", padding:"10px 16px" }}>
              <div style={{ fontSize:"8.5px", letterSpacing:"0.26em", textTransform:"uppercase", color:RUST, marginBottom:"4px" }}>Featured</div>
              <div style={{ fontFamily:F, fontStyle:"italic", fontSize:"14px", color:"#F7F3ED" }}>Karen Villa</div>
            </div>
            {/* top-right index badge */}
            <div style={{ position:"absolute", top:"20px", right:"20px", width:"36px", height:"36px", border:"1px solid rgba(255,255,255,0.22)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:B, fontSize:"14px", color:"rgba(255,255,255,0.7)", letterSpacing:"0.04em" }}>01</span>
            </div>
          </div>

          {/* stats bar */}
          <div style={{ background:INK, display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
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
      <section style={{ display:"grid", gridTemplateColumns:"200px 1fr", borderBottom:`1px solid ${RULE}` }}>

        {/* sidebar */}
        <aside style={{ padding:"2.5rem 2rem", borderRight:`1px solid ${RULE}`, display:"flex", flexDirection:"column", gap:"2rem" }}>
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

        {/* grid */}
        <div style={{ padding:"3rem 3.5rem" }}>
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"2rem", paddingBottom:"1.25rem", borderBottom:`1px solid ${RULE}` }}>
            <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(26px,2.8vw,36px)", fontWeight:300, lineHeight:1 }}>
              Featured <span style={{ fontStyle:"normal" }}>properties</span>
            </h2>
            <span style={{ fontSize:"9.5px", letterSpacing:"0.18em", textTransform:"uppercase", color:MUTE }}>{featured.length} listings</span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"18px" }}>
            {featured.map(p => <PropertyCard key={p.id} property={p} />)}
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

        {/* header row */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:`1px solid ${RULE}` }}>
          <div style={{ padding:"4.5rem 4.5rem", borderRight:`1px solid ${RULE}`, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
            <Eyebrow>What we offer</Eyebrow>
            <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(42px,5.2vw,68px)", fontWeight:300, lineHeight:1.0, letterSpacing:"-0.025em" }}>
              Beyond<br />the listing.
            </h2>
          </div>

          {/* image with grain-like desaturation */}
          <div style={{ position:"relative", overflow:"hidden", minHeight:"280px" }}>
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=960&q=80" alt=""
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"saturate(0.35) brightness(0.82)" }} />
            {/* vertical rust stripe */}
            <div style={{ position:"absolute", top:0, bottom:0, right:0, width:"3px", background:RUST }} />
          </div>
        </div>

        {/* three cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
          {services.map((s, i) => (
            <div key={s.num}
              style={{ padding:"3rem 3.5rem", borderRight: i < 2 ? `1px solid ${RULE}` : "none", transition:"background 0.22s", cursor:"default", position:"relative" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#EDE8DF"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              {/* index number — very large, purely textural */}
              <div style={{ fontFamily:B, fontSize:"80px", lineHeight:1, color:RULE, marginBottom:"1.25rem", userSelect:"none", letterSpacing:"-0.01em" }}>{s.num}</div>
              {/* tiny rust rule */}
              <div style={{ width:"20px", height:"1px", background:RUST, marginBottom:"1rem" }} />
              <h3 style={{ fontFamily:F, fontStyle:"italic", fontSize:"21px", fontWeight:300, color:INK, marginBottom:"0.75rem", lineHeight:1.2 }}>{s.title}</h3>
              <p style={{ fontSize:"12px", color:MUTE, lineHeight:1.92, letterSpacing:"0.01em" }}>{s.desc}</p>
              {/* hover arrow */}
              <div style={{ position:"absolute", bottom:"2.5rem", right:"2.5rem", opacity:0.3 }}>
                <ArrowUpRight size={14} color={INK} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════ GALLERY TEASER */}
      <section style={{ borderBottom:`1px solid ${RULE}` }}>

        {/* header row */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:`1px solid ${RULE}` }}>
          <div style={{ padding:"4rem 4.5rem", borderRight:`1px solid ${RULE}` }}>
            <Eyebrow>Visual portfolio</Eyebrow>
            <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(38px,4.8vw,62px)", fontWeight:300, lineHeight:1.0, letterSpacing:"-0.02em", marginBottom:"1.2rem" }}>
              Spaces that<br /><span style={{ fontStyle:"normal" }}>speak.</span>
            </h2>
            <p style={{ fontSize:"12.5px", color:MUTE, lineHeight:1.9, maxWidth:"320px" }}>
              Every property we represent is photographed with architectural precision.
            </p>
          </div>
          <div style={{ padding:"4rem 4.5rem", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2rem" }}>
              {[{ v:"124", l:"Images" }, { v:"38", l:"Properties" }, { v:"6", l:"Locations" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily:B, fontSize:"52px", letterSpacing:"0.01em", color:INK, lineHeight:1, marginBottom:"7px" }}>{s.v}</div>
                  <div style={{ fontSize:"8.5px", letterSpacing:"0.24em", textTransform:"uppercase", color:MUTE }}>{s.l}</div>
                </div>
              ))}
            </div>
            <Btn to="/gallery">View full gallery <ArrowUpRight size={12} /></Btn>
          </div>
        </div>

        {/* mosaic — 12-col, 2-row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(12,1fr)", gridAutoRows:"120px", gap:"2px", background:INK }}>
          {galleryItems.map((img, i) => (
            <div key={i}
              style={{ gridColumn:img.col, gridRow:img.row, overflow:"hidden", position:"relative", cursor:"pointer" }}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
              <img src={img.src} alt={img.title} style={{
                width:"100%", height:"100%", objectFit:"cover", display:"block",
                transition:"transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s",
                transform: hov === i ? "scale(1.08)" : "scale(1.01)",
                filter: hov === i ? "saturate(0.95) brightness(0.82)" : "saturate(0.5) brightness(0.9)",
              }} />
              {/* hover overlay */}
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

        {/* location strip */}
        <div style={{ display:"flex", borderTop:`1px solid ${RULE}` }}>
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

      {/* ════════════════════════════════ CTA */}
      <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>

        <div style={{ background:INK, padding:"5rem 4.5rem", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            <Eyebrow light>List with us</Eyebrow>
            <h2 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(34px,3.8vw,54px)", fontWeight:300, lineHeight:1.08, color:"#F7F3ED", marginBottom:"1.5rem", letterSpacing:"-0.02em" }}>
              Have a property<br />to sell or let?
            </h2>
            {/* rule */}
            <div style={{ width:"32px", height:"1px", background:RUST, marginBottom:"1.5rem" }} />
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.36)", lineHeight:1.9, maxWidth:"360px" }}>
              List with VistaHaven and reach thousands of verified buyers and tenants. We handle the presentation — you make the decision.
            </p>
          </div>
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            <Btn to="/contact" filled>Get in touch <ArrowRight size={12} /></Btn>
            <Btn to="/properties" light>View listings</Btn>
          </div>
        </div>

        {/* photo */}
        <div style={{ position:"relative", overflow:"hidden", minHeight:"420px" }}
          onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = "scale(1)"}>
          <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=960&q=80" alt=""
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"saturate(0.4) brightness(0.92)", transition:"transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
          <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"3px", background:RUST }} />
          {/* corner label */}
          <div style={{ position:"absolute", top:"24px", left:"24px" }}>
            <span style={{ fontSize:"8.5px", letterSpacing:"0.26em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", fontFamily:"'Inter', sans-serif" }}>Nairobi, Kenya</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ FOOTER STRIP */}
      <div style={{ borderTop:`1px solid ${RULE}`, padding:"1.25rem 4rem", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap" }}>
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
