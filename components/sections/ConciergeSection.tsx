'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AllergyBadges } from '@/components/menu/AllergyBadges';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { snacks, type Snack, type SnackRegion } from '@/data/snacks';
import { cn } from '@/lib/utils';

type TabValue = 'all' | SnackRegion;

const TABS: { value: TabValue; emoji: string }[] = [
  { value: 'all', emoji: '✨' },
  { value: 'us', emoji: '🇺🇸' },
  { value: 'kr', emoji: '🇰🇷' },
  { value: 'world', emoji: '🌎' }
];

export function ConciergeSection() {
  const t = useTranslations('concierge');
  const [tab, setTab] = useState<TabValue>('all');

  const filtered = useMemo(
    () => (tab === 'all' ? snacks : snacks.filter((s) => s.region === tab)),
    [tab]
  );

  return (
    <section id="concierge" className="section bg-muted/40">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-dahong/30 bg-dahong/10 px-4 py-2 text-xs font-medium text-dahong">
            <ShieldCheck className="h-4 w-4" />
            <span>{t('momBadge')}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-muted-fg">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t('count', { count: snacks.length })}</span>
          </div>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)} className="mb-8 flex justify-center">
          <TabsList>
            {TABS.map((tabItem) => (
              <TabsTrigger key={tabItem.value} value={tabItem.value}>
                <span className="mr-1.5">{tabItem.emoji}</span>
                {t(`tab.${tabItem.value}`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((snack) => (
            <SnackCard key={snack.id} snack={snack} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SnackCard({ snack }: { snack: Snack }) {
  const locale = useLocale() as 'ko' | 'en';
  const t = useTranslations('concierge');
  const [from, to] = snack.imageGradient;

  return (
    <Card className="group flex h-full flex-col overflow-hidden hover:shadow-md focus-within:shadow-md">
      <div
        className="relative flex h-32 items-center justify-center rounded-b-none"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        aria-hidden
      >
        <span className="text-5xl drop-shadow-md transition-transform duration-300 group-hover:scale-110">
          {snack.emoji}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-bg/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fg backdrop-blur">
          {t(`region.${snack.region}`)}
        </span>
        {snack.popular && (
          <span className="absolute right-3 top-3">
            <Badge variant="primary">{t('popular')}</Badge>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <div className="font-serif text-lg leading-tight">{snack.name[locale]}</div>
          <div className="mt-0.5 text-xs text-muted-fg">
            {snack.brand[locale]} · {snack.origin[locale]}
          </div>
        </div>

        <p className="text-sm text-muted-fg line-clamp-2">{snack.shortDesc[locale]}</p>

        <div
          className={cn(
            'mt-1 rounded-xl border border-dahong/30 bg-dahong/5 p-2.5',
            'text-xs leading-relaxed text-fg'
          )}
        >
          <div className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-dahong">
            <ShieldCheck className="h-3 w-3" />
            {t('momCheck')}
          </div>
          <div>{snack.momPick[locale]}</div>
        </div>

        {snack.allergens.length > 0 && (
          <div className="mt-auto pt-1">
            <AllergyBadges allergens={snack.allergens} />
          </div>
        )}
      </div>
    </Card>
  );
}
