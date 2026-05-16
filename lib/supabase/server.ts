import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env';

/**
 * 서버(서버 컴포넌트 / 서버 액션 / 라우트 핸들러)용 Supabase 클라이언트.
 * Next.js 15 에서 cookies() 는 비동기이므로 await 후 사용합니다.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // 서버 컴포넌트에서 호출되면 set 이 무시됩니다.
          // 세션 갱신은 middleware 가 담당하므로 무시해도 안전합니다.
        }
      }
    }
  });
}
