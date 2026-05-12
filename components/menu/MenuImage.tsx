import { cn } from '@/lib/utils';
import type { MenuItem } from '@/lib/types';

export function MenuImage({ item, className }: { item: MenuItem; className?: string }) {
  const [c1, c2] = item.imageGradient ?? ['#E8775A', '#C8322D'];
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-xl flex items-center justify-center text-5xl md:text-6xl',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`
      }}
    >
      {/* 한국 전통 문양 (구름문 추상) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id={`p-${item.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M0 20 Q 10 0 20 20 Q 30 40 40 20"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill={`url(#p-${item.id})`} />
      </svg>
      <span className="relative drop-shadow-sm">{item.emoji ?? '🍱'}</span>
    </div>
  );
}
