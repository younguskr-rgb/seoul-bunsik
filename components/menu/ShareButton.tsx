'use client';

import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export function ShareButton({
  title,
  text,
  url,
  variant = 'default',
  ariaLabel
}: {
  title: string;
  text?: string;
  url: string;
  variant?: 'default' | 'inverse';
  ariaLabel?: string;
}) {
  const t = useTranslations('menu.actions');

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        toast(t('copied'), 'success');
        return;
      } catch {
        toast(t('copyFailed'), 'error');
        return;
      }
    }

    toast(t('copyFailed'), 'error');
  };

  const label = ariaLabel ?? t('share');

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors',
        variant === 'default'
          ? 'bg-black/5 text-fg hover:bg-dahong/10 hover:text-dahong'
          : 'bg-misek/15 text-misek hover:bg-misek/30'
      )}
    >
      <Share2 className="h-3.5 w-3.5" aria-hidden />
    </button>
  );
}
