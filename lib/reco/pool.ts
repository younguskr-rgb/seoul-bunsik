import { menu } from '@/data/menu';
import { snacks } from '@/data/snacks';
import type { RecoItem } from '@/lib/types';

/** 분식 메뉴 + 스낵을 단일 추천 후보 풀로 정규화한다. comingSoon 메뉴는 제외. */
export function buildPool(): RecoItem[] {
  const menuItems: RecoItem[] = menu
    .filter((m) => !m.comingSoon)
    .map((m) => ({
      kind: 'menu' as const,
      id: m.id,
      name: m.name,
      shortDesc: m.shortDesc,
      allergens: m.allergens,
      dietTags: m.dietTags,
      emoji: m.emoji,
      imageGradient: m.imageGradient,
      priceUSD: m.priceUSD,
      spiceLevel: m.spiceLevel,
      popular: m.popular
    }));

  const snackItems: RecoItem[] = snacks.map((s) => ({
    kind: 'snack' as const,
    id: s.id,
    name: s.name,
    shortDesc: s.shortDesc,
    allergens: s.allergens,
    dietTags: s.dietTags,
    emoji: s.emoji,
    imageGradient: s.imageGradient,
    region: s.region,
    popular: s.popular
  }));

  return [...menuItems, ...snackItems];
}
