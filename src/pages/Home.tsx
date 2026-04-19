import HeroSection from "@/components/features/home/HeroSection";
import FeaturesSection from "@/components/features/home/FeaturesSection";
import HowItWorksSection from "@/components/features/home/HowItWorksSection";
import AiCapabilitiesSection from "@/components/features/home/AiCapabilitiesSection";
import VoiceOcrSection from "@/components/features/home/VoiceOcrSection";
import DashboardPreviewSection from "@/components/features/home/DashboardPreviewSection";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import PricingSection from "@/components/features/home/PricingSection";
import BlogPreviewSection from "@/components/features/home/BlogPreviewSection";
import FaqSection from "@/components/features/home/FaqSection";
import StatsSection from "@/components/features/home/StatsSection";
import CtaSection from "@/components/features/home/CtaSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AiCapabilitiesSection />
      <VoiceOcrSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogPreviewSection />
      <FaqSection />
      <StatsSection />
      <CtaSection />
    </main>
  );
}
