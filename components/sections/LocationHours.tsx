import { useTranslations } from 'next-intl';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from './SectionHeader';
import { business } from '@/data/business';

export function LocationHours() {
  const t = useTranslations('location');
  const c = useTranslations('common');
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.zip}`
  )}`;
  return (
    <section id="visit" className="section">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <div
              aria-hidden
              className="relative h-72 w-full"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgb(var(--dancheong-blue) / 0.15), rgb(var(--dancheong-green) / 0.15))'
              }}
            >
              <svg viewBox="0 0 400 280" className="h-full w-full">
                {/* abstract street grid */}
                <g stroke="rgb(var(--border))" strokeWidth="1.5">
                  <line x1="0" y1="60" x2="400" y2="60" />
                  <line x1="0" y1="140" x2="400" y2="140" />
                  <line x1="0" y1="220" x2="400" y2="220" />
                  <line x1="100" y1="0" x2="100" y2="280" />
                  <line x1="220" y1="0" x2="220" y2="280" />
                  <line x1="320" y1="0" x2="320" y2="280" />
                </g>
                <g>
                  <circle cx="220" cy="140" r="20" fill="rgb(var(--dahong))" opacity="0.18" />
                  <circle cx="220" cy="140" r="9" fill="rgb(var(--dahong))" />
                  <circle cx="220" cy="140" r="3" fill="white" />
                </g>
                <text
                  x="220"
                  y="170"
                  textAnchor="middle"
                  className="text-xs"
                  fill="rgb(var(--fg))"
                  fontSize="11"
                  fontWeight="600"
                >
                  Seoul Bunsik · Dracut, MA
                </text>
              </svg>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-dahong" />
                  <div className="text-sm">
                    <div>{business.address.line1}</div>
                    <div className="text-muted-fg">
                      {business.address.city}, {business.address.state} {business.address.zip}
                    </div>
                  </div>
                </div>
                <a href={directions} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">{t('directions')}</Button>
                </a>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Phone className="h-4 w-4 text-dahong" />
                {t('phoneLabel')}
              </div>
              <div className="mt-1.5 text-xl font-medium">
                <a href={`tel:${business.phone}`} className="hover:underline">
                  {business.phone}
                </a>
              </div>
              <a href={`tel:${business.phone}`} className="mt-3 inline-block">
                <Button size="sm" variant="soft">{t('callNow')}</Button>
              </a>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Clock className="h-4 w-4 text-dahong" />
                {t('hoursLabel')}
              </div>
              <ul className="mt-3 space-y-1 text-sm">
                {business.hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between gap-4">
                    <span className="text-muted-fg">{t(`day.${h.day}`)}</span>
                    <span className="tabular-nums">
                      {h.closed ? t('closed') : `${h.open} – ${h.close}`}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
