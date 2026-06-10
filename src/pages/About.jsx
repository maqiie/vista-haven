const team = [
  { name: "Amara Osei",    role: "Founder & CEO",          img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { name: "Zawadi Kimani", role: "Head of Residential",     img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "David Mwangi",  role: "Commercial Director",     img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
];

export default function About() {
  return (
    <main className="pb-24">
      {/* Hero */}
      <div className="max-w-[1280px] mx-auto px-8 pt-[calc(72px+80px)] pb-20 border-b border-border">
        <p className="text-[11px] tracking-[0.12em] uppercase text-gold mb-3">Who We Are</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-text-primary leading-tight mb-6">
          Built on trust.<br />
          <em className="italic text-gold-light">Driven by results.</em>
        </h1>
        <p className="max-w-[600px] text-base text-text-secondary leading-relaxed">
          VistaHaven is Nairobi's full-spectrum real estate platform, connecting buyers, tenants, and investors with properties that match their vision — across every category and price point.
        </p>
      </div>

      {/* Body */}
      <div className="max-w-[1280px] mx-auto px-8 pt-20 grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Story */}
        <div>
          <div className="w-12 h-px bg-gradient-to-r from-gold to-transparent mb-6" />
          <h2 className="font-display text-[28px] font-light text-text-primary mb-6">Our Story</h2>
          <p className="text-[14px] text-text-secondary leading-[1.85] mb-4">
            Founded with a belief that real estate should be transparent, accessible, and expertly guided, VistaHaven was built to bridge the gap between great properties and the right people. Over a decade of market experience informs everything we do.
          </p>
          <p className="text-[14px] text-text-secondary leading-[1.85]">
            Our team of seasoned agents and property consultants brings local insight and international standards to every transaction. Whether you're acquiring your first home, expanding a commercial portfolio, or seeking strong investment returns, we're with you at every step.
          </p>
        </div>

        {/* Team */}
        <div>
          <div className="w-12 h-px bg-gradient-to-r from-gold to-transparent mb-6" />
          <h2 className="font-display text-[28px] font-light text-text-primary mb-6">The Team</h2>
          <div className="flex flex-col gap-4">
            {team.map(m => (
              <div key={m.name} className="flex items-center gap-4 p-4 border border-border bg-surface">
                <img src={m.img} alt={m.name} className="w-14 h-14 rounded-full object-cover border-2 border-gold-dim flex-shrink-0" />
                <div>
                  <h3 className="font-display text-[17px] font-normal text-text-primary">{m.name}</h3>
                  <p className="text-[11px] tracking-widest uppercase text-gold mt-0.5">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
