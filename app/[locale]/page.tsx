import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { BrandStory } from '@/components/sections/BrandStory';
import { MenuShowcase } from '@/components/sections/MenuShowcase';
import { ConciergeSection } from '@/components/sections/ConciergeSection';
import { MembershipTiers } from '@/components/sections/MembershipTiers';
import { PaymentShowcase } from '@/components/sections/PaymentShowcase';
import { Reviews } from '@/components/sections/Reviews';
import { LocationHours } from '@/components/sections/LocationHours';
import { Faq } from '@/components/sections/Faq';
import { CTAFooterBanner } from '@/components/sections/CTAFooterBanner';
export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <BrandStory />
      <MenuShowcase />
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
