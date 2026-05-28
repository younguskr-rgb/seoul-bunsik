import { describe, it, expect } from 'vitest';
import { buildPool } from './pool';

describe('buildPool', () => {
  const pool = buildPool();

  it('includes both menu and snack items', () => {
    expect(pool.some((i) => i.kind === 'menu')).toBe(true);
    expect(pool.some((i) => i.kind === 'snack')).toBe(true);
  });

  it('carries priceUSD for menu items only', () => {
    const menuItem = pool.find((i) => i.id === 'bulgogi');
    expect(menuItem?.kind).toBe('menu');
    expect(typeof menuItem?.priceUSD).toBe('number');
  });

  it('carries region for snack items', () => {
    const snack = pool.find((i) => i.id === 'perrier');
    expect(snack?.kind).toBe('snack');
    expect(snack?.region).toBe('world');
    expect(snack?.dietTags).toContain('diabetic-friendly');
  });
});
