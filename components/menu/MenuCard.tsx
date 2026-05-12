'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SpiceMeter } from './SpiceMeter';
import { AllergyBadges } from './AllergyBadges';
import { MenuImage } from './MenuImage';
import { formatPrice } from '@/lib/utils';
import type { MenuItem } from '@/lib/types';

export function MenuCard({ item, compact = false }: { item: MenuItem; compact?: boolean }) {
  const locale = useLocale() as 'ko' | 'en';
  const t = useTranslations('menu');
  return (
    <Card className="group flex h-full flex-col overflow-hidden hover:shadow-md focus-within:shadow-md">
      <div className="relative">
        <MenuImage item={item} className={compact ? 'h-28 rounded-b-none' : 'h-44 rounded-b-none'} />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {item.popular && <Badge variant="primary">{t('badge.popular')}</Badge>}
          {item.newItem && <Badge variant="warn">{t('badge.new')}</Badge>}
          {item.comingSoon && <Badge variant="outline">{t('badge.comingSoon')}</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-serif text-lg leading-tight">{item.name[locale]}</div>
            {!compact && (
              <div className="mt-0.5 text-xs text-muted-fg">
                {locale === 'ko' ? item.name.en : item.name.ko}
              </div>
            )}
          </div>
          <div className="text-sm font-semibold tabular-nums">{formatPrice(item.priceUSD)}</div>
        </div>
        {!compact && (
          <p className="text-sm text-muted-fg line-clamp-2">{item.shortDesc[locale]}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <SpiceMeter level={item.spiceLevel} />
          <AllergyBadges allergens={item.allergens} />
        </div>
      </div>
    </Card>
  );
}
