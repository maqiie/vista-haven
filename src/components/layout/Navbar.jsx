import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
      scrolled ? "bg-black/90 backdrop-blur-md border-b border-border" : "border-b border-transparent"
    }`}>
      <div className="max-w-[1280px] mx-auto px-8 h-full flex items-center gap-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 mr-auto">
          <span className="w-8 h-8 bg-gold text-black font-display text-lg font-semibold flex items-center justify-center">V</span>
          <span className="font-display text-xl text-text-primary tracking-wide">VistaHaven</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-[13px] tracking-widest uppercase transition-colors duration-200 ${
                  location.pathname === l.to ? "text-gold" : "text-text-secondary hover:text-gold"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-flex text-[12px] font-medium tracking-widest uppercase px-5 py-2.5 border border-gold-dim text-gold-light hover:bg-gold hover:text-black hover:border-gold transition-all duration-200 whitespace-nowrap"
        >
          Book a Viewing
        </Link>

        {/* Burger */}
        <button
          className="md:hidden text-text-primary p-1"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col bg-deep border-t border-border px-5 py-6 gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="py-3 text-[15px] text-text-secondary border-b border-border">
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="mt-4 py-3.5 text-center bg-gold text-black text-[13px] font-semibold tracking-widest uppercase">
            Book a Viewing
          </Link>
        </div>
      )}
    </nav>
  );
}
