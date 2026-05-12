import { useTranslations } from 'next-intl';

export function BrandStory() {
  const t = useTranslations('story');
  return (
    <section className="section">
      <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div
            className="aspect-[4/5] w-full max-w-md rounded-[2rem] overflow-hidden"
            style={{
              backgroundImage:
                'linear-gradient(160deg, rgb(var(--misek)) 0%, rgb(var(--dancheong-gold) / 0.4) 60%, rgb(var(--dahong) / 0.55) 100%)'
            }}
          >
            <svg
              viewBox="0 0 200 250"
              preserveAspectRatio="xMidYMid slice"
              className="h-full w-full"
              aria-hidden
            >
              <defs>
                <pattern id="bojagi" width="50" height="50" patternUnits="userSpaceOnUse">
                  <rect width="50" height="50" fill="transparent" />
                  <path d="M0 0 L50 50 M50 0 L0 50" stroke="rgb(var(--meok) / 0.18)" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="200" height="250" fill="url(#bojagi)" />
              <text
                x="100"
                y="135"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontWeight="600"
                fontSize="48"
                fill="rgb(var(--meok))"
              >
                서울
              </text>
              <text
                x="100"
                y="180"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontWeight="600"
                fontSize="48"
                fill="rgb(var(--dahong))"
              >
                분식
              </text>
            </svg>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-3">{t('eyebrow')}</div>
          <h2 className="heading-2 whitespace-pre-line">{t('title')}</h2>
          <p className="mt-5 text-base md:text-lg text-muted-fg">{t('body1')}</p>
          <p className="mt-3 text-base md:text-lg text-muted-fg">{t('body2')}</p>
          <p className="mt-6 font-serif text-2xl text-dahong">{t('highlight')}</p>
        </div>
      </div>
    </section>
  );
}
