# AI 안심 추천 섹션 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 서울분식 홈페이지에, 4가지 모드(당뇨 안심·아이 안심·한미 건강 스낵·맛 위주)로 메뉴와 스낵을 추천하고 Claude가 추천 이유를 자연어로 설명하는 섹션을 추가한다.

**Architecture:** 하이브리드 — 순수 규칙 함수(`lib/reco/select.ts`)가 당뇨·알레르기·매운맛 같은 안전 필터를 결정적으로 보장하고, 이미 걸러진 안전한 후보의 설명 문구만 Claude API(`lib/reco/explain.ts`)가 생성한다. API 키가 없으면 템플릿 문구로 graceful fallback 하므로 키 없이도 동작한다. 서버 라우트(`app/api/reco/route.ts`)가 선정+설명을 한 번에 처리하고, 클라이언트 섹션은 결과만 렌더한다.

**Tech Stack:** Next.js 15 (App Router) · React 18 · TypeScript(strict) · next-intl · Tailwind · zod · @anthropic-ai/sdk · vitest(신규, 순수 로직 테스트용)

---

## 이 저장소에서 알아둘 것 (engineer 필독)

- **git 경로**: 이 PC엔 시스템 git이 없다. `git`은 `C:\Users\cfman\MinGit\cmd\git.exe`를 쓴다. 아래 커밋 명령의 `git`을 이 경로로 바꿔 실행하라.
- **테스트 정책**: 이 프로젝트엔 원래 테스트 러너가 없다. 이 계획에서 **순수 함수**(`lib/reco/modes.ts`, `pool.ts`, `select.ts`, `explain.ts`의 fallback)는 vitest로 TDD 한다. **타입·데이터·라우트·React 컴포넌트·i18n**은 단위 테스트가 비현실적이므로 `npm run typecheck` + `npm run lint`(+ 마지막 `npm run build`/수동 실행)로 검증한다. 각 태스크가 어떤 방식인지 명시한다.
- **경로 별칭**: `@/*` → 프로젝트 루트.
- **i18n 규칙**: 문구는 하드코딩 금지. 정적 UI 문구는 `messages/{ko,en}.json` + `useTranslations`. 동적 추천 문구(`rationale`)는 API 응답으로 전달.
- **색상**: 시맨틱 토큰만 사용 (`bg-bg`, `text-fg`, `bg-muted`, `bg-card`, `border-border`, 강조색 `dahong`). 원색 하드코딩 금지(그래디언트 inline style은 기존 SnackCard와 동일하게 예외 허용).
- 명령은 모두 프로젝트 루트(`1일차`)에서 실행한다.

---

## File Structure

**신규**
- `vitest.config.ts` — vitest 설정(`@` 별칭, node 환경)
- `lib/reco/modes.ts` — 모드 목록·이모지·면책 필요 여부(정적 메타데이터)
- `lib/reco/pool.ts` — `menu` + `snacks`를 단일 `RecoItem[]` 후보 풀로 정규화
- `lib/reco/select.ts` — 모드별 하드 필터 + 점수 정렬(안전 보장 핵심, 순수 함수)
- `lib/reco/pool.test.ts`, `lib/reco/select.test.ts`, `lib/reco/explain.test.ts`, `lib/reco/modes.test.ts` — vitest 테스트
- `lib/reco/explain.ts` — Claude API 설명 생성 + 템플릿 fallback
- `lib/anthropic/env.ts` — `isAnthropicConfigured` (Supabase env 패턴 미러)
- `app/api/reco/route.ts` — POST 추천 엔드포인트
- `components/reco/RecoModeCard.tsx` — 모드 선택 카드
- `components/reco/RecoResultCard.tsx` — 추천 결과 카드(메뉴/스낵 공용)
- `components/sections/RecoSection.tsx` — 섹션 컨테이너(`'use client'`)

**수정**
- `lib/types.ts` — `DietTag`에 2개 추가, `RecoMode`/`RecoItem`/`RecoResult` 추가
- `data/menu.ts` — 일부 메뉴에 당뇨 태그 부여
- `data/snacks.ts` — `Snack.dietTags` 필드 + 24종 태그 부여
- `messages/ko.json`, `messages/en.json` — `reco` 네임스페이스 추가
- `app/[locale]/page.tsx` — `<RecoSection />` 삽입
- `package.json` — `@anthropic-ai/sdk` 의존성, `vitest` devDependency, `test` 스크립트
- `.env.local.example` — `ANTHROPIC_API_KEY=` 추가

---

## Task 1: vitest 테스트 도구 설치

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: vitest 설치**

Run:
```bash
npm install -D vitest
```
Expected: `added` 메시지, 에러 없음. (사용하는 API — `defineConfig`, `vitest/config` — 는 2.x/3.x에서 안정적이므로 최신 버전이면 된다.)

- [ ] **Step 2: `vitest.config.ts` 생성**

```ts
import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: { environment: 'node' },
  resolve: { alias: { '@': resolve(__dirname, '.') } }
});
```

- [ ] **Step 3: `package.json`에 test 스크립트 추가**

`scripts` 블록에 다음 줄을 추가한다(`typecheck` 줄 뒤):
```json
    "typecheck": "tsc --noEmit",
    "test": "vitest run --passWithNoTests"
```

- [ ] **Step 4: 실행해서 통과 확인**

