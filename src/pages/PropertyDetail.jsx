import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bed, Bath, Maximize2, MapPin, ArrowLeft, Phone, Mail, MessageCircle, Check, ArrowRight, ExternalLink, X } from "lucide-react";
import { properties, formatPrice } from "../data/properties";

const F    = "'Cormorant Garamond', Georgia, serif";
const B    = "'Bebas Neue', sans-serif";
const RUST = "#C4603A";
const RUST2= "#D06B43";
const INK  = "#0D0C0A";
const SAND = "#F7F3ED";
const RULE = "#DDD8CF";
const MUTE = "#9A9488";
const DIM  = "#B8B3AB";

const typeBadge = {
  sale:  { bg:"#4caf7d", color:"#0a0a0a", label:"For Sale" },
  rent:  { bg:"#5b9bd5", color:"#fff",    label:"For Rent" },
  lease: { bg:"#c98a4c", color:"#0a0a0a", label:"Lease"    },
};

const AGENT_EMAIL    = "hello@vistahaven.co.ke";
const AGENT_WHATSAPP = "254700000000";

// ── Inquiry Modal (reused from Properties) ─────────────────────────────────────
function InquiryModal({ property, onClose }) {
  const [tab,    setTab]   = useState("message");
  const [form,   setForm]  = useState({ name:"", contact:"", note:"" });
  const [sent,   setSent]  = useState(false);
  const [hovBtn, setHov]   = useState(null);
  const [focused, setFoc]  = useState(null);

  const { title, location, price, type, beds, baths, sqft, image } = property;
  const badge = typeBadge[type];

  const handle    = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const subject   = encodeURIComponent(`Inquiry: ${title} — ${location}`);
  const emailBody = encodeURIComponent(`Hello,\n\nI am interested in the following property:\n\n${title}\n${location}\n${formatPrice(price, type)}\n\nPlease get in touch at your earliest convenience.\n\nRegards,\n${form.name || "[Your name]"}`);
  const waText    = encodeURIComponent(`Hello VistaHaven,\n\nI'd like to inquire about:\n*${title}*\n${location}\n${formatPrice(price, type)}\n\nPlease advise on next steps.`);

  const inputStyle = { background:"transparent", border:"none", borderBottom:`1px solid ${RULE}`, outline:"none", fontSize:"13px", color:INK, fontFamily:"'Inter', sans-serif", fontWeight:300, padding:"8px 0", width:"100%", letterSpacing:"0.01em", transition:"border-color 0.18s" };
  const tabs = [
    { id:"message",  icon:<MessageCircle size={13} strokeWidth={1.5} />, label:"Message"  },
    { id:"email",    icon:<Mail          size={13} strokeWidth={1.5} />, label:"Email"    },
    { id:"whatsapp", icon:<Phone         size={13} strokeWidth={1.5} />, label:"WhatsApp" },
  ];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }} onClick={onClose}>
      <div style={{ position:"absolute", inset:0, background:"rgba(13,12,10,0.75)", backdropFilter:"blur(6px)" }} />
      <div style={{ position:"relative", zIndex:1, background:SAND, width:"100%", maxWidth:"660px", boxShadow:"0 40px 100px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>

        {/* strip */}
        <div style={{ display:"grid", gridTemplateColumns:"110px 1fr", borderBottom:`1px solid ${RULE}`, position:"relative" }}>
          <div style={{ height:"84px", overflow:"hidden" }}>
            <img src={image} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"saturate(0.65)" }} />
          </div>
          <div style={{ padding:"1rem 3rem 1rem 1.25rem", display:"flex", flexDirection:"column", justifyContent:"center", gap:"5px" }}>
            <span style={{ fontSize:"8px", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", padding:"2px 8px", background:badge.bg, color:badge.color, alignSelf:"flex-start" }}>{badge.label}</span>
            <div style={{ fontFamily:F, fontStyle:"italic", fontSize:"17px", fontWeight:300, color:INK, lineHeight:1.1 }}>{title}</div>
            <div style={{ fontSize:"11px", color:MUTE }}>{location}</div>
          </div>
          <button onClick={onClose} style={{ position:"absolute", top:"12px", right:"14px", background:"none", border:"none", cursor:"pointer", color:MUTE, display:"flex", padding:"4px", transition:"color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = INK} onMouseLeave={e => e.currentTarget.style.color = MUTE}>
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>

        {/* tabs */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:`1px solid ${RULE}` }}>
          {tabs.map((t, i) => (
            <button key={t.id} onClick={() => { setTab(t.id); setSent(false); }}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"7px", padding:"13px", fontSize:"9.5px", letterSpacing:"0.18em", textTransform:"uppercase", cursor:"pointer", border:"none", borderRight: i < 2 ? `1px solid ${RULE}` : "none", fontFamily:"'Inter', sans-serif", fontWeight:300, transition:"all 0.15s", background: tab === t.id ? INK : "transparent", color: tab === t.id ? SAND : MUTE, borderBottom: tab === t.id ? `2px solid ${RUST}` : "2px solid transparent" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

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
                  <input name="name" value={form.name} onChange={handle} placeholder="Full name" style={{ ...inputStyle, borderBottomColor: focused === "name" ? INK : RULE }} onFocus={() => setFoc("name")} onBlur={() => setFoc(null)} />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  <label style={{ fontSize:"8px", letterSpacing:"0.24em", textTransform:"uppercase", color:DIM }}>Email / Phone</label>
                  <input name="contact" value={form.contact} onChange={handle} placeholder="How to reach you" style={{ ...inputStyle, borderBottomColor: focused === "contact" ? INK : RULE }} onFocus={() => setFoc("contact")} onBlur={() => setFoc(null)} />
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                <label style={{ fontSize:"8px", letterSpacing:"0.24em", textTransform:"uppercase", color:DIM }}>Message</label>
                <textarea name="note" value={form.note} onChange={handle} rows={3} placeholder={`I'm interested in ${title} and would like to arrange a viewing…`} style={{ ...inputStyle, resize:"none", lineHeight:1.7, borderBottomColor: focused === "note" ? INK : RULE }} onFocus={() => setFoc("note")} onBlur={() => setFoc(null)} />
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:"0.25rem" }}>
                <span style={{ fontSize:"11px", color:MUTE }}>Re: <em style={{ fontFamily:F, fontStyle:"italic" }}>{title}</em></span>
                <button onClick={() => { if (form.name && form.contact) setSent(true); }}
                  style={{ display:"inline-flex", alignItems:"center", gap:"9px", fontSize:"9.5px", letterSpacing:"0.22em", textTransform:"uppercase", padding:"11px 22px", background: hovBtn === "send" ? RUST2 : RUST, color:"#fff", border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif", transition:"background 0.18s" }}
                  onMouseEnter={() => setHov("send")} onMouseLeave={() => setHov(null)}>
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
              <p style={{ fontSize:"12px", color:MUTE, lineHeight:1.8 }}>Your email client will open with a pre-filled message. You can edit before sending.</p>
              <a href={`mailto:${AGENT_EMAIL}?subject=${subject}&body=${emailBody}`}
                style={{ display:"inline-flex", alignItems:"center", gap:"9px", fontSize:"9.5px", letterSpacing:"0.22em", textTransform:"uppercase", padding:"11px 22px", background: hovBtn === "email" ? RUST2 : RUST, color:"#fff", textDecoration:"none", fontFamily:"'Inter', sans-serif", transition:"background 0.18s", alignSelf:"flex-start" }}
                onMouseEnter={() => setHov("email")} onMouseLeave={() => setHov(null)}>
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
                  {`Hello VistaHaven,\n\nI'd like to inquire about:\n`}<strong>{title}</strong>{`\n${location}\n${formatPrice(price, type)}`}
                </p>
              </div>
              <p style={{ fontSize:"12px", color:MUTE, lineHeight:1.8 }}>Opens WhatsApp with the message pre-filled. Works on mobile and desktop.</p>
              <a href={`https://wa.me/${AGENT_WHATSAPP}?text=${waText}`} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:"9px", fontSize:"9.5px", letterSpacing:"0.22em", textTransform:"uppercase", padding:"11px 22px", background: hovBtn === "wa" ? "#1ea34b" : "#25D366", color:"#fff", textDecoration:"none", fontFamily:"'Inter', sans-serif", transition:"background 0.18s", alignSelf:"flex-start" }}
                onMouseEnter={() => setHov("wa")} onMouseLeave={() => setHov(null)}>
                <ExternalLink size={12} strokeWidth={1.5} /> Open WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* specs footer */}
        <div style={{ borderTop:`1px solid ${RULE}`, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:RULE }}>
          {[
            { val:formatPrice(price, type), lbl:"Price" },
            { val: beds ? `${beds} bd` : "—", lbl:"Bedrooms" },
            { val:`${baths} ba`, lbl:"Bathrooms" },
            { val:`${sqft.toLocaleString()} ft²`, lbl:"Area" },
          ].map(s => (
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

// ── Main Detail Page ───────────────────────────────────────────────────────────
export default function PropertyDetail() {
  const { id } = useParams();
  const [inquiring, setInquiring] = useState(false);
  const [hovBtn,    setHovBtn]    = useState(null);

  const property = properties.find(p => p.id === Number(id));

  if (!property) return (
    <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"10rem 4rem 4rem", color:MUTE, fontFamily:"'Inter', sans-serif" }}>
      <p>Property not found.</p>
      <Link to="/properties" style={{ color:RUST, marginTop:"1rem", display:"inline-block", fontSize:"13px" }}>← Back to listings</Link>
    </div>
  );

  const { title, location, price, type, category, beds, baths, sqft, image, tags } = property;
  const badge = typeBadge[type];

  return (
    <>
      {inquiring && <InquiryModal property={property} onClose={() => setInquiring(false)} />}

      <main style={{ background:SAND, color:INK, fontFamily:"'Inter', sans-serif", fontWeight:300 }}>

        {/* ── HERO */}
        <div style={{ position:"relative", height:"calc(68vh + 72px)", minHeight:"490px", overflow:"hidden" }}>
          <img src={image} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"saturate(0.8)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(13,12,10,0.88) 0%, rgba(13,12,10,0.25) 55%, transparent 100%)" }} />

          {/* back */}
          <div style={{ position:"absolute", top:"96px", left:0, right:0, maxWidth:"1280px", margin:"0 auto", padding:"0 4rem" }}>
            <Link to="/properties"
              style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"9.5px", letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(247,243,237,0.5)", textDecoration:"none", transition:"color 0.18s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#F7F3ED"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(247,243,237,0.5)"}>
              <ArrowLeft size={13} strokeWidth={1.5} /> All properties
            </Link>
          </div>

          {/* title block */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, maxWidth:"1280px", margin:"0 auto", padding:"0 4rem 3rem" }}>
            <span style={{ display:"inline-block", fontSize:"8.5px", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", padding:"3px 10px", background:badge.bg, color:badge.color, marginBottom:"1rem" }}>
              {badge.label}
            </span>
            <h1 style={{ fontFamily:F, fontStyle:"italic", fontSize:"clamp(36px,4.5vw,64px)", fontWeight:300, lineHeight:1.02, letterSpacing:"-0.025em", color:"#F7F3ED", marginBottom:"0.75rem" }}>
              {title}
            </h1>
            <div style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"12.5px", color:"rgba(247,243,237,0.5)" }}>
              <MapPin size={13} strokeWidth={1.5} style={{ color:RUST, flexShrink:0 }} />
              {location}
            </div>
          </div>
        </div>

        {/* ── BODY */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 300px" }}>

          {/* main */}
          <div style={{ padding:"4rem 4rem 6rem", borderRight:`1px solid ${RULE}` }}>

            {/* price + specs */}
            <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"3rem", alignItems:"start", paddingBottom:"2.5rem", borderBottom:`1px solid ${RULE}`, marginBottom:"3rem" }}>
              <div>
                <div style={{ fontSize:"8.5px", letterSpacing:"0.26em", textTransform:"uppercase", color:DIM, marginBottom:"7px" }}>Asking price</div>
                <div style={{ fontFamily:B, fontSize:"38px", letterSpacing:"0.02em", color:RUST, lineHeight:1 }}>{formatPrice(price, type)}</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:RULE }}>
                {[
                  ...(beds ? [{ icon:<Bed size={14} strokeWidth={1.5} />, val:beds,   lbl:"Bedrooms"  }] : []),
                  { icon:<Bath     size={14} strokeWidth={1.5} />, val:baths,  lbl:"Bathrooms" },
                  { icon:<Maximize2 size={14} strokeWidth={1.5} />, val:`${sqft.toLocaleString()}`, lbl:"Sqft" },
                ].map(s => (
                  <div key={s.lbl} style={{ background:SAND, padding:"1.1rem 1.25rem" }}>
                    <div style={{ color:MUTE, marginBottom:"7px" }}>{s.icon}</div>
                    <div style={{ fontFamily:B, fontSize:"26px", letterSpacing:"0.03em", color:INK, lineHeight:1, marginBottom:"3px" }}>{s.val}</div>
                    <div style={{ fontSize:"8px", letterSpacing:"0.2em", textTransform:"uppercase", color:DIM }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* description */}
            <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"1.4rem" }}>
              <span style={{ display:"block", width:"24px", height:"1px", background:RUST, flexShrink:0 }} />
              <span style={{ fontSize:"9.5px", letterSpacing:"0.3em", textTransform:"uppercase", color:RUST }}>About this property</span>
            </div>
            <p style={{ fontSize:"13.5px", color:MUTE, lineHeight:1.92, maxWidth:"580px", marginBottom:"3rem", letterSpacing:"0.01em" }}>
              This exceptional {category} property is situated in one of Nairobi's most sought-after locations — {location}. Offering {sqft.toLocaleString()} sq ft of thoughtfully designed space, it combines modern finishes with timeless elegance.{beds ? ` With ${beds} generously sized bedrooms and ${baths} bathrooms, it` : " It"} is well suited for {type === "sale" ? "discerning buyers seeking long-term value" : type === "rent" ? "tenants looking for a premium living experience" : "businesses seeking a professional environment"}.
            </p>

            {/* amenities */}
            {tags?.length > 0 && (
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"1.2rem" }}>
                  <span style={{ display:"block", width:"24px", height:"1px", background:RULE }} />
                  <span style={{ fontSize:"8.5px", letterSpacing:"0.26em", textTransform:"uppercase", color:DIM }}>Features & amenities</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                  {tags.map(t => (
                    <span key={t} style={{ fontSize:"9.5px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"6px 14px", border:`1px solid ${RULE}`, color:MUTE }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* sidebar */}
          <aside style={{ padding:"3rem 2rem" }}>
            <div style={{ position:"sticky", top:"96px", display:"flex", flexDirection:"column" }}>

              <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"1.4rem" }}>
                <span style={{ display:"block", width:"24px", height:"1px", background:RUST }} />
                <span style={{ fontSize:"9.5px", letterSpacing:"0.3em", textTransform:"uppercase", color:RUST }}>Interested?</span>
              </div>

              <h3 style={{ fontFamily:F, fontStyle:"italic", fontSize:"28px", fontWeight:300, color:INK, marginBottom:"0.5rem", lineHeight:1.1, letterSpacing:"-0.01em" }}>
                Speak with<br />an agent.
              </h3>
              <div style={{ width:"20px", height:"1px", background:RUST, marginBottom:"1.2rem" }} />
              <p style={{ fontSize:"12.5px", color:MUTE, lineHeight:1.85, marginBottom:"1.75rem" }}>
                Our team will arrange a private viewing at your convenience.
              </p>

              {/* primary — open inquiry modal */}
              <button onClick={() => setInquiring(true)}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"9px", padding:"14px", marginBottom:"8px", fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", background: hovBtn === "inq" ? RUST2 : RUST, color:"#fff", border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif", transition:"background 0.18s" }}
                onMouseEnter={() => setHovBtn("inq")} onMouseLeave={() => setHovBtn(null)}>
                <MessageCircle size={13} strokeWidth={1.5} /> Make an inquiry
              </button>

              {/* secondary — direct WhatsApp */}
              <a href={`https://wa.me/${AGENT_WHATSAPP}?text=${encodeURIComponent(`Hello VistaHaven, I'd like to inquire about: ${title}, ${location} — ${formatPrice(price, type)}`)}`}
                target="_blank" rel="noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"9px", padding:"13px", marginBottom:"8px", fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", background: hovBtn === "wa" ? "#1ea34b" : "#25D366", color:"#fff", textDecoration:"none", fontFamily:"'Inter', sans-serif", transition:"background 0.18s" }}
                onMouseEnter={() => setHovBtn("wa")} onMouseLeave={() => setHovBtn(null)}>
                <Phone size={13} strokeWidth={1.5} /> WhatsApp us
              </a>

              {/* tertiary — email */}
              <a href={`mailto:${AGENT_EMAIL}?subject=${encodeURIComponent(`Inquiry: ${title}`)}`}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"9px", padding:"13px", fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", border:`1px solid ${hovBtn === "em" ? INK : RULE}`, color: hovBtn === "em" ? INK : MUTE, textDecoration:"none", fontFamily:"'Inter', sans-serif", transition:"all 0.18s" }}
                onMouseEnter={() => setHovBtn("em")} onMouseLeave={() => setHovBtn(null)}>
                <Mail size={13} strokeWidth={1.5} /> Send an email
              </a>

              {/* location */}
              <div style={{ marginTop:"2rem", paddingTop:"1.75rem", borderTop:`1px solid ${RULE}` }}>
                <div style={{ fontSize:"8.5px", letterSpacing:"0.22em", textTransform:"uppercase", color:DIM, marginBottom:"9px" }}>Location</div>
                <div style={{ display:"flex", alignItems:"center", gap:"7px", fontSize:"13px", color:MUTE }}>
                  <MapPin size={13} strokeWidth={1.5} style={{ color:RUST, flexShrink:0 }} />
                  {location}
                </div>
              </div>
            </div>
          </aside>
        </div>

      </main>
    </>
  );
}