import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { signOut } from '@/app/actions/auth';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('accountTitle') };
}

export default async function AccountPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'auth' });

  if (!isSupabaseConfigured) redirect(`/${locale}/login`);

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // 로그인하지 않은 사용자는 로그인 페이지로
  if (!user) redirect(`/${locale}/login`);

  const memberSince = user.created_at
    ? new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(user.created_at))
    : '—';

  return (
    <div className="container-wide flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-medium">{t('accountTitle')}</h1>

        <dl className="mt-6 flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-bg p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-fg">
              {t('signedInAs')}
            </dt>
            <dd className="mt-1 break-all text-sm font-medium">{user.email}</dd>
          </div>
          <div className="rounded-2xl border border-border bg-bg p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-fg">
              {t('memberSince')}
            </dt>
            <dd className="mt-1 text-sm font-medium">{memberSince}</dd>
          </div>
        </dl>

        <form action={signOut} className="mt-6">
          <input type="hidden" name="locale" value={locale} />
          <Button type="submit" variant="outline" className="w-full">
            {t('logout')}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link href="/" className="text-muted-fg hover:text-fg hover:underline">
            {t('backHome')}
          </Link>
        </p>
      </div>
    </div>
  );
}