Run: `npm run test`
Expected: 테스트 파일이 없어도 `--passWithNoTests`로 exit 0 (PASS).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest for pure reco logic tests"
```

---

## Task 2: 도메인 타입 추가 (`lib/types.ts`)

**Files:**
- Modify: `lib/types.ts`

검증: 타입 전용이라 단위 테스트 없음 → `npm run typecheck`로 검증.

- [ ] **Step 1: `DietTag`에 당뇨 태그 2개 추가**

`lib/types.ts`의 `DietTag` 정의를 다음으로 교체한다:
```ts
export type DietTag =
  | 'vegetarian'
  | 'vegan'
  | 'kid-friendly'
  | 'healthy'
  | 'hearty'
  | 'sweet'
  | 'first-timer'
  | 'spicy'
  | 'diabetic-friendly'
  | 'low-sugar';
```

- [ ] **Step 2: 추천 도메인 타입 추가**

`lib/types.ts` 맨 끝에 추가한다:
```ts
export type RecoMode = 'diabetes' | 'kids' | 'healthy-snack' | 'flavor';

/** 메뉴와 스낵을 통합한 추천 후보/결과 단위. 클라이언트로도 그대로 전달된다. */
export interface RecoItem {
  kind: 'menu' | 'snack';
  id: string;
  name: LocalizedString;
  shortDesc: LocalizedString;
  allergens: Allergen[];
  dietTags: DietTag[];
  emoji?: string;
  imageGradient?: [string, string];
  priceUSD?: number; // 메뉴만
  spiceLevel?: number; // 메뉴만 (스낵은 undefined)
  region?: 'us' | 'kr' | 'world'; // 스낵만
  popular?: boolean;
}

export interface RecoResult {
  items: RecoItem[];
  rationale: string; // 현재 locale 1개 언어
  disclaimer?: string; // 당뇨 모드에서만 채워짐
}
```

- [ ] **Step 3: 타입 검증**

Run: `npm run typecheck`
Expected: 에러 없음(exit 0). 기존 `Snack`은 아직 `dietTags`가 없지만 이 타입들과는 무관하므로 통과.

- [ ] **Step 4: Commit**

```bash
git add lib/types.ts
git commit -m "feat: add diabetic diet tags and reco domain types"
```

---

## Task 3: 메뉴에 당뇨 태그 부여 (`data/menu.ts`)

**Files:**
- Modify: `data/menu.ts`

검증: 데이터 변경 → `npm run typecheck` (새 `DietTag` 값 검증).

- [ ] **Step 1: `dag-bulgogi`에 당뇨 태그 추가**

`dag-bulgogi` 항목의 `dietTags` 줄을 교체한다:
```ts
    dietTags: ['hearty', 'first-timer', 'diabetic-friendly', 'low-sugar'],
```

- [ ] **Step 2: `sundubu-jjigae`에 당뇨 태그 추가**

`sundubu-jjigae` 항목의 `dietTags` 줄을 교체한다:
```ts
    dietTags: ['hearty', 'spicy', 'diabetic-friendly', 'low-sugar'],
```

> 메모: 부드러운 두부·살코기 위주로 당류가 낮은 항목을 골랐다. 정밀 영양 분석이 아니라 운영자 판단이며, 화면엔 의료 면책 문구가 함께 노출된다.

- [ ] **Step 3: 타입 검증**

Run: `npm run typecheck`
Expected: 에러 없음(`conciergeTags`는 그대로라 무관).

- [ ] **Step 4: Commit**

```bash
git add data/menu.ts
git commit -m "feat: tag low-sugar menu items as diabetic-friendly"
```

---

## Task 4: 스낵 다이어트 태그 필드 + 데이터 부여 (`data/snacks.ts`)

**Files:**
- Modify: `data/snacks.ts`

검증: 데이터 변경 → `npm run typecheck`.

- [ ] **Step 1: import에 `DietTag` 추가**

`data/snacks.ts` 1번째 줄 import를 교체한다:
```ts
import type { Allergen, DietTag, LocalizedString } from '@/lib/types';
```

- [ ] **Step 2: `Snack` 인터페이스에 `dietTags` 필드 추가**

`Snack` 인터페이스의 `allergens: Allergen[];` 줄 바로 다음에 추가한다:
```ts
  allergens: Allergen[];
  dietTags: DietTag[];
