import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { BrandStory } from '@/components/sections/BrandStory';
import { MenuShowcase } from '@/components/sections/MenuShowcase';
import { BubbleTeaBuilder } from '@/components/sections/BubbleTeaBuilder';
import { BanchanSection } from '@/components/sections/BanchanSection';
import { ConciergeSection } from '@/components/sections/ConciergeSection';
import { MembershipTiers } from '@/components/sections/MembershipTiers';
import { PaymentShowcase } from '@/components/sections/PaymentShowcase';
import { Reviews } from '@/components/sections/Reviews';
import { LocationHours } from '@/components/sections/LocationHours';
import { Faq } from '@/components/sections/Faq';
import { CTAFooterBanner } from '@/components/sections/CTAFooterBanner';
import type { Locale } from '@/lib/i18n/routing';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <BrandStory />
      <MenuShowcase />
      <BanchanSection />
      <BubbleTeaBuilder />
      <ConciergeSection />
      <MembershipTiers />
      <PaymentShowcase />
      <Reviews />
      <LocationHours />
      <Faq />
      <CTAFooterBanner />
    </>
  );
}
