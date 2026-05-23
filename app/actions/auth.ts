'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export type AuthState = {
  error?: string;
  /** 회원가입 후 이메일 인증 안내가 필요한 경우 true */
  needsConfirmation?: boolean;
};

const NOT_CONFIGURED: AuthState = {
  error: 'Supabase 설정이 필요합니다. .env.local 파일을 확인해주세요.'
};

function safeLocale(value: FormDataEntryValue | null): 'ko' | 'en' {
  return value === 'en' ? 'en' : 'ko';
}

/** 로그인 — 성공 시 홈으로 리다이렉트, 실패 시 에러 반환 */
export async function signIn(formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;

  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const locale = safeLocale(formData.get('locale'));

  if (!email || !password) {
    return { error: '이메일과 비밀번호를 모두 입력해주세요.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  revalidatePath('/', 'layout');
  redirect(`/${locale}/account`);
}

/** 회원가입 — 이메일 인증이 켜져 있으면 안내 반환, 꺼져 있으면 바로 로그인 */
export async function signUp(formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;

  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const locale = safeLocale(formData.get('locale'));

  if (!email || !password) {
    return { error: '이메일과 비밀번호를 모두 입력해주세요.' };
  }
  if (password.length < 8) {
    return { error: '비밀번호는 8자 이상이어야 합니다.' };
  }

  const origin = (await headers()).get('origin') ?? '';
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/${locale}/account`
    }
  });

  if (error) return { error: error.message };

  // 세션이 없으면 = 이메일 인증 대기 상태
  if (!data.session) {
    return { needsConfirmation: true };
  }

  revalidatePath('/', 'layout');
  redirect(`/${locale}/account`);
}

/** 로그아웃 */
export async function signOut(formData: FormData): Promise<void> {
  const locale = safeLocale(formData.get('locale'));

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  revalidatePath('/', 'layout');
  redirect(`/${locale}`);
}
