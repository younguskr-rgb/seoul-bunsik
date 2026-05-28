import type { RecoMode } from '@/lib/types';

export const RECO_MODES: RecoMode[] = ['diabetes', 'kids', 'healthy-snack', 'flavor'];

export const MODE_EMOJI: Record<RecoMode, string> = {
  diabetes: '🩺',
  kids: '🧒',
  'healthy-snack': '🥗',
  flavor: '😋'
};

export function modeRequiresDisclaimer(mode: RecoMode): boolean {
  return mode === 'diabetes';
}
