import { useTranslations } from 'next-intl';
import type { Allergen } from '@/lib/types';

export function AllergyBadges({ allergens }: { allergens: Allergen[] }) {
  const t = useTranslations('menu');
  if (!allergens.length) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {allergens.slice(0, 4).map((a) => (
        <span
          key={a}
          className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-fg"
          title={t(`allergen.${a}`)}
        >
          {t(`allergen.${a}`)}
        </span>
      ))}
      {allergens.length > 4 && (
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-fg">
          +{allergens.length - 4}
        </span>
      )}
    </div>
  );
}
