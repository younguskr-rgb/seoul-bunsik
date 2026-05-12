'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toaster';
import { business } from '@/data/business';

export function CTAFooterBanner() {
  const t = useTranslations('cta');
  const c = useTranslations('common');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubmitted(true);
    toast(t.raw('newsletterCta') as string + ' ✓');
  }

  return (
    <section className="section">
      <div className="container-wide">
        <div
          className="relative overflow-hidden rounded-[2rem] p-8 md:p-14 text-white"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 20% 20%, rgb(var(--dahong) / 0.95), rgb(var(--meok)) 70%)'
          }}
        >
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-10"
            viewBox="0 0 400 240"
          >
            <defs>
              <pattern id="cta-cloud" width="36" height="36" patternUnits="userSpaceOnUse">
                <path
                  d="M0 18 Q 9 0 18 18 Q 27 36 36 18"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.4"
                />
              </pattern>
            </defs>
            <rect width="400" height="240" fill="url(#cta-cloud)" />
          </svg>

          <div className="relative grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="heading-2 whitespace-pre-line text-white">{t('title')}</h2>
              <p className="mt-3 max-w-md text-white/80">{t('subtitle')}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={business.socials.doordash} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary">{c('cta.orderNow')}</Button>
                </a>
                <a href="#visit">
                  <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                    {c('nav.visit')}
                  </Button>
                </a>
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                {t('newsletter')}
              </div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletterPlaceholder')}
                  className="flex-1 rounded-full bg-white px-4 py-3 text-sm text-meok focus:outline-none"
                />
                <Button type="submit" variant="secondary" disabled={submitted}>
                  {submitted ? '✓' : t('newsletterCta')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
