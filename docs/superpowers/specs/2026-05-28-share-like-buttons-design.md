# Share & Like Buttons — Design

**Date:** 2026-05-28
**Scope:** Seoul Bunsik website (`/1일차` Next.js project)
**Status:** Approved — ready for implementation plan

## Problem

Visitors browsing the Seoul Bunsik menu have no way to:
1. Mark individual dishes (or the restaurant itself) as favorites for personal recall.
2. Share a specific dish or the restaurant page with friends.

Adding lightweight share and like buttons to each menu row and to the brand hero closes both gaps without requiring backend changes.

## Goals & Non-Goals

**Goals**
- Per-device "like" state for each of the 25 menu items and for the restaurant brand.
- Smart share action: native OS share sheet on mobile, link-copy + toast on desktop.
- Match existing visual language (dahong accent, semantic Tailwind tokens, hover affordance).
- Zero backend dependency. Works whether Supabase is configured or not.

**Non-Goals (YAGNI)**
- Global like counts visible to everyone.
- Cross-device sync (account-based likes).
- Cross-tab sync of like state within the same browser.
- A "my favorites" page.
- Platform-specific share buttons (KakaoTalk, X, Facebook, etc.).
- Comments or reviews on menu items.

## Design

### Component Architecture

Four new files plus two edits to existing sections. Each unit has one purpose; the wrapper composes them.

```
lib/hooks/useLike.ts                  (state)
components/menu/LikeButton.tsx        (UI for like)
components/menu/ShareButton.tsx       (UI + action for share)
components/menu/ShareLikeActions.tsx  (wrapper — positions both)
components/menu/MenuRow.tsx           (edit — embed wrapper)
components/sections/MenuShowcase.tsx  (edit — embed wrapper in hero)
```

### `useLike(targetId)` — hook

**Purpose:** Encapsulate localStorage-backed like state for one target.

**Signature**
```ts
function useLike(targetId: string): {
  liked: boolean;
  toggle: () => void;
}
```

**Behavior**
- On mount, read `localStorage['sb:likes']` (JSON array of strings). Parse failures or quota errors → fall back to empty set.
- `liked` is derived from set membership.
- `toggle()` updates an in-component state, then writes the new array back to localStorage. If localStorage throws (private mode, quota), the in-memory state still updates and a single `console.warn` is logged per session.
- SSR-safe: initial state is `false` on the server; localStorage is only touched inside `useEffect`.

**Storage key:** `sb:likes` (singular namespace prefix consistent with future hooks).

**Shape:** `string[]` (not `Set<string>` — JSON-friendly, small).

### `LikeButton` — component

**Props**
```ts
{
  targetId: string;
  variant?: 'default' | 'inverse';  // dark-on-light vs light-on-dark
  ariaLabel?: string;                // overrideable for screen readers
}
```

**Behavior**
- Calls `useLike(targetId)`.
- Heart icon (lucide `Heart`). When `liked`: filled with `dahong`. When not: outlined with current text color.
- aria-pressed reflects liked state; aria-label uses the appropriate i18n key (`menu.actions.like` / `menu.actions.liked`).
- Click handler: `e.stopPropagation()` to prevent bubbling into any parent click handler, then `toggle()`.

### `ShareButton` — component

**Props**
```ts
{
  title: string;        // primary share title (e.g., menu item name)
  text?: string;        // optional body text
  url: string;          // absolute URL
  variant?: 'default' | 'inverse';
  ariaLabel?: string;
}
```

**Behavior on click**
1. If `navigator.share` exists: call it with `{ title, text, url }`.
   - Resolve → no toast (the OS sheet is feedback enough).
   - Reject with `AbortError` (user cancelled) → silent.
   - Other reject → fall through to step 2.
2. Else: `navigator.clipboard.writeText(url)`.
   - Resolve → toast `menu.actions.copied` (success variant).
   - Reject → toast `menu.actions.copyFailed` (destructive variant).
3. Click handler stops propagation (same as LikeButton).

**Icon:** lucide `Share2`.

