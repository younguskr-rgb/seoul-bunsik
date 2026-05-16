'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Menu as MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { AuthButtons } from './AuthButtons';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import { business } from '@/data/business';

const NAV = [
  { key: 'menu', href: '#menu' },
  { key: 'concierge', href: '#concierge' },
  { key: 'membership', href: '#membership' },
  { key: 'visit', href: '#visit' }
] as const;

export function Header() {
  const t = useTranslations('common');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all',
        scrolled
          ? 'border-b border-border bg-bg/80 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-medium">{t('brand')}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-fg">
              Dracut, MA
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-muted-fg hover:bg-muted hover:text-fg"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <div className="hidden md:flex">
            <AuthButtons />
          </div>
          <a
            href={business.socials.doordash}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button size="sm">{t('cta.orderNow')}</Button>
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card"
            aria-label={t('openMenu')}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <div className="mt-6 flex flex-col gap-1">
          <div className="mb-4 flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-serif text-lg">{t('brand')}</span>
          </div>
          {NAV.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium hover:bg-muted"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
          <div className="mt-4 flex items-center justify-between gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <div className="mt-4 border-t border-border pt-4">
            <AuthButtons
              variant="stacked"
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
          <a
            href={business.socials.doordash}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2"
          >
            <Button className="w-full">{t('cta.orderNow')}</Button>
          </a>
        </div>
      </Sheet>
    </header>
  );
}
