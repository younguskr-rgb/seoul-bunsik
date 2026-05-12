import type { LocalizedString } from '@/lib/types';

export const faq: Array<{ q: LocalizedString; a: LocalizedString }> = [
  {
    q: { ko: '주차장이 있나요?', en: 'Is there parking?' },
    a: {
      ko: '매장 전용 주차 12대와 인근 거리 무료 주차가 있습니다.',
      en: '12 dedicated spots in the lot, plus free street parking nearby.'
    }
  },
  {
    q: { ko: '배달은 어떻게 하나요?', en: 'How does delivery work?' },
    a: {
      ko: 'DoorDash, UberEats, GrubHub로 주문 가능합니다. 5마일 이내 직접 배달도 곧 출시 예정이에요.',
      en: 'Order via DoorDash, UberEats, or GrubHub. Direct delivery within 5 miles is launching soon.'
    }
  },
  {
    q: { ko: '단체 예약이 가능한가요?', en: 'Do you accept group reservations?' },
    a: {
      ko: '10명 이상 단체는 24시간 전 전화 예약 부탁드립니다. 단체 메뉴 패키지도 준비되어 있어요.',
      en: 'Groups of 10+ — please call 24 hours ahead. We have a special group menu package.'
    }
  },
  {
    q: { ko: '알레르기 대응이 가능한가요?', en: 'Can you accommodate allergies?' },
    a: {
      ko: '모든 메뉴에 9대 알레르기 정보가 표기되어 있고, 베지테리안·비건·글루텐프리 옵션도 있습니다.',
      en: 'Every dish is labeled with the 9 major allergens. We offer vegetarian, vegan, and gluten-free options.'
    }
  },
  {
    q: { ko: '기프트카드가 있나요?', en: 'Do you sell gift cards?' },
    a: {
      ko: '$10부터 $200까지 디지털·실물 기프트카드를 판매합니다 (곧 출시).',
      en: 'Digital and physical gift cards from $10 to $200 (launching soon).'
    }
  }
];
