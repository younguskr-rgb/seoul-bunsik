import type { Review } from '@/lib/types';

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Emily K.',
    initial: 'E',
    avatarColor: '#E8775A',
    rating: 5,
    quote: {
      ko: '드라컷에 진짜 한국 떡볶이가 생겼다니! 분식 집사가 골라준 로제 떡볶이 완전 추천.',
      en: 'Real Korean tteokbokki in Dracut?! The concierge picked rosé tteokbokki for me — obsessed.'
    },
    source: 'google',
    date: '2026-03-12'
  },
  {
    id: 'r2',
    author: 'Minjun L.',
    initial: '민',
    avatarColor: '#3C6E47',
    rating: 5,
    quote: {
      ko: '서울에서 먹던 그 맛이에요. 김밥이랑 떡볶이 조합 완벽합니다.',
      en: "Tastes exactly like Seoul. The kimbap-tteokbokki combo nails it."
    },
    source: 'kakao',
    date: '2026-02-28'
  },
  {
    id: 'r3',
    author: 'Sarah W.',
    initial: 'S',
    avatarColor: '#3A4E91',
    rating: 5,
    quote: {
      ko: '아이들도 다 좋아해요. 키즈 도시락이 진짜 알차요!',
      en: 'My kids loved the kids bento — generous, fun, and not too spicy.'
    },
    source: 'yelp',
    date: '2026-03-04'
  },
  {
    id: 'r4',
    author: 'Jake M.',
    initial: 'J',
    avatarColor: '#C49A46',
    rating: 4,
    quote: {
      ko: '버블티 빌더가 너무 재밌어요. 흑당 + 타피오카 + 치즈폼 조합 강추!',
      en: 'The bubble tea builder is such a fun touch. Brown sugar + tapioca + cheese foam = chef\'s kiss.'
    },
    source: 'google',
    date: '2026-03-18'
  },
  {
    id: 'r5',
    author: '지영',
    initial: '지',
    avatarColor: '#7A2A2A',
    rating: 5,
    quote: {
      ko: '향수병 한 방에 날아갔어요. 김치찌개가 진짜에요 진짜!',
      en: 'Kimchi jjigae cured my homesickness in one bite. The real deal.'
    },
    source: 'instagram',
    date: '2026-03-22'
  },
  {
    id: 'r6',
    author: 'Daniel P.',
    initial: 'D',
    avatarColor: '#256457',
    rating: 5,
    quote: {
      ko: '직원분들이 정말 친절하고, 처음 가보는데도 추천을 잘 해주셨어요.',
      en: 'Staff was warm and the recommendation flow nailed my preferences. Will be back weekly.'
    },
    source: 'google',
    date: '2026-04-02'
  },
  {
    id: 'r7',
    author: 'Hannah B.',
    initial: 'H',
    avatarColor: '#B85C7A',
    rating: 5,
    quote: {
      ko: '미국에서 이런 한국 분식집 본 적 없어요. 매장 분위기도 너무 좋음.',
      en: "Haven't seen a Korean bunsik spot like this in the States. Vibes immaculate."
    },
    source: 'yelp',
    date: '2026-04-09'
  },
  {
    id: 'r8',
    author: 'Tony R.',
    initial: 'T',
    avatarColor: '#5D3A78',
    rating: 4,
    quote: {
      ko: '주말엔 좀 붐비지만 그만한 가치가 있어요. 점심 도시락 꿀템.',
      en: 'Weekends are busy but worth it. Lunch bento is my new go-to.'
    },
    source: 'google',
    date: '2026-04-14'
  }
];
