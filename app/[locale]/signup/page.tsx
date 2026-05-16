import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import { SignupForm } from './SignupForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('signup') };
}

export default async function SignupPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'auth' });

  return (
    <div className="container-wide flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-medium">{t('signupTitle')}</h1>
        <p className="mt-2 text-sm text-muted-fg">{t('signupSubtitle')}</p>

        <SignupForm locale={locale} />

        <p className="mt-6 text-center text-sm text-muted-fg">
          {t('haveAccount')}{' '}
          <Link
            href="/login"
            className="font-medium text-dahong hover:underline"
          >
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
