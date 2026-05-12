'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Accordion({
  items
}: {
  items: Array<{ id: string; title: React.ReactNode; content: React.ReactNode }>;
}) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-medium">{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-muted-fg transition-transform',
                  open && 'rotate-180'
                )}
              />
            </button>
            {open && (
              <div className="px-5 pb-5 text-sm text-muted-fg animate-fade-in">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
