# 서울분식 — AI 안심 추천 기능 설계 기획서

- **작성일**: 2026-05-23
- **대상 프로젝트**: `seoul-bunsik-dracut` (Next.js 15 · App Router · next-intl · Tailwind)
- **상태**: 설계 확정 대기 (사용자 검토 중)

---

## 1. 개요

서울분식 홈페이지에 **AI 안심 추천 섹션**을 추가한다. 방문자가 4가지 "모드"
중 하나를 고르면, 분식 메뉴(`data/menu`)와 스낵(`data/snacks`)을 통틀어 그
모드에 맞는 항목을 3~4개 추천하고, **Claude API가 추천 이유를 자연어로** 짧게
설명해 준다.

> **한 줄 요약**: "규칙 엔진이 안전하게 후보를 고르고, Claude가 왜 좋은지
> 친근하게 설명한다."

### 4가지 추천 모드

| 모드 | 한국어 라벨 | 핵심 의도 |
|---|---|---|
| `diabetes` | 당뇨 안심 | 당류가 낮아 혈당 부담이 적은 메뉴·스낵 |
| `kids` | 아이 안심 | 안 맵고 아이가 좋아하는, 알레르기 걸러낸 항목 |
| `healthy-snack` | 한·미 건강 스낵 | 한국/미국산 건강 지향 스낵 |
| `flavor` | 맛만 생각 | 건강 따지지 않고 가장 맛있는·인기 항목 |

---

## 2. 아키텍처 — 하이브리드 (규칙 + LLM)

안전 판정(당뇨·알레르기·매운맛)은 **100% 코드가 보장**하고, LLM은 **이미
걸러진 안전한 후보의 설명 문구만** 생성한다. LLM이 "무엇을 먹어도 되는가"를
판단하지 않으므로 환각으로 인한 위험이 없다.

```
[클라이언트] RecoSection (use client)
   │  POST /api/reco  { mode, excludeAllergens, locale }
   ▼
[서버] app/api/reco/route.ts
   │  1) select(mode, excludeAllergens)  ← lib/reco/select.ts (순수 규칙, 결정적)
   │       → 안전 필터 통과한 후보 3~4개 (메뉴+스낵)
   │  2) explain(items, mode, locale)    ← lib/reco/explain.ts
   │       → Claude API로 짧은 추천 문구 생성
   │       → API 키 없으면 템플릿 문구로 graceful fallback
   ▼
   { items: RecoItem[], rationale: string, disclaimer?: string }
   │
   ▼
[클라이언트] 결과 카드 + 추천 문구 + (당뇨 모드) 면책 문구 렌더
```

**graceful degradation**: 이 코드베이스의 Supabase 패턴(`isSupabaseConfigured`)을
그대로 따른다. `ANTHROPIC_API_KEY`가 없으면 추천 자체는 정상 동작하고, LLM
설명만 템플릿 문구(`lib/reco/explain.ts`의 fallback)로 대체된다. 즉 키 없이도
배포·시연이 가능하다.

---

## 3. 데이터 모델 변경

### 3.1 `lib/types.ts`

```ts
// DietTag에 당뇨 관련 태그 2개 추가
export type DietTag =
  | 'vegetarian' | 'vegan' | 'kid-friendly' | 'healthy'
  | 'hearty' | 'sweet' | 'first-timer' | 'spicy'
  | 'diabetic-friendly'   // 신규: 당류 낮음, 혈당 부담 적음
  | 'low-sugar';          // 신규: 무가당/저당

// 추천 도메인 타입 신규
export type RecoMode = 'diabetes' | 'kids' | 'healthy-snack' | 'flavor';

export interface RecoItem {
  kind: 'menu' | 'snack';   // 카드 렌더 분기용
  id: string;
  name: LocalizedString;
  shortDesc: LocalizedString;
  allergens: Allergen[];
  emoji?: string;
  imageGradient?: [string, string];
  priceUSD?: number;        // 메뉴만
}

export interface RecoResult {
  items: RecoItem[];
  rationale: string;        // 현재 locale 1개 언어 (LLM 또는 템플릿 생성)
  disclaimer?: string;      // 당뇨 모드에서만 채워짐
}
```

### 3.2 `data/snacks.ts`