```

- [ ] **Step 3: 24종 스낵에 `dietTags` 부여**

각 스낵 객체의 `allergens: [...]` 줄 다음에 아래 표에 맞는 `dietTags` 줄을 추가한다.

| id | 추가할 줄 |
|---|---|
| `annies-cheddar-bunnies` | `dietTags: ['kid-friendly'],` |
| `rxbar-chocolate-sea-salt` | `dietTags: ['healthy'],` |
| `welchs-fruit-snacks` | `dietTags: ['kid-friendly', 'sweet'],` |
| `lesserevil-popcorn` | `dietTags: ['healthy', 'low-sugar', 'diabetic-friendly', 'kid-friendly'],` |
| `bare-apple-chips` | `dietTags: ['healthy', 'low-sugar', 'kid-friendly'],` |
| `reeses-pb-cup` | `dietTags: ['sweet'],` |
| `honest-kids-juice` | `dietTags: ['kid-friendly'],` |
| `snapple-peach` | `dietTags: ['sweet'],` |
| `saewookkang` | `dietTags: ['kid-friendly'],` |
| `pepero-original` | `dietTags: ['sweet'],` |
| `choco-pie` | `dietTags: ['sweet'],` |
| `honey-butter-chip` | `dietTags: ['sweet'],` |
| `turtle-chips` | `dietTags: ['kid-friendly'],` |
| `jolly-pong` | `dietTags: ['kid-friendly', 'healthy'],` |
| `banana-milk` | `dietTags: ['kid-friendly', 'sweet'],` |
| `milkis` | `dietTags: ['sweet'],` |
| `tim-tam` | `dietTags: ['sweet'],` |
| `pocky-matcha` | `dietTags: ['sweet'],` |
| `kitkat-matcha` | `dietTags: ['sweet'],` |
| `haribo-goldbears` | `dietTags: ['kid-friendly', 'sweet'],` |
| `lotus-biscoff` | `dietTags: ['vegan', 'sweet'],` |
| `milka-alpine` | `dietTags: ['sweet'],` |
| `ramune` | `dietTags: ['kid-friendly', 'sweet'],` |
| `perrier` | `dietTags: ['diabetic-friendly', 'low-sugar', 'healthy', 'vegan'],` |

- [ ] **Step 4: 타입 검증 (필드 누락 적발)**

Run: `npm run typecheck`
Expected: 에러 없음. 24종 중 하나라도 `dietTags`를 빠뜨리면 "Property 'dietTags' is missing" 에러가 나므로, 그 항목을 채운다.

- [ ] **Step 5: Commit**

```bash
git add data/snacks.ts
git commit -m "feat: add dietTags to snacks data"
```

---

## Task 5: 모드 메타데이터 (`lib/reco/modes.ts`)

**Files:**
- Create: `lib/reco/modes.ts`
- Test: `lib/reco/modes.test.ts`

검증: 순수 함수 → vitest TDD.

- [ ] **Step 1: 실패하는 테스트 작성**

`lib/reco/modes.test.ts`:
```ts
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
```

- [ ] **Step 2: 실패 확인**

Run: `npm run test -- modes`
Expected: FAIL — "Cannot find module './modes'".

- [ ] **Step 3: 구현**

`lib/reco/modes.ts`:
```ts
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
```

- [ ] **Step 4: 통과 확인**

Run: `npm run test -- modes`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/reco/modes.ts lib/reco/modes.test.ts
git commit -m "feat: add reco mode metadata"
```

---

## Task 6: 후보 풀 정규화 (`lib/reco/pool.ts`)

**Files:**
- Create: `lib/reco/pool.ts`
- Test: `lib/reco/pool.test.ts`

검증: 순수 함수 → vitest TDD. (실데이터를 대상으로 매핑을 검증)

- [ ] **Step 1: 실패하는 테스트 작성**

`lib/reco/pool.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { buildPool } from './pool';

describe('buildPool', () => {
  const pool = buildPool();

  it('includes both menu and snack items', () => {
    expect(pool.some((i) => i.kind === 'menu')).toBe(true);
    expect(pool.some((i) => i.kind === 'snack')).toBe(true);
  });

  it('carries priceUSD for menu items only', () => {
    const menuItem = pool.find((i) => i.id === 'bulgogi');
    expect(menuItem?.kind).toBe('menu');
    expect(typeof menuItem?.priceUSD).toBe('number');
  });

  it('carries region for snack items', () => {
    const snack = pool.find((i) => i.id === 'perrier');
    expect(snack?.kind).toBe('snack');
    expect(snack?.region).toBe('world');
    expect(snack?.dietTags).toContain('diabetic-friendly');
  });
});
```

- [ ] **Step 2: 실패 확인**

Run: `npm run test -- pool`
Expected: FAIL — "Cannot find module './pool'".

- [ ] **Step 3: 구현**

`lib/reco/pool.ts`:
```ts
import { menu } from '@/data/menu';
import { snacks } from '@/data/snacks';
import type { RecoItem } from '@/lib/types';

/** 분식 메뉴 + 스낵을 단일 추천 후보 풀로 정규화한다. comingSoon 메뉴는 제외. */
export function buildPool(): RecoItem[] {
  const menuItems: RecoItem[] = menu
    .filter((m) => !m.comingSoon)
    .map((m) => ({
      kind: 'menu' as const,
      id: m.id,
      name: m.name,
      shortDesc: m.shortDesc,
      allergens: m.allergens,
      dietTags: m.dietTags,
      emoji: m.emoji,
      imageGradient: m.imageGradient,
      priceUSD: m.priceUSD,
      spiceLevel: m.spiceLevel,
      popular: m.popular
    }));

  const snackItems: RecoItem[] = snacks.map((s) => ({
    kind: 'snack' as const,
    id: s.id,
    name: s.name,
    shortDesc: s.shortDesc,
    allergens: s.allergens,
    dietTags: s.dietTags,
    emoji: s.emoji,
    imageGradient: s.imageGradient,
    region: s.region,
    popular: s.popular
  }));

  return [...menuItems, ...snackItems];
}
```

- [ ] **Step 4: 통과 확인**

Run: `npm run test -- pool`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/reco/pool.ts lib/reco/pool.test.ts
git commit -m "feat: normalize menu and snacks into reco candidate pool"
```

---

## Task 7: 모드별 선정 엔진 (`lib/reco/select.ts`) — 안전 핵심

**Files:**
- Create: `lib/reco/select.ts`
- Test: `lib/reco/select.test.ts`

검증: 순수 함수 → vitest TDD. **픽스처 풀을 주입**해 결정적으로 테스트한다(실데이터 의존 X).

- [ ] **Step 1: 실패하는 테스트 작성**

`lib/reco/select.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { selectRecommendations } from './select';
import type { RecoItem } from '@/lib/types';

