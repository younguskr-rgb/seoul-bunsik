import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { routing, type Locale } from '@/lib/i18n/routing';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  const isKo = locale === 'ko';
  return {
    metadataBase: new URL('https://seoulbunsik.example.com'),
    title: {
      default: `${t('brand')} — ${t('tagline')}`,
      template: `%s · ${t('brand')}`
    },
    description: isKo
      ? '드라컷 MA의 한국 분식 식당. 떡볶이부터 버블티, 반찬·도시락, 한·미 스낵까지. 분식 집사가 골라드립니다.'
      : 'A Korean bunsik kitchen in Dracut, MA. Tteokbokki, bubble tea, banchan, bento, Korean & American snacks — picked for your taste.',
    openGraph: {
      title: `${t('brand')} — ${t('tagline')}`,
      locale: isKo ? 'ko_KR' : 'en_US',
      type: 'website'
    },
    alternates: {
      languages: { ko: '/ko', en: '/en' }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <main id="content">{children}</main>
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