스낵에도 다이어트 태그가 필요하므로 `Snack`에 필드를 추가한다:

```ts
export interface Snack {
  // ...기존 필드...
  dietTags?: DietTag[];   // 신규: 당뇨/저당/건강/아이친화 분류용
}
```

24종 스낵에 `dietTags`를 **수동 부여**한다. 예시:
- `bare-apple-chips` (무가당 사과칩) → `['low-sugar', 'healthy', 'kid-friendly']`
- `perrier` (무가당 탄산수) → `['diabetic-friendly', 'low-sugar', 'healthy']`
- `pepero-original` (초콜릿 과자) → `[]` (당뇨/건강 모드 제외 대상)

### 3.3 `data/menu.ts`

기존 메뉴 항목에 해당되는 곳에 `diabetic-friendly` / `low-sugar` 태그를 추가
부여한다. (예: 당류가 낮은 짭짤한 분식류)

> 모든 태그 부여는 **운영자의 판단**이며 영양 분석이 아니다 — 면책 문구로 명시.

---

## 4. 모드별 선정 규칙 (`lib/reco/select.ts`, 순수 함수)

하드 필터(반드시 만족)와 가점(정렬 우선순위)으로 구성. 공통적으로
`comingSoon` 항목과 **사용자가 켠 알레르기 제외 항목**은 무조건 탈락.

| 모드 | 하드 필터 (코드 보장) | 가점 |
|---|---|---|
| `diabetes` | `diabetic-friendly` 또는 `low-sugar` 보유 **그리고** `sweet` 미보유 | `healthy`, `vegetarian/vegan`, `popular` |
| `kids` | `kid-friendly` 보유 **그리고** spiceLevel ≤ 1(메뉴) | `popular`, 알레르기 적은 항목 |
| `healthy-snack` | 스낵 중 region ∈ {kr, us} **그리고** `healthy`/`low-sugar` 보유 | `popular`, 무첨가·오가닉(`momPick` 가산) |
| `flavor` | 없음 (`comingSoon`만 제외) | `popular`, `hearty`, `sweet`, `spicy` |

- 출력: 점수 내림차순 상위 **3~4개**를 `RecoItem[]`로 정규화.
- `excludeAllergens`는 모든 모드에서 적용(특히 `kids`에서 부모가 토글).
- 메뉴와 스낵을 하나의 후보 풀로 합쳐 점수 비교 → 모드 의도에 맞으면 종류
  무관하게 노출.

---

## 5. Claude API 설명 생성 (`lib/reco/explain.ts` + `app/api/reco/route.ts`)

- **모델**: `claude-haiku-4-5` (짧은 설명 문구라 속도·비용 우선). 시스템
  프롬프트에 **prompt caching** 적용.
- **입력**: 이미 선정된 후보 항목들의 이름·설명·태그 + 모드 + locale.
- **출력**: 2~3문장의 친근한 추천 문구(현재 locale 언어 1개).
- **프롬프트 정책 (안전)**:
  - LLM은 **항목을 고르거나 바꾸지 않는다.** 주어진 항목만 설명한다.
  - **의학적 주장 금지**("혈당을 낮춘다" 류 X). 맛·식감·재료·분위기만 묘사.
  - 당뇨/아이 모드에서도 "안심하고 즐기세요" 같은 톤은 가능하되 치료·효능
    표현은 금지.
- **fallback**: `ANTHROPIC_API_KEY` 미설정 시 모드별 템플릿 문구 반환
  (기존 `concierge/recommend.ts`의 `rationale()` 스타일 재활용).
- **보안**: 키는 서버 전용 `ANTHROPIC_API_KEY` (절대 `NEXT_PUBLIC_` 아님).
  라우트 핸들러에서만 사용. `app/auth/callback`처럼 `api` 경로는 미들웨어
  matcher에서 이미 제외되어 locale 프리픽스 없음 → `/api/reco` 그대로 사용.

---

## 6. UI / 컴포넌트

기존 섹션 구조(`components/sections/`)와 일관되게 추가:

- `components/sections/RecoSection.tsx` (`'use client'`) — 섹션 컨테이너.
  - 모드 카드 4개(`RecoModeCard`) → 클릭 시 선택.
  - (선택) 알레르기 제외 토글 — `ALLERGEN_OPTIONS` 재사용.
  - "추천 받기" → `POST /api/reco` → 로딩 상태 → 결과 렌더.
