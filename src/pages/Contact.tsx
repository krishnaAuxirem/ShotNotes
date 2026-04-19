import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Clock, Rocket, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const CONTACT_INFO = [
    { Icon: Mail, label: "Email", value: "hello@shotnotes.app", href: "mailto:hello@shotnotes.app" },
    { Icon: MapPin, label: "Address", value: "91 Springboard, Koramangala, Bangalore - 560034" },
    { Icon: Phone, label: "Phone", value: "+91 80 1234 5678", href: "tel:+918012345678" },
    { Icon: Clock, label: "Support Hours", value: "Mon–Fri, 9am–6pm IST" },
  ];

  return (
    <div className="min-h-screen">
      <div className="page-hero pt-32 pb-20 text-center">
        <span className="tag-chip bg-brand-orange/10 text-brand-orange border border-brand-orange/20 mb-4 inline-flex items-center gap-1.5">
          <Mail className="w-3 h-3" /> Contact Us
        </span>
        <h1 className="section-title text-white">We'd Love to <span className="gradient-text-orange">Hear From You</span></h1>
        <p className="section-subtitle mt-4">Have a question, feedback, or want to discuss enterprise plans? We're here to help.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-10">
              {CONTACT_INFO.map((info) => {
                const Icon = info.Icon;
                return (
                  <div key={info.label} className="flex items-start gap-4 glass-card p-4">
                    <Icon className="w-5 h-5 text-sky-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-400 mb-0.5">{info.label}</div>
                      {info.href ? (
                        <a href={info.href} className="text-sm text-white hover:text-sky-blue transition-colors">{info.value}</a>
                      ) : (
                        <div className="text-sm text-white">{info.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-4 h-4 text-brand-orange" />
                <h3 className="font-semibold text-white">Enterprise & Partnerships</h3>
              </div>
              <p className="text-sm text-slate-400 mb-3">Looking to implement ShotNotes for your organization? Our enterprise team is ready to help.</p>
              <a href="mailto:enterprise@shotnotes.app" className="btn-primary text-sm py-2 inline-flex items-center gap-1">
                Contact Enterprise Team
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="glass-card p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-sky-blue/20 flex items-center justify-center">
                    <Send className="w-8 h-8 text-sky-blue" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="btn-primary mt-6 text-sm py-2">Send Another</button>
              </div>
            ) : (
              <div className="glass-card p-8" style={{ border: "1px solid rgba(255,162,57,0.15)" }}>
                <h2 className="text-xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Full Name *</label>
                      <input className="input-field" placeholder="Alex Johnson" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Email *</label>
                      <input type="email" className="input-field" placeholder="alex@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Subject *</label>
                    <select className="input-field" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required>
                      <option value="">Select a topic...</option>
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing & Payments</option>
                      <option>Enterprise Pricing</option>
                      <option>Feature Request</option>
                      <option>Bug Report</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Message *</label>
                    <textarea className="input-field min-h-32 resize-none" placeholder="Tell us how we can help..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                  </div>
                  <button type="submit" disabled={loading} className="btn-orange w-full py-3 justify-center disabled:opacity-70 flex items-center gap-2">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                        Sending...
                      </span>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
