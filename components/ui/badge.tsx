import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-muted text-fg',
        primary: 'bg-dahong text-white',
        soft: 'bg-dahong/10 text-dahong',
        outline: 'border border-border text-fg',
        success: 'bg-dancheong-green/15 text-dancheong-green',
        warn: 'bg-dancheong-gold/15 text-dancheong-gold'
      }
    },
    defaultVariants: { variant: 'default' }
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
