import type { Allergen, DietTag, LocalizedString } from '@/lib/types';

export type SnackRegion = 'us' | 'kr' | 'world';
export type SnackCategory =
  | 'snack'
  | 'chocolate'
  | 'candy'
  | 'chip'
  | 'cookie'
  | 'drink'
  | 'cereal';

export interface Snack {
  id: string;
  region: SnackRegion;
  category: SnackCategory;
  name: LocalizedString;
  brand: LocalizedString;
  origin: LocalizedString;
  shortDesc: LocalizedString;
  momPick: LocalizedString;
  allergens: Allergen[];
  dietTags: DietTag[];
  emoji: string;
  imageGradient: [string, string];
  popular?: boolean;
}

export const snacks: Snack[] = [
  // ── 🇺🇸 USA ─────────────────────────────────────────────────────────────
  {
    id: 'annies-cheddar-bunnies',
    region: 'us',
    category: 'snack',
    name: { ko: "애니스 체다 버니즈", en: "Annie's Cheddar Bunnies" },
    brand: { ko: '애니스 홈그로운', en: "Annie's Homegrown" },
    origin: { ko: '🇺🇸 미국 캘리포니아', en: '🇺🇸 California, USA' },
    shortDesc: {
      ko: '바삭한 토끼 모양 체다 비스킷.',
      en: 'Crunchy bunny-shaped cheddar crackers.'
    },
    momPick: {
      ko: 'USDA 오가닉 · 인공색소·향료 무첨가.',
      en: 'USDA organic, no artificial colors or flavors.'
    },
    allergens: ['gluten', 'dairy', 'soy'],
    dietTags: ['kid-friendly'],
    emoji: '🐰',
    imageGradient: ['#F4B266', '#A85E1E'],
    popular: true
  },
  {
    id: 'rxbar-chocolate-sea-salt',
    region: 'us',
    category: 'snack',
    name: { ko: 'RX바 초콜릿 시솔트', en: 'RXBAR Chocolate Sea Salt' },
    brand: { ko: 'RXBAR', en: 'RXBAR' },
    origin: { ko: '🇺🇸 미국 시카고', en: '🇺🇸 Chicago, USA' },
    shortDesc: {
      ko: '대추·계란흰자·아몬드·캐슈로 뭉친 단백질 바.',
      en: 'Protein bar bound with dates, egg whites, almonds & cashews.'
    },
    momPick: {
      ko: '재료 5가지가 전부 — 인공첨가 무첨가, 글루텐 프리.',
      en: 'Just 5 whole ingredients — no additives, gluten-free.'
    },
    allergens: ['egg', 'tree-nut'],
    dietTags: ['healthy'],
    emoji: '🍫',
    imageGradient: ['#3A2A1E', '#0E0806']
  },
  {
    id: 'welchs-fruit-snacks',
    region: 'us',
    category: 'candy',
    name: { ko: '웰치스 후르츠 스낵', en: "Welch's Fruit Snacks" },
    brand: { ko: '웰치스', en: "Welch's" },
    origin: { ko: '🇺🇸 미국 매사추세츠', en: '🇺🇸 Massachusetts, USA' },
    shortDesc: {
      ko: '리얼 과일주스로 만든 한입 사이즈 구미.',
      en: 'Bite-sized gummies made with real fruit juice.'
    },
    momPick: {
      ko: '비타민 A·C·E · 글루텐 프리 · 지방 0g.',
      en: 'Vitamins A·C·E, gluten-free, fat-free.'
    },
    allergens: [],
    dietTags: ['kid-friendly', 'sweet'],
    emoji: '🍇',
    imageGradient: ['#A23A8E', '#4A0E3A']
  },
  {
    id: 'lesserevil-popcorn',
    region: 'us',
    category: 'snack',
    name: { ko: '레서이블 히말라야 팝콘', en: 'LesserEvil Himalayan Popcorn' },
    brand: { ko: '레서이블', en: 'LesserEvil' },
    origin: { ko: '🇺🇸 미국 코네티컷', en: '🇺🇸 Connecticut, USA' },
    shortDesc: {
      ko: '히말라야 핑크솔트로 간 한 오가닉 팝콘.',
      en: 'Organic popcorn lightly salted with Himalayan pink salt.'
    },
    momPick: {
      ko: '오가닉 코코넛오일로 팝 · 카놀라유 무사용.',
      en: 'Popped in organic coconut oil — no canola.'
    },
    allergens: [],
    dietTags: ['healthy', 'low-sugar', 'diabetic-friendly', 'kid-friendly'],
    emoji: '🍿',
    imageGradient: ['#F0E3B8', '#A88A3A']
  },
  {
    id: 'bare-apple-chips',
    region: 'us',
    category: 'chip',
    name: { ko: '베어 사과칩', en: 'Bare Apple Chips' },
    brand: { ko: '베어 스낵스', en: 'Bare Snacks' },
    origin: { ko: '🇺🇸 미국 워싱턴', en: '🇺🇸 Washington, USA' },
    shortDesc: {
      ko: '얇게 썰어 오븐에 구운 천연 사과칩.',
      en: 'Thin-sliced apples, slow-baked till crispy.'
    },
    momPick: {
      ko: '재료는 사과뿐 — 튀기지 않음, 무가당.',
      en: 'Just apples — never fried, no added sugar.'
    },
    allergens: [],
    dietTags: ['healthy', 'low-sugar', 'kid-friendly'],
    emoji: '🍎',
    imageGradient: ['#E26A4A', '#8A1F14']
  },
  {
    id: 'reeses-pb-cup',
    region: 'us',
    category: 'chocolate',
    name: { ko: '리세스 피넛버터 컵', en: "Reese's Peanut Butter Cup" },
    brand: { ko: '허쉬', en: 'Hershey' },
    origin: { ko: '🇺🇸 미국 펜실베이니아', en: '🇺🇸 Pennsylvania, USA' },
    shortDesc: {
      ko: '땅콩버터를 감싼 미국식 밀크초콜릿 클래식.',
      en: 'Milk chocolate hugging a peanut butter center — an American icon.'
    },
    momPick: {
      ko: '가끔의 작은 사치, 한 컵씩 나눠 먹기 좋아요.',
      en: 'A classic occasional treat — share one cup at a time.'
    },
    allergens: ['peanut', 'dairy', 'soy'],
    dietTags: ['sweet'],
    emoji: '🥜',
    imageGradient: ['#E89A3A', '#6A2E0A'],
    popular: true
  },
  {
    id: 'honest-kids-juice',
    region: 'us',
    category: 'drink',
    name: { ko: '어니스트 키즈 애플 주스', en: 'Honest Kids Apple Juice' },
    brand: { ko: '어니스트', en: 'Honest' },
    origin: { ko: '🇺🇸 미국 메릴랜드', en: '🇺🇸 Maryland, USA' },
    shortDesc: {
      ko: '아이도 어른도 좋아하는 오가닉 사과주스.',
      en: 'Organic apple juice the whole family can sip.'
    },
    momPick: {
      ko: 'USDA 오가닉 · HFCS·인공감미료 무첨가.',
      en: 'USDA organic, no HFCS or artificial sweeteners.'
    },
    allergens: [],
    dietTags: ['kid-friendly'],
    emoji: '🧃',
    imageGradient: ['#F4C46A', '#8A5A1E']
  },
  {
    id: 'snapple-peach',
    region: 'us',
    category: 'drink',
    name: { ko: '스내플 피치 아이스티', en: 'Snapple Peach Tea' },
    brand: { ko: '스내플', en: 'Snapple' },
    origin: { ko: '🇺🇸 미국 뉴욕', en: '🇺🇸 New York, USA' },
    shortDesc: {
      ko: '실제 잎차로 우려낸 미국식 복숭아 아이스티.',
      en: 'Brewed from real tea leaves — the American peach iced tea.'
    },
    momPick: {
      ko: '리얼 티 추출 · 인공향료·방부제 무첨가.',
      en: 'Real-brewed tea, no artificial flavors or preservatives.'
    },
    allergens: [],
    dietTags: ['sweet'],
    emoji: '🍑',
    imageGradient: ['#F4A07A', '#C84E2A']
  },

  // ── 🇰🇷 KOREA ───────────────────────────────────────────────────────────
  {
    id: 'saewookkang',
    region: 'kr',
    category: 'snack',
    name: { ko: '새우깡', en: 'Saewookkang (Shrimp Crackers)' },
    brand: { ko: '농심', en: 'Nongshim' },
    origin: { ko: '🇰🇷 한국 서울', en: '🇰🇷 Seoul, Korea' },
    shortDesc: {
      ko: '1971년 출시된 한국 국민 스낵.',
      en: "Korea's beloved national snack since 1971."
    },
    momPick: {
      ko: '국내산 새우 분말로 진짜 새우 풍미.',
      en: 'Real shrimp powder for the unmistakable umami.'
    },
    allergens: ['gluten', 'shellfish', 'soy'],
    dietTags: ['kid-friendly'],
    emoji: '🦐',
    imageGradient: ['#F4C266', '#A8662A'],
    popular: true
  },
  {
    id: 'pepero-original',
    region: 'kr',
    category: 'chocolate',
    name: { ko: '빼빼로 오리지널', en: 'Pepero Original' },
    brand: { ko: '롯데', en: 'Lotte' },
    origin: { ko: '🇰🇷 한국 서울', en: '🇰🇷 Seoul, Korea' },
    shortDesc: {
      ko: '초콜릿이 감싼 얇은 비스킷 스틱.',
      en: 'Slim biscuit sticks dipped in milk chocolate.'
    },
    momPick: {
      ko: '11월 11일 빼빼로데이의 그 추억.',
      en: 'The treat behind Korea\'s 11/11 Pepero Day.'
    },
    allergens: ['gluten', 'dairy', 'soy'],
    dietTags: ['sweet'],
    emoji: '🍫',
    imageGradient: ['#5A2E18', '#1A0E08'],
    popular: true
  },
  {
    id: 'choco-pie',
    region: 'kr',
    category: 'cookie',
    name: { ko: '초코파이 정', en: 'Choco Pie' },
    brand: { ko: '오리온', en: 'Orion' },
    origin: { ko: '🇰🇷 한국 충북', en: '🇰🇷 Chungbuk, Korea' },
    shortDesc: {
      ko: '마시멜로를 감싼 초콜릿 케이크 — 한국식 정(情).',
      en: "Marshmallow-filled chocolate cake — Korea's sweet symbol of '정'."
    },
    momPick: {
      ko: '한 봉지면 친구가 생긴다 — 나눠 먹는 한국식 정.',
      en: "One bag, one new friend — the Korean way of sharing."
    },
    allergens: ['gluten', 'dairy', 'soy', 'egg'],
    dietTags: ['sweet'],
    emoji: '🥮',
    imageGradient: ['#7A3A18', '#2A1208']
  },
  {
    id: 'honey-butter-chip',
    region: 'kr',
    category: 'chip',
    name: { ko: '허니버터칩', en: 'Honey Butter Chip' },
    brand: { ko: '해태', en: 'Haitai' },
    origin: { ko: '🇰🇷 한국 서울', en: '🇰🇷 Seoul, Korea' },
    shortDesc: {
      ko: '달콤한 꿀 + 짭짤한 버터, 중독적인 감자칩.',
      en: 'Sweet honey meets salted butter — Korea\'s most addictive chip.'
    },
    momPick: {
      ko: '한국식 감자칩 트렌드를 일으킨 그 칩.',
      en: 'The chip that kicked off Korea\'s honey-butter craze.'
    },
    allergens: ['dairy'],
    dietTags: ['sweet'],
    emoji: '🍯',
    imageGradient: ['#F4D86A', '#A88A3A']
  },
  {
    id: 'turtle-chips',
    region: 'kr',
    category: 'chip',
    name: { ko: '꼬북칩', en: 'Turtle Chips' },
    brand: { ko: '오리온', en: 'Orion' },
    origin: { ko: '🇰🇷 한국 충북', en: '🇰🇷 Chungbuk, Korea' },
    shortDesc: {
      ko: '거북이 등껍질 모양의 4겹 옥수수칩.',
      en: 'Four crunchy layers of corn shaped like a turtle shell.'
    },
    momPick: {
      ko: '바삭함이 진짜 4배 — 한국 신스타일 콘칩.',
      en: 'Quadruple the crunch — a new Korean classic.'
    },
    allergens: ['gluten', 'soy'],
    dietTags: ['kid-friendly'],
    emoji: '🐢',
    imageGradient: ['#A8783A', '#4A2E10']
  },
  {
    id: 'jolly-pong',
    region: 'kr',
    category: 'cereal',
    name: { ko: '죠리퐁', en: 'Jolly Pong' },
    brand: { ko: '크라운', en: 'Crown' },
    origin: { ko: '🇰🇷 한국 서울', en: '🇰🇷 Seoul, Korea' },
    shortDesc: {
      ko: '통밀로 톡톡 튀긴 가벼운 시리얼 스낵.',
      en: 'Light, popped whole-wheat cereal snack.'
    },
    momPick: {
      ko: '통밀 알갱이 — 우유에 말아 먹어도 좋아요.',
      en: 'Whole-wheat puffs — great in milk too.'
    },
    allergens: ['gluten'],
    dietTags: ['kid-friendly', 'healthy'],
    emoji: '🌾',
    imageGradient: ['#E8C46A', '#8A5A1E']
  },
  {
    id: 'banana-milk',
    region: 'kr',
    category: 'drink',
    name: { ko: '바나나우유', en: 'Banana Milk' },
    brand: { ko: '빙그레', en: 'Binggrae' },
    origin: { ko: '🇰🇷 한국 경기', en: '🇰🇷 Gyeonggi, Korea' },
    shortDesc: {
      ko: '단지 모양 패키지의 한국 국민 우유.',
      en: "Korea's iconic banana milk in its signature pot-shaped bottle."
    },
    momPick: {
      ko: '1974년부터 한국 목욕탕의 그 맛.',
      en: 'A bathhouse classic since 1974.'
    },
    allergens: ['dairy'],
    dietTags: ['kid-friendly', 'sweet'],
    emoji: '🍌',
    imageGradient: ['#F4D86A', '#C4983A'],
    popular: true
  },
  {
    id: 'milkis',
    region: 'kr',
    category: 'drink',
    name: { ko: '밀키스', en: 'Milkis' },
    brand: { ko: '롯데', en: 'Lotte' },
    origin: { ko: '🇰🇷 한국 서울', en: '🇰🇷 Seoul, Korea' },
    shortDesc: {
      ko: '우유에 탄산을 더한 한국식 크리미 소다.',
      en: 'Milk meets bubbles — Korea\'s creamy soda.'
    },
    momPick: {
      ko: '카페인 무함유 — 부드러운 우유 베이스.',
      en: 'Caffeine-free, gently creamy.'
    },
    allergens: ['dairy'],
    dietTags: ['sweet'],
    emoji: '🥛',
    imageGradient: ['#E8D4F4', '#7A5AA8']
  },

  // ── 🌎 WORLD ────────────────────────────────────────────────────────────
  {
    id: 'tim-tam',
    region: 'world',
    category: 'cookie',
    name: { ko: '팀탐 오리지널', en: 'Tim Tam Original' },
    brand: { ko: "아노츠", en: "Arnott's" },
    origin: { ko: '🇦🇺 호주 시드니', en: '🇦🇺 Sydney, Australia' },
    shortDesc: {
      ko: '초콜릿 크림을 두 비스킷으로 감싼 호주 국민 과자.',
      en: "Chocolate cream between two biscuits — Australia's national cookie."
    },
    momPick: {
      ko: "팀탐을 빨대 삼아 우유를 빨아먹는 'Tim Tam Slam' 도전!",
      en: 'Try the Tim Tam Slam — sip hot milk through it.'
    },
    allergens: ['gluten', 'dairy', 'soy', 'egg'],
    dietTags: ['sweet'],
    emoji: '🍪',
    imageGradient: ['#5A2E18', '#1A0E08'],
    popular: true
  },
  {
    id: 'pocky-matcha',
    region: 'world',
    category: 'chocolate',
    name: { ko: '포키 말차', en: 'Pocky Matcha' },
    brand: { ko: '글리코', en: 'Glico' },
    origin: { ko: '🇯🇵 일본 오사카', en: '🇯🇵 Osaka, Japan' },
    shortDesc: {
      ko: '일본 우지 말차를 입힌 비스킷 스틱.',
      en: 'Biscuit sticks coated in Japanese Uji matcha.'
    },
    momPick: {
      ko: '진짜 말차 분말 사용 — 부드러운 쌉싸름함.',
      en: 'Real matcha powder — gently bitter, smooth finish.'
    },
    allergens: ['gluten', 'dairy', 'soy'],
    dietTags: ['sweet'],
    emoji: '🍵',
    imageGradient: ['#7AA86A', '#2E4A1A']
  },
  {
    id: 'kitkat-matcha',
    region: 'world',
    category: 'chocolate',
    name: { ko: '킷캣 말차', en: 'KitKat Matcha' },
    brand: { ko: '네슬레', en: 'Nestlé' },
    origin: { ko: '🇯🇵 일본 한정판', en: '🇯🇵 Japan exclusive' },
    shortDesc: {
      ko: '말차 화이트초콜릿으로 감싼 일본 한정 킷캣.',
      en: 'Japan-only KitKat coated in matcha white chocolate.'
    },
    momPick: {
      ko: '교토 우지 말차 사용 — 일본 여행의 그 맛.',
      en: 'Made with Uji matcha from Kyoto.'
    },
    allergens: ['gluten', 'dairy', 'soy'],
    dietTags: ['sweet'],
    emoji: '🟢',
    imageGradient: ['#A8C46A', '#4A6A1A']
  },
  {
    id: 'haribo-goldbears',
    region: 'world',
    category: 'candy',
    name: { ko: '하리보 골드베어', en: 'Haribo Goldbears' },
    brand: { ko: '하리보', en: 'Haribo' },
    origin: { ko: '🇩🇪 독일 본', en: '🇩🇪 Bonn, Germany' },
    shortDesc: {
      ko: '1922년 출시된 세계 최초의 곰돌이 구미.',
      en: 'The original gummy bear since 1922.'
    },
    momPick: {
      ko: '리얼 과일주스 풍미 · 글루텐 프리 · 지방 0g.',
      en: 'Real fruit flavors, gluten-free, fat-free.'
    },
    allergens: [],
    dietTags: ['kid-friendly', 'sweet'],
    emoji: '🐻',
    imageGradient: ['#F4C46A', '#C8783A']
  },
  {
    id: 'lotus-biscoff',
    region: 'world',
    category: 'cookie',
    name: { ko: '로투스 비스코프', en: 'Lotus Biscoff' },
    brand: { ko: '로투스', en: 'Lotus' },
    origin: { ko: '🇧🇪 벨기에 롬보크', en: '🇧🇪 Lembeke, Belgium' },
    shortDesc: {
      ko: '7가지 향신료가 들어간 카라멜라이즈드 비스킷.',
      en: 'Caramelized biscuit with seven warming spices.'
    },
    momPick: {
      ko: 'EU 비건 인증 · 비유전자조작 · 인공색소 무첨가.',
      en: 'EU vegan certified, non-GMO, no artificial colors.'
    },
    allergens: ['gluten', 'soy'],
    dietTags: ['vegan', 'sweet'],
    emoji: '🍪',
    imageGradient: ['#C4783A', '#5E2E10']
  },
  {
    id: 'milka-alpine',
    region: 'world',
    category: 'chocolate',
    name: { ko: '밀카 알파인 밀크', en: 'Milka Alpine Milk' },
    brand: { ko: '밀카', en: 'Milka' },
    origin: { ko: '🇨🇭 스위스 알프스', en: '🇨🇭 Swiss Alps' },
    shortDesc: {
      ko: '알프스 산악 우유로 만든 부드러운 밀크초콜릿.',
      en: 'Silky milk chocolate made with Alpine mountain milk.'
    },
    momPick: {
      ko: '100% 알파인 우유 · 코코아 인증 (Cocoa Life).',
      en: '100% Alpine milk, Cocoa Life certified.'
    },
    allergens: ['dairy', 'soy'],
    dietTags: ['sweet'],
    emoji: '🐄',
    imageGradient: ['#A87AC4', '#4A2E6A']
  },
  {
    id: 'ramune',
    region: 'world',
    category: 'drink',
    name: { ko: '라무네 오리지널', en: 'Ramune Original' },
    brand: { ko: '하타 광천', en: 'Hata Kosen' },
    origin: { ko: '🇯🇵 일본 오사카', en: '🇯🇵 Osaka, Japan' },
    shortDesc: {
      ko: '구슬로 막힌 병 — 누르면 톡 쏘는 일본의 여름.',
      en: 'Marble-stopped bottle — pop it for Japan\'s summer fizz.'
    },
    momPick: {
      ko: '카페인 무함유 · 구슬 누르는 손맛은 덤.',
      en: 'Caffeine-free — and the marble pop is half the fun.'
    },
    allergens: [],
    dietTags: ['kid-friendly', 'sweet'],
    emoji: '🥤',
    imageGradient: ['#7AC4E8', '#1A4A7A']
  },
  {
    id: 'perrier',
    region: 'world',
    category: 'drink',
    name: { ko: '페리에 스파클링', en: 'Perrier Sparkling' },
    brand: { ko: '페리에', en: 'Perrier' },
    origin: { ko: '🇫🇷 프랑스 베르제즈', en: '🇫🇷 Vergèze, France' },
    shortDesc: {
      ko: '프랑스 남부 천연 광천수로 만든 스파클링 워터.',
      en: 'Sparkling water from southern France\'s natural spring.'
    },
    momPick: {
      ko: '100% 천연 미네랄 워터 · 무가당·무칼로리.',
      en: '100% natural mineral water, zero sugar & calories.'
    },
    allergens: [],
    dietTags: ['diabetic-friendly', 'low-sugar', 'healthy', 'vegan'],
    emoji: '💧',
    imageGradient: ['#7AE8C4', '#1A6A4A']
  }
];

export const snacksByRegion = snacks.reduce<Record<SnackRegion, Snack[]>>(
  (acc, s) => {
    acc[s.region] ??= [];
    acc[s.region].push(s);
    return acc;
  },
  { us: [], kr: [], world: [] }
);
