'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const t = useTranslations('hero');
  const c = useTranslations('common');

  return (
    <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-28">
      {/* 배경 그라데이션 + 한국 문양 */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 80% 10%, rgb(var(--dahong) / 0.18), transparent 50%), radial-gradient(ellipse at 10% 90%, rgb(var(--dancheong-gold) / 0.18), transparent 55%)'
        }}
      />
      <svg
        aria-hidden
        className="absolute right-0 top-0 -z-10 h-[480px] w-[480px] -translate-y-1/4 translate-x-1/4 opacity-20"
        viewBox="0 0 200 200"
      >
        <defs>
          <pattern id="cloud-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M0 18 Q 9 0 18 18 Q 27 36 36 18"
              fill="none"
              stroke="rgb(var(--dahong))"
              strokeWidth="1.4"
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#cloud-pattern)" />
      </svg>

      <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t('eyebrow')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="heading-display whitespace-pre-line"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-xl text-base md:text-lg text-muted-fg"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a href="#menu">
              <Button size="lg">
                {c('cta.viewMenu')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#concierge">
              <Button size="lg" variant="outline">
                {c('cta.getRecommendation')}
              </Button>
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-lg"
          >
            {(['years', 'menus', 'koUs'] as const).map((k, i) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-[0.18em] text-muted-fg">
                  0{i + 1}
                </dt>
                <dd className="mt-1 text-sm font-medium">{t(`stat.${k}`)}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* 시각 영역: 떡볶이 일러스트 + 김 연기 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgb(var(--dahong)) 0%, #7E1F0F 100%)'
            }}
          >
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full opacity-20"
              viewBox="0 0 200 200"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="hero-floral" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="white" />
                  <path
                    d="M20 6 Q 30 20 20 34 Q 10 20 20 6 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.8"
                  />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#hero-floral)" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[180px] leading-none drop-shadow-2xl">🍡</div>
            </div>

            {/* 김 연기 */}
            <div className="absolute inset-x-0 top-8 flex justify-center gap-3 pointer-events-none">
              {[0, 0.5, 1].map((d) => (
                <span
                  key={d}
                  className="block h-16 w-3 rounded-full bg-white/40 blur-[2px] animate-steam"
                  style={{ animationDelay: `${d}s` }}
                  aria-hidden
                />
              ))}
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/15 backdrop-blur px-4 py-3 text-white">
              <div className="text-xs uppercase tracking-[0.2em] opacity-90">Today&apos;s pick</div>
              <div className="font-serif text-xl">국민 떡볶이 · Classic Tteokbokki</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
