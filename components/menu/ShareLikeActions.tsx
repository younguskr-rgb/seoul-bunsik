'use client';

import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import { LikeButton } from './LikeButton';
import { ShareButton } from './ShareButton';
import { cn } from '@/lib/utils';

export function ShareLikeActions({
  targetId,
  shareTitle,
  shareText,
  anchor,
  variant = 'default',
  position = 'corner'
}: {
  targetId: string;
  shareTitle: string;
  shareText?: string;
  /** If set, share URL is `${origin}/${locale}#${anchor}`. If undefined, just `${origin}/${locale}`. */
  anchor?: string;
  variant?: 'default' | 'inverse';
  /** `corner` = absolute top-2 right-2 (rows). `hero` = absolute top-4 right-4 (hero). */
  position?: 'corner' | 'hero';
}) {
  const locale = useLocale();

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const base = `${window.location.origin}/${locale}`;
    return anchor ? `${base}#${anchor}` : base;
  }, [locale, anchor]);

  return (
    <div
      className={cn(
        'absolute z-10 flex gap-1',
        position === 'corner' ? 'right-2 top-2' : 'right-4 top-4'
      )}
    >
      <ShareButton title={shareTitle} text={shareText} url={shareUrl} variant={variant} />
      <LikeButton targetId={targetId} variant={variant} />
    </div>
  );
}
