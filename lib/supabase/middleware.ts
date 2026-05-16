import { createServerClient } from '@supabase/ssr';
import type { NextRequest, NextResponse } from 'next/server';
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from './env';

/**
 * 인증 세션 쿠키를 갱신합니다.
 * next-intl 미들웨어가 만든 response 에 갱신된 쿠키를 얹어 반환합니다.
 */
export async function updateSession(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  if (!isSupabaseConfigured) return response;

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  // getUser() 호출이 만료된 토큰을 갱신하고 쿠키를 새로 발급합니다.
  await supabase.auth.getUser();

  return response;
}