- `components/reco/RecoModeCard.tsx` — 모드 선택 카드(이모지+라벨+한 줄 설명).
- `components/reco/RecoResultCard.tsx` — 추천 항목 카드. `kind`에 따라 기존
  `MenuCard` / 스낵 카드 스타일 재사용(`imageGradient`+`emoji`).
- `app/[locale]/page.tsx` — 섹션 컴포넌트 순서에 `<RecoSection />` 삽입
  (예: `concierge` 섹션 부근).
- 디자인 토큰(`bg-bg`, `text-fg`, `bg-muted` 등)만 사용, 원색 하드코딩 금지.

---

## 7. 국제화 (i18n)

- `messages/ko.json` / `messages/en.json`에 **`reco` 네임스페이스** 신규 추가
  (섹션 제목, 모드 라벨/설명, 버튼, 로딩·에러 문구, 면책 문구).
- 정적 UI 문구는 `useTranslations('reco')`로 읽는다.
- 동적 추천 문구(`rationale`)는 사용자의 현재 locale로 LLM/템플릿이 생성하므로
  메시지 파일이 아니라 API 응답으로 전달된다.

---

## 8. 안전 & 면책 (필수)

- **코드 기반 하드 필터**: 당뇨·아이·알레르기 판정은 규칙 엔진이 보장하고
  LLM에 위임하지 않는다.
- **면책 문구** (당뇨 모드에서 항상 노출, `reco.disclaimer` 키):
  > "※ 일반 정보 제공용이며 의료 자문이 아닙니다. 혈당 관리는 담당
  > 의료진과 상의하세요. 알레르기·성분은 실제 제품 표기를 확인하세요."
- 아이 모드: "알레르기가 있는 경우 제외 항목을 선택하고, 성분 표기를
  확인하세요." 안내.
- 태그는 운영자 판단이며 실험실 영양 분석이 아님을 명시.

---

## 9. 변경/신규 파일 목록

**신규**
- `lib/reco/modes.ts` — 모드별 필터·가점 설정
- `lib/reco/select.ts` — 순수 선정 함수(메뉴+스낵)
- `lib/reco/explain.ts` — Claude API 호출 + 템플릿 fallback
- `lib/anthropic/env.ts` — `isAnthropicConfigured` (Supabase env 패턴 미러)
- `app/api/reco/route.ts` — POST 추천 엔드포인트
- `components/sections/RecoSection.tsx`
- `components/reco/RecoModeCard.tsx`, `components/reco/RecoResultCard.tsx`

**수정**
- `lib/types.ts` — `DietTag` 2개 추가, `RecoMode`/`RecoItem`/`RecoResult`
- `data/snacks.ts` — `Snack.dietTags` 필드 + 24종 태그 부여
- `data/menu.ts` — 해당 메뉴에 당뇨/저당 태그 부여
- `app/[locale]/page.tsx` — `<RecoSection />` 삽입
- `messages/ko.json`, `messages/en.json` — `reco` 네임스페이스
- `.env.local.example` — `ANTHROPIC_API_KEY=` 추가

---

## 10. 범위 밖 (YAGNI)

- 자유 대화형 챗봇 (이번엔 모드 버튼 방식)
- 사용자 계정 연동·추천 저장 (Supabase 있으나 미사용)
- 실제 영양 DB·혈당지수(GI) 자동 조회 (태그 수동 부여로 대체)
- 응답 스트리밍 (1차는 단순 비스트리밍)
- 이미지 생성

---

## 11. 미해결 / 리스크

- **태그 부여 정확도**: 당뇨/건강 태그는 운영자 수동 판단 → 면책으로 한계
  명시. 추후 영양 수치 필드로 고도화 가능.
- **LLM 비용/지연**: haiku + 캐싱으로 최소화. fallback이 있어 장애에 강함.
- **후보 부족**: 특정 모드에서 항목이 0~1개일 수 있음 → "조건에 맞는 항목이
  적어요" 빈 상태 UI 필요.
- **검증**: 테스트 러너 없음 → `npm run typecheck` + `npm run lint`로 확인.
  `lib/reco/select.ts`는 순수 함수라 추후 단위 테스트 추가 용이.
