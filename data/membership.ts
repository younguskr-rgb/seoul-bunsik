import type { MembershipTier } from '@/lib/types';

export const membershipTiers: MembershipTier[] = [
  {
    id: 'bites',
    name: { ko: '떡잎', en: 'Sprout' },
    korAccent: '떡잎',
    pointsRequired: 0,
    pointsProgress: 320,
    accent: 'rgb(var(--dancheong-green))',
    perks: [
      { ko: '가입 시 무료 음료 1잔', en: 'Free drink on signup' },
      { ko: '생일 디저트 무료', en: 'Birthday dessert on us' },
      { ko: '1달러당 1pt 적립', en: 'Earn 1pt per $1 spent' },
      { ko: '이메일 신메뉴 미리보기', en: 'Early menu drops via email' }
    ]
  },
  {
    id: 'seoul',
    name: { ko: '한걸음', en: 'Stepper' },
    korAccent: '한걸음',
    pointsRequired: 500,
    pointsProgress: 1200,
    accent: 'rgb(var(--dahong))',
    featured: true,
    perks: [
      { ko: '떡잎 전체 혜택 + 1.5배 적립', en: 'All Sprout perks + 1.5× points' },
      { ko: '매월 시그니처 메뉴 10% 할인', en: '10% off signature items monthly' },
      { ko: '버블티 토핑 무료 추가 (월 2회)', en: 'Free bubble tea topping (2×/mo)' },
      { ko: '주말 우선 픽업 라인', en: 'Priority weekend pickup line' }
    ]
  },
  {
    id: 'royal',
    name: { ko: '단골', en: 'Regular' },
    korAccent: '단골',
    pointsRequired: 2000,
    pointsProgress: 1860,
    accent: 'rgb(var(--dancheong-gold))',
    perks: [
      { ko: '한걸음 전체 혜택 + 2배 적립', en: 'All Stepper perks + 2× points' },
      { ko: '연 4회 무료 도시락', en: '4 free bentos per year' },
      { ko: '단골 전용 비밀 메뉴 액세스', en: 'Secret-menu access for regulars' },
      { ko: '월간 셰프와의 시식 초대', en: 'Monthly chef tasting invites' }
    ]
  }
];
