import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ArrowRight, X } from "lucide-react";
import PropertyCard from "../components/property/PropertyCard";
import { properties } from "../data/properties";

const typeOptions     = ["all", "sale", "rent", "lease"];
const categoryOptions = ["all", "residential", "commercial"];

const F    = "'Cormorant Garamond', Georgia, serif";
const B    = "'Bebas Neue', sans-serif";
const RUST = "#C4603A";
const INK  = "#0D0C0A";
const SAND = "#F7F3ED";
const RULE = "#DDD8CF";
const MUTE = "#9A9488";
const DIM  = "#B8B3AB";

const typeLabel     = { all:"All types", sale:"For sale", rent:"To let", lease:"Lease" };
const categoryLabel = { all:"All", residential:"Residential", commercial:"Commercial" };

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [search,   setSearch]   = useState("");
  const [type,     setType]     = useState(searchParams.get("type")     || "all");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [hovPill,  setHovPill]  = useState(null);

  const filtered = useMemo(() => properties.filter(p => {
    const matchType   = type     === "all" || p.type     === type;
    const matchCat    = category === "all" || p.category === category;
    const matchSearch = !search  || p.title.toLowerCase().includes(search.toLowerCase())
                                 || p.location.toLowerCase().includes(search.toLowerCase());
    return matchType && matchCat && matchSearch;
  }), [type, category, search]);

  const hasFilters = type !== "all" || category !== "all" || search !== "";
  const clear = () => { setType("all"); setCategory("all"); setSearch(""); };

  const Pill = ({ id, active, onClick, children }) => {
    const h = hovPill === id;
    return (
      <button onClick={onClick}
        onMouseEnter={() => setHovPill(id)}
        onMouseLeave={() => setHovPill(null)}
        style={{
          fontSize:"9.5px", letterSpacing:"0.14em", textTransform:"uppercase",
          padding:"6px 14px", border:"none", cursor:"pointer",
          fontFamily:"'Inter', sans-serif", fontWeight: active ? 400 : 300,
          transition:"all 0.14s",
          background: active ? INK : h ? "#E4DFD6" : "#EAE5DC",
          color: active ? SAND : h ? INK : "#6B6660",
        }}>
        {children}
      </button>
    );
  };

  return (
    <main style={{ background: SAND, color: INK, fontFamily:"'Inter', sans-serif", fontWeight:300, minHeight:"100vh" }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <div style={{ borderBottom:`1px solid ${RULE}` }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"220px" }}>

          {/* left — title */}
          <div style={{ padding:"7rem 4.5rem 3rem", borderRight:`1px solid ${RULE}`, display:"flex", flexDirection:"column", justifyContent:"flex-end", position:"relative", overflow:"hidden" }}>
            {/* watermark */}
            <div aria-hidden style={{ position:"absolute", top:"-24px", left:"-10px", fontFamily:B, fontSize:"clamp(100px,14vw,180px)", color:"rgba(200,193,182,0.22)", lineHeight:1, letterSpacing:"-0.02em", userSelect:"none", pointerEvents:"none" }}>
              {filtered.length}
            </div>
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"1.2rem" }}>
                <span style={{ display:"block", width:"24px", height:"1px", background:RUST, flexShrink:0 }} />
                <span style={{ fontSize:"9.5px", letterSpacing:"0.3em", textTransform:"uppercase", color:RUST }}>Discover</span>
              </div>
              <h1 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(40px,4.5vw,62px)", fontWeight:300, lineHeight:1.0, letterSpacing:"-0.025em" }}>
                All <span style={{ fontStyle:"normal" }}>properties.</span>
              </h1>
            </div>
          </div>

          {/* right — search + active filter summary */}
          <div style={{ padding:"7rem 4.5rem 3rem", display:"flex", flexDirection:"column", justifyContent:"flex-end", gap:"1.25rem" }}>
            {/* search */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", borderBottom:`1px solid ${RULE}`, paddingBottom:"12px" }}>
              <Search size={14} color={MUTE} strokeWidth={1.5} style={{ flexShrink:0 }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or location…"
                style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"13px", color:INK, fontFamily:"'Inter', sans-serif", fontWeight:300, letterSpacing:"0.01em" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", color:MUTE, padding:"2px", display:"flex" }}>
                  <X size={13} />
                </button>
              )}
            </div>

            {/* active filters as small tags */}
            <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", minHeight:"24px" }}>
              {hasFilters ? (
                <>
                  <span style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:DIM }}>Active:</span>
                  {type !== "all" && (
                    <span style={{ fontSize:"9.5px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 10px", background:INK, color:SAND }}>{typeLabel[type]}</span>
                  )}
                  {category !== "all" && (
                    <span style={{ fontSize:"9.5px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 10px", background:INK, color:SAND }}>{categoryLabel[category]}</span>
                  )}
                  {search && (
                    <span style={{ fontSize:"9.5px", letterSpacing:"0.1em", padding:"3px 10px", background:"#EAE5DC", color:"#6B6660" }}>"{search}"</span>
                  )}
                  <button onClick={clear} style={{ fontSize:"9px", letterSpacing:"0.16em", textTransform:"uppercase", background:"none", border:"none", cursor:"pointer", color:RUST, textDecoration:"underline", fontFamily:"'Inter', sans-serif", marginLeft:"4px" }}>
                    Clear all
                  </button>
                </>
              ) : (
                <span style={{ fontSize:"9.5px", letterSpacing:"0.14em", textTransform:"uppercase", color:DIM }}>Showing all {properties.length} listings</span>
              )}
            </div>
          </div>
        </div>

        {/* ── FILTER BAR ────────────────────────────────────────────── */}
        <div style={{ display:"flex", alignItems:"stretch", borderTop:`1px solid ${RULE}` }}>
          {/* type group */}
          <div style={{ display:"flex", alignItems:"center", borderRight:`1px solid ${RULE}` }}>
            <span style={{ fontSize:"8.5px", letterSpacing:"0.24em", textTransform:"uppercase", color:DIM, padding:"0 20px", whiteSpace:"nowrap" }}>Type</span>
            <div style={{ display:"flex", gap:"4px", padding:"14px 16px 14px 0" }}>
              {typeOptions.map(t => (
                <Pill key={t} id={`t-${t}`} active={type === t} onClick={() => setType(t)}>
                  {typeLabel[t]}
                </Pill>
              ))}
            </div>
          </div>

          {/* category group */}
          <div style={{ display:"flex", alignItems:"center", borderRight:`1px solid ${RULE}` }}>
            <span style={{ fontSize:"8.5px", letterSpacing:"0.24em", textTransform:"uppercase", color:DIM, padding:"0 20px", whiteSpace:"nowrap" }}>Category</span>
            <div style={{ display:"flex", gap:"4px", padding:"14px 16px 14px 0" }}>
              {categoryOptions.map(c => (
                <Pill key={c} id={`c-${c}`} active={category === c} onClick={() => setCategory(c)}>
                  {categoryLabel[c]}
                </Pill>
              ))}
            </div>
          </div>

          {/* results count — right aligned */}
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", padding:"0 2.5rem", gap:"8px" }}>
            <span style={{ fontFamily:B, fontSize:"22px", color:INK, letterSpacing:"0.04em", lineHeight:1 }}>{filtered.length}</span>
            <span style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:MUTE }}>result{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      {/* ── GRID ────────────────────────────────────────────────────── */}
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"3.5rem 4rem 6rem" }}>
        {filtered.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"7rem 0", display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem" }}>
            {/* large decorative number */}
            <div style={{ fontFamily:B, fontSize:"120px", color:RULE, lineHeight:1, letterSpacing:"-0.02em", userSelect:"none" }}>0</div>
            <div style={{ width:"32px", height:"1px", background:RULE }} />
            <p style={{ fontSize:"13px", color:MUTE, letterSpacing:"0.04em" }}>No properties match your current filters.</p>
            <button onClick={clear} style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase",
              padding:"12px 24px", background:INK, color:SAND,
              border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif",
              transition:"background 0.18s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = RUST}
              onMouseLeave={e => e.currentTarget.style.background = INK}>
              Clear filters <ArrowRight size={11} />
            </button>
          </div>
        )}
      </div>

    </main>
  );
}