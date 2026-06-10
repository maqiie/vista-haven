import { useParams, Link } from "react-router-dom";
import { Bed, Bath, Maximize2, MapPin, ArrowLeft, Phone, Mail } from "lucide-react";
import { properties, formatPrice } from "../data/properties";

const typeLabel = { sale: "For Sale", rent: "For Rent", lease: "Lease" };
const badgeClass = { sale: "bg-sale text-black", rent: "bg-rent text-white", lease: "bg-lease text-black" };

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));

  if (!property) return (
    <div className="max-w-[1280px] mx-auto px-8 pt-40 text-text-muted">
      <p>Property not found.</p>
      <Link to="/properties" className="text-gold mt-4 inline-block">← Back to listings</Link>
    </div>
  );

  const { title, location, price, type, category, beds, baths, sqft, image, tags } = property;

  return (
    <main>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-10 left-0 right-0 max-w-[1280px] mx-auto px-8">
          <Link to="/properties" className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-text-muted hover:text-gold transition-colors mb-4">
            <ArrowLeft size={14} /> All Properties
          </Link>
          <span className={`block w-fit text-[10px] font-semibold tracking-widest uppercase px-3 py-1 mb-3 ${badgeClass[type]}`}>
            {typeLabel[type]}
          </span>
          <h1 className="font-display text-[clamp(28px,4vw,52px)] font-light text-text-primary mb-2">{title}</h1>
          <p className="flex items-center gap-1.5 text-[13px] text-text-secondary">
            <MapPin size={14} /> {location}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 pt-14 pb-24">
        {/* Main */}
        <div>
          <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
            <div>
              <p className="text-[11px] tracking-widest uppercase text-text-muted mb-1.5">Asking Price</p>
              <p className="font-mono text-[28px] text-gold">{formatPrice(price, type)}</p>
            </div>
            <div className="flex flex-wrap gap-6 text-[13px] text-text-secondary items-center">
              {beds && <span className="flex items-center gap-1.5"><Bed size={15} /> {beds} Bedrooms</span>}
              <span className="flex items-center gap-1.5"><Bath size={15} /> {baths} Bathrooms</span>
              <span className="flex items-center gap-1.5"><Maximize2 size={15} /> {sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          <div className="h-px bg-border mb-8" />

          <h2 className="font-display text-2xl font-light text-text-primary mb-4">About this Property</h2>
          <p className="text-[14px] text-text-secondary leading-[1.85] mb-10">
            This exceptional {category} property is situated in one of Nairobi's most sought-after locations — {location}. Offering {sqft.toLocaleString()} sq ft of thoughtfully designed space, it combines modern finishes with timeless elegance.{beds ? ` With ${beds} generously sized bedrooms and ${baths} bathrooms, it` : " It"} is well suited for {type === "sale" ? "discerning buyers seeking long-term value" : type === "rent" ? "tenants looking for a premium living experience" : "businesses seeking a professional environment"}.
          </p>

          {tags?.length > 0 && (
            <div>
              <h3 className="text-[12px] tracking-widest uppercase text-gold mb-4">Features & Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} className="text-[10px] tracking-wide uppercase px-2.5 py-1 border border-border-light text-text-muted">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          <div className="p-8 bg-surface border border-border sticky top-[calc(72px+24px)]">
            <p className="text-[10px] tracking-[0.12em] uppercase text-gold mb-2">Interested?</p>
            <h3 className="font-display text-[22px] font-light text-text-primary mb-3">Speak with an Agent</h3>
            <p className="text-[13px] text-text-muted leading-relaxed mb-6">Our team will arrange a private viewing at your convenience.</p>
            <Link to="/contact" className="flex items-center justify-center gap-2 py-3.5 bg-gold text-black text-[12px] font-semibold tracking-widest uppercase mb-2.5 hover:bg-gold-light transition-colors">
              <Phone size={14} /> Book a Viewing
            </Link>
            <Link to="/contact" className="flex items-center justify-center gap-2 py-3.5 border border-gold-dim text-gold-light text-[12px] font-medium tracking-widest uppercase hover:bg-gold/10 transition-colors">
              <Mail size={14} /> Send Enquiry
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
