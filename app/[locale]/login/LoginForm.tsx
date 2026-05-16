'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { signIn } from '@/app/actions/auth';

const inputClass =
  'h-11 w-full rounded-xl border border-border bg-bg px-4 text-sm outline-none transition-colors focus:border-dahong';

export function LoginForm({
  locale,
  initialError
}: {
  locale: string;
  initialError?: string;
}) {
  const t = useTranslations('auth');
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t('email')}</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t('password')}</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder={t('passwordPlaceholder')}
          className={inputClass}
        />
      </label>

      {error && (
        <p className="rounded-xl bg-dahong/10 px-4 py-3 text-sm text-dahong">
          {error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? t('pending') : t('submitLogin')}
      </Button>
    </form>
  );
}
