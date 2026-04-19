import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    { title: "1. Information We Collect", content: "We collect information you provide directly (name, email, note content), information from your use of our services (usage data, device info, IP address), and information from third-party services if you choose to connect them (Google, Microsoft)." },
    { title: "2. How We Use Your Information", content: "We use your information to provide and improve our services, personalize your experience, send you notifications and updates (with your consent), analyze usage patterns to improve the platform, and comply with legal obligations." },
    { title: "3. Data Security", content: "All notes are encrypted with AES-256 encryption at rest. Data in transit is protected with TLS 1.3. We implement zero-knowledge architecture for note content — even ShotNotes employees cannot read your notes. We are SOC 2 Type II certified and undergo regular third-party security audits." },
    { title: "4. Data Sharing", content: "We do not sell your personal data. We may share data with trusted service providers who help us operate our platform (cloud storage, AI processing), and we require them to handle your data securely. We may disclose information when required by law." },
    { title: "5. Your Rights (GDPR & Indian PDPB)", content: "You have the right to access, correct, or delete your personal data at any time. You can export all your notes and data from your account settings. You may request data deletion, and we will process this within 30 days. You can opt out of non-essential communications." },
    { title: "6. Cookies", content: "We use essential cookies to maintain your session and preferences. We use analytics cookies (with your consent) to understand how you use our platform. You can manage cookie preferences in your browser settings." },
    { title: "7. Data Retention", content: "We retain your account data as long as your account is active. If you delete your account, we will remove your data within 30 days. Backup copies may persist for up to 90 days for disaster recovery purposes." },
    { title: "8. Children's Privacy", content: "ShotNotes is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will delete it promptly." },
    { title: "9. Changes to This Policy", content: "We may update this Privacy Policy periodically. We will notify you of significant changes via email or in-app notification. Continued use of ShotNotes after changes constitutes acceptance of the updated policy." },
    { title: "10. Contact Us", content: "If you have questions about this Privacy Policy or your data, please contact our Privacy Team at privacy@shotnotes.app or write to us at 91 Springboard, Koramangala, Bangalore - 560034, India." },
  ];

  return (
    <div className="min-h-screen">
      <div className="page-hero pt-32 pb-16 text-center">
        <span className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 mb-4 inline-flex items-center gap-1.5">
          <Shield className="w-3 h-3" /> Legal
        </span>
        <h1 className="section-title text-white">Privacy Policy</h1>
        <p className="text-slate-400 mt-3">Last updated: January 15, 2026 · Effective: January 15, 2026</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-card p-6 mb-8" style={{ border: "1px solid rgba(140,228,255,0.2)" }}>
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-sky-blue flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white mb-1">Our Commitment to Your Privacy</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Your privacy is not just a legal obligation for us — it's a core principle. We built ShotNotes with privacy-first architecture. Your notes are yours. We use zero-knowledge encryption so that even we cannot access your content.</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-white/5 pb-8">
              <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
              <p className="text-slate-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-card p-6 text-center">
          <p className="text-slate-400 text-sm mb-3">Questions about your privacy?</p>
          <a href="mailto:privacy@shotnotes.app" className="btn-primary text-sm py-2">Contact Privacy Team</a>
        </div>
      </div>
    </div>
  );
}
