export type LocalizedString = { ko: string; en: string };

export type Allergen =
  | 'gluten'
  | 'dairy'
  | 'peanut'
  | 'tree-nut'
  | 'soy'
  | 'egg'
  | 'shellfish'
  | 'pork'
  | 'beef'
  | 'sesame';

export type DietTag =
  | 'vegetarian'
  | 'vegan'
  | 'kid-friendly'
  | 'healthy'
  | 'hearty'
  | 'sweet'
  | 'first-timer'
  | 'spicy'
  | 'diabetic-friendly'
  | 'low-sugar';

export type Mood = 'stress-relief' | 'hearty' | 'light' | 'sweet' | 'adventurous';

export type Party = 'solo' | 'duo' | 'group';

export type Category = 'street-food';

export type MenuSection = 'mandu' | 'mains' | 'rice-noodle-stew' | 'galbi-tangsuyuk';

export type ConciergeTag =
  | DietTag
  | `mood:${Mood}`
  | `party:${Party}`;

export interface MenuItem {
  id: string;
  slug: string;
  category: Category;
  section: MenuSection;
  name: LocalizedString;
  shortDesc: LocalizedString;
  longDesc?: LocalizedString;
  priceUSD: number;
  spiceLevel: 0 | 1 | 2 | 3 | 4 | 5;
  allergens: Allergen[];
  dietTags: DietTag[];
  conciergeTags: ConciergeTag[];
  image?: { src: string; alt: LocalizedString };
  imageGradient?: [string, string];
  emoji?: string;
  popular?: boolean;
  newItem?: boolean;
  comingSoon?: boolean;
}

export interface BubbleTeaOption {
  id: string;
  name: LocalizedString;
  priceDeltaUSD: number;
  emoji?: string;
  color?: string;
}

export interface Review {
  id: string;
  author: string;
  initial: string;
  avatarColor: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: LocalizedString;
  source: 'google' | 'yelp' | 'kakao' | 'instagram';
  date: string;
}

export interface MembershipTier {
  id: 'bites' | 'seoul' | 'royal';
  name: LocalizedString;
  korAccent: string;
  pointsRequired: number;
  pointsProgress: number;
  perks: LocalizedString[];
  featured?: boolean;
  accent: string;
}

export type Style = 'healthy' | 'flavor' | 'balanced';

export interface ConciergeInput {
  spiceMax: 0 | 1 | 2 | 3 | 4 | 5;
  excludeAllergens: Allergen[];
  mood: Mood;
  party: Party;
  style: Style;
}

export interface Recommendation {
  main: MenuItem;
  rationale: LocalizedString;
}

/** 스낵 원산지 권역. data/snacks.ts 가 이 타입을 재export 한다. */
export type SnackRegion = 'us' | 'kr' | 'world';

export type RecoMode = 'diabetes' | 'kids' | 'healthy-snack' | 'flavor';

/** 메뉴와 스낵을 통합한 추천 후보/결과 단위. 클라이언트로도 그대로 전달된다. */
export interface RecoItem {
  kind: 'menu' | 'snack';
  id: string;
  name: LocalizedString;
  shortDesc: LocalizedString;
  allergens: Allergen[];
  dietTags: DietTag[];
  emoji?: string;
  imageGradient?: [string, string];
  priceUSD?: number; // 메뉴만
  spiceLevel?: 0 | 1 | 2 | 3 | 4 | 5; // 메뉴만 (스낵은 undefined)
  region?: SnackRegion; // 스낵만
  popular?: boolean;
}

export interface RecoResult {
  items: RecoItem[];
  rationale: string; // 현재 locale 1개 언어
  disclaimer?: string; // 당뇨 모드에서만 채워짐
}
