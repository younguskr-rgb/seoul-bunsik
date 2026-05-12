'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { MenuCard } from '@/components/menu/MenuCard';
import { MenuFilterTags } from '@/components/menu/MenuFilterTags';
import { menu } from '@/data/menu';
import type { DietTag, MenuItem } from '@/lib/types';

function filterItems(items: MenuItem[], tags: DietTag[]) {
  if (!tags.length) return items;
  return items.filter((item) => tags.every((tag) => item.dietTags.includes(tag)));
}

export function MenuShowcase() {
  const t = useTranslations('menu');
  const [tags, setTags] = useState<DietTag[]>([]);

  const filtered = useMemo(() => filterItems(menu, tags), [tags]);

  return (
    <section id="menu" className="section">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mb-6 flex flex-col items-center gap-4">
          <div className="w-full">
            <div className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-fg">
              {t('filter.title')}
            </div>
            <MenuFilterTags active={tags} onChange={setTags} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-fg">{t('filter.empty')}</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-dahong/30 bg-dahong/5 px-4 py-3 text-sm text-fg sm:items-center sm:justify-center sm:text-center">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-dahong sm:mt-0" />
          <div>
            <span className="font-semibold">{t('allergyNotice.title')}</span>{' '}
            <span className="text-muted-fg">{t('allergyNotice.body')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
