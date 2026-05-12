import { menu } from '@/data/menu';
import type {
  Allergen,
  ConciergeInput,
  ConciergeTag,
  MenuItem,
  Mood,
  Party,
  Recommendation,
  Style
} from '@/lib/types';

function buildTargetTags(mood: Mood, party: Party): ConciergeTag[] {
  return [`mood:${mood}`, `party:${party}`];
}

function styleScore(item: MenuItem, style: Style): number {
  if (style === 'healthy') {
    let s = 0;
    if (item.dietTags.includes('healthy')) s += 4;
    if (item.dietTags.includes('vegetarian') || item.dietTags.includes('vegan')) s += 2;
    if (item.dietTags.includes('sweet')) s -= 2;
    if (item.dietTags.includes('hearty')) s -= 1;
    return s;
  }
  if (style === 'flavor') {
    let s = 0;
    if (item.dietTags.includes('hearty')) s += 3;
    if (item.dietTags.includes('sweet')) s += 2;
    if (item.dietTags.includes('spicy')) s += 2;
    if (item.popular) s += 2;
    return s;
  }
  return 0;
}

function score(item: MenuItem, input: ConciergeInput): number {
  if (item.spiceLevel > input.spiceMax) return -Infinity;
  if (input.excludeAllergens.some((a) => item.allergens.includes(a))) return -Infinity;
  if (item.comingSoon) return -Infinity;

  const targets = buildTargetTags(input.mood, input.party);
  let s = 0;
  for (const t of targets) if (item.conciergeTags.includes(t)) s += 5;

  if (input.mood === 'sweet' && item.dietTags.includes('sweet')) s += 4;
  if (input.mood === 'hearty' && item.dietTags.includes('hearty')) s += 4;
  if (input.mood === 'light' && (item.dietTags.includes('healthy') || item.dietTags.includes('kid-friendly'))) s += 3;
  if (input.mood === 'stress-relief' && item.dietTags.includes('spicy')) s += 4;
  if (input.mood === 'adventurous') s += 1;

  s += styleScore(item, input.style);

  if (item.popular) s += 1;
  if (item.newItem) s += 0.5;
  return s;
}

function pickTop(items: MenuItem[], input: ConciergeInput): MenuItem | null {
  if (items.length === 0) return null;
  const ranked = items
    .map((it) => ({ it, s: score(it, input) }))
    .filter((r) => Number.isFinite(r.s))
    .sort((a, b) => b.s - a.s);
  return ranked[0]?.it ?? null;
}

function rationale(input: ConciergeInput): { ko: string; en: string } {
  const spiceKo = ['안 매운', '순한', '약간 매운', '보통 매운', '매운', '아주 매운'][input.spiceMax];
  const moodKo: Record<Mood, string> = {
    'stress-relief': '스트레스 해소',
    hearty: '푸짐한',
    light: '가벼운',
    sweet: '달콤한',
    adventurous: '새로운'
  };
  const partyKo: Record<Party, string> = { solo: '혼밥', duo: '둘이서', group: '여럿이' };
  const styleKo: Record<Style, string> = {
    healthy: '건강식 위주로',
    flavor: '맛이 진한 것 위주로',
    balanced: '균형 있게'
  };

  const moodEn: Record<Mood, string> = {
    'stress-relief': 'stress-busting',
    hearty: 'hearty',
    light: 'light',
    sweet: 'sweet',
    adventurous: 'adventurous'
  };
  const partyEn: Record<Party, string> = { solo: 'solo', duo: 'duo', group: 'group' };
  const styleEn: Record<Style, string> = {
    healthy: 'with a healthy spin',
    flavor: 'for maximum flavor',
    balanced: 'balanced'
  };

  return {
    ko: `${spiceKo} 맛 · ${moodKo[input.mood]} 기분 · ${partyKo[input.party]} 식사를 ${styleKo[input.style]} 골랐어요.`,
    en: `Picked ${styleEn[input.style]} for a ${moodEn[input.mood]} ${partyEn[input.party]} meal.`
  };
}

export function recommend(input: ConciergeInput): Recommendation | null {
  const main = pickTop(menu, input);
  if (!main) return null;
  return { main, rationale: rationale(input) };
}

export function filterByTags(activeTags: string[]): MenuItem[] {
  if (!activeTags.length) return [];
  return menu
    .filter((m) => !m.comingSoon)
    .filter((m) => activeTags.every((tag) => (m.dietTags as string[]).includes(tag)));
}

export const ALLERGEN_OPTIONS: Allergen[] = [
  'gluten',
  'dairy',
  'peanut',
  'tree-nut',
  'soy',
  'egg',
  'shellfish',
  'pork',
  'beef',
  'sesame'
];
