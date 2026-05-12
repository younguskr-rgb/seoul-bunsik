'use client';

import * as React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let _push: ((m: string, t?: ToastType) => void) | null = null;

export function toast(message: string, type: ToastType = 'success') {
  _push?.(message, type);
}

export function Toaster() {
  const [items, setItems] = React.useState<Toast[]>([]);
  const idRef = React.useRef(0);

  React.useEffect(() => {
    _push = (message, type = 'success') => {
      const id = ++idRef.current;
      setItems((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
    return () => {
      _push = null;
    };
  }, []);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4"
    >
      {items.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            'pointer-events-auto flex items-start gap-2 rounded-2xl border border-border bg-card p-3 text-sm shadow-lg animate-fade-in',
            t.type === 'error' && 'border-dahong/40'
          )}
        >
          {t.type === 'error' ? (
            <AlertCircle className="mt-0.5 h-4 w-4 text-dahong" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-dancheong-green" />
          )}
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => setItems((p) => p.filter((x) => x.id !== t.id))}
            aria-label="Dismiss"
            className="text-muted-fg hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
