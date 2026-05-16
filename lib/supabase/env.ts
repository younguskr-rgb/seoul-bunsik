/**
 * Supabase 환경변수 — .env.local 에 설정합니다.
 * 값이 없으면 사이트는 정상 동작하되 인증 기능만 비활성화됩니다.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Supabase 자격증명이 모두 설정되어 있는지 여부 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
