import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "sale", message: "" });

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = () => { if (form.name && form.email) setSent(true); };

  const inputClass = "bg-surface border border-border-light text-text-primary font-body text-[14px] px-3.5 py-3 outline-none focus:border-gold-dim transition-colors w-full placeholder:text-text-muted";

  return (
    <main className="pb-24">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-8 pt-[calc(72px+80px)] pb-16 border-b border-border">
        <p className="text-[11px] tracking-[0.12em] uppercase text-gold mb-3">Get In Touch</p>
        <h1 className="font-display text-[clamp(28px,4vw,44px)] font-light text-text-primary">Let's Talk Property</h1>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 pt-18">
        {/* Info */}
        <div className="pt-6">
          <div className="w-12 h-px bg-gradient-to-r from-gold to-transparent mb-6" />
          <h2 className="font-display text-2xl font-light text-text-primary mb-7">Visit Us</h2>
          <ul className="flex flex-col gap-5">
            {[[MapPin, "Nairobi, Kenya"], [Phone, "+254 700 000 000"], [Mail, "hello@vistahaven.co.ke"], [Clock, "Mon–Fri: 8am – 6pm\nSat: 9am – 3pm"]].map(([Icon, text]) => (
              <li key={text} className="flex items-start gap-3 text-[14px] text-text-secondary">
                <Icon size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="whitespace-pre-line leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="pt-6">
          {sent ? (
            <div className="text-center py-16 border border-gold-dim bg-[rgba(201,168,76,0.06)]">
              <div className="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center text-xl font-bold mx-auto mb-5">✓</div>
              <h3 className="font-display text-2xl text-text-primary mb-2">Message Received</h3>
              <p className="text-[14px] text-text-muted">One of our agents will be in touch with you shortly.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-widest uppercase text-text-muted">Full Name</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Your name" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-widest uppercase text-text-muted">Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-widest uppercase text-text-muted">Phone (optional)</label>
                  <input name="phone" value={form.phone} onChange={handle} placeholder="+254 …" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-widest uppercase text-text-muted">I'm interested in</label>
                  <select name="interest" value={form.interest} onChange={handle} className={inputClass}>
                    <option value="sale">Buying a property</option>
                    <option value="rent">Renting</option>
                    <option value="lease">Commercial lease</option>
                    <option value="sell">Selling / Listing</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] tracking-widest uppercase text-text-muted">Message</label>
                <textarea name="message" value={form.message} onChange={handle} rows={5} placeholder="Tell us more about what you're looking for…" className={`${inputClass} resize-none`} />
              </div>
              <button
                onClick={submit}
                className="self-start px-9 py-3.5 bg-gold text-black text-[12px] font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
              >
                Send Message
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}