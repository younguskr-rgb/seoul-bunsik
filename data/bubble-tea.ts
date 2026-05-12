import type { BubbleTeaOption } from '@/lib/types';

export const bubbleTea = {
  bases: [
    { id: 'milk-tea', name: { ko: '밀크티', en: 'Milk Tea' }, priceDeltaUSD: 5.5, color: '#D9B48F', emoji: '🥛' },
    { id: 'fruit-tea', name: { ko: '과일티', en: 'Fruit Tea' }, priceDeltaUSD: 5.75, color: '#F49AA3', emoji: '🍑' },
    { id: 'smoothie', name: { ko: '스무디', en: 'Smoothie' }, priceDeltaUSD: 6.25, color: '#A3C58A', emoji: '🍧' },
    { id: 'matcha', name: { ko: '말차', en: 'Matcha' }, priceDeltaUSD: 6.0, color: '#7BA56C', emoji: '🍵' }
  ] satisfies BubbleTeaOption[],
  flavors: [
    { id: 'classic', name: { ko: '클래식', en: 'Classic' }, priceDeltaUSD: 0, color: '#C9A07A' },
    { id: 'taro', name: { ko: '타로', en: 'Taro' }, priceDeltaUSD: 0.5, color: '#C7A6E5' },
    { id: 'mango', name: { ko: '망고', en: 'Mango' }, priceDeltaUSD: 0.5, color: '#F7C760' },
    { id: 'strawberry', name: { ko: '딸기', en: 'Strawberry' }, priceDeltaUSD: 0.5, color: '#F49AA3' },
    { id: 'brown-sugar', name: { ko: '흑당', en: 'Brown Sugar' }, priceDeltaUSD: 0.75, color: '#8B5A2A' },
    { id: 'peach', name: { ko: '복숭아', en: 'Peach' }, priceDeltaUSD: 0.5, color: '#F4B89A' }
  ] satisfies BubbleTeaOption[],
  toppings: [
    { id: 'tapioca', name: { ko: '타피오카', en: 'Tapioca Pearls' }, priceDeltaUSD: 0.75, color: '#2A1A12' },
    { id: 'pudding', name: { ko: '푸딩', en: 'Pudding' }, priceDeltaUSD: 0.75, color: '#F2D58A' },
    { id: 'lychee-jelly', name: { ko: '리치 젤리', en: 'Lychee Jelly' }, priceDeltaUSD: 0.75, color: '#F7D7E0' },
    { id: 'aloe', name: { ko: '알로에', en: 'Aloe' }, priceDeltaUSD: 0.75, color: '#C8E4B0' },
    { id: 'red-bean', name: { ko: '팥', en: 'Red Bean' }, priceDeltaUSD: 0.75, color: '#7A2A2A' },
    { id: 'cheese-foam', name: { ko: '치즈폼', en: 'Cheese Foam' }, priceDeltaUSD: 1.0, color: '#FBE9C9' }
  ] satisfies BubbleTeaOption[],
  sweetness: [
    { id: 's0', name: { ko: '0%', en: '0%' }, priceDeltaUSD: 0 },
    { id: 's30', name: { ko: '30%', en: '30%' }, priceDeltaUSD: 0 },
    { id: 's50', name: { ko: '50%', en: '50%' }, priceDeltaUSD: 0 },
    { id: 's70', name: { ko: '70%', en: '70%' }, priceDeltaUSD: 0 },
    { id: 's100', name: { ko: '100%', en: '100%' }, priceDeltaUSD: 0 }
  ] satisfies BubbleTeaOption[],
  ice: [
    { id: 'no-ice', name: { ko: '얼음 없음', en: 'No Ice' }, priceDeltaUSD: 0 },
    { id: 'less', name: { ko: '약간', en: 'Less' }, priceDeltaUSD: 0 },
    { id: 'normal', name: { ko: '보통', en: 'Normal' }, priceDeltaUSD: 0 },
    { id: 'extra', name: { ko: '많이', en: 'Extra' }, priceDeltaUSD: 0 }
  ] satisfies BubbleTeaOption[]
};