### `ShareLikeActions` — wrapper

**Props**
```ts
{
  targetId: string;
  shareTitle: string;
  shareText?: string;
  shareUrl: string;
  variant?: 'default' | 'inverse';
}
```

**Layout**
- Absolute-positioned in a 1×2 horizontal cluster at `top-2 right-2` (default) or `top-4 right-4` (inverse / hero).
- Container sets `opacity-60` and transitions to `opacity-100` on parent hover/focus-within (`group-hover:opacity-100`).
- On mobile (where hover is absent) the container is always `opacity-100`. Implemented via `md:opacity-60 md:group-hover:opacity-100` — small screens skip the dim state.

Mountee responsibilities:
- `MenuRow`: add `group relative` to the row root and `id={\`menu-${item.slug}\`}` for anchor scrolling. ShareLikeActions receives `shareUrl = \`${origin}/${locale}#menu-${slug}\``.
- `MenuShowcase` hero: existing hero `div` already has `relative`. Add `ShareLikeActions` with `variant="inverse"`, `targetId="brand"`, `shareUrl = \`${origin}/${locale}\``.

URL construction happens client-side (`window.location.origin` + current locale + slug anchor) inside ShareLikeActions to keep callers simple. Read locale via `useLocale()` from next-intl.

### Data Flow

```
mount
  useLike(id) ──┐
                ├──> liked: boolean
LocalStorage ──┘

click LikeButton
  toggle() ──> setState ──> useEffect ──> localStorage.setItem

click ShareButton
  navigator.share ──> OS sheet (silent on success)
        ↓ unavailable / non-AbortError
  navigator.clipboard.writeText ──> toast (success | failure)
```

### Error Handling

| Failure | Handling |
|---|---|
| `localStorage` blocked (private mode) | In-memory state only; `console.warn` once per session. |
| `localStorage` parse error | Treat as empty set. Overwrite on next toggle. |
| `navigator.share` rejects with `AbortError` | Silent — user cancelled. |
| `navigator.share` rejects with anything else | Fall through to clipboard path. |
| `clipboard.writeText` rejects | Destructive toast `menu.actions.copyFailed`. |
| `navigator.clipboard` undefined | Destructive toast (no legacy `execCommand` fallback — accepted limitation). |

### i18n keys (added to `messages/ko.json` and `messages/en.json` under `menu`)

```
"actions": {
  "share": "공유"  / "Share",
  "like": "좋아요" / "Like",
  "liked": "좋아요 취소" / "Unlike",
  "copied": "링크가 복사됐어요" / "Link copied",
  "copyFailed": "복사 실패" / "Copy failed"
}
```

### Accessibility

- Both buttons are real `<button>` elements with discernible text via aria-label.
- LikeButton uses `aria-pressed`.
- Toasts use existing `useToast` infrastructure (`components/ui/toaster.tsx`) — already screen-reader-announced.
- Focus rings inherit from project's `:focus-visible` defaults.

### Visual Style

- Icon size: `h-3.5 w-3.5` inside a `28×28` circular button.
- Default variant: `bg-black/5 text-fg` → `hover:bg-dahong/10 hover:text-dahong`. Liked: `bg-dahong/15 text-dahong`.
- Inverse variant: `bg-misek/15 text-misek` → `hover:bg-misek/30`. Liked: `bg-dahong/40 text-misek` (heart still fills).
- Cluster gap: `gap-1` (4px).

## Out-of-Scope Follow-ups (potential future work)

- Promote per-device likes to per-user likes if/when Supabase auth becomes mandatory.
- Aggregate like counts on a server function for "popular this week" badge.
- A `/{locale}/favorites` page that reads the same localStorage key for review.

## Verification

Project has no test runner. Verification steps for the implementation phase:
1. `npm run typecheck` clean.
2. `npm run lint` clean.
3. Manual: load `/ko`, like an item, refresh — state persists. Share on Chrome desktop → link copied + toast. Share on Chrome Android → OS share sheet appears.
4. Verify hero brand share + like buttons render in both `/ko` and `/en` with correct copy.
