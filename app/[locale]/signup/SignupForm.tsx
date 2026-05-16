'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signUp } from '@/app/actions/auth';

const inputClass =
  'h-11 w-full rounded-xl border border-border bg-bg px-4 text-sm outline-none transition-colors focus:border-dahong';

export function SignupForm({ locale }: { locale: string }) {
  const t = useTranslations('auth');
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signUp(formData);
      if (result?.error) setError(result.error);
      else if (result?.needsConfirmation) setConfirmed(true);
    });
  }

  if (confirmed) {
    return (
      <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-border bg-bg p-8 text-center">
        <MailCheck className="h-10 w-10 text-dahong" />
        <h2 className="font-serif text-xl font-medium">{t('confirmTitle')}</h2>
        <p className="text-sm text-muted-fg">{t('confirmBody')}</p>
      </div>
    );
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
          minLength={6}
          autoComplete="new-password"
          placeholder={t('passwordPlaceholder')}
          className={inputClass}
        />
        <span className="text-xs text-muted-fg">{t('passwordHint')}</span>
      </label>

      {error && (
        <p className="rounded-xl bg-dahong/10 px-4 py-3 text-sm text-dahong">
          {error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? t('pending') : t('submitSignup')}
      </Button>
    </form>
  );
}
