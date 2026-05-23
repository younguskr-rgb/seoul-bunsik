import type { Allergen, RecoItem, RecoMode } from '@/lib/types';
import { buildPool } from './pool';

const TOP_N = 4;

/** 하드 필터: 통과하지 못하면 절대 추천되지 않는다(안전 보장). */
function passesHardFilter(item: RecoItem, mode: RecoMode): boolean {
  switch (mode) {
    case 'diabetes':
      return (
        (item.dietTags.includes('diabetic-friendly') || item.dietTags.includes('low-sugar')) &&
        !item.dietTags.includes('sweet')
      );
    case 'kids':
      return (
        item.dietTags.includes('kid-friendly') &&
        (item.spiceLevel === undefined || item.spiceLevel <= 1)
      );
    case 'healthy-snack':
      return (
        item.kind === 'snack' &&
        (item.region === 'kr' || item.region === 'us') &&
        (item.dietTags.includes('healthy') || item.dietTags.includes('low-sugar'))
      );
    case 'flavor':
      return true;
  }
}

/** 정렬 우선순위 점수(높을수록 먼저). */
function scoreItem(item: RecoItem, mode: RecoMode): number {
  let s = item.popular ? 2 : 0;
  switch (mode) {
    case 'diabetes':
      if (item.dietTags.includes('healthy')) s += 3;
      if (item.dietTags.includes('vegetarian') || item.dietTags.includes('vegan')) s += 2;
      if (item.dietTags.includes('low-sugar')) s += 2;
      break;
    case 'kids':
      s += Math.max(0, 4 - item.allergens.length);
      break;
    case 'healthy-snack':
      if (item.dietTags.includes('healthy')) s += 3;
      if (item.dietTags.includes('low-sugar')) s += 2;
      break;
    case 'flavor':
      if (item.dietTags.includes('hearty')) s += 3;
      if (item.dietTags.includes('sweet')) s += 2;
      if (item.dietTags.includes('spicy')) s += 2;
      break;
  }
  return s;
}

export function selectRecommendations(
  mode: RecoMode,
  excludeAllergens: Allergen[] = [],
  pool: RecoItem[] = buildPool()
): RecoItem[] {
  return pool
    .filter((item) => !excludeAllergens.some((a) => item.allergens.includes(a)))
    .filter((item) => passesHardFilter(item, mode))
    .map((item) => ({ item, score: scoreItem(item, mode) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_N)
    .map((r) => r.item);
}
