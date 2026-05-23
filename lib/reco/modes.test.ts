import { describe, it, expect } from 'vitest';
import { RECO_MODES, MODE_EMOJI, modeRequiresDisclaimer } from './modes';

describe('reco modes', () => {
  it('lists all four modes', () => {
    expect(RECO_MODES).toEqual(['diabetes', 'kids', 'healthy-snack', 'flavor']);
  });

  it('has an emoji for every mode', () => {
    for (const m of RECO_MODES) expect(MODE_EMOJI[m]).toBeTruthy();
  });

  it('requires a disclaimer only for diabetes', () => {
    expect(modeRequiresDisclaimer('diabetes')).toBe(true);
    expect(modeRequiresDisclaimer('kids')).toBe(false);
    expect(modeRequiresDisclaimer('flavor')).toBe(false);
  });
});
