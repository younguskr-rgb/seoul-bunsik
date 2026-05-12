'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHeader } from './SectionHeader';
import { reviews } from '@/data/reviews';
import type { Review } from '@/lib/types';

export function Reviews() {
  const t = useTranslations('reviews');
  const locale = useLocale() as 'ko' | 'en';
  const row1 = reviews.slice(0, 4);
  const row2 = reviews.slice(4);

  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      </div>
      <Marquee items={row1} locale={locale} direction="normal" />
      <div className="h-4" />
      <Marquee items={row2} locale={locale} direction="reverse" />
      <div className="container-wide mt-6 text-center text-[11px] text-muted-fg">
        {t('disclaimer')}
      </div>
    </section>
  );
}

function Marquee({
  items,
  locale,
  direction
}: {
  items: Review[];
  locale: 'ko' | 'en';
  direction: 'normal' | 'reverse';
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden" aria-hidden={false}>
      <div
        className={`flex gap-4 w-max ${
          direction === 'reverse' ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review, locale }: { review: Review; locale: 'ko' | 'en' }) {
  return (
    <Card className="w-[280px] sm:w-[320px] shrink-0 p-5">
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white"
          style={{ background: review.avatarColor }}
        >
          {review.initial}
        </div>
        <div>
          <div className="text-sm font-semibold">{review.author}</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-fg">
            {review.source}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-0.5">
          {Array.from({ length: review.rating }, (_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-dancheong-gold text-dancheong-gold" />
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-fg line-clamp-4">{review.quote[locale]}</p>
    </Card>
  );
}
