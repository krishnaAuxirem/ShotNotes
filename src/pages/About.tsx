import { Building2, Users, Globe, Calendar } from "lucide-react";

export default function About() {
  const TEAM = [
    { name: "Aarav Mehta", role: "Co-founder & CEO", avatar: "https://i.pravatar.cc/150?img=12", bio: "Ex-Google PM with 10 years in productivity tools." },
    { name: "Priya Sharma", role: "Co-founder & CTO", avatar: "https://i.pravatar.cc/150?img=23", bio: "AI/ML engineer who built voice recognition at Siri." },
    { name: "Rohan Gupta", role: "Head of Design", avatar: "https://i.pravatar.cc/150?img=33", bio: "Award-winning UX designer from NIFT Delhi." },
    { name: "Ananya Patel", role: "Head of AI Research", avatar: "https://i.pravatar.cc/150?img=44", bio: "PhD in NLP from IIT Bombay. Built ShotNotes AI engine." },
  ];

  const MILESTONES = [
    { year: "2022", event: "ShotNotes founded in Bangalore" },
    { year: "2022", event: "Seed funding of ₹3 Crore raised" },
    { year: "2023", event: "Launched iOS & Android apps" },
    { year: "2023", event: "Reached 50,000 active users" },
    { year: "2024", event: "Series A of ₹25 Crore raised" },
    { year: "2024", event: "Launched AI summarization engine" },
    { year: "2025", event: "500,000+ users across 150 countries" },
    { year: "2026", event: "Enterprise plan & team collaboration" },
  ];

  const COMPANY_STATS = [
    { value: "500K+", label: "Active Users", Icon: Users },
    { value: "₹28 Cr", label: "Funding Raised", Icon: Building2 },
    { value: "150+", label: "Countries", Icon: Globe },
    { value: "2022", label: "Founded", Icon: Calendar },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="page-hero pt-32 pb-20 text-center">
        <span className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 mb-4 inline-flex items-center gap-1.5">
          <Building2 className="w-3 h-3" /> About Us
        </span>
        <h1 className="section-title text-white max-w-3xl mx-auto">
          We're on a Mission to Make
          <br /><span className="gradient-text-blue">Human Memory Infinite</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
          ShotNotes was born from a simple frustration — great ideas are lost because capturing them takes too long.
          We're building the fastest, smartest note-taking platform ever created.
        </p>
      </div>

      {/* Stats */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {COMPANY_STATS.map((s) => {
            const Icon = s.Icon;
            return (
              <div key={s.label} className="text-center">
                <Icon className="w-6 h-6 text-sky-blue mx-auto mb-2" />
                <div className="text-3xl font-bold gradient-text-blue mb-1">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-[17px]">
          <p>In 2022, Aarav Mehta was attending back-to-back meetings at a Bangalore startup. He had great ideas — product insights, strategic pivots, conversation snippets — but by the time he opened a note-taking app, the moment had passed. The friction was too high.</p>
          <p>He met Priya Sharma, an AI researcher building voice recognition systems, and the two realized they could build something radically better: a platform where capturing a note takes less than one second, and AI does the rest.</p>
          <p>Today, ShotNotes is used by students, professionals, researchers, journalists, and entrepreneurs across 150 countries. Our AI engine processes over 2 million notes every day, generating summaries, extracting keywords, and helping people build their second brain.</p>
          <p>We believe great ideas deserve to be captured — and we're here to make sure none of them slip away.</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-dark-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-sky-blue/20" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} className={`flex gap-8 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="glass-card p-4 inline-block">
                      <div className="text-sky-blue font-bold text-sm mb-1">{m.year}</div>
                      <div className="text-white text-sm">{m.event}</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-sky-blue flex-shrink-0 mt-4 z-10 relative" />
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="glass-card p-6 text-center hover:-translate-y-2 transition-transform duration-300">
              <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover" />
              <h3 className="font-semibold text-white mb-1">{member.name}</h3>
              <div className="text-xs text-sky-blue mb-3">{member.role}</div>
              <p className="text-slate-400 text-xs leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
