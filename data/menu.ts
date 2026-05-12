import type { MenuItem } from '@/lib/types';

export const menu: MenuItem[] = [
  // ── 만두 ───────────────────────────────────────────────────────────────
  {
    id: 'doeji-mandu',
    slug: 'doeji-mandu',
    category: 'street-food',
    name: { ko: '돼지 만두', en: 'Pork Mandu' },
    shortDesc: {
      ko: '돼지고기·배추·부추·당면 (10개)',
      en: 'Pork dumplings with cabbage, chives & glass noodle (10 pcs)'
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
    name: { ko: '불고기 만두', en: 'Bulgogi Mandu' },
    shortDesc: {
      ko: '불고기·양배추·당근·당면 (10개)',
      en: 'Beef bulgogi dumplings with cabbage, carrot & glass noodle (10 pcs)'
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
    name: { ko: '닭고기 만두', en: 'Chicken Mandu' },
    shortDesc: {
      ko: '닭고기·배추·부추·당근 (10개)',
      en: 'Chicken dumplings with cabbage, chives & carrot (10 pcs)'
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
    name: { ko: '김치 만두', en: 'Kimchi Mandu' },
    shortDesc: {
      ko: '김치·돼지고기·당면 (10개)',
      en: 'Kimchi & pork dumplings with glass noodle (10 pcs)'
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
    name: { ko: '불고기', en: 'Beef Bulgogi' },
    shortDesc: {
      ko: '한국 전통 양념 소고기 덮밥 (양파·당근·버섯·마늘·배)',
      en: 'Korean marinated beef over rice with onion, carrot, mushroom, garlic & pear'
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
    name: { ko: '돼지 불고기', en: 'Pork Bulgogi' },
    shortDesc: {
      ko: '한국 전통 양념 돼지고기 덮밥 (양파·당근·버섯·마늘·배)',
      en: 'Korean marinated pork over rice with onion, carrot, mushroom, garlic & pear'
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
    name: { ko: '닭 불고기', en: 'Chicken Bulgogi' },
    shortDesc: {
      ko: '한국 전통 양념 닭고기 덮밥 (양파·당근·버섯·마늘·배)',
      en: 'Korean marinated chicken over rice with onion, carrot, mushroom, garlic & pear'
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
    name: { ko: '제육볶음', en: 'Spicy Stir-fried Pork' },
    shortDesc: {
      ko: '매콤한 돼지(또는 닭) 볶음 (양파·당근·양배추·마늘)',
      en: 'Spicy stir-fried pork or chicken with onion, carrot, cabbage & garlic'
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
    name: { ko: '오징어 볶음', en: 'Spicy Squid Stir-fry' },
    shortDesc: {
      ko: '매콤한 오징어 볶음 (양파·당근·애호박·마늘·고추장)',
      en: 'Spicy squid with onion, carrot, zucchini, garlic & chili paste'
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
    name: { ko: '오삼 불고기', en: 'Spicy Squid & Pork' },
    shortDesc: {
      ko: '오징어 + 돼지고기 매콤 볶음 (양파·당근·애호박·고추장)',
      en: 'Spicy squid & pork stir-fry with onion, carrot, zucchini & chili paste'
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
    name: { ko: '김치 볶음밥', en: 'Kimchi Fried Rice' },
    shortDesc: {
      ko: '김치 볶음밥 + 고기(소/돼지/닭) + 계란 후라이',
      en: 'Kimchi fried rice with choice of meat & a fried egg on top'
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
    id: 'jabchaebap',
    slug: 'jabchaebap',
    category: 'street-food',
    name: { ko: '잡채밥', en: 'Japchae over Rice' },
    shortDesc: {
      ko: '당면 잡채 + 밥 (소고기·시금치·당근·버섯·계란)',
      en: 'Glass noodle japchae over rice with beef, spinach, carrot, mushroom & egg'
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
    id: 'bibimbap',
    slug: 'bibimbap',
    category: 'street-food',
    name: { ko: '비빔밥', en: 'Bibimbap' },
    shortDesc: {
      ko: '소고기 + 시금치·당근·무·콩나물·버섯·계란 (매콤 양념)',
      en: 'Beef & vegetables over rice with spicy sauce & egg'
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
    name: { ko: '돌솥 비빔밥', en: 'Stone-pot Bibimbap' },
    shortDesc: {
      ko: '뜨거운 돌솥 비빔밥 (소고기·시금치·당근·무·콩나물·버섯·계란)',
      en: 'Sizzling stone-pot bibimbap with beef, vegetables & egg'
    },
    priceUSD: 17.99,
    spiceLevel: 2,
    allergens: ['beef', 'egg', 'soy', 'sesame'],
    dietTags: ['hearty', 'healthy', 'first-timer'],
    conciergeTags: ['hearty', 'healthy', 'first-timer', 'mood:hearty', 'mood:light', 'party:solo', 'party:duo'],
    emoji: '🥘',
    imageGradient: ['#D88A3E', '#5A2E10']
  },
  {
    id: 'tteokbokki',
    slug: 'tteokbokki',
    category: 'street-food',
    name: { ko: '떡볶이', en: 'Tteokbokki' },
    shortDesc: {
      ko: '매콤달콤 떡볶이 (어묵·양배추·양파·당근·라면)',
      en: 'Sweet & spicy rice cakes with fish cake, cabbage & ramen'
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
      ko: '춘장 소스 면 (돼지고기·양파·양배추·오이)',
      en: 'Noodles in black bean sauce with pork, onion, cabbage & cucumber'
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
    name: { ko: '짬뽕', en: 'Jjamppong' },
    shortDesc: {
      ko: '매콤 해물 짬뽕 (새우·오징어·홍합·양배추·애호박)',
      en: 'Spicy seafood noodle soup with shrimp, squid, mussels & veggies'
    },
    priceUSD: 16.99,
    spiceLevel: 4,
    allergens: ['shellfish', 'gluten'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:stress-relief', 'mood:hearty', 'party:solo', 'party:duo'],
    emoji: '🍜',
    imageGradient: ['#E25A3A', '#6B1A0F']
  },

  // ── 찌개 ───────────────────────────────────────────────────────────────
  {
    id: 'kimchi-jjigae',
    slug: 'kimchi-jjigae',
    category: 'street-food',
    name: { ko: '김치찌개', en: 'Kimchi Stew' },
    shortDesc: {
      ko: '푹 익은 김치찌개 + 밥 (고기 선택·두부·햄·파)',
      en: 'Hearty kimchi stew with choice of meat, tofu, ham & rice'
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
    id: 'sundubu-jjigae',
    slug: 'sundubu-jjigae',
    category: 'street-food',
    name: { ko: '순두부찌개', en: 'Soft Tofu Stew' },
    shortDesc: {
      ko: '순두부·돼지고기·애호박·조개·오징어·계란 + 밥',
      en: 'Soft tofu stew with pork, clam, squid, zucchini & egg over rice'
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
    id: 'budae-jjigae',
    slug: 'budae-jjigae',
    category: 'street-food',
    name: { ko: '부대찌개', en: 'Army Base Stew' },
    shortDesc: {
      ko: '햄·소시지·라면·두부·당면·양배추 매콤 찌개 + 밥',
      en: 'Spicy stew with ham, sausage, ramen, tofu & glass noodle, with rice'
    },
    priceUSD: 19.99,
    spiceLevel: 3,
    allergens: ['pork', 'gluten', 'soy'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:stress-relief', 'mood:hearty', 'party:duo', 'party:group'],
    emoji: '🍲',
    imageGradient: ['#D6553A', '#5E1A10']
  },

  // ── 전 ─────────────────────────────────────────────────────────────────
  {
    id: 'haemul-buchujeon',
    slug: 'haemul-buchujeon',
    category: 'street-food',
    name: { ko: '해물 부추전', en: 'Seafood Pancake' },
    shortDesc: {
      ko: '한국식 해물 부추전 (새우·애호박·당근·계란)',
      en: 'Korean seafood scallion pancake with shrimp, zucchini, carrot & egg'
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
    name: { ko: '김치 부추전', en: 'Kimchi Pancake' },
    shortDesc: {
      ko: '매콤한 김치 부추전 (양파·애호박)',
      en: 'Kimchi & chive pancake with onion and zucchini'
    },
    priceUSD: 15.99,
    spiceLevel: 2,
    allergens: ['gluten', 'egg'],
    dietTags: ['hearty', 'spicy'],
    conciergeTags: ['hearty', 'spicy', 'mood:hearty', 'party:duo', 'party:group'],
    emoji: '🥞',
    imageGradient: ['#E07A4A', '#7A2818']
  },

  // ── 갈비 / 탕수육 ──────────────────────────────────────────────────────
  {
    id: 'galbi',
    slug: 'galbi',
    category: 'street-food',
    name: { ko: '소갈비', en: 'Beef Galbi' },
    shortDesc: {
      ko: '한국식 양념 소갈비 구이 + 밥 (양파·당근·버섯·마늘·배)',
      en: 'Korean-style marinated beef short ribs with rice & veggies'
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
    name: { ko: '돼지고기 탕수육', en: 'Sweet & Sour Pork' },
    shortDesc: {
      ko: '바삭 튀긴 돼지고기 + 새콤달콤 소스 (파인애플·피망·당근·양파·버섯)',
      en: 'Crispy fried pork with sweet & sour sauce, pineapple, peppers & veggies'
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
    name: { ko: '닭고기 탕수육', en: 'Sweet & Sour Chicken' },
    shortDesc: {
      ko: '바삭 튀긴 닭고기 + 새콤달콤 소스 (파인애플·피망·당근·양파·버섯)',
      en: 'Crispy fried chicken with sweet & sour sauce, pineapple, peppers & veggies'
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
