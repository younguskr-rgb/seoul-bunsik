import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="heading-2 whitespace-pre-line">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-muted-fg">{subtitle}</p>
      )}
    </div>
  );
}
