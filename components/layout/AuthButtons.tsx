'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LogOut, User as UserIcon } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { Link, useRouter } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export function AuthButtons({
  variant = 'inline',
  onNavigate
}: {
  /** inline: 헤더 바 / stacked: 모바일 메뉴 */
  variant?: 'inline' | 'stacked';
  onNavigate?: () => void;
}) {
  const t = useTranslations('auth');
  const router = useRouter();
  const [supabase] = useState(() =>
    isSupabaseConfigured ? createClient() : null
  );
  // undefined = 로딩 중, null = 비로그인
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    onNavigate?.();
    router.push('/');
    router.refresh();
  }

  // Supabase 미설정 또는 로딩 중에는 아무것도 렌더링하지 않음
  if (!isSupabaseConfigured || user === undefined) return null;

  const stacked = variant === 'stacked';
  const wrapClass = cn(
    'flex items-center gap-2',
    stacked && 'w-full flex-col'
  );

  if (user) {
    return (
      <div className={wrapClass}>
        <Link
          href="/account"
          onClick={onNavigate}
          className={cn(stacked && 'w-full')}
        >
          <Button
            variant="outline"
            size="sm"
            className={cn('gap-1.5', stacked && 'w-full')}
          >
            <UserIcon className="h-4 w-4" />
            <span className="max-w-[10rem] truncate">{user.email}</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size={stacked ? 'sm' : 'icon'}
          onClick={handleSignOut}
          aria-label={t('logout')}
          className={cn(stacked && 'w-full gap-1.5')}
        >
          <LogOut className="h-4 w-4" />
          {stacked && t('logout')}
        </Button>
      </div>
    );
  }

  return (
    <div className={wrapClass}>
      <Link
        href="/login"
        onClick={onNavigate}
        className={cn(stacked && 'w-full')}
      >
        <Button variant="ghost" size="sm" className={cn(stacked && 'w-full')}>
          {t('login')}
        </Button>
      </Link>
      <Link
        href="/signup"
        onClick={onNavigate}
        className={cn(stacked && 'w-full')}
      >
        <Button variant="outline" size="sm" className={cn(stacked && 'w-full')}>
          {t('signup')}
        </Button>
      </Link>
    </div>
  );
}
