'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from './SectionHeader';
import { SpiceMeter } from '@/components/menu/SpiceMeter';
import { menu } from '@/data/menu';
import { formatPrice } from '@/lib/utils';

export function BanchanSection() {
  const t = useTranslations('banchan');
  const locale = useLocale() as 'ko' | 'en';
  const banchan = menu.filter((m) => m.id.startsWith('banchan-'));
  const todays = banchan.find((b) => b.popular) ?? banchan[0];
  const totalPrice = banchan.reduce((sum, b) => sum + b.priceUSD, 0);
  const platterPrice = totalPrice * 0.75; // 25% bundle discount

  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* 반찬 한 상 (banchan tray) */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Badge variant="soft">
                <Sparkles className="h-3 w-3" />
                {t('freeBadge')}
              </Badge>
              <a
                href="#menu"
                className="text-xs font-medium text-muted-fg underline-offset-4 hover:underline"
              >
                {t('viewAll')} →
              </a>
            </div>

            <div
              className="relative overflow-hidden rounded-[2rem] p-5 md:p-8"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgb(var(--misek)) 0%, rgb(var(--dancheong-gold) / 0.25) 100%)'
              }}
            >
              {/* 보자기 패턴 */}
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full opacity-30"
                viewBox="0 0 200 200"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern id="banchan-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path
                      d="M0 0 L50 50 M50 0 L0 50"
                      stroke="rgb(var(--meok) / 0.15)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#banchan-grid)" />
              </svg>

              <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {banchan.map((item, i) => {
                  const [c1, c2] = item.imageGradient ?? ['#E8775A', '#7E1F0F'];
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                    >
                      <Card className="h-full overflow-hidden">
                        <div
                          aria-hidden
                          className="relative flex aspect-square items-center justify-center text-4xl md:text-5xl"
                          style={{
                            backgroundImage: `radial-gradient(circle at 30% 30%, ${c1}, ${c2})`
                          }}
                        >
                          {/* 그릇 림 */}
                          <div
                            aria-hidden
                            className="absolute inset-2 rounded-full border-2 border-white/20"
                          />
                          <span className="relative drop-shadow-sm">{item.emoji}</span>
                        </div>
                        <div className="p-3">
                          <div className="font-serif text-sm leading-tight">
                            {item.name[locale]}
                          </div>
                          <div className="mt-0.5 text-[10px] text-muted-fg">
                            {locale === 'ko' ? item.name.en : item.name.ko}
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold tabular-nums">
                              {formatPrice(item.priceUSD)}
                            </span>
                            <SpiceMeter level={item.spiceLevel} />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 사이드 카드: 오늘의 반찬 + 한 상 CTA */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <Card className="overflow-hidden">
              <div
                className="relative flex aspect-[4/3] items-center justify-center text-7xl"
                style={{
                  backgroundImage: todays
                    ? `radial-gradient(circle at 30% 30%, ${todays.imageGradient?.[0] ?? '#F7D86A'}, ${todays.imageGradient?.[1] ?? '#B88828'})`
                    : 'linear-gradient(135deg, #F7D86A, #B88828)'
                }}
              >
                <div className="absolute inset-3 rounded-full border-2 border-white/20" />
                <span className="relative drop-shadow-md">{todays?.emoji ?? '🍳'}</span>
              </div>
              <div className="p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-dahong">
                  {t('todayPick')}
                </div>
                <div className="mt-1 font-serif text-2xl">{todays?.name[locale]}</div>
                <p className="mt-1 text-sm text-muted-fg">
                  {todays?.shortDesc[locale]}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold tabular-nums">
                    {todays ? formatPrice(todays.priceUSD) : ''}
                  </span>
                  <SpiceMeter level={todays?.spiceLevel ?? 0} />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-fg">
                    {locale === 'ko' ? '반찬 8종 한 상' : 'Full banchan platter'}
                  </div>
                  <div className="mt-1 font-serif text-2xl tabular-nums">
                    {formatPrice(platterPrice)}
                  </div>
                </div>
                <div className="text-xs text-muted-fg line-through tabular-nums">
                  {formatPrice(totalPrice)}
                </div>
              </div>
              <Button className="mt-4 w-full">{t('comboCta')}</Button>
              <p className="mt-2 text-center text-[10px] text-muted-fg">
                {locale === 'ko' ? '25% 묶음 할인' : '25% bundle discount'}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
