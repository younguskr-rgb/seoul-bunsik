'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, ShoppingBag, Sparkles } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MenuCard } from '@/components/menu/MenuCard';
import { toast } from '@/components/ui/toaster';
import { recommend, filterByTags, ALLERGEN_OPTIONS } from '@/lib/concierge/recommend';
import type {
  Allergen,
  DietTag,
  Mood,
  Party,
  Recommendation,
  SnackPref,
  Style
} from '@/lib/types';
import { cn } from '@/lib/utils';

const FILTERS: DietTag[] = ['healthy', 'spicy', 'kid-friendly', 'first-timer', 'hearty', 'sweet', 'vegetarian'];
const MOODS: Mood[] = ['stress-relief', 'hearty', 'light', 'sweet', 'adventurous'];
const PARTIES: Party[] = ['solo', 'duo', 'group'];
const STYLES: Style[] = ['healthy', 'flavor', 'balanced'];
const SNACKS: SnackPref[] = ['k-snack', 'us-snack', 'both', 'none'];

const MOOD_EMOJI: Record<Mood, string> = {
  'stress-relief': '🔥',
  hearty: '🍱',
  light: '🌿',
  sweet: '🍰',
  adventurous: '✨'
};
const STYLE_EMOJI: Record<Style, string> = {
  healthy: '🥦',
  flavor: '🤤',
  balanced: '⚖️'
};
const SNACK_EMOJI: Record<SnackPref, string> = {
  'k-snack': '🇰🇷',
  'us-snack': '🇺🇸',
  both: '🌍',
  none: '✖️'
};

export function ConciergeSection() {
  const t = useTranslations('concierge');
  return (
    <section id="concierge" className="section bg-muted/40">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <TagPanel />
          <ChatPanel />
        </div>
      </div>
    </section>
  );
}

function TagPanel() {
  const t = useTranslations('concierge');
  const tMenu = useTranslations('menu');
  const [active, setActive] = useState<DietTag[]>(['healthy']);
  const results = useMemo(() => filterByTags(active).slice(0, 3), [active]);

  return (
    <Card className="p-5 md:p-6">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-dahong" />
        <h3 className="font-serif text-xl">{t('tab.tags')}</h3>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((tag) => {
          const on = active.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={on}
              onClick={() =>
                setActive((p) => (p.includes(tag) ? p.filter((x) => x !== tag) : [...p, tag]))
              }
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                on
                  ? 'border-dahong bg-dahong text-white'
                  : 'border-border bg-card text-muted-fg hover:text-fg'
              )}
            >
              {tMenu(`filter.${tag}`)}
            </button>
          );
        })}
      </div>
      {results.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-fg">{tMenu('filter.empty')}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-3">
          {results.map((item) => (
            <MenuCard key={item.id} item={item} compact />
          ))}
        </div>
      )}
    </Card>
  );
}

function ChatPanel() {
  const t = useTranslations('concierge');
  return (
    <Card className="p-5 md:p-6">
      <div className="mb-3 flex items-center gap-2">
        <span aria-hidden className="text-xl">🤖</span>
        <h3 className="font-serif text-xl">{t('tab.chat')}</h3>
      </div>
      <ConciergeChat />
    </Card>
  );
}

type Step = 'spice' | 'allergy' | 'party' | 'style' | 'snack' | 'mood' | 'result';
const STEPS: Step[] = ['spice', 'allergy', 'party', 'style', 'snack', 'mood'];

