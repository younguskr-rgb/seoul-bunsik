'use client';

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useLike } from '@/lib/hooks/useLike';

export function LikeButton({
  targetId,
  variant = 'default',
  ariaLabel
}: {
  targetId: string;
  variant?: 'default' | 'inverse';
  ariaLabel?: string;
}) {
  const t = useTranslations('menu.actions');
  const { liked, toggle } = useLike(targetId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggle();
  };

  const label = ariaLabel ?? (liked ? t('liked') : t('like'));

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors',
        variant === 'default'
          ? liked
            ? 'bg-dahong/15 text-dahong'
            : 'bg-black/5 text-fg hover:bg-dahong/10 hover:text-dahong'
          : liked
            ? 'bg-dahong/40 text-misek'
            : 'bg-misek/15 text-misek hover:bg-misek/30'
      )}
    >
      <Heart
        className={cn('h-3.5 w-3.5', liked && 'fill-current')}
        aria-hidden
      />
    </button>
  );
}
