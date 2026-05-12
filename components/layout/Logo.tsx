import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Seoul Bunsik logo"
      className={cn('shrink-0', className)}
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--dahong))" />
          <stop offset="100%" stopColor="rgb(var(--dancheong-gold))" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#logo-bg)" />
      {/* simplified flower / 모란 abstract */}
      <g fill="rgb(var(--misek))" opacity="0.95">
        <circle cx="24" cy="24" r="5" />
        <ellipse cx="24" cy="14" rx="3.2" ry="5.2" />
        <ellipse cx="24" cy="34" rx="3.2" ry="5.2" />
        <ellipse cx="14" cy="24" rx="5.2" ry="3.2" />
        <ellipse cx="34" cy="24" rx="5.2" ry="3.2" />
      </g>
      <circle cx="24" cy="24" r="2.4" fill="rgb(var(--meok))" />
    </svg>
  );
}
