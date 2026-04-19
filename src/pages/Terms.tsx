import { Shield, Scale } from "lucide-react";

export default function Terms() {
  const sections = [
    { title: "1. Acceptance of Terms", content: "By accessing or using ShotNotes, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services." },
    { title: "2. Account Registration", content: "You must register for an account to use most features of ShotNotes. You agree to provide accurate, current information and to maintain the security of your password. You are responsible for all activity under your account." },
    { title: "3. Acceptable Use", content: "You agree not to use ShotNotes to store or transmit illegal content, infringe on intellectual property rights, harass or harm others, distribute malware or malicious code, or attempt to gain unauthorized access to our systems." },
    { title: "4. Intellectual Property", content: "You retain ownership of all content you create in ShotNotes. By using our services, you grant us a limited license to process and store your content solely to provide the service. We retain ownership of the ShotNotes platform, software, and all associated intellectual property." },
    { title: "5. Subscription & Billing", content: "Paid subscriptions are billed in advance on a monthly or yearly basis in Indian Rupees. Prices may change with 30 days' notice. Refunds are not provided for partial months. Cancellation takes effect at the end of the current billing period." },
    { title: "6. Service Availability", content: "We strive for 99.9% uptime but do not guarantee uninterrupted service. We reserve the right to perform maintenance that may temporarily affect availability. We are not liable for losses caused by service interruptions." },
    { title: "7. Data & Privacy", content: "We handle your data as described in our Privacy Policy. We implement industry-standard security measures. However, no system is completely secure, and we cannot guarantee absolute security of your data." },
    { title: "8. Limitation of Liability", content: "ShotNotes is provided 'as is' without warranties of any kind. Our liability is limited to the amount you paid for the service in the 12 months preceding any claim. We are not liable for indirect, incidental, or consequential damages." },
    { title: "9. Termination", content: "We may suspend or terminate your account if you violate these terms. You may close your account at any time from settings. Upon termination, you have 30 days to export your data before it is permanently deleted." },
    { title: "10. Governing Law", content: "These Terms are governed by the laws of India, specifically the Information Technology Act 2000 and the Consumer Protection Act 2019. Any disputes will be resolved in the courts of Bangalore, Karnataka, India." },
    { title: "11. Changes to Terms", content: "We may update these Terms with 30 days' notice for material changes. We will notify you via email and in-app notification. Continued use after the effective date constitutes acceptance." },
    { title: "12. Contact", content: "For legal inquiries, contact legal@shotnotes.app or write to ShotNotes Legal Team, 91 Springboard, Koramangala, Bangalore - 560034, India." },
  ];

  return (
    <div className="min-h-screen">
      <div className="page-hero pt-32 pb-16 text-center">
        <span className="tag-chip bg-brand-orange/10 text-brand-orange border border-brand-orange/20 mb-4 inline-flex items-center gap-1.5">
          <Scale className="w-3 h-3" /> Legal
        </span>
        <h1 className="section-title text-white">Terms & Conditions</h1>
        <p className="text-slate-400 mt-3">Last updated: January 15, 2026 · Please read carefully before using ShotNotes.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-card p-6 mb-8" style={{ border: "1px solid rgba(255,162,57,0.2)" }}>
          <div className="flex items-start gap-3">
            <Scale className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white mb-1">Summary</h3>
              <p className="text-slate-400 text-sm leading-relaxed">These Terms establish the agreement between you and ShotNotes Technologies Pvt. Ltd. for use of our note-taking platform. Key points: You own your content. We provide the service as-is. Paid plans are billed in advance. Violations may result in account suspension.</p>
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

        <div className="mt-10 glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">Have questions about our Terms?</p>
          <a href="mailto:legal@shotnotes.app" className="btn-primary text-sm py-2">Contact Legal Team</a>
        </div>
      </div>
    </div>
  );
}
