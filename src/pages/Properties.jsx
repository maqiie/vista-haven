import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowRight, X, Bed, Bath, Maximize2, Mail, MessageCircle, Phone, Check, ExternalLink } from "lucide-react";
import { properties, formatPrice } from "../data/properties";

const typeOptions     = ["all", "sale", "rent", "lease"];
const categoryOptions = ["all", "residential", "commercial"];

const F    = "'Cormorant Garamond', Georgia, serif";
const B    = "'Bebas Neue', sans-serif";
const RUST = "#C4603A";
const RUST2= "#D06B43";
const INK  = "#0D0C0A";
const SAND = "#F7F3ED";
const RULE = "#DDD8CF";
const MUTE = "#9A9488";
const DIM  = "#B8B3AB";

const typeLabel     = { all:"All types", sale:"For sale", rent:"To let", lease:"Lease" };
const categoryLabel = { all:"All", residential:"Residential", commercial:"Commercial" };
const typeBadge     = {
  sale:  { bg:"#4caf7d", color:"#0a0a0a" },
  rent:  { bg:"#5b9bd5", color:"#fff"    },
  lease: { bg:"#c98a4c", color:"#0a0a0a" },
};

const AGENT_EMAIL    = "hello@vistahaven.co.ke";
const AGENT_WHATSAPP = "254700000000";

