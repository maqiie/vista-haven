import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Share2, AtSign, Link2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-deep border-t border-border mt-24">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 pb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-7 h-7 bg-gold text-black font-display text-base font-semibold flex items-center justify-center">V</span>
            <span className="font-display text-lg text-text-primary">VistaHaven</span>
          </div>
          <p className="text-[13px] text-text-muted leading-relaxed max-w-[280px] mb-6">
            Curating exceptional properties across all categories — residential, commercial, and investment.
          </p>
          <div className="flex gap-4">
            {[Share2, AtSign, Link2].map((Icon, i) => (
              <a key={i} href="#" className="text-text-muted hover:text-gold transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gold mb-5">Explore</h4>
          <ul className="flex flex-col gap-3">
            {[["For Sale", "/properties?type=sale"], ["For Rent", "/properties?type=rent"], ["Commercial Lease", "/properties?type=lease"], ["Residential", "/properties?category=residential"], ["Commercial", "/properties?category=commercial"]].map(([label, to]) => (
              <li key={label}><Link to={to} className="text-[13px] text-text-muted hover:text-text-primary transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gold mb-5">Company</h4>
          <ul className="flex flex-col gap-3">
            {[["About Us", "/about"], ["Contact", "/contact"], ["Book a Viewing", "/contact"]].map(([label, to]) => (
              <li key={label}><Link to={to} className="text-[13px] text-text-muted hover:text-text-primary transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gold mb-5">Contact</h4>
          <ul className="flex flex-col gap-4">
            {[[MapPin, "Nairobi, Kenya"], [Phone, "+254 700 000 000"], [Mail, "hello@vistahaven.co.ke"]].map(([Icon, text]) => (
              <li key={text} className="flex items-center gap-2 text-[13px] text-text-muted">
                <Icon size={14} className="text-gold flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 py-6 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-[12px] text-text-muted">
        <p>© {new Date().getFullYear()} VistaHaven. All rights reserved.</p>
        <p>Built by <a href="https://thmtechnologiesafrica.com" target="_blank" rel="noreferrer" className="text-gold-dim hover:text-gold transition-colors">THM Technologies Africa</a></p>
      </div>
    </footer>
  );
}
