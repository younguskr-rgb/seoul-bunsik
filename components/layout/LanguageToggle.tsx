'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');
  const [pending, startTransition] = useTransition();

  function setLocale(next: 'ko' | 'en') {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      role="group"
      aria-label={t('language')}
      className={cn(
        'inline-flex rounded-full border border-border bg-card p-0.5 text-xs font-semibold',
        pending && 'opacity-60',
        className
      )}
    >
      {(['ko', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            'rounded-full px-2.5 py-1 transition-colors',
            locale === code ? 'bg-fg text-bg' : 'text-muted-fg hover:text-fg'
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
