'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Flame } from 'lucide-react';
import { MenuRow } from '@/components/menu/MenuRow';
import { ShareLikeActions } from '@/components/menu/ShareLikeActions';
import { menu } from '@/data/menu';
import type { MenuItem, MenuSection } from '@/lib/types';

const SECTION_ORDER: MenuSection[] = [
  'mandu',
  'mains',
  'rice-noodle-stew',
  'galbi-tangsuyuk'
];

function groupBySection(items: MenuItem[]): Record<MenuSection, MenuItem[]> {
  const grouped = {
    mandu: [],
    mains: [],
    'rice-noodle-stew': [],
    'galbi-tangsuyuk': []
  } as Record<MenuSection, MenuItem[]>;
  for (const item of items) grouped[item.section].push(item);
  return grouped;
}

export function MenuShowcase() {
  const t = useTranslations('menu');
  const grouped = useMemo(() => groupBySection(menu), []);

  return (
    <section id="menu" className="section">
      <div className="container-wide">
        {/* Hero banner */}
        <div
          className="group relative mb-7 overflow-hidden rounded-[20px] px-10 py-14 text-misek"
          style={{
            background:
              'linear-gradient(135deg, #2a0f0a 0%, #4a1810 50%, #6b1f14 100%)'
          }}
        >
          <ShareLikeActions
            targetId="brand"
            shareTitle={t('hero.brand')}
            shareText={t('hero.lead')}
            variant="inverse"
            position="hero"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-10 select-none font-serif text-[220px] font-black leading-none tracking-[-8px] text-misek/5"
          >
            {t('hero.brand')}
          </span>
          <div className="relative">
            <div className="mb-3.5 text-[11px] uppercase tracking-[0.32em] text-dahong-soft">
              {t('hero.location')}
            </div>
            <h2 className="font-serif text-[56px] font-extrabold leading-[1.05]">
              {t('hero.brand')}
              <br />
              <span className="text-[22px] font-normal tracking-[0.18em] text-misek/70">
                {t('hero.brandEn')}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-misek/80">
              {t('hero.lead')}
            </p>
            <div className="mt-7 flex flex-wrap gap-7 text-[13px] text-misek/60">
              <span>
                <strong className="font-semibold text-misek">25</strong>{' '}
                {t('hero.stat.menus')}
              </span>
              <span>
                <strong className="font-semibold text-misek">4</strong>{' '}
                {t('hero.stat.categories')}
              </span>
              <span>{t('hero.stat.spice')}</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-6 flex flex-wrap items-center gap-5 rounded-[10px] bg-misek px-4 py-2.5 text-[11px] text-muted-fg">
          <span className="inline-flex items-center gap-1.5">
            <span className="rounded-full bg-dahong px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.06em] text-white">
              {t('badge.popular')}
            </span>
            {t('legend.popular')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Flame
                  key={i}
                  className="h-3 w-3 fill-dahong text-dahong"
                  aria-hidden
                />
              ))}
            </span>
            {t('legend.spice')}
          </span>
        </div>

        {/* Category sections */}
        {SECTION_ORDER.map((sectionKey) => {
          const items = grouped[sectionKey];
          if (!items.length) return null;
          return (
            <div key={sectionKey} className="mb-10">
              <div className="mb-5 flex items-baseline justify-between border-b-2 border-meok pb-2.5">
                <h3 className="font-serif text-[28px] font-extrabold text-fg">
                  {t(`section.${sectionKey}`)}{' '}
                  <span className="text-[14px] font-normal text-muted-fg">
                    · {t('section.count', { count: items.length })}
                  </span>
                </h3>
                <div className="text-[12px] uppercase tracking-[0.24em] text-muted-fg">
                  {t(`section.${sectionKey}En`)}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-7 gap-y-3.5 md:grid-cols-2">
                {items.map((item) => (
                  <MenuRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Allergy notice */}
        <div className="mt-6 flex items-start gap-3 rounded-lg border-l-[3px] border-dahong bg-misek px-[18px] py-3.5 text-[12.5px] text-fg sm:items-center">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-dahong sm:mt-0" />
          <div>
            <span className="font-semibold text-dahong">
              {t('allergyNotice.title')}
            </span>{' '}
            <span className="text-muted-fg">{t('allergyNotice.body')}</span>
          </div>
        </div>

        {/* Brand footer stripe */}
        <div className="mt-8 rounded-xl bg-meok px-4 py-[18px] text-center text-[13px] text-misek">
          <strong className="font-serif tracking-[0.06em]">
            {t('footerStripe')}
          </strong>
        </div>
      </div>
    </section>
  );
}
