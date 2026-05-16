import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import { LoginForm } from './LoginForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('login') };
}

export default async function LoginPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale } = await params;
  const { error } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'auth' });

  return (
    <div className="container-wide flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-medium">{t('loginTitle')}</h1>
        <p className="mt-2 text-sm text-muted-fg">{t('loginSubtitle')}</p>

        <LoginForm
          locale={locale}
          initialError={error === 'callback' ? t('callbackError') : undefined}
        />

        <p className="mt-6 text-center text-sm text-muted-fg">
          {t('noAccount')}{' '}
          <Link
            href="/signup"
            className="font-medium text-dahong hover:underline"
          >
            {t('signup')}
          </Link>
        </p>
      </div>
    </div>
  );
}
