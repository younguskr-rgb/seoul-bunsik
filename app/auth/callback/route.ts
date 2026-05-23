import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

/** 같은 출처의 상대 경로만 허용 ('/' 로 시작하고 '//' 또는 '/\' 가 아닐 것) */
function safeNext(next: string | null): string {
  if (next && next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/\\')) {
    return next;
  }
  return '/ko';
}

/**
 * 이메일 인증 링크 / OAuth 리다이렉트가 도착하는 콜백.
 * URL 의 code 를 세션으로 교환한 뒤 next 경로로 이동합니다.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = safeNext(searchParams.get('next'));

  if (code && isSupabaseConfigured) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 실패 시 로그인 페이지로 (next 경로의 로케일을 추출해 사용)
  const locale = next.startsWith('/en') ? 'en' : 'ko';
  return NextResponse.redirect(`${origin}/${locale}/login?error=callback`);
}
