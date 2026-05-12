'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Accordion } from '@/components/ui/accordion';
import { SectionHeader } from './SectionHeader';
import { faq } from '@/data/faq';

export function Faq() {
  const t = useTranslations('faq');
  const locale = useLocale() as 'ko' | 'en';
  return (
    <section className="section">
      <div className="container-narrow">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
        <Accordion
          items={faq.map((item, i) => ({
            id: `faq-${i}`,
            title: item.q[locale],
            content: <p>{item.a[locale]}</p>
          }))}
        />
      </div>
    </section>
  );
}
