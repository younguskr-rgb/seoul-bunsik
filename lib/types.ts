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
  | 'spicy';

export type Mood = 'stress-relief' | 'hearty' | 'light' | 'sweet' | 'adventurous';

export type Party = 'solo' | 'duo' | 'group';

export type Category = 'street-food';

export type ConciergeTag =
  | DietTag
  | `mood:${Mood}`
  | `party:${Party}`;

export interface MenuItem {
  id: string;
  slug: string;
  category: Category;
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