// ── Inquiry Modal ──────────────────────────────────────────────────────────────
function InquiryModal({ property, onClose }) {
  const [tab,    setTab]    = useState("message");
  const [form,   setForm]   = useState({ name:"", contact:"", note:"" });
  const [sent,   setSent]   = useState(false);
  const [hovBtn, setHovBtn] = useState(null);
  const [focused, setFoc]   = useState(null);

  if (!property) return null;
  const { title, location, price, type, beds, baths, sqft, image } = property;
  const badge = typeBadge[type];

  const handle   = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const subject  = encodeURIComponent(`Inquiry: ${title} — ${location}`);
  const emailBody= encodeURIComponent(`Hello,\n\nI am interested in the following property:\n\n${title}\n${location}\n${formatPrice(price, type)}\n\nPlease get in touch at your earliest convenience.\n\nRegards,\n${form.name || "[Your name]"}`);
  const waText   = encodeURIComponent(`Hello VistaHaven,\n\nI'd like to inquire about:\n*${title}*\n${location}\n${formatPrice(price, type)}\n\nPlease advise on next steps.`);

  const inputStyle = {
    background:"transparent", border:"none", borderBottom:`1px solid ${RULE}`,
    outline:"none", fontSize:"13px", color:INK, fontFamily:"'Inter', sans-serif",
    fontWeight:300, padding:"8px 0", width:"100%", letterSpacing:"0.01em", transition:"border-color 0.18s",
  };

  const tabs = [
    { id:"message",  icon:<MessageCircle size={13} strokeWidth={1.5} />, label:"Message"  },
    { id:"email",    icon:<Mail          size={13} strokeWidth={1.5} />, label:"Email"    },
    { id:"whatsapp", icon:<Phone         size={13} strokeWidth={1.5} />, label:"WhatsApp" },
  ];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }} onClick={onClose}>
      <div style={{ position:"absolute", inset:0, background:"rgba(13,12,10,0.75)", backdropFilter:"blur(6px)" }} />

      <div style={{ position:"relative", zIndex:1, background:SAND, width:"100%", maxWidth:"660px", boxShadow:"0 40px 100px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>

        {/* property strip */}
        <div style={{ display:"grid", gridTemplateColumns:"110px 1fr", borderBottom:`1px solid ${RULE}`, position:"relative" }}>
          <div style={{ height:"84px", overflow:"hidden" }}>
            <img src={image} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"saturate(0.65)" }} />
          </div>
          <div style={{ padding:"1rem 3rem 1rem 1.25rem", display:"flex", flexDirection:"column", justifyContent:"center", gap:"5px" }}>
            <span style={{ fontSize:"8px", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", padding:"2px 8px", background:badge.bg, color:badge.color, alignSelf:"flex-start" }}>
              {typeLabel[type]}
            </span>
            <div style={{ fontFamily:F, fontStyle:"italic", fontSize:"17px", fontWeight:300, color:INK, lineHeight:1.1 }}>{title}</div>
            <div style={{ fontSize:"11px", color:MUTE }}>{location}</div>
          </div>
          <button onClick={onClose}
            style={{ position:"absolute", top:"12px", right:"14px", background:"none", border:"none", cursor:"pointer", color:MUTE, display:"flex", padding:"4px", transition:"color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = INK}
            onMouseLeave={e => e.currentTarget.style.color = MUTE}>
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>

        {/* tab bar */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:`1px solid ${RULE}` }}>
          {tabs.map((t, i) => (
            <button key={t.id} onClick={() => { setTab(t.id); setSent(false); }}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"7px", padding:"13px", fontSize:"9.5px", letterSpacing:"0.18em", textTransform:"uppercase", cursor:"pointer", border:"none", borderRight: i < 2 ? `1px solid ${RULE}` : "none", fontFamily:"'Inter', sans-serif", fontWeight:300, transition:"all 0.15s", background: tab === t.id ? INK : "transparent", color: tab === t.id ? SAND : MUTE, borderBottom: tab === t.id ? `2px solid ${RUST}` : "2px solid transparent" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* panels */}
        <div style={{ padding:"1.75rem 2rem" }}>

          {/* MESSAGE */}
          {tab === "message" && (sent ? (
            <div style={{ textAlign:"center", padding:"1.5rem 0", display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem" }}>
              <div style={{ width:"44px", height:"44px", background:RUST, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Check size={20} color="#fff" strokeWidth={1.5} />
              </div>
              <div style={{ width:"24px", height:"1px", background:RULE }} />
              <p style={{ fontFamily:F, fontStyle:"italic", fontSize:"22px", color:INK, lineHeight:1 }}>Message sent.</p>
              <p style={{ fontSize:"12px", color:MUTE, lineHeight:1.7 }}>Our team will reach out within 24 hours.</p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"1.4rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  <label style={{ fontSize:"8px", letterSpacing:"0.24em", textTransform:"uppercase", color:DIM }}>Your name</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Full name"
                    style={{ ...inputStyle, borderBottomColor: focused === "name" ? INK : RULE }}
                    onFocus={() => setFoc("name")} onBlur={() => setFoc(null)} />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  <label style={{ fontSize:"8px", letterSpacing:"0.24em", textTransform:"uppercase", color:DIM }}>Email / Phone</label>
                  <input name="contact" value={form.contact} onChange={handle} placeholder="How to reach you"
                    style={{ ...inputStyle, borderBottomColor: focused === "contact" ? INK : RULE }}
                    onFocus={() => setFoc("contact")} onBlur={() => setFoc(null)} />
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                <label style={{ fontSize:"8px", letterSpacing:"0.24em", textTransform:"uppercase", color:DIM }}>Message</label>
                <textarea name="note" value={form.note} onChange={handle} rows={3}
                  placeholder={`I'm interested in ${title} and would like to arrange a viewing…`}
                  style={{ ...inputStyle, resize:"none", lineHeight:1.7, borderBottomColor: focused === "note" ? INK : RULE }}
                  onFocus={() => setFoc("note")} onBlur={() => setFoc(null)} />
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:"0.25rem" }}>
                <span style={{ fontSize:"11px", color:MUTE }}>Re: <em style={{ fontFamily:F, fontStyle:"italic" }}>{title}</em></span>
                <button onClick={() => { if (form.name && form.contact) setSent(true); }}
                  style={{ display:"inline-flex", alignItems:"center", gap:"9px", fontSize:"9.5px", letterSpacing:"0.22em", textTransform:"uppercase", padding:"11px 22px", background: hovBtn === "send" ? RUST2 : RUST, color:"#fff", border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif", transition:"background 0.18s" }}
                  onMouseEnter={() => setHovBtn("send")} onMouseLeave={() => setHovBtn(null)}>
                  Send <ArrowRight size={11} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}

          {/* EMAIL */}
          {tab === "email" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                <div style={{ padding:"1rem 1.25rem", background:"#EAE5DC" }}>
                  <div style={{ fontSize:"8px", letterSpacing:"0.22em", textTransform:"uppercase", color:DIM, marginBottom:"5px" }}>Sending to</div>
                  <div style={{ fontSize:"12.5px", color:INK }}>{AGENT_EMAIL}</div>
                </div>
                <div style={{ padding:"1rem 1.25rem", border:`1px solid ${RULE}` }}>
                  <div style={{ fontSize:"8px", letterSpacing:"0.22em", textTransform:"uppercase", color:DIM, marginBottom:"5px" }}>Subject</div>
                  <div style={{ fontSize:"11.5px", color:MUTE, lineHeight:1.4 }}>Inquiry: {title}</div>
                </div>
              </div>
              <p style={{ fontSize:"12px", color:MUTE, lineHeight:1.8 }}>
                Your email client will open with a pre-filled message about this property. You can edit it before sending.
              </p>
              <a href={`mailto:${AGENT_EMAIL}?subject=${subject}&body=${emailBody}`}
                style={{ display:"inline-flex", alignItems:"center", gap:"9px", fontSize:"9.5px", letterSpacing:"0.22em", textTransform:"uppercase", padding:"11px 22px", background: hovBtn === "email" ? RUST2 : RUST, color:"#fff", textDecoration:"none", fontFamily:"'Inter', sans-serif", transition:"background 0.18s", alignSelf:"flex-start" }}
                onMouseEnter={() => setHovBtn("email")} onMouseLeave={() => setHovBtn(null)}>
                <Mail size={12} strokeWidth={1.5} /> Open email client
              </a>
            </div>
          )}

          {/* WHATSAPP */}
          {tab === "whatsapp" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
              <div style={{ padding:"1rem 1.25rem", background:"#EAE5DC" }}>
                <div style={{ fontSize:"8px", letterSpacing:"0.22em", textTransform:"uppercase", color:DIM, marginBottom:"5px" }}>WhatsApp number</div>
                <div style={{ fontSize:"12.5px", color:INK }}>+{AGENT_WHATSAPP}</div>
              </div>
              <div style={{ background:"#E8F5E9", borderRadius:"0 10px 10px 10px", padding:"12px 16px", maxWidth:"340px" }}>
                <div style={{ fontSize:"8px", letterSpacing:"0.18em", textTransform:"uppercase", color:"#5a8a5a", marginBottom:"7px" }}>Preview</div>
                <p style={{ fontSize:"12px", color:"#1a1a1a", lineHeight:1.75, whiteSpace:"pre-line" }}>
                  {`Hello VistaHaven,\n\nI'd like to inquire about:\n`}
                  <strong>{title}</strong>
                  {`\n${location}\n${formatPrice(price, type)}`}
                </p>
              </div>
              <p style={{ fontSize:"12px", color:MUTE, lineHeight:1.8 }}>Opens WhatsApp with the message pre-filled. Works on mobile and desktop.</p>
              <a href={`https://wa.me/${AGENT_WHATSAPP}?text=${waText}`} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:"9px", fontSize:"9.5px", letterSpacing:"0.22em", textTransform:"uppercase", padding:"11px 22px", background: hovBtn === "wa" ? "#1ea34b" : "#25D366", color:"#fff", textDecoration:"none", fontFamily:"'Inter', sans-serif", transition:"background 0.18s", alignSelf:"flex-start" }}
                onMouseEnter={() => setHovBtn("wa")} onMouseLeave={() => setHovBtn(null)}>
                <ExternalLink size={12} strokeWidth={1.5} /> Open WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* specs footer */}
        <div style={{ borderTop:`1px solid ${RULE}`, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:RULE }}>
          {[
            { val:formatPrice(price, type), lbl:"Price" },
            ...(beds ? [{ val:`${beds} bd`, lbl:"Bedrooms" }] : [{ val:`—`, lbl:"Bedrooms" }]),
            { val:`${baths} ba`, lbl:"Bathrooms" },
            { val:`${sqft.toLocaleString()} ft²`, lbl:"Area" },
          ].slice(0,4).map(s => (
            <div key={s.lbl} style={{ background:SAND, padding:"10px 14px" }}>
              <div style={{ fontFamily:B, fontSize:"15px", letterSpacing:"0.03em", color:INK, lineHeight:1, marginBottom:"2px" }}>{s.val}</div>
              <div style={{ fontSize:"7.5px", letterSpacing:"0.2em", textTransform:"uppercase", color:DIM }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Property Card ──────────────────────────────────────────────────────────────
function PropertyCard({ property, onInquire }) {
  const [hov, setHov] = useState(false);
  const { id, title, location, price, type, beds, baths, sqft, image, tags } = property;
  const badge = typeBadge[type];

  return (
    <div
      style={{ background:"#F0EBE3", border:`1px solid ${RULE}`, overflow:"hidden", transition:"transform 0.25s, border-color 0.25s", transform: hov ? "translateY(-4px)" : "translateY(0)", borderColor: hov ? "#C5BFB7" : RULE, position:"relative" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* image */}
      <div style={{ position:"relative", aspectRatio:"16/10", overflow:"hidden" }}>
        <img src={image} alt={title} loading="lazy"
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s", transform: hov ? "scale(1.05)" : "scale(1)", filter: hov ? "saturate(0.85)" : "saturate(0.6)" }} />
        <span style={{ position:"absolute", top:"12px", left:"12px", fontSize:"8.5px", fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", padding:"3px 10px", background:badge.bg, color:badge.color }}>
          {typeLabel[type]}
        </span>
        {/* hover inquire pill */}
        <button onClick={e => { e.stopPropagation(); onInquire(property); }}
          style={{ position:"absolute", bottom:"12px", right:"12px", display:"flex", alignItems:"center", gap:"7px", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", padding:"8px 14px", background:INK, color:SAND, border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif", opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(6px)", transition:"opacity 0.22s, transform 0.22s" }}>
          <MessageCircle size={11} strokeWidth={1.5} /> Inquire
        </button>
      </div>

      {/* body */}
      <div style={{ padding:"18px 20px 16px" }}>
        <div style={{ fontSize:"9.5px", letterSpacing:"0.18em", textTransform:"uppercase", color:MUTE, marginBottom:"5px" }}>{location}</div>
        <Link to={`/properties/${id}`} style={{ textDecoration:"none" }}>
          <h3 style={{ fontFamily:F, fontStyle:"italic", fontSize:"19px", fontWeight:300, color:INK, lineHeight:1.2, marginBottom:"10px" }}>{title}</h3>
        </Link>
        <div style={{ fontFamily:B, fontSize:"18px", letterSpacing:"0.04em", color:RUST, marginBottom:"12px", lineHeight:1 }}>{formatPrice(price, type)}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"14px", fontSize:"11px", color:MUTE, marginBottom: tags?.length ? "12px" : 0 }}>
          {beds && <span style={{ display:"flex", alignItems:"center", gap:"5px" }}><Bed size={12} strokeWidth={1.5} /> {beds} Beds</span>}
          <span style={{ display:"flex", alignItems:"center", gap:"5px" }}><Bath size={12} strokeWidth={1.5} /> {baths} Baths</span>
          <span style={{ display:"flex", alignItems:"center", gap:"5px" }}><Maximize2 size={12} strokeWidth={1.5} /> {sqft.toLocaleString()} sqft</span>
        </div>
        {tags?.length > 0 && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
            {tags.map(t => (
              <span key={t} style={{ fontSize:"8.5px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 8px", border:`1px solid ${RULE}`, color:DIM }}>{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* action bar */}
      <div style={{ borderTop:`1px solid ${RULE}`, display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        <Link to={`/properties/${id}`}
          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"11px", fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:MUTE, textDecoration:"none", borderRight:`1px solid ${RULE}`, transition:"color 0.15s, background 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.color = INK; e.currentTarget.style.background = "#EAE5DC"; }}
          onMouseLeave={e => { e.currentTarget.style.color = MUTE; e.currentTarget.style.background = "transparent"; }}>
          <ExternalLink size={11} strokeWidth={1.5} /> View details
        </Link>
        <button onClick={() => onInquire(property)}
          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"11px", fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:MUTE, background:"transparent", border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif", transition:"color 0.15s, background 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = RUST; }}
          onMouseLeave={e => { e.currentTarget.style.color = MUTE; e.currentTarget.style.background = "transparent"; }}>
          <MessageCircle size={11} strokeWidth={1.5} /> Inquire
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Properties() {
  const [searchParams] = useSearchParams();
  const [search,    setSearch]   = useState("");
  const [type,      setType]     = useState(searchParams.get("type")     || "all");
  const [category,  setCategory] = useState(searchParams.get("category") || "all");
  const [hovPill,   setHovPill]  = useState(null);
  const [inquiring, setInquiring]= useState(null);

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
      <button onClick={onClick} onMouseEnter={() => setHovPill(id)} onMouseLeave={() => setHovPill(null)}
        style={{ fontSize:"9.5px", letterSpacing:"0.14em", textTransform:"uppercase", padding:"6px 14px", border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif", fontWeight: active ? 400 : 300, transition:"all 0.14s", background: active ? INK : h ? "#E4DFD6" : "#EAE5DC", color: active ? SAND : h ? INK : "#6B6660" }}>
        {children}
      </button>
    );
  };

  return (
    <>
      {inquiring && <InquiryModal property={inquiring} onClose={() => setInquiring(null)} />}

      <main style={{ background:SAND, color:INK, fontFamily:"'Inter', sans-serif", fontWeight:300, minHeight:"100vh" }}>

        {/* header */}
        <div style={{ borderBottom:`1px solid ${RULE}` }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"220px" }}>
            <div style={{ padding:"7rem 4.5rem 3rem", borderRight:`1px solid ${RULE}`, display:"flex", flexDirection:"column", justifyContent:"flex-end", position:"relative", overflow:"hidden" }}>
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
            <div style={{ padding:"7rem 4.5rem 3rem", display:"flex", flexDirection:"column", justifyContent:"flex-end", gap:"1.25rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", borderBottom:`1px solid ${RULE}`, paddingBottom:"12px" }}>
                <Search size={14} color={MUTE} strokeWidth={1.5} style={{ flexShrink:0 }} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or location…"
                  style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"13px", color:INK, fontFamily:"'Inter', sans-serif", fontWeight:300, letterSpacing:"0.01em" }} />
                {search && (
                  <button onClick={() => setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", color:MUTE, padding:"2px", display:"flex" }}>
                    <X size={13} />
                  </button>
                )}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", minHeight:"24px" }}>
                {hasFilters ? (
                  <>
                    <span style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:DIM }}>Active:</span>
                    {type !== "all" && <span style={{ fontSize:"9.5px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 10px", background:INK, color:SAND }}>{typeLabel[type]}</span>}
                    {category !== "all" && <span style={{ fontSize:"9.5px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 10px", background:INK, color:SAND }}>{categoryLabel[category]}</span>}
                    {search && <span style={{ fontSize:"9.5px", letterSpacing:"0.1em", padding:"3px 10px", background:"#EAE5DC", color:"#6B6660" }}>"{search}"</span>}
                    <button onClick={clear} style={{ fontSize:"9px", letterSpacing:"0.16em", textTransform:"uppercase", background:"none", border:"none", cursor:"pointer", color:RUST, textDecoration:"underline", fontFamily:"'Inter', sans-serif", marginLeft:"4px" }}>Clear all</button>
                  </>
                ) : (
                  <span style={{ fontSize:"9.5px", letterSpacing:"0.14em", textTransform:"uppercase", color:DIM }}>Showing all {properties.length} listings</span>
                )}
              </div>
            </div>
          </div>

          {/* filter bar */}
          <div style={{ display:"flex", alignItems:"stretch", borderTop:`1px solid ${RULE}` }}>
            <div style={{ display:"flex", alignItems:"center", borderRight:`1px solid ${RULE}` }}>
              <span style={{ fontSize:"8.5px", letterSpacing:"0.24em", textTransform:"uppercase", color:DIM, padding:"0 20px", whiteSpace:"nowrap" }}>Type</span>
              <div style={{ display:"flex", gap:"4px", padding:"14px 16px 14px 0" }}>
                {typeOptions.map(t => <Pill key={t} id={`t-${t}`} active={type === t} onClick={() => setType(t)}>{typeLabel[t]}</Pill>)}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", borderRight:`1px solid ${RULE}` }}>
              <span style={{ fontSize:"8.5px", letterSpacing:"0.24em", textTransform:"uppercase", color:DIM, padding:"0 20px", whiteSpace:"nowrap" }}>Category</span>
              <div style={{ display:"flex", gap:"4px", padding:"14px 16px 14px 0" }}>
                {categoryOptions.map(c => <Pill key={c} id={`c-${c}`} active={category === c} onClick={() => setCategory(c)}>{categoryLabel[c]}</Pill>)}
              </div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", padding:"0 2.5rem", gap:"8px" }}>
              <span style={{ fontFamily:B, fontSize:"22px", color:INK, letterSpacing:"0.04em", lineHeight:1 }}>{filtered.length}</span>
              <span style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:MUTE }}>result{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>

        {/* grid */}
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"3.5rem 4rem 6rem" }}>
          {filtered.length > 0 ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
              {filtered.map(p => <PropertyCard key={p.id} property={p} onInquire={setInquiring} />)}
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"7rem 0", display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem" }}>
              <div style={{ fontFamily:B, fontSize:"120px", color:RULE, lineHeight:1, letterSpacing:"-0.02em", userSelect:"none" }}>0</div>
              <div style={{ width:"32px", height:"1px", background:RULE }} />
              <p style={{ fontSize:"13px", color:MUTE, letterSpacing:"0.04em" }}>No properties match your current filters.</p>
              <button onClick={clear}
                style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", padding:"12px 24px", background:INK, color:SAND, border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif", transition:"background 0.18s" }}
                onMouseEnter={e => e.currentTarget.style.background = RUST}
                onMouseLeave={e => e.currentTarget.style.background = INK}>
                Clear filters <ArrowRight size={11} />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}