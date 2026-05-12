import { useTranslations } from 'next-intl';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { business } from '@/data/business';

export function Footer() {
  const t = useTranslations();
  const c = useTranslations('common');
  return (
    <footer className="mt-24 border-t border-border bg-card/60">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Logo className="h-10 w-10" />
            <div>
              <div className="font-serif text-xl">{c('brand')}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-fg">
                {c('tagline')}
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-fg">
            {t('footer.madeIn')}
          </p>
          <div className="mt-4 flex items-center gap-3">
            {business.socials.instagram && (
              <a
                href={business.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-border p-2 text-muted-fg hover:text-fg hover:bg-muted"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
            <LanguageToggle />
          </div>
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-fg">
            {t('location.title')}
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-dahong" />
              <span>
                {business.address.line1}
                <br />
                {business.address.city}, {business.address.state} {business.address.zip}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-dahong" />
              <a href={`tel:${business.phone}`} className="hover:underline">
                {business.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-dahong" />
              <a href={`mailto:${business.email}`} className="hover:underline">
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-fg">
            {t('location.hoursLabel')}
          </div>
          <ul className="space-y-1 text-sm text-muted-fg">
            {business.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{t(`location.day.${h.day}`)}</span>
                <span>
                  {h.closed ? t('location.closed') : `${h.open}–${h.close}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-fg">
        {t('footer.copy', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
