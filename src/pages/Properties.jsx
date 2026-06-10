import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import PropertyCard from "../components/property/PropertyCard";
import { properties } from "../data/properties";

const typeOptions     = ["all", "sale", "rent", "lease"];
const categoryOptions = ["all", "residential", "commercial"];

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [search,   setSearch]   = useState("");
  const [type,     setType]     = useState(searchParams.get("type")     || "all");
  const [category, setCategory] = useState(searchParams.get("category") || "all");

  const filtered = useMemo(() => properties.filter(p => {
    const matchType   = type     === "all" || p.type     === type;
    const matchCat    = category === "all" || p.category === category;
    const matchSearch = !search  || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    return matchType && matchCat && matchSearch;
  }), [type, category, search]);

  const FilterBtn = ({ value, active, onClick, label }) => (
    <button
      onClick={onClick}
      className={`text-[11px] tracking-widest uppercase px-3.5 py-1.5 border font-body transition-all ${
        active
          ? "bg-gold text-black border-gold font-semibold"
          : "border-border-light text-text-muted hover:border-gold-dim hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );

  return (
    <main>
      {/* Header */}
      <div className="bg-surface border-b border-border pt-[calc(72px+60px)] pb-16 px-8">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[11px] tracking-[0.12em] uppercase text-gold mb-2">Discover</p>
          <h1 className="font-display text-[clamp(28px,4vw,44px)] font-light text-text-primary">All Properties</h1>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pt-12 pb-24">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center p-5 bg-surface border border-border mb-8">
          <div className="flex items-center gap-2.5 bg-surface-2 border border-border-light px-3.5 py-2.5 flex-1 min-w-[200px] text-text-muted">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search by name or location…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-text-primary text-[13px] w-full placeholder:text-text-muted"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap text-text-muted">
            <SlidersHorizontal size={13} />
            {typeOptions.map(t => (
              <FilterBtn key={t} active={type === t} onClick={() => setType(t)} label={t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)} />
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {categoryOptions.map(c => (
              <FilterBtn key={c} active={category === c} onClick={() => setCategory(c)} label={c === "all" ? "All Categories" : c.charAt(0).toUpperCase() + c.slice(1)} />
            ))}
          </div>
        </div>

        <p className="text-[12px] text-text-muted tracking-wide mb-6">
          {filtered.length} propert{filtered.length === 1 ? "y" : "ies"} found
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-text-muted">
            <p className="mb-4">No properties match your filters.</p>
            <button
              onClick={() => { setType("all"); setCategory("all"); setSearch(""); }}
              className="px-6 py-2.5 border border-gold-dim text-gold text-[12px] tracking-widest uppercase hover:bg-gold/10 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
