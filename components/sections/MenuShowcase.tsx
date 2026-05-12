'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SectionHeader } from './SectionHeader';
import { MenuCard } from '@/components/menu/MenuCard';
import { MenuFilterTags } from '@/components/menu/MenuFilterTags';
import { menuByCategory } from '@/data/menu';
import type { Category, DietTag, MenuItem } from '@/lib/types';

const CATEGORIES: Category[] = [
  'street-food',
  'bubble-tea',
  'banchan-bento',
  'k-snack',
  'us-snack'
];

function filterItems(items: MenuItem[], tags: DietTag[]) {
  if (!tags.length) return items;
  return items.filter((item) => tags.every((tag) => item.dietTags.includes(tag)));
}

export function MenuShowcase() {
  const t = useTranslations('menu');
  const [active, setActive] = useState<Category>('street-food');
  const [tags, setTags] = useState<DietTag[]>([]);

  const filteredByCategory = useMemo(() => {
    const out: Record<Category, MenuItem[]> = {} as never;
    for (const cat of CATEGORIES) {
      out[cat] = filterItems(menuByCategory[cat] ?? [], tags);
    }
    return out;
  }, [tags]);

  return (
    <section id="menu" className="section">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mb-6 flex flex-col items-center gap-4">
          <Tabs value={active} onValueChange={(v) => setActive(v as Category)}>
            <TabsList className="flex-wrap justify-center">
              {CATEGORIES.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {t(`category.${cat}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="w-full">
            <div className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-fg">
              {t('filter.title')}
            </div>
            <MenuFilterTags active={tags} onChange={setTags} />
          </div>
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat} hidden={active !== cat}>
            {filteredByCategory[cat].length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-fg">
                {t('filter.empty')}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredByCategory[cat].map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
