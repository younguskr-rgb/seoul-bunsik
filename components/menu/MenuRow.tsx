'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Flame } from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import type { MenuItem } from '@/lib/types';
import { ShareLikeActions } from './ShareLikeActions';

export function MenuRow({ item }: { item: MenuItem }) {
  const locale = useLocale() as 'ko' | 'en';
  const t = useTranslations('menu');
  const gradient = item.imageGradient
    ? `linear-gradient(135deg, ${item.imageGradient[0]}, ${item.imageGradient[1]})`
    : undefined;

  return (
    <div
      id={`menu-${item.slug}`}
      className="group relative grid grid-cols-[56px_1fr_auto] gap-3.5 rounded-xl p-3 pr-16 transition-colors hover:bg-muted/40"
    >
      <ShareLikeActions
        targetId={`menu-${item.slug}`}
        shareTitle={item.name[locale]}
        shareText={item.shortDesc[locale]}
        anchor={`menu-${item.slug}`}
      />
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
        style={{ background: gradient }}
        aria-hidden
      >
        {item.emoji}
      </div>

      <div className="min-w-0">
        <div className="font-serif text-[17px] font-bold leading-tight text-fg">
          {item.name[locale]}
        </div>
        <div className="mt-0.5 text-[11px] uppercase tracking-[0.08em] text-muted-fg">
          {locale === 'ko' ? item.name.en : item.name.ko}
        </div>
        <p className="mt-1.5 text-[12.5px] leading-snug text-muted-fg line-clamp-2">
          {item.shortDesc[locale]}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {item.popular && (
            <span className="rounded-full bg-dahong px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.06em] text-white">
              {t('badge.popular')}
            </span>
          )}
          {item.newItem && (
            <span className="rounded-full bg-amber-600 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.06em] text-white">
              {t('badge.new')}
            </span>
          )}
          {item.spiceLevel > 0 && (
            <span
              className="inline-flex items-center gap-0.5"
              aria-label={`${t('spice')} ${item.spiceLevel}/5`}
              title={`${t('spice')} ${item.spiceLevel}/5`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Flame
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < item.spiceLevel ? 'fill-dahong text-dahong' : 'text-muted'
                  )}
                  aria-hidden
                />
              ))}
            </span>
          )}
        </div>
      </div>

      <div className="self-start pt-1 text-[16px] font-bold tabular-nums text-fg">
        {formatPrice(item.priceUSD)}
      </div>
    </div>
  );
}