function item(over: Partial<RecoItem> & { id: string }): RecoItem {
  return {
    kind: 'snack',
    name: { ko: over.id, en: over.id },
    shortDesc: { ko: '', en: '' },
    allergens: [],
    dietTags: [],
    ...over
  };
}

const pool: RecoItem[] = [
  item({ id: 'lowsugar-savory', dietTags: ['diabetic-friendly', 'low-sugar'] }),
  item({ id: 'lowsugar-but-sweet', dietTags: ['low-sugar', 'sweet'] }),
  item({ id: 'plain-sweet', dietTags: ['sweet'] }),
  item({ id: 'kid-mild', kind: 'menu', dietTags: ['kid-friendly'], spiceLevel: 0 }),
  item({ id: 'kid-spicy', kind: 'menu', dietTags: ['kid-friendly'], spiceLevel: 3 }),
  item({ id: 'kid-peanut', dietTags: ['kid-friendly'], allergens: ['peanut'] }),
  item({ id: 'us-healthy', region: 'us', dietTags: ['healthy'] }),
  item({ id: 'world-healthy', region: 'world', dietTags: ['healthy'] }),
  item({ id: 'popular-hearty', kind: 'menu', dietTags: ['hearty'], popular: true })
];

const ids = (items: RecoItem[]) => items.map((i) => i.id);

describe('selectRecommendations', () => {
  it('diabetes: low-sugar/diabetic-friendly AND not sweet', () => {
    const r = ids(selectRecommendations('diabetes', [], pool));
    expect(r).toContain('lowsugar-savory');
    expect(r).not.toContain('lowsugar-but-sweet');
    expect(r).not.toContain('plain-sweet');
  });

  it('kids: kid-friendly AND spiceLevel <= 1', () => {
    const r = ids(selectRecommendations('kids', [], pool));
    expect(r).toContain('kid-mild');
    expect(r).not.toContain('kid-spicy');
  });

  it('respects excludeAllergens across modes', () => {
    const r = ids(selectRecommendations('kids', ['peanut'], pool));
    expect(r).not.toContain('kid-peanut');
  });

  it('healthy-snack: snacks from kr/us only', () => {
    const r = ids(selectRecommendations('healthy-snack', [], pool));
    expect(r).toContain('us-healthy');
    expect(r).not.toContain('world-healthy');
  });

  it('flavor: no hard filter, popular ranks first', () => {
    const r = selectRecommendations('flavor', [], pool);
    expect(r.length).toBeGreaterThan(0);
    expect(r[0].id).toBe('popular-hearty');
  });

  it('returns at most 4 items', () => {
    expect(selectRecommendations('flavor', [], pool).length).toBeLessThanOrEqual(4);
  });
});
```

- [ ] **Step 2: 실패 확인**

Run: `npm run test -- select`
Expected: FAIL — "Cannot find module './select'".

- [ ] **Step 3: 구현**

`lib/reco/select.ts`:
```ts
import type { Allergen, RecoItem, RecoMode } from '@/lib/types';
import { buildPool } from './pool';

const TOP_N = 4;

/** 하드 필터: 통과하지 못하면 절대 추천되지 않는다(안전 보장). */
function passesHardFilter(item: RecoItem, mode: RecoMode): boolean {
  switch (mode) {
    case 'diabetes':
      return (
        (item.dietTags.includes('diabetic-friendly') || item.dietTags.includes('low-sugar')) &&
        !item.dietTags.includes('sweet')
      );
    case 'kids':
      return (
        item.dietTags.includes('kid-friendly') &&
        (item.spiceLevel === undefined || item.spiceLevel <= 1)
      );
    case 'healthy-snack':
      return (
        item.kind === 'snack' &&
        (item.region === 'kr' || item.region === 'us') &&
        (item.dietTags.includes('healthy') || item.dietTags.includes('low-sugar'))
      );
    case 'flavor':
      return true;
  }
}

/** 정렬 우선순위 점수(높을수록 먼저). */
function scoreItem(item: RecoItem, mode: RecoMode): number {
  let s = item.popular ? 2 : 0;
  switch (mode) {
    case 'diabetes':
      if (item.dietTags.includes('healthy')) s += 3;
      if (item.dietTags.includes('vegetarian') || item.dietTags.includes('vegan')) s += 2;
      if (item.dietTags.includes('low-sugar')) s += 2;
      break;
    case 'kids':
      s += Math.max(0, 4 - item.allergens.length);
      break;
    case 'healthy-snack':
      if (item.dietTags.includes('healthy')) s += 3;
      if (item.dietTags.includes('low-sugar')) s += 2;
      break;
    case 'flavor':
      if (item.dietTags.includes('hearty')) s += 3;
      if (item.dietTags.includes('sweet')) s += 2;
      if (item.dietTags.includes('spicy')) s += 2;
      break;
  }
  return s;
}

