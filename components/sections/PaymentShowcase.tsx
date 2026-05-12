'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CreditCard, Smartphone, QrCode, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { SectionHeader } from './SectionHeader';

export function PaymentShowcase() {
  const t = useTranslations('payment');
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <section className="section bg-muted/40">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-dahong/10 text-dahong">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl">{t('card.title')}</h3>
            <p className="mt-1.5 text-sm text-muted-fg">{t('card.desc')}</p>
            <CardTerminalMock className="mt-6" />
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-dahong/10 text-dahong">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl">{t('mobile.title')}</h3>
            <p className="mt-1.5 text-sm text-muted-fg">{t('mobile.desc')}</p>
            <MobilePayMock className="mt-6" />
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-dahong/10 text-dahong">
              <QrCode className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl">{t('qr.title')}</h3>
            <p className="mt-1.5 text-sm text-muted-fg">{t('qr.desc')}</p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <QRCodeMock seed="seoul-bunsik-dracut" />
              <Button variant="outline" size="sm" onClick={() => setQrOpen(true)}>
                {t('openQr')}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Dialog
        open={qrOpen}
        onOpenChange={setQrOpen}
        title={t('qrModal.title')}
        description={t('qrModal.body')}
      >
        <div className="flex flex-col items-center gap-3">
          <QRCodeMock seed="seoul-bunsik-launch" size={180} />
          <Button onClick={() => setQrOpen(false)} className="w-full">
            <Check className="h-4 w-4" />
            OK
          </Button>
        </div>
      </Dialog>
    </section>
  );
}

function CardTerminalMock({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div
        className="relative rounded-2xl border border-border bg-bg p-4 shadow-inner"
        aria-hidden
      >
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-fg">
          <span>Seoul Bunsik POS</span>
          <span>● Live</span>
        </div>
        <div className="rounded-lg bg-card px-3 py-2 font-mono text-xs">
          $ 12.50 — APPROVED ✓
        </div>
        <div className="mt-3 flex gap-2 text-[10px] text-muted-fg">
          {['VISA', 'MC', 'AMEX', 'AP', 'GP'].map((b) => (
            <span key={b} className="rounded-md border border-border px-1.5 py-0.5">
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobilePayMock({ className }: { className?: string }) {
  const [tab, setTab] = useState(0);
  const tabs = [
    { name: 'KakaoPay', color: '#FAE100', text: '#000' },
    { name: 'Toss', color: '#0064FF', text: '#fff' },
    { name: 'Apple Pay', color: '#000', text: '#fff' }
  ];
  const cur = tabs[tab];
  return (
    <div className={className} aria-hidden>
      <div className="mx-auto w-[160px] rounded-[28px] border-4 border-fg/80 bg-bg p-2 shadow-inner">
        <div
          className="rounded-[18px] p-3 text-[11px]"
          style={{ background: cur.color, color: cur.text }}
        >
          <div className="font-semibold">{cur.name}</div>
          <div className="mt-3 text-xl font-bold">$12.50</div>
          <div className="mt-1 opacity-80">Seoul Bunsik</div>
          <div className="mt-4 rounded-lg bg-white/15 px-2 py-1.5 text-[10px]">
            Hold near reader
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-1">
        {tabs.map((b, i) => (
          <button
            key={b.name}
            type="button"
            onClick={() => setTab(i)}
            className={`h-1.5 w-6 rounded-full transition ${i === tab ? 'bg-dahong' : 'bg-muted'}`}
            aria-label={b.name}
          />
        ))}
      </div>
    </div>
  );
}

function QRCodeMock({ seed, size = 120 }: { seed: string; size?: number }) {
  // 결정적 가짜 QR: 시드 기반 격자
  const n = 21;
  const cells: boolean[] = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  for (let i = 0; i < n * n; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push((h & 1) === 1);
  }
  // 코너 finder 강제
  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  return (
    <svg
      viewBox={`0 0 ${n} ${n}`}
      width={size}
      height={size}
      role="img"
      aria-label="Sample QR code"
      className="rounded-md border border-border bg-card p-2"
    >
      <rect width={n} height={n} fill="rgb(var(--card))" />
      {cells.map((on, idx) => {
        const r = Math.floor(idx / n);
        const c = idx % n;
        if (isFinder(r, c)) return null;
        if (!on) return null;
        return <rect key={idx} x={c} y={r} width={1} height={1} fill="rgb(var(--meok))" />;
      })}
      {/* finder patterns */}
      {[
        [0, 0],
        [0, n - 7],
        [n - 7, 0]
      ].map(([r, c]) => (
        <g key={`${r}-${c}`}>
          <rect x={c} y={r} width={7} height={7} fill="rgb(var(--meok))" />
          <rect x={c + 1} y={r + 1} width={5} height={5} fill="rgb(var(--card))" />
          <rect x={c + 2} y={r + 2} width={3} height={3} fill="rgb(var(--meok))" />
        </g>
      ))}
    </svg>
  );
}
