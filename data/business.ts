import type { LocalizedString } from '@/lib/types';

export interface BusinessInfo {
  name: LocalizedString;
  tagline: LocalizedString;
  address: { line1: string; city: 'Dracut'; state: 'MA'; zip: string };
  phone: string;
  email: string;
  hours: Array<{ day: 0 | 1 | 2 | 3 | 4 | 5 | 6; open?: string; close?: string; closed?: boolean }>;
  geo: { lat: number; lng: number };
  socials: {
    instagram?: string;
    google?: string;
    doordash?: string;
    ubereats?: string;
    yelp?: string;
  };
}

export const business: BusinessInfo = {
  name: { ko: '서울분식', en: 'Seoul Bunsik' },
  tagline: { ko: '함께 먹고, 함께 행복해요', en: 'Eat Together, Happy Together' },
  address: {
    line1: '1234 Bridge Street',
    city: 'Dracut',
    state: 'MA',
    zip: '01826'
  },
  phone: '+1 (978) 555-0142',
  email: 'hello@seoulbunsik.com',
  hours: [
    { day: 0, open: '12:00', close: '20:00' },
    { day: 1, closed: true },
    { day: 2, open: '11:00', close: '21:00' },
    { day: 3, open: '11:00', close: '21:00' },
    { day: 4, open: '11:00', close: '21:00' },
    { day: 5, open: '11:00', close: '22:00' },
    { day: 6, open: '11:00', close: '22:00' }
  ],
  geo: { lat: 42.6701, lng: -71.3034 },
  socials: {
    instagram: 'https://instagram.com/seoulbunsik',
    google: 'https://maps.google.com',
    doordash: 'https://www.doordash.com',
    ubereats: 'https://www.ubereats.com',
    yelp: 'https://www.yelp.com'
  }
};
