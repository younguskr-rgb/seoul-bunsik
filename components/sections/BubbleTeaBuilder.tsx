'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from './SectionHeader';
import { bubbleTea } from '@/data/bubble-tea';
import { formatPrice, cn } from '@/lib/utils';
import { toast } from '@/components/ui/toaster';
import type { BubbleTeaOption } from '@/lib/types';

type Build = {
  base?: BubbleTeaOption;
  flavor?: BubbleTeaOption;
  toppings: BubbleTeaOption[];
  sweetness?: BubbleTeaOption;
  ice?: BubbleTeaOption;
};

export function BubbleTeaBuilder() {
  const t = useTranslations('bubble');
  const locale = useLocale() as 'ko' | 'en';
  const [build, setBuild] = useState<Build>({ toppings: [] });

  const total = useMemo(() => {
    let p = 0;
    if (build.base) p += build.base.priceDeltaUSD;
    if (build.flavor) p += build.flavor.priceDeltaUSD;
    for (const tp of build.toppings) p += tp.priceDeltaUSD;
    return p;
  }, [build]);

  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <Card className="p-5 md:p-6">
            <Step label={t('step.base')}>
              <OptionRow
                options={bubbleTea.bases}
                value={build.base?.id}
                onChange={(o) => setBuild((b) => ({ ...b, base: o }))}
                locale={locale}
              />
            </Step>
            <Step label={t('step.flavor')}>
              <OptionRow
                options={bubbleTea.flavors}
                value={build.flavor?.id}
                onChange={(o) => setBuild((b) => ({ ...b, flavor: o }))}
                locale={locale}
              />
            </Step>
            <Step label={t('step.toppings')}>
              <OptionRow
                options={bubbleTea.toppings}
                values={build.toppings.map((tp) => tp.id)}
                multi
                onToggle={(o) =>
                  setBuild((b) => {
                    const has = b.toppings.some((tp) => tp.id === o.id);
                    return {
                      ...b,
                      toppings: has
                        ? b.toppings.filter((tp) => tp.id !== o.id)
                        : [...b.toppings, o]
                    };
                  })
                }
                locale={locale}
              />
            </Step>
            <div className="grid gap-4 sm:grid-cols-2">
              <Step label={t('step.sweetness')} small>
                <OptionRow
                  options={bubbleTea.sweetness}
                  value={build.sweetness?.id}
                  onChange={(o) => setBuild((b) => ({ ...b, sweetness: o }))}
                  locale={locale}
                  compact
                />
              </Step>
              <Step label={t('step.ice')} small>
                <OptionRow
                  options={bubbleTea.ice}
                  value={build.ice?.id}
                  onChange={(o) => setBuild((b) => ({ ...b, ice: o }))}
                  locale={locale}
                  compact
                />
              </Step>
            </div>
          </Card>

          <div className="sticky top-24 self-start">
            <Card className="overflow-hidden">
              <div
                className="relative flex h-72 items-end justify-center pt-6 pb-4"
                style={{
                  background:
                    'linear-gradient(180deg, rgb(var(--muted)) 0%, rgb(var(--card)) 100%)'
                }}
              >
                <CupPreview build={build} />
              </div>
              <div className="p-5">
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-fg">
                  {t('price')}
                </div>
                <div className="font-serif text-3xl tabular-nums">{formatPrice(total || 0)}</div>
                <Button
                  className="mt-4 w-full"
                  disabled={!build.base}
                  onClick={() => toast(t('cta.recommend'))}
                >
                  {t('cta.recommend')}
                </Button>
                {!build.base && (
                  <p className="mt-3 text-center text-xs text-muted-fg">{t('preview.empty')}</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  label,
  small,
  children
}: {
  label: string;
  small?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div
        className={cn(
          'mb-2 font-semibold uppercase tracking-[0.16em] text-muted-fg',
          small ? 'text-[10px]' : 'text-xs'
        )}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function OptionRow({
  options,
  value,
  values,
  multi,
  onChange,
  onToggle,
  locale,
  compact
}: {
  options: BubbleTeaOption[];
  value?: string;
  values?: string[];
  multi?: boolean;
  onChange?: (o: BubbleTeaOption) => void;
  onToggle?: (o: BubbleTeaOption) => void;
  locale: 'ko' | 'en';
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = multi ? values?.includes(o.id) : value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => (multi ? onToggle?.(o) : onChange?.(o))}
            className={cn(
              'rounded-full border transition',
              compact ? 'px-3 py-1 text-xs' : 'px-3.5 py-2 text-sm',
              active
                ? 'border-dahong bg-dahong text-white'
                : 'border-border bg-card text-fg hover:border-dahong/40'
            )}
          >
            {o.emoji && <span className="mr-1" aria-hidden>{o.emoji}</span>}
            <span>{o.name[locale]}</span>
            {o.priceDeltaUSD > 0 && (
              <span className="ml-1 opacity-70 text-[10px]">+${o.priceDeltaUSD.toFixed(2)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function CupPreview({ build }: { build: Build }) {
  const baseColor = build.base?.color ?? 'rgb(var(--muted))';
  const flavorColor = build.flavor?.color;
  return (
    <motion.svg
      viewBox="0 0 160 200"
      className="h-60 w-auto drop-shadow-lg"
      initial={false}
      aria-hidden
    >
      {/* lid */}
      <ellipse cx="80" cy="22" rx="56" ry="10" fill="rgb(var(--card))" stroke="rgb(var(--border))" />
      <rect x="24" y="22" width="112" height="6" fill="rgb(var(--card))" stroke="rgb(var(--border))" />
      {/* cup outline (truncated cone) */}
      <path
        d="M28 28 L132 28 L120 188 Q 80 200 40 188 Z"
        fill="rgb(var(--card))"
        stroke="rgb(var(--border))"
      />
      {/* liquid base */}
      <clipPath id="cup-clip">
        <path d="M30 30 L130 30 L119 186 Q 80 197 41 186 Z" />
      </clipPath>
      <g clipPath="url(#cup-clip)">
        <motion.rect
          x="0"
          y="60"
          width="160"
          height="160"
          fill={baseColor}
          initial={false}
          animate={{ y: build.base ? 50 : 200 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {flavorColor && (
          <motion.rect
            x="0"
            y="200"
            width="160"
            height="160"
            fill={flavorColor}
            opacity={0.55}
            animate={{ y: 90 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {/* toppings (bottom area) */}
        {build.toppings.map((tp, i) => (
          <motion.g key={tp.id}>
            {Array.from({ length: 6 }).map((_, k) => (
              <motion.circle
                key={k}
                cx={45 + ((k * 17 + i * 7) % 70)}
                cy={170 - (i % 2) * 8 - (k % 3) * 5}
                r={4}
                fill={tp.color ?? '#2A1A12'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              />
            ))}
          </motion.g>
        ))}
      </g>
      {/* straw */}
      <rect x="76" y="0" width="8" height="30" rx="2" fill="rgb(var(--dahong))" />
    </motion.svg>
  );
}
