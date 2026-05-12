import { Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function SpiceMeter({ level }: { level: 0 | 1 | 2 | 3 | 4 | 5 }) {
  const t = useTranslations('menu');
  if (level === 0) return null;
  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${t('spice')} ${level}/5`}
      title={`${t('spice')} ${level}/5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Flame
          key={i}
          className={cn(
            'h-3 w-3',
            i < level ? 'fill-dahong text-dahong' : 'text-muted'
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
