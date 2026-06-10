import { Link } from "react-router-dom";
import { Bed, Bath, Maximize2 } from "lucide-react";
import { formatPrice } from "../../data/properties";

const typeLabel = { sale: "For Sale", rent: "For Rent", lease: "Lease" };
const badgeClass = {
  sale:  "bg-sale text-black",
  rent:  "bg-rent text-white",
  lease: "bg-lease text-black",
};

export default function PropertyCard({ property }) {
  const { id, title, location, price, type, beds, baths, sqft, image, tags } = property;

  return (
    <Link
      to={`/properties/${id}`}
      className="block bg-surface border border-border hover:border-gold-dim hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3.5 left-3.5 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 ${badgeClass[type]}`}>
          {typeLabel[type]}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-[11px] tracking-widest uppercase text-text-muted mb-1.5">{location}</p>
        <h3 className="font-display text-[19px] font-normal text-text-primary leading-snug mb-3">{title}</h3>
        <p className="font-mono text-[15px] text-gold mb-3.5">{formatPrice(price, type)}</p>

        <div className="flex flex-wrap gap-4 text-[12px] text-text-secondary mb-3.5">
          {beds && <span className="flex items-center gap-1.5"><Bed size={13} /> {beds} Beds</span>}
          <span className="flex items-center gap-1.5"><Bath size={13} /> {baths} Baths</span>
          <span className="flex items-center gap-1.5"><Maximize2 size={13} /> {sqft.toLocaleString()} sqft</span>
        </div>

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map(t => (
              <span key={t} className="text-[10px] tracking-wide uppercase px-2 py-0.5 border border-border-light text-text-muted">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