function ConciergeChat() {
  const t = useTranslations('concierge');
  const locale = useLocale() as 'ko' | 'en';
  const [step, setStep] = useState<Step>('spice');
  const [spiceMax, setSpiceMax] = useState<0 | 1 | 2 | 3 | 4 | 5>(3);
  const [allergies, setAllergies] = useState<Allergen[]>([]);
  const [party, setParty] = useState<Party>('duo');
  const [style, setStyle] = useState<Style>('balanced');
  const [snackPref, setSnackPref] = useState<SnackPref>('none');
  const [mood, setMood] = useState<Mood>('hearty');
  const [result, setResult] = useState<Recommendation | null>(null);

  const stepIdx = STEPS.indexOf(step);

  function next() {
    if (step === 'mood') {
      const rec = recommend({
        spiceMax,
        excludeAllergens: allergies,
        mood,
        party,
        style,
        snackPref
      });
      setResult(rec);
      setStep('result');
    } else {
      setStep(STEPS[stepIdx + 1]);
    }
  }
  function back() {
    if (step === 'result') {
      setStep('mood');
      setResult(null);
    } else if (stepIdx > 0) {
      setStep(STEPS[stepIdx - 1]);
    }
  }
  function restart() {
    setStep('spice');
    setResult(null);
  }

  return (
    <div>
      {step !== 'result' && (
        <div
          className="mb-4 flex items-center gap-2 text-xs text-muted-fg"
          aria-live="polite"
        >
          <span className="font-semibold uppercase tracking-wide">
            {t('chat.step')} {stepIdx + 1} {t('chat.of')} {STEPS.length}
          </span>
          <div className="flex-1 h-1 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-dahong transition-all"
              style={{ width: `${((stepIdx + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {step === 'spice' && (
            <StepWrap title={t('step1.title')}>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSpiceMax(n as 0 | 1 | 2 | 3 | 4 | 5)}
                    aria-pressed={spiceMax === n}
                    className={cn(
                      'rounded-2xl border px-3 py-3 text-sm transition flex flex-col items-center gap-1',
                      spiceMax === n
                        ? 'border-dahong bg-dahong/10 text-dahong'
                        : 'border-border bg-card text-muted-fg hover:text-fg'
                    )}
                  >
                    <span aria-hidden className="text-xl">
                      {['😶', '🙂', '😋', '🌶️', '🔥', '💥'][n]}
                    </span>
                    <span className="text-[11px] font-medium">{t(`spice.${n}`)}</span>
                  </button>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 'allergy' && (
            <StepWrap title={t('step2.title')} subtitle={t('step2.subtitle')}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {ALLERGEN_OPTIONS.map((a) => {
                  const on = allergies.includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setAllergies((prev) =>
                          prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
                        )
                      }
                      className={cn(
                        'rounded-xl border px-3 py-2 text-sm transition',
                        on
                          ? 'border-dahong bg-dahong/10 text-dahong'
                          : 'border-border bg-card text-muted-fg hover:text-fg'
                      )}
                    >
                      <AllergyLabel a={a} />
                    </button>
                  );
                })}
              </div>
            </StepWrap>
          )}

          {step === 'party' && (
            <StepWrap title={t('step3.title')}>
              <div className="grid grid-cols-3 gap-2">
                {PARTIES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={party === p}
                    onClick={() => setParty(p)}
                    className={cn(
                      'rounded-2xl border px-3 py-4 text-sm transition flex flex-col items-center gap-2',
                      party === p
                        ? 'border-dahong bg-dahong/10 text-dahong'
                        : 'border-border bg-card text-muted-fg hover:text-fg'
                    )}
                  >
                    <span aria-hidden className="text-2xl">
                      {p === 'solo' ? '🧍' : p === 'duo' ? '👯' : '👨‍👩‍👧'}
                    </span>
                    <span className="font-medium">{t(`party.${p}`)}</span>
                  </button>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 'style' && (
            <StepWrap title={t('step4.title')} subtitle={t('step4.subtitle')}>
              <div className="grid grid-cols-3 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={style === s}
                    onClick={() => setStyle(s)}
                    className={cn(
                      'rounded-2xl border px-3 py-4 text-sm transition flex flex-col items-center gap-2',
                      style === s
                        ? 'border-dahong bg-dahong/10 text-dahong'
                        : 'border-border bg-card text-muted-fg hover:text-fg'
                    )}
                  >
                    <span aria-hidden className="text-2xl">{STYLE_EMOJI[s]}</span>
                    <span className="text-xs font-medium">{t(`style.${s}`)}</span>
                  </button>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 'snack' && (
            <StepWrap title={t('step5.title')} subtitle={t('step5.subtitle')}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SNACKS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={snackPref === s}
                    onClick={() => setSnackPref(s)}
                    className={cn(
                      'rounded-2xl border px-3 py-4 text-sm transition flex flex-col items-center gap-1',
                      snackPref === s
                        ? 'border-dahong bg-dahong/10 text-dahong'
                        : 'border-border bg-card text-muted-fg hover:text-fg'
                    )}
                  >
                    <span aria-hidden className="text-2xl">{SNACK_EMOJI[s]}</span>
                    <span className="text-[11px] font-medium">{t(`snack.${s}`)}</span>
                  </button>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 'mood' && (
            <StepWrap title={t('step6.title')}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={mood === m}
                    onClick={() => setMood(m)}
                    className={cn(
                      'rounded-2xl border px-3 py-4 text-sm transition flex flex-col items-center gap-1',
                      mood === m
                        ? 'border-dahong bg-dahong/10 text-dahong'
                        : 'border-border bg-card text-muted-fg hover:text-fg'
                    )}
                  >
                    <span aria-hidden className="text-2xl">{MOOD_EMOJI[m]}</span>
                    <span className="text-[11px] font-medium">{t(`mood.${m}`)}</span>
                  </button>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 'result' && result && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-dahong/10 px-4 py-3 text-sm text-dahong">
                <div className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  {t('result.title')}
                </div>
                <div className="mt-1">{result.rationale[locale]}</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <ResultSlot label={t('result.main')} item={result.main} />
                <ResultSlot label={t('result.side')} item={result.side} />
                <ResultSlot label={t('result.drink')} item={result.drink} />
              </div>
              {(result.kSnack || result.usSnack) && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.kSnack && (
                    <ResultSlot label={t('result.kSnack')} item={result.kSnack} />
                  )}
                  {result.usSnack && (
                    <ResultSlot label={t('result.usSnack')} item={result.usSnack} />
                  )}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => toast(t('chat.cartAdded'))}>
                  <ShoppingBag className="h-4 w-4" />
                  {t('chat.addToCart')}
                </Button>
                <Button variant="outline" onClick={restart}>
                  <RotateCcw className="h-4 w-4" />
                  {t('chat.restart')}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step !== 'result' && (
        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={back}
            disabled={stepIdx === 0}
            className="disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('chat.back')}
          </Button>
          <Button onClick={next} size="sm">
            {t('chat.next')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function StepWrap({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-1 font-serif text-lg">{title}</h4>
      {subtitle && <p className="mb-3 text-xs text-muted-fg">{subtitle}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function AllergyLabel({ a }: { a: Allergen }) {
  const t = useTranslations('menu');
  return <>{t(`allergen.${a}`)}</>;
}

function ResultSlot({ label, item }: { label: string; item: Recommendation['main'] }) {
  return (
    <div>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-fg">
        {label}
      </div>
      <MenuCard item={item} compact />
    </div>
  );
}
