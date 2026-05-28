import { describe, it, expect } from 'vitest';
import { selectRecommendations } from './select';
import type { RecoItem } from '@/lib/types';

function item(over: Partial<RecoItem> & { id: string }): RecoItem {
  return {
    kind: 'snack',
    name: { ko: over.id, en: over.id },
    shortDesc: { ko: '', en: '' },
    allergens: [],
    dietTags: [],
    ...over
  };
}

const pool: RecoItem[] = [
  item({ id: 'lowsugar-savory', dietTags: ['diabetic-friendly', 'low-sugar'] }),
  item({ id: 'lowsugar-but-sweet', dietTags: ['low-sugar', 'sweet'] }),
  item({ id: 'plain-sweet', dietTags: ['sweet'] }),
  item({ id: 'kid-mild', kind: 'menu', dietTags: ['kid-friendly'], spiceLevel: 0 }),
  item({ id: 'kid-spicy', kind: 'menu', dietTags: ['kid-friendly'], spiceLevel: 3 }),
  item({ id: 'kid-peanut', dietTags: ['kid-friendly'], allergens: ['peanut'] }),
  item({ id: 'us-healthy', region: 'us', dietTags: ['healthy'] }),
  item({ id: 'world-healthy', region: 'world', dietTags: ['healthy'] }),
  item({ id: 'popular-hearty', kind: 'menu', dietTags: ['hearty'], popular: true })
];

const ids = (items: RecoItem[]) => items.map((i) => i.id);

describe('selectRecommendations', () => {
  it('diabetes: low-sugar/diabetic-friendly AND not sweet', () => {
    const r = ids(selectRecommendations('diabetes', [], pool));
    expect(r).toContain('lowsugar-savory');
    expect(r).not.toContain('lowsugar-but-sweet');
    expect(r).not.toContain('plain-sweet');
  });

  it('kids: kid-friendly AND spiceLevel <= 1', () => {
    const r = ids(selectRecommendations('kids', [], pool));
    expect(r).toContain('kid-mild');
    expect(r).not.toContain('kid-spicy');
  });

  it('respects excludeAllergens across modes', () => {
    const r = ids(selectRecommendations('kids', ['peanut'], pool));
    expect(r).not.toContain('kid-peanut');
  });

  it('healthy-snack: snacks from kr/us only', () => {
    const r = ids(selectRecommendations('healthy-snack', [], pool));
    expect(r).toContain('us-healthy');
    expect(r).not.toContain('world-healthy');
  });

  it('flavor: no hard filter, popular ranks first', () => {
    const r = selectRecommendations('flavor', [], pool);
    expect(r.length).toBeGreaterThan(0);
    expect(r[0].id).toBe('popular-hearty');
  });

  it('returns at most 4 items', () => {
    expect(selectRecommendations('flavor', [], pool).length).toBeLessThanOrEqual(4);
  });
});
