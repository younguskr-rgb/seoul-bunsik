import type { MenuItem } from '@/lib/types';

export const menu: MenuItem[] = [
  // ── 만두 ───────────────────────────────────────────────────────────────
  {
    id: 'doeji-mandu',
    slug: 'doeji-mandu',
    category: 'street-food',
    name: { ko: '돼지만두', en: 'Doeji Mandu' },
    shortDesc: {
      ko: '돼지고기 만두 (10개) — 돼지고기·배추·부추·당면·생강',
      en: 'Pork dumpling (10 pcs) — ground pork, chinese cabbage, chives, sweet potato noodle, ginger'
    },
    priceUSD: 13.99,
    spiceLevel: 0,
    allergens: ['pork', 'gluten', 'soy'],
    dietTags: ['hearty', 'first-timer'],
    conciergeTags: ['hearty', 'first-timer', 'mood:hearty', 'party:duo', 'party:group'],
    emoji: '🥟',
    imageGradient: ['#E8B07A', '#7A4818']
  },
  {
    id: 'bulgogi-mandu',
    slug: 'bulgogi-mandu',
    category: 'street-food',
    name: { ko: '불고기만두', en: 'Bulgogi Mandu' },
    shortDesc: {
      ko: '소고기 만두 (10개) — 다진 소고기·양배추·대파·당근·당면·마늘',
      en: 'Beef dumpling (10 pcs) — ground beef, cabbage, spring onion, carrot, sweet potato noodle, garlic'
    },
    priceUSD: 14.99,
    spiceLevel: 0,
    allergens: ['beef', 'gluten', 'soy'],
    dietTags: ['hearty', 'first-timer'],
    conciergeTags: ['hearty', 'first-timer', 'mood:hearty', 'party:duo', 'party:group'],
    emoji: '🥟',
    imageGradient: ['#D9A85E', '#8A5A1E'],
    popular: true
  },
  {
    id: 'daggogi-mandu',
    slug: 'daggogi-mandu',
    category: 'street-food',
    name: { ko: '닭고기만두', en: 'Daggogi Mandu' },
    shortDesc: {
      ko: '닭고기 만두 (10개) — 다진 닭고기·배추·부추·당근·당면·생강·마늘',
      en: 'Chicken dumpling (10 pcs) — ground chicken, chinese cabbage, chive, carrot, sweet potato noodle, ginger, garlic'
    },
    priceUSD: 13.99,
    spiceLevel: 0,
    allergens: ['gluten', 'soy'],
    dietTags: ['hearty', 'first-timer', 'kid-friendly'],
    conciergeTags: ['hearty', 'first-timer', 'kid-friendly', 'mood:hearty', 'mood:light', 'party:duo', 'party:group'],
    emoji: '🥟',
    imageGradient: ['#F4D08A', '#A86F1E']
  },
  {
    id: 'kimchi-mandu',
    slug: 'kimchi-mandu',
    category: 'street-food',
    name: { ko: '김치만두', en: 'Kimchi Mandu' },
    shortDesc: {
      ko: '김치 만두 (10개) — 김치·다진 돼지고기·당면',
      en: 'Kimchi dumpling (10 pcs) — kimchi, ground pork, sweet potato noodle'
    },
    priceUSD: 13.99,
    spiceLevel: 2,
    allergens: ['pork', 'gluten', 'soy'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:stress-relief', 'mood:hearty', 'party:duo', 'party:group'],
    emoji: '🥟',
    imageGradient: ['#E36F4A', '#8B2A18']
  },

  // ── 불고기 / 메인 ──────────────────────────────────────────────────────
  {
    id: 'bulgogi',
    slug: 'bulgogi',
    category: 'street-food',
    name: { ko: '불고기', en: 'Bulgogi' },
    shortDesc: {
      ko: '한국 전통 양념 소고기 + 밥 — 소고기·양파·당근·버섯·마늘·배·불고기 소스',
      en: 'Korean traditional marinade beef w/ rice — beef, onion, carrot, mushroom, garlic, pear with bulgogi sauce'
    },
    priceUSD: 22.99,
    spiceLevel: 0,
    allergens: ['beef', 'soy', 'sesame'],
    dietTags: ['hearty', 'first-timer'],
    conciergeTags: ['hearty', 'first-timer', 'mood:hearty', 'party:solo', 'party:duo'],
    emoji: '🥩',
    imageGradient: ['#D8A157', '#5A2E12'],
    popular: true
  },
  {
    id: 'doeji-bulgogi',
    slug: 'doeji-bulgogi',
    category: 'street-food',
    name: { ko: '돼지불고기', en: 'Doeji Bulgogi' },
    shortDesc: {
      ko: '한국 전통 양념 돼지고기 + 밥 — 돼지고기·양파·당근·버섯·마늘·배·불고기 소스',
      en: 'Korean traditional marinade pork w/ rice — pork, onion, carrot, mushroom, garlic, pear with bulgogi sauce'
    },
    priceUSD: 20.99,
    spiceLevel: 1,
    allergens: ['pork', 'soy', 'sesame'],
    dietTags: ['hearty'],
    conciergeTags: ['hearty', 'mood:hearty', 'party:solo', 'party:duo'],
    emoji: '🐖',
    imageGradient: ['#E8866A', '#7E2F18']
  },
  {
    id: 'dag-bulgogi',
    slug: 'dag-bulgogi',
    category: 'street-food',
    name: { ko: '닭불고기', en: 'Dag Bulgogi' },
    shortDesc: {
      ko: '한국 전통 양념 닭고기 + 밥 — 닭고기·양파·당근·버섯·마늘·배·불고기 소스',
      en: 'Korean traditional marinade chicken w/ rice — chicken, onion, carrot, mushroom, garlic, pear with bulgogi sauce'
    },
    priceUSD: 20.99,
    spiceLevel: 1,
    allergens: ['soy', 'sesame'],
    dietTags: ['hearty', 'first-timer'],
    conciergeTags: ['hearty', 'first-timer', 'mood:hearty', 'party:solo', 'party:duo'],
    emoji: '🍗',
    imageGradient: ['#F4C56A', '#8A5A1E']
  },
  {
    id: 'jeyukbokkeum',
    slug: 'jeyukbokkeum',
    category: 'street-food',
    name: { ko: '제육볶음', en: 'Jeyukbbokeum' },
    shortDesc: {
      ko: '매콤 돼지 또는 닭 볶음 + 밥 — 고기·양파·당근·양배추·마늘·대파',
      en: 'Spicy pork or chicken w/ rice — meat, onion, carrot, cabbage, garlic, spring onion'
    },
    priceUSD: 19.99,
    spiceLevel: 4,
    allergens: ['pork', 'soy', 'sesame'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:stress-relief', 'mood:hearty', 'party:solo', 'party:duo'],
    emoji: '🌶️',
    imageGradient: ['#E0623E', '#7E1F0F']
  },
  {
    id: 'ojingo-bokkeum',
    slug: 'ojingo-bokkeum',
    category: 'street-food',
    name: { ko: '오징어볶음', en: 'Ojingo Bbokeum' },
    shortDesc: {
      ko: '매콤 오징어 볶음 + 밥 — 오징어·양파·당근·애호박·마늘·고추장·대파',
      en: 'Spicy squid w/ rice — squid, onion, carrot, zucchini, garlic, chili paste, spring onion'
    },
    priceUSD: 20.99,
    spiceLevel: 4,
    allergens: ['shellfish', 'soy', 'sesame'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:stress-relief', 'mood:hearty', 'party:solo', 'party:duo'],
    emoji: '🦑',
    imageGradient: ['#D9533A', '#5E1D12']
  },
  {
    id: 'osam-bulgogi',
    slug: 'osam-bulgogi',
    category: 'street-food',
    name: { ko: '오삼불고기', en: 'Osam Bulgogi' },
    shortDesc: {
      ko: '매콤 오징어 + 돼지고기 볶음 + 밥 — 오징어·돼지고기·양파·당근·애호박·마늘·고추장·대파',
      en: 'Spicy squid & pork w/ rice — squid, pork, onion, carrot, zucchini, garlic, chili paste, spring onion'
    },
    priceUSD: 19.99,
    spiceLevel: 4,
    allergens: ['pork', 'shellfish', 'soy', 'sesame'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:stress-relief', 'mood:adventurous', 'party:duo', 'party:group'],
    emoji: '🌶️',
    imageGradient: ['#D6593E', '#5A1E14']
  },

  // ── 밥 / 면 ────────────────────────────────────────────────────────────
  {
    id: 'kimchi-bokkeumbap',
    slug: 'kimchi-bokkeumbap',
    category: 'street-food',
    name: { ko: '김치볶음밥', en: 'Kimchi Bokeumbab' },
    shortDesc: {
      ko: '김치 볶음밥 — 김치·고기 택1(소·돼지·닭)·후라이드 에그·매콤 소스',
      en: 'Kimchi fried rice w/ meat (choice of beef, pork, or chicken), fried egg & spicy sauce'
    },
    priceUSD: 15.99,
    spiceLevel: 3,
    allergens: ['egg', 'soy'],
    dietTags: ['hearty', 'spicy', 'first-timer'],
    conciergeTags: ['hearty', 'spicy', 'first-timer', 'mood:hearty', 'mood:stress-relief', 'party:solo', 'party:duo'],
    emoji: '🍚',
    imageGradient: ['#E8643E', '#7A1F14'],
    popular: true
  },
  {
    id: 'kimchi-jjigae',
    slug: 'kimchi-jjigae',
    category: 'street-food',
    name: { ko: '김치찌개', en: 'Kimchi Jjigae' },
    shortDesc: {
      ko: '김치찌개 + 밥 — 김치·고기 택1(소·돼지·닭)·두부·햄·고추·대파',
      en: 'Kimchi soup w/ meat (choice of beef, pork, or chicken) w/ rice — kimchi, meat, tofu, ham, pepper, spring onion'
    },
    priceUSD: 15.99,
    spiceLevel: 3,
    allergens: ['pork', 'soy'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:stress-relief', 'mood:hearty', 'party:solo', 'party:duo'],
    emoji: '🍲',
    imageGradient: ['#D1543A', '#7A1F14']
  },
  {
    id: 'budae-jjigae',
    slug: 'budae-jjigae',
    category: 'street-food',
    name: { ko: '부대찌개', en: 'Budae Jjigae' },
    shortDesc: {
      ko: '매콤 부대찌개 + 밥 — 배추·돼지고기·소시지·라면·두부·햄·대파·당면',
      en: 'Spicy meat soup w/ rice — chinese cabbage, pork, sausage, ramen, tofu, ham, spring onion, sweet potato noodle'
    },
    priceUSD: 19.99,
    spiceLevel: 3,
    allergens: ['pork', 'gluten', 'soy'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:stress-relief', 'mood:hearty', 'party:duo', 'party:group'],
    emoji: '🍲',
    imageGradient: ['#D6553A', '#5E1A10']
  },
  {
    id: 'haemul-buchujeon',
    slug: 'haemul-buchujeon',
    category: 'street-food',
    name: { ko: '해물부추전', en: 'Haemul Buchujeon' },
    shortDesc: {
      ko: '한국식 해물 부추전 — 전 믹스·계란·부추·새우·애호박·당근',
      en: 'Korean style seafood pancake — pancake mix, egg, chive, shrimp, squash, carrot'
    },
    priceUSD: 15.99,
    spiceLevel: 0,
    allergens: ['shellfish', 'gluten', 'egg'],
    dietTags: ['hearty', 'first-timer'],
    conciergeTags: ['hearty', 'first-timer', 'mood:hearty', 'mood:light', 'party:duo', 'party:group'],
    emoji: '🥞',
    imageGradient: ['#E8B26A', '#8A5A1E']
  },
  {
    id: 'kimchi-buchujeon',
    slug: 'kimchi-buchujeon',
    category: 'street-food',
    name: { ko: '김치부추전', en: 'Kimchi Buchujeon' },
    shortDesc: {
      ko: '한국식 김치 부추전 — 전 믹스·김치·부추·애호박·양파',
      en: 'Korean style kimchi pancake — pancake mix, kimchi, chive, squash, onion'
    },
    priceUSD: 15.99,
    spiceLevel: 2,
    allergens: ['gluten', 'egg'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:hearty', 'party:duo', 'party:group'],
    emoji: '🥞',
    imageGradient: ['#E07A4A', '#7A2818']
  },
  {
    id: 'jabchaebap',
    slug: 'jabchaebap',
    category: 'street-food',
    name: { ko: '잡채밥', en: 'Jabchebab' },
    shortDesc: {
      ko: '잡채 + 밥 — 당면·소고기·시금치·당근·버섯·계란',
      en: 'Jabche w/ rice — sweet potato noodle, beef, spinach, carrot, mushroom, egg'
    },
    priceUSD: 16.99,
    spiceLevel: 0,
    allergens: ['beef', 'soy', 'egg', 'sesame'],
    dietTags: ['hearty', 'first-timer'],
    conciergeTags: ['hearty', 'first-timer', 'mood:hearty', 'mood:light', 'party:solo', 'party:duo'],
    emoji: '🍝',
    imageGradient: ['#C3A56A', '#6B4A1E']
  },
  {
    id: 'sundubu-jjigae',
    slug: 'sundubu-jjigae',
    category: 'street-food',
    name: { ko: '순두부찌개', en: 'SundubuJjigae' },
    shortDesc: {
      ko: '순두부찌개 + 밥 — 순두부·돼지고기·애호박·조개·오징어·계란',
      en: 'Soft tofu soup w/ rice — soft tofu, pork, squash, clam, squid, egg'
    },
    priceUSD: 16.99,
    spiceLevel: 3,
    allergens: ['pork', 'shellfish', 'soy', 'egg'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:hearty', 'mood:stress-relief', 'party:solo', 'party:duo'],
    emoji: '🍲',
    imageGradient: ['#E26A4A', '#6E1F14']
  },
  {
    id: 'tteokbokki',
    slug: 'tteokbokki',
    category: 'street-food',
    name: { ko: '떡볶이', en: 'Ddeokbokki' },
    shortDesc: {
      ko: '매콤 양념 떡볶이 — 떡·어묵·양배추·양파·당근·라면',
      en: 'Rice cake with vegetable & spicy sauce — rice cake, fish cake, cabbage, onion, carrot, ramen'
    },
    priceUSD: 13.99,
    spiceLevel: 3,
    allergens: ['gluten', 'soy'],
    dietTags: ['hearty', 'spicy', 'first-timer'],
    conciergeTags: ['hearty', 'spicy', 'first-timer', 'mood:hearty', 'mood:stress-relief', 'party:solo', 'party:duo'],
    emoji: '🍡',
    imageGradient: ['#E8775A', '#C8322D'],
    popular: true
  },
  {
    id: 'jjajangmyeon',
    slug: 'jjajangmyeon',
    category: 'street-food',
    name: { ko: '짜장면', en: 'Jjajangmyeon' },
    shortDesc: {
      ko: '춘장 소스 면 — 면·돼지고기·양파·양배추·오이·춘장',
      en: 'Blackbean sauce noodle — noodle, pork, onion, cabbage, cucumber, blackbean paste'
    },
    priceUSD: 13.99,
    spiceLevel: 0,
    allergens: ['pork', 'gluten', 'soy'],
    dietTags: ['hearty', 'first-timer', 'kid-friendly'],
    conciergeTags: ['hearty', 'first-timer', 'kid-friendly', 'mood:hearty', 'party:solo', 'party:duo'],
    emoji: '🍜',
    imageGradient: ['#5E3A24', '#2A1810']
  },
  {
    id: 'jjamppong',
    slug: 'jjamppong',
    category: 'street-food',
    name: { ko: '짬뽕', en: 'Jjambbong' },
    shortDesc: {
      ko: '매콤 해물 짬뽕 — 새우·오징어·홍합·양파·애호박·양배추·당근·버섯·고추·대파',
      en: 'Seafood noodle soup — shrimp, squid, mussel, onion, squash, cabbage, carrot, mushroom, pepper, green onion'
    },
    priceUSD: 16.99,
    spiceLevel: 4,
    allergens: ['shellfish', 'gluten'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:stress-relief', 'mood:hearty', 'party:solo', 'party:duo'],
    emoji: '🍜',
    imageGradient: ['#E25A3A', '#6B1A0F']
  },
  {
    id: 'bibimbap',
    slug: 'bibimbap',
    category: 'street-food',
    name: { ko: '비빔밥', en: 'Bibimbab' },
    shortDesc: {
      ko: '소고기 + 야채 + 밥 — 시금치·당근·무·콩나물·버섯·계란·소고기·매콤 양념',
      en: 'Beef & vegetables w/ rice — spinach, carrot, radish, bean sprouts, mushroom, egg, beef w/ spicy sauce'
    },
    priceUSD: 15.99,
    spiceLevel: 2,
    allergens: ['beef', 'egg', 'soy', 'sesame'],
    dietTags: ['hearty', 'healthy', 'first-timer'],
    conciergeTags: ['hearty', 'healthy', 'first-timer', 'mood:hearty', 'mood:light', 'party:solo', 'party:duo'],
    emoji: '🍲',
    imageGradient: ['#E89A4A', '#7A3A14'],
    popular: true
  },
  {
    id: 'dolsot-bibimbap',
    slug: 'dolsot-bibimbap',
    category: 'street-food',
    name: { ko: '돌솥비빔밥', en: 'Dolsot Bibimbab' },
    shortDesc: {
      ko: '뜨거운 돌솥 비빔밥 — 시금치·당근·무·콩나물·버섯·계란·소고기·매콤 양념',
      en: 'Beef & vegetables w/ rice (stone-pot) — spinach, carrot, radish, bean sprouts, mushroom, egg, beef w/ spicy sauce'
    },
    priceUSD: 17.99,
    spiceLevel: 2,
    allergens: ['beef', 'egg', 'soy', 'sesame'],
    dietTags: ['hearty', 'healthy', 'first-timer'],
    conciergeTags: ['hearty', 'healthy', 'first-timer', 'mood:hearty', 'mood:light', 'party:solo', 'party:duo'],
    emoji: '🥘',
    imageGradient: ['#D88A3E', '#5A2E10']
  },

  // ── 갈비 / 탕수육 ──────────────────────────────────────────────────────
  {
    id: 'galbi',
    slug: 'galbi',
    category: 'street-food',
    name: { ko: '갈비', en: 'Galbi' },
    shortDesc: {
      ko: '한국식 양념 소갈비 + 밥 — 소갈비·양파·당근·버섯·마늘·배·대파·갈비 소스',
      en: 'Korean style beef galbi w/ rice — beef galbi, onion, carrot, mushroom, garlic, pear, spring onion w/ korean galbi sauce'
    },
    priceUSD: 27.99,
    spiceLevel: 0,
    allergens: ['beef', 'soy', 'sesame'],
    dietTags: ['hearty', 'first-timer'],
    conciergeTags: ['hearty', 'first-timer', 'mood:hearty', 'party:duo', 'party:group'],
    emoji: '🍖',
    imageGradient: ['#A86B4A', '#42201A'],
    popular: true
  },
  {
    id: 'doejigogi-tangsuyuk',
    slug: 'doejigogi-tangsuyuk',
    category: 'street-food',
    name: { ko: '돼지고기 탕수육', en: 'Doejjigogi Tangsuyuk' },
    shortDesc: {
      ko: '바삭 튀긴 돼지고기 + 탕수육 소스 — 돼지고기·파인애플·피망·버섯·당근·양파·새콤달콤 소스',
      en: 'Fried pork w/ tangsuyuk sauce — pork, pineapple, pepper, mushroom, carrot, onion w/ sweet and sour sauce'
    },
    priceUSD: 24.99,
    spiceLevel: 0,
    allergens: ['pork', 'gluten'],
    dietTags: ['hearty', 'first-timer', 'kid-friendly'],
    conciergeTags: ['hearty', 'first-timer', 'kid-friendly', 'mood:hearty', 'mood:sweet', 'party:duo', 'party:group'],
    emoji: '🥡',
    imageGradient: ['#E8A04A', '#8A4818']
  },
  {
    id: 'dakgogi-tangsuyuk',
    slug: 'dakgogi-tangsuyuk',
    category: 'street-food',
    name: { ko: '닭고기 탕수육', en: 'Dakgogi Tangsuyuk' },
    shortDesc: {
      ko: '바삭 튀긴 닭고기 + 탕수육 소스 — 닭고기·파인애플·피망·버섯·당근·양파·새콤달콤 소스',
      en: 'Fried chicken w/ tangsuyuk sauce — chicken, pineapple, pepper, mushroom, carrot, onion w/ sweet and sour sauce'
    },
    priceUSD: 24.99,
    spiceLevel: 0,
    allergens: ['gluten'],
    dietTags: ['hearty', 'first-timer', 'kid-friendly'],
    conciergeTags: ['hearty', 'first-timer', 'kid-friendly', 'mood:hearty', 'mood:sweet', 'party:duo', 'party:group'],
    emoji: '🍗',
    imageGradient: ['#F4C46A', '#8A5A1E']
  }
];

export const menuById = Object.fromEntries(menu.map((m) => [m.id, m]));
export const menuByCategory = menu.reduce<Record<string, MenuItem[]>>((acc, item) => {
  acc[item.category] ??= [];
  acc[item.category].push(item);
  return acc;
}, {});
