import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './lib/i18n/routing';
import { updateSession } from './lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 1) next-intl 이 로케일 처리(리다이렉트 포함)를 수행한 response 를 만들고
  const response = intlMiddleware(request);
  // 2) 그 response 에 갱신된 Supabase 세션 쿠키를 얹어 반환합니다.
  return updateSession(request, response);
}

export const config = {
  // auth 콜백 라우트는 로케일 처리에서 제외합니다.
  matcher: ['/((?!api|auth|_next|_vercel|.*\\..*).*)']
};
