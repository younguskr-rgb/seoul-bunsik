'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { DietTag } from '@/lib/types';

const FILTER_TAGS: DietTag[] = [
  'healthy',
  'spicy',
  'kid-friendly',
  'first-timer',
  'hearty',
  'sweet',
  'vegetarian'
];

export function MenuFilterTags({
  active,
  onChange
}: {
  active: DietTag[];
  onChange: (tags: DietTag[]) => void;
}) {
  const t = useTranslations('menu');

  const toggle = (tag: DietTag) => {
    onChange(active.includes(tag) ? active.filter((a) => a !== tag) : [...active, tag]);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {FILTER_TAGS.map((tag) => {
        const on = active.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            aria-pressed={on}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
              on
                ? 'border-dahong bg-dahong text-white shadow-sm'
                : 'border-border bg-card text-muted-fg hover:border-dahong/40 hover:text-fg'
            )}
          >
            {t(`filter.${tag}`)}
          </button>
        );
      })}
      {active.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([])}
          className="rounded-full px-3 py-1.5 text-xs text-muted-fg underline-offset-4 hover:underline"
        >
          {t('filter.clear')}
        </button>
      )}
    </div>
  );
}
