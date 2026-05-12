'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { Star, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from './SectionHeader';
import { membershipTiers } from '@/data/membership';
import { toast } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { MembershipTier } from '@/lib/types';

const schema = z.object({ email: z.string().email() });

export function MembershipTiers() {
  const t = useTranslations('membership');
  const locale = useLocale() as 'ko' | 'en';
  return (
    <section id="membership" className="section">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="grid gap-5 md:grid-cols-3">
          {membershipTiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} locale={locale} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-fg">{t('demoNotice')}</p>
        <div className="mt-8 flex justify-center">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier, locale }: { tier: MembershipTier; locale: 'ko' | 'en' }) {
  const t = useTranslations('membership');
  const pct = Math.min(100, Math.round((tier.pointsProgress / Math.max(tier.pointsRequired || tier.pointsProgress, 1)) * 100));
  return (
    <Card
      className={cn(
        'relative flex flex-col p-6',
        tier.featured && 'border-dahong/60 shadow-md md:scale-[1.03]'
      )}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="primary" className="px-3 py-1">
            <Star className="h-3 w-3" />
            {t('tier.featured')}
          </Badge>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-serif text-2xl">{tier.name[locale]}</div>
          <div className="text-xs text-muted-fg">
            {locale === 'ko' ? tier.name.en : tier.korAccent}
          </div>
        </div>
        <PointsRingMock progress={tier.pointsProgress} required={tier.pointsRequired} accent={tier.accent} />
      </div>

      <ul className="mt-6 space-y-2.5 text-sm">
        {tier.perks.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: tier.accent }} />
            <span>{p[locale]}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-fg">
          {tier.pointsRequired === 0 ? '—' : `${tier.pointsRequired.toLocaleString()} ${t('points')}`}
        </div>
      </div>
    </Card>
  );
}

function PointsRingMock({
  progress,
  required,
  accent
}: {
  progress: number;
  required: number;
  accent: string;
}) {
  const tar = Math.max(required, progress);
  const pct = Math.min(100, Math.round((progress / Math.max(tar, 1)) * 100));
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-14 w-14" role="img" aria-label={`${progress}/${required} points`}>
      <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="rgb(var(--muted))" strokeWidth="5" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth="5"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold">
        {pct}%
      </span>
    </div>
  );
}

function WaitlistForm() {
  const t = useTranslations('membership');
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<{ email: string }>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await new Promise((r) => setTimeout(r, 400));
        setSubmitted(true);
        toast(t('email.success'));
      })}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
      noValidate
    >
      <label className="sr-only" htmlFor="m-email">
        Email
      </label>
      <input
        id="m-email"
        type="email"
        placeholder={t('email.placeholder')}
        aria-invalid={!!errors.email}
        {...register('email')}
        className="flex-1 rounded-full border border-border bg-card px-4 py-3 text-sm focus:border-dahong focus:outline-none"
      />
      <Button type="submit" disabled={isSubmitting || submitted}>
        {submitted ? '✓' : t('join')}
      </Button>
      {errors.email && (
        <span className="text-xs text-dahong sm:absolute sm:translate-y-12">
          {t('email.error')}
        </span>
      )}
    </form>
  );
}