export function selectRecommendations(
  mode: RecoMode,
  excludeAllergens: Allergen[] = [],
  pool: RecoItem[] = buildPool()
): RecoItem[] {
  return pool
    .filter((item) => !excludeAllergens.some((a) => item.allergens.includes(a)))
    .filter((item) => passesHardFilter(item, mode))
    .map((item) => ({ item, score: scoreItem(item, mode) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_N)
    .map((r) => r.item);
}
```

- [ ] **Step 4: 통과 확인**

Run: `npm run test -- select`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/reco/select.ts lib/reco/select.test.ts
git commit -m "feat: add deterministic mode-based reco selection engine"
```

---

## Task 8: Anthropic 환경변수 헬퍼 (`lib/anthropic/env.ts`)

**Files:**
- Create: `lib/anthropic/env.ts`

검증: 단순 상수 → `npm run typecheck`.

- [ ] **Step 1: 구현**

`lib/anthropic/env.ts`:
```ts
/**
 * Anthropic(Claude) API 키 — .env.local 의 ANTHROPIC_API_KEY (서버 전용).
 * NEXT_PUBLIC_ 접두사를 쓰지 않으므로 클라이언트 번들에 노출되지 않는다.
 * 키가 없으면 추천은 정상 동작하되 설명 문구가 템플릿으로 대체된다.
 */
export const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

/** Claude API 자격증명이 설정되어 있는지 여부 */
export const isAnthropicConfigured = Boolean(ANTHROPIC_API_KEY);
```

- [ ] **Step 2: 타입 검증**

Run: `npm run typecheck`
Expected: 에러 없음.

- [ ] **Step 3: Commit**

```bash
git add lib/anthropic/env.ts
git commit -m "feat: add anthropic env helper with graceful-degrade flag"
```

---

## Task 9: 설명 생성기 (`lib/reco/explain.ts`)

**Files:**
- Create: `lib/reco/explain.ts`
- Test: `lib/reco/explain.test.ts`
- Modify: `package.json` (`@anthropic-ai/sdk` 추가)

검증: **fallback 함수는 vitest TDD**(순수). LLM 호출 경로는 typecheck + Task 15 수동 실행으로 검증.

- [ ] **Step 1: SDK 설치**

Run:
```bash
npm install @anthropic-ai/sdk
```
Expected: `added` 메시지, 에러 없음.

- [ ] **Step 2: 실패하는 테스트 작성 (fallback)**

`lib/reco/explain.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { buildFallbackRationale } from './explain';

describe('buildFallbackRationale', () => {
  it('returns a non-empty string for every mode and locale', () => {
    for (const mode of ['diabetes', 'kids', 'healthy-snack', 'flavor'] as const) {
      expect(buildFallbackRationale(mode, 'ko').length).toBeGreaterThan(0);
      expect(buildFallbackRationale(mode, 'en').length).toBeGreaterThan(0);
    }
  });

  it('returns Korean text for ko locale', () => {
    expect(buildFallbackRationale('flavor', 'ko')).toMatch(/[가-힣]/);
  });
});
```

- [ ] **Step 3: 실패 확인**

Run: `npm run test -- explain`
Expected: FAIL — "Cannot find module './explain'".

- [ ] **Step 4: 구현**

`lib/reco/explain.ts`:
```ts
import type { RecoItem, RecoMode } from '@/lib/types';
import { ANTHROPIC_API_KEY, isAnthropicConfigured } from '@/lib/anthropic/env';

type Locale = 'ko' | 'en';

const MODE_FALLBACK: Record<RecoMode, Record<Locale, string>> = {
  diabetes: {
    ko: '당류 부담이 적은 메뉴와 스낵으로 골라봤어요. 부담 없이 즐겨보세요.',
    en: 'Picks that go easy on sugar — enjoy them with peace of mind.'
  },
  kids: {
    ko: '맵지 않고 아이가 좋아할 만한 것들로 골랐어요.',
    en: 'Mild, kid-approved picks the little ones will love.'
  },
  'healthy-snack': {
    ko: '한국·미국의 건강 지향 스낵으로 추려봤어요.',
    en: 'A lineup of health-minded snacks from Korea and the US.'
  },
  flavor: {
    ko: '건강은 잠깐 잊고, 가장 맛있는 인기 메뉴로 골랐어요!',
    en: 'Forget the diet — these are the most crave-worthy picks!'
  }
};

/** API 키가 없거나 호출 실패 시 쓰는 결정적 템플릿 문구. */
export function buildFallbackRationale(mode: RecoMode, locale: Locale): string {
  return MODE_FALLBACK[mode][locale];
}

/**
 * 이미 선정된 안전한 후보의 추천 이유만 자연어로 생성한다.
 * LLM은 항목을 고르거나 바꾸지 않으며, 의학적 주장도 하지 않는다.
 */
export async function explainRecommendations(
  items: RecoItem[],
  mode: RecoMode,
  locale: Locale
): Promise<string> {
  if (!isAnthropicConfigured || items.length === 0) {
    return buildFallbackRationale(mode, locale);
  }

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    const itemList = items
      .map((it) => `- ${it.name[locale]}: ${it.shortDesc[locale]}`)
      .join('\n');
    const langName = locale === 'ko' ? 'Korean' : 'English';

    const msg = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 220,
      system: [
        {
          type: 'text',
          text:
            'You write a short, warm 2-3 sentence blurb explaining why a set of ' +
            'pre-selected Korean snack-bar items suit the diner. RULES: Do not add, ' +
            'remove, or re-rank items. Describe only taste, texture, ingredients, and ' +
            'mood. Never make medical or health claims (e.g. "lowers blood sugar"). ' +
            'Output plain sentences only — no markdown, no bullet lists.',
          cache_control: { type: 'ephemeral' }
        }
      ],
      messages: [
        {
          role: 'user',
          content: `Mode: ${mode}\nWrite ONLY in ${langName}.\nItems:\n${itemList}`
        }
      ]
    });

    const text = msg.content
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('')
      .trim();

    return text || buildFallbackRationale(mode, locale);
  } catch {
    return buildFallbackRationale(mode, locale);
  }
}
```

- [ ] **Step 5: 통과 확인 (fallback 테스트 + 타입)**

Run: `npm run test -- explain`
Expected: PASS (2 tests).

Run: `npm run typecheck`
Expected: 에러 없음(SDK 타입까지 컴파일 통과).

- [ ] **Step 6: Commit**

```bash
git add lib/reco/explain.ts lib/reco/explain.test.ts package.json package-lock.json
git commit -m "feat: add Claude-powered reco rationale with template fallback"
```

---

## Task 10: 추천 API 라우트 (`app/api/reco/route.ts`)

**Files:**
- Create: `app/api/reco/route.ts`

검증: 라우트 핸들러 → `npm run typecheck` + `npm run lint`. 동작은 Task 15 수동 실행.

- [ ] **Step 1: 구현**

`app/api/reco/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { selectRecommendations } from '@/lib/reco/select';
import { explainRecommendations } from '@/lib/reco/explain';
import { modeRequiresDisclaimer } from '@/lib/reco/modes';
import type { RecoResult } from '@/lib/types';

const bodySchema = z.object({
  mode: z.enum(['diabetes', 'kids', 'healthy-snack', 'flavor']),
  excludeAllergens: z
    .array(
      z.enum([
        'gluten', 'dairy', 'peanut', 'tree-nut', 'soy',
        'egg', 'shellfish', 'pork', 'beef', 'sesame'
      ])
    )
    .default([]),
  locale: z.enum(['ko', 'en']).default('ko')
});

const DISCLAIMER: Record<'ko' | 'en', string> = {
  ko: '※ 일반 정보 제공용이며 의료 자문이 아닙니다. 혈당 관리는 담당 의료진과 상의하고, 알레르기·성분은 실제 제품 표기를 확인하세요.',
  en: '※ For general information only — not medical advice. Consult your care team about blood sugar, and always check product labels for allergens.'
};

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const { mode, excludeAllergens, locale } = parsed.data;
  const items = selectRecommendations(mode, excludeAllergens);
  const rationale = await explainRecommendations(items, mode, locale);

  const result: RecoResult = {
    items,
    rationale,
    disclaimer: modeRequiresDisclaimer(mode) ? DISCLAIMER[locale] : undefined
  };

  return NextResponse.json(result);
}
```

> 참고: `middleware.ts`의 matcher가 `api`를 제외하므로 이 경로는 locale 프리픽스 없이 `/api/reco`로 호출된다.

- [ ] **Step 2: 타입 & 린트 검증**

Run: `npm run typecheck`
Expected: 에러 없음.

Run: `npm run lint`
Expected: 에러 없음(경고 무방).

- [ ] **Step 3: Commit**

```bash
git add app/api/reco/route.ts
git commit -m "feat: add POST /api/reco recommendation endpoint"
```

---

## Task 11: i18n 메시지 + 환경변수 예시

**Files:**
- Modify: `messages/ko.json`
- Modify: `messages/en.json`
- Modify: `.env.local.example`

검증: `npm run typecheck`(next-intl 키는 런타임 조회라 typecheck로는 부족 → Task 15 수동 확인). JSON 유효성은 빌드에서 적발.

- [ ] **Step 1: `messages/ko.json`에 `reco` 네임스페이스 추가**

기존 `"concierge": { ... }` 블록 뒤(같은 최상위 레벨)에 추가한다. 끝 콤마에 유의:
```json
  "reco": {
    "eyebrow": "AI 추천",
    "title": "오늘은 무엇을 찾으세요?",
    "subtitle": "원하는 모드를 고르면 메뉴와 스낵 중에서 골라드려요.",
    "mode": {
      "diabetes": { "label": "당뇨 안심", "desc": "당류 부담이 적은 메뉴·스낵" },
      "kids": { "label": "아이 안심", "desc": "안 맵고 아이가 좋아하는" },
      "healthy-snack": { "label": "한·미 건강 스낵", "desc": "한국·미국 건강 지향 스낵" },
      "flavor": { "label": "맛만 생각", "desc": "건강은 잠깐 잊고 맛으로!" }
    },
    "excludeLabel": "제외할 알레르기",
    "cta": "AI 추천 받기",
    "loading": "고르는 중…",
    "error": "추천을 불러오지 못했어요. 다시 시도해 주세요.",
    "empty": "조건에 맞는 항목이 적어요. 다른 모드를 골라보세요."
  }
```

- [ ] **Step 2: `messages/en.json`에 동일 키 추가(영문)**

기존 `"concierge"` 블록 뒤에 추가한다:
```json
  "reco": {
    "eyebrow": "AI Picks",
    "title": "What are you in the mood for?",
    "subtitle": "Choose a mode and we'll pick from our menu and snacks.",
    "mode": {
      "diabetes": { "label": "Diabetes-friendly", "desc": "Lower-sugar dishes & snacks" },
      "kids": { "label": "Kid-safe", "desc": "Mild and kid-approved" },
      "healthy-snack": { "label": "KR·US healthy snacks", "desc": "Health-minded snacks from Korea & the US" },
      "flavor": { "label": "Pure flavor", "desc": "Forget the diet — just delicious!" }
    },
    "excludeLabel": "Exclude allergens",
    "cta": "Get AI picks",
    "loading": "Picking…",
    "error": "Couldn't load recommendations. Please try again.",
    "empty": "Few items match. Try another mode."
  }
```

- [ ] **Step 3: `.env.local.example`에 키 추가**

`.env.local.example` 끝에 추가한다:
```bash
# Claude API (선택) — 추천 설명 문구 생성용. 없으면 템플릿 문구로 동작.
ANTHROPIC_API_KEY=
```

- [ ] **Step 4: JSON 유효성 확인**

Run: `npm run build`
Expected: 빌드 성공. JSON 문법 오류(콤마 등)가 있으면 여기서 실패하므로 수정한다. (빌드가 오래 걸리면 Step은 Task 15에서 한 번에 확인해도 됨 — 단, 그 경우 ko/en JSON을 에디터의 JSON 린트로 점검할 것.)

- [ ] **Step 5: Commit**

```bash
git add messages/ko.json messages/en.json .env.local.example
git commit -m "feat: add reco i18n namespace and ANTHROPIC_API_KEY example"
```

---

## Task 12: 결과/모드 카드 컴포넌트

**Files:**
- Create: `components/reco/RecoModeCard.tsx`
- Create: `components/reco/RecoResultCard.tsx`

검증: `npm run typecheck` + `npm run lint`.

- [ ] **Step 1: `RecoModeCard` 구현**

`components/reco/RecoModeCard.tsx`:
```tsx
'use client';

import { cn } from '@/lib/utils';

export function RecoModeCard({
  emoji,
  label,
  desc,
  active,
  onClick
}: {
  emoji: string;
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all',
        active
          ? 'border-dahong bg-dahong/10 shadow-sm'
          : 'border-border bg-card hover:border-dahong/40 hover:bg-muted'
      )}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="font-semibold text-fg">{label}</span>
      <span className="text-xs text-muted-fg">{desc}</span>
    </button>
  );
}
```

- [ ] **Step 2: `RecoResultCard` 구현**

`components/reco/RecoResultCard.tsx`:
```tsx
'use client';

import { useLocale } from 'next-intl';
import { Card } from '@/components/ui/card';
import { AllergyBadges } from '@/components/menu/AllergyBadges';
import type { RecoItem } from '@/lib/types';

export function RecoResultCard({ item }: { item: RecoItem }) {
  const locale = useLocale() as 'ko' | 'en';
  const [from, to] = item.imageGradient ?? ['#E8B07A', '#7A4818'];

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <div
        className="relative flex h-32 items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        aria-hidden
      >
        <span className="text-5xl drop-shadow-md transition-transform duration-300 group-hover:scale-110">
          {item.emoji ?? '🍽️'}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="font-serif text-lg leading-tight">{item.name[locale]}</div>
          {item.priceUSD !== undefined && (
            <div className="shrink-0 text-sm font-semibold text-dahong">
              ${item.priceUSD.toFixed(2)}
            </div>
          )}
        </div>
        <p className="text-sm text-muted-fg line-clamp-2">{item.shortDesc[locale]}</p>
        {item.allergens.length > 0 && (
          <div className="mt-auto pt-1">
            <AllergyBadges allergens={item.allergens} />
          </div>
        )}
      </div>
    </Card>
  );
}
```

- [ ] **Step 3: 타입 & 린트 검증**

Run: `npm run typecheck`
Expected: 에러 없음.

Run: `npm run lint`
Expected: 에러 없음.

- [ ] **Step 4: Commit**

```bash
git add components/reco/RecoModeCard.tsx components/reco/RecoResultCard.tsx
git commit -m "feat: add reco mode and result card components"
```

---

## Task 13: 추천 섹션 (`components/sections/RecoSection.tsx`)

**Files:**
- Create: `components/sections/RecoSection.tsx`

검증: `npm run typecheck` + `npm run lint`. 동작은 Task 15.

- [ ] **Step 1: 구현**

`components/sections/RecoSection.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeader } from './SectionHeader';
import { Button } from '@/components/ui/button';
import { RecoModeCard } from '@/components/reco/RecoModeCard';
import { RecoResultCard } from '@/components/reco/RecoResultCard';
import { RECO_MODES, MODE_EMOJI } from '@/lib/reco/modes';
import { ALLERGEN_OPTIONS } from '@/lib/concierge/recommend';
import type { Allergen, RecoMode, RecoResult } from '@/lib/types';
import { cn } from '@/lib/utils';

export function RecoSection() {
  const t = useTranslations('reco');
  const tMenu = useTranslations('menu'); // 알레르기 라벨 재사용
  const locale = useLocale() as 'ko' | 'en';

  const [mode, setMode] = useState<RecoMode>('diabetes');
  const [exclude, setExclude] = useState<Allergen[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<RecoResult | null>(null);

  function toggleAllergen(a: Allergen) {
    setExclude((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  async function getRecommendations() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/reco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, excludeAllergens: exclude, locale })
      });
      if (!res.ok) throw new Error('request failed');
      setResult((await res.json()) as RecoResult);
    } catch {
      setError(true);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="reco" className="section">
      <div className="container-wide">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RECO_MODES.map((m) => (
            <RecoModeCard
              key={m}
              emoji={MODE_EMOJI[m]}
              label={t(`mode.${m}.label`)}
              desc={t(`mode.${m}.desc`)}
              active={m === mode}
              onClick={() => setMode(m)}
            />
          ))}
        </div>

        <div className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-muted-fg">
          {t('excludeLabel')}
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {ALLERGEN_OPTIONS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAllergen(a)}
              aria-pressed={exclude.includes(a)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs transition-colors',
                exclude.includes(a)
                  ? 'border-dahong bg-dahong/10 text-dahong'
                  : 'border-border text-muted-fg hover:bg-muted'
              )}
            >
              {tMenu(`allergen.${a}`)}
            </button>
          ))}
        </div>

        <div className="mb-8 flex justify-center">
          <Button variant="primary" size="lg" onClick={getRecommendations} disabled={loading}>
            {loading ? t('loading') : t('cta')}
          </Button>
        </div>

        {error && <p className="text-center text-sm text-muted-fg">{t('error')}</p>}

        {result && !error && (
          <div className="space-y-4">
            <p className="mx-auto max-w-2xl text-center text-base text-fg">{result.rationale}</p>

            {result.items.length === 0 ? (
              <p className="text-center text-sm text-muted-fg">{t('empty')}</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {result.items.map((item) => (
                  <RecoResultCard key={`${item.kind}-${item.id}`} item={item} />
                ))}
              </div>
            )}

            {result.disclaimer && (
              <p className="mx-auto max-w-2xl text-center text-xs text-muted-fg">
                {result.disclaimer}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 타입 & 린트 검증**

Run: `npm run typecheck`
Expected: 에러 없음.

Run: `npm run lint`
Expected: 에러 없음.

- [ ] **Step 3: Commit**

```bash
git add components/sections/RecoSection.tsx
git commit -m "feat: add AI reco section with mode picker and allergen toggles"
```

---

## Task 14: 홈페이지에 섹션 연결 (`app/[locale]/page.tsx`)

**Files:**
- Modify: `app/[locale]/page.tsx`

검증: `npm run typecheck`.

- [ ] **Step 1: import 추가**

`ConciergeSection` import 줄 다음에 추가한다:
```ts
import { ConciergeSection } from '@/components/sections/ConciergeSection';
import { RecoSection } from '@/components/sections/RecoSection';
```

- [ ] **Step 2: JSX에 섹션 삽입**

`<ConciergeSection />` 바로 다음 줄에 추가한다:
```tsx
      <ConciergeSection />
      <RecoSection />
```

- [ ] **Step 3: 타입 검증**

Run: `npm run typecheck`
Expected: 에러 없음.

- [ ] **Step 4: Commit**

```bash
git add "app/[locale]/page.tsx"
git commit -m "feat: mount RecoSection on the home page"
```

---

## Task 15: 전체 검증 (typecheck · lint · build · 수동 실행)

**Files:** (없음 — 검증 전용)

이 프로젝트엔 UI 통합 테스트 러너가 없으므로, 라우트·컴포넌트·i18n은 빌드와 수동 실행으로 확인한다.

- [ ] **Step 1: 전체 단위 테스트**

Run: `npm run test`
Expected: 모든 vitest 테스트 PASS (modes 3 + pool 3 + select 6 + explain 2).

- [ ] **Step 2: 타입체크**

Run: `npm run typecheck`
Expected: 에러 없음.

- [ ] **Step 3: 린트**

Run: `npm run lint`
Expected: 에러 없음.

- [ ] **Step 4: 프로덕션 빌드**

Run: `npm run build`
Expected: 빌드 성공. (`messages/*.json` JSON 오류, 누락 키 등이 여기서 적발됨)

- [ ] **Step 5: 수동 실행 확인 (API 키 없이 — fallback 경로)**

`.env.local`에 `ANTHROPIC_API_KEY`가 없는 상태에서:
Run: `npm run dev`
브라우저에서 `http://localhost:3000/ko` 접속 → "AI 추천" 섹션까지 스크롤.
확인:
1. 모드 4개 카드가 보이고, 클릭하면 선택 표시(테두리 강조)된다.
2. "당뇨 안심" 선택 → "AI 추천 받기" → 결과 카드가 뜨고, **의료 면책 문구**가 하단에 보인다.
3. "아이 안심" 선택 후 알레르기 칩(예: 땅콩) 토글 → 추천 받기 → 해당 알레르기 항목이 결과에서 빠진다.
4. 설명 문구(rationale)가 한국어 템플릿으로 표시된다(키 없으므로 fallback).
5. `/en`에서 영어로 표시된다.

- [ ] **Step 6: (선택) API 키 있는 경우 LLM 경로 확인**

`.env.local`에 `ANTHROPIC_API_KEY=sk-...` 설정 후 `npm run dev` 재시작 → 추천 받기 → 설명 문구가 템플릿이 아닌 LLM 생성 문장으로 바뀌는지 확인. (키가 없으면 이 스텝은 건너뛴다.)

- [ ] **Step 7: 최종 커밋(변경분이 있다면)**

빌드 산출물은 커밋하지 않는다. 검증 중 수정이 있었다면:
```bash
git add -A
git commit -m "fix: address verification findings for reco section"
```

---

## 완료 기준 (Definition of Done)

- `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build` 모두 성공.
- API 키 **없이도** 4개 모드가 동작하고 fallback 문구가 표시된다.
- 당뇨 모드에서 의료 면책 문구가 항상 노출된다.
- 알레르기 토글이 결과에서 해당 항목을 제외한다.
- 안전 판정(당뇨/아이/알레르기)은 `lib/reco/select.ts`(코드)가 보장하며 LLM에 의존하지 않는다.
