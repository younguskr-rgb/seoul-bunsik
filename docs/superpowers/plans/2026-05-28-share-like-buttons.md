# Share & Like Buttons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add per-device "like" (localStorage) and smart-share buttons to each menu row and the brand hero on the Seoul Bunsik site, matching the approved spec at `docs/superpowers/specs/2026-05-28-share-like-buttons-design.md`.

**Architecture:** Four new client-side units (`useLike` hook, `LikeButton`, `ShareButton`, `ShareLikeActions` wrapper) plus surgical edits to `MenuRow` and the `MenuShowcase` hero. Zero backend. localStorage with in-memory fallback; Web Share API with clipboard fallback.

**Tech Stack:** Next.js 15 App Router · React 18 · TypeScript (strict) · next-intl · Tailwind · lucide-react · existing `toast()` from `components/ui/toaster.tsx`.

**Testing reality:** This project has no test runner (per `CLAUDE.md`). Verification per task = `npm run typecheck` + visual smoke at `http://localhost:3000/ko` and `/en`. Each task ends with a commit.

---

### Task 1: Add i18n keys for actions

**Files:**
- Modify: `messages/ko.json` (`menu` namespace)
- Modify: `messages/en.json` (`menu` namespace)

- [ ] **Step 1: Add Korean keys**

Open `messages/ko.json`. Inside the `"menu": { ... }` object, add an `"actions"` block right after `"footerStripe"` (before `"filter"`):

```json
    "actions": {
      "share": "공유",
      "like": "좋아요",
      "liked": "좋아요 취소",
      "copied": "링크가 복사됐어요",
      "copyFailed": "복사 실패"
    },
```

- [ ] **Step 2: Add English keys**

Open `messages/en.json`. Inside the `"menu": { ... }` object, add the matching `"actions"` block at the same position:

```json
    "actions": {
      "share": "Share",
      "like": "Like",
      "liked": "Unlike",
      "copied": "Link copied",
      "copyFailed": "Copy failed"
    },
```

- [ ] **Step 3: Verify JSON is valid**

Run: `cd "C:\Users\cfman\OneDrive\바탕 화면\클로드코드\1일차" && node -e "JSON.parse(require('fs').readFileSync('messages/ko.json','utf8')); JSON.parse(require('fs').readFileSync('messages/en.json','utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 4: Commit**

```bash
"C:\Users\cfman\MinGit\cmd\git.exe" add messages/ko.json messages/en.json
"C:\Users\cfman\MinGit\cmd\git.exe" commit -m "i18n: add share/like action labels"
```

---

### Task 2: `useLike` hook

**Files:**
- Create: `lib/hooks/useLike.ts`

- [ ] **Step 1: Create the hook file**

Write `lib/hooks/useLike.ts`:

```ts
'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'sb:likes';
let warned = false;

function readSet(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr.filter((x) => typeof x === 'string')) : new Set();
  } catch {
    return new Set();
  }
}

function writeSet(set: Set<string>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    if (!warned) {
      // eslint-disable-next-line no-console
      console.warn('[useLike] localStorage unavailable — likes will not persist across reloads.');
      warned = true;
    }
  }
}

export function useLike(targetId: string): { liked: boolean; toggle: () => void } {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    setLiked(readSet().has(targetId));
  }, [targetId]);

  const toggle = useCallback(() => {
    const set = readSet();
    if (set.has(targetId)) set.delete(targetId);
    else set.add(targetId);
    writeSet(set);
    setLiked(set.has(targetId));
  }, [targetId]);

  return { liked, toggle };
}
```

- [ ] **Step 2: Typecheck**

Run: `cd "C:\Users\cfman\OneDrive\바탕 화면\클로드코드\1일차" && npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
"C:\Users\cfman\MinGit\cmd\git.exe" add lib/hooks/useLike.ts
"C:\Users\cfman\MinGit\cmd\git.exe" commit -m "feat: add useLike hook (localStorage-backed)"
```

---

### Task 3: `LikeButton` component

**Files:**
- Create: `components/menu/LikeButton.tsx`

- [ ] **Step 1: Create the component**

Write `components/menu/LikeButton.tsx`:

```tsx
'use client';

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useLike } from '@/lib/hooks/useLike';

export function LikeButton({
  targetId,
  variant = 'default',
  ariaLabel
}: {
  targetId: string;
  variant?: 'default' | 'inverse';
  ariaLabel?: string;
}) {
  const t = useTranslations('menu.actions');
  const { liked, toggle } = useLike(targetId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggle();
  };

  const label = ariaLabel ?? (liked ? t('liked') : t('like'));

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors',
        variant === 'default'
          ? liked
            ? 'bg-dahong/15 text-dahong'
            : 'bg-black/5 text-fg hover:bg-dahong/10 hover:text-dahong'
          : liked
            ? 'bg-dahong/40 text-misek'
            : 'bg-misek/15 text-misek hover:bg-misek/30'
      )}
    >
      <Heart
        className={cn('h-3.5 w-3.5', liked && 'fill-current')}
        aria-hidden
      />
    </button>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd "C:\Users\cfman\OneDrive\바탕 화면\클로드코드\1일차" && npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
"C:\Users\cfman\MinGit\cmd\git.exe" add components/menu/LikeButton.tsx
"C:\Users\cfman\MinGit\cmd\git.exe" commit -m "feat: add LikeButton (heart toggle, dahong fill on like)"
```

---

### Task 4: `ShareButton` component

**Files:**
- Create: `components/menu/ShareButton.tsx`

- [ ] **Step 1: Create the component**

Write `components/menu/ShareButton.tsx`:

```tsx
'use client';

import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export function ShareButton({
  title,
  text,
  url,
  variant = 'default',
  ariaLabel
}: {
  title: string;
  text?: string;
  url: string;
  variant?: 'default' | 'inverse';
  ariaLabel?: string;
}) {
  const t = useTranslations('menu.actions');

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        toast(t('copied'), 'success');
        return;
      } catch {
        toast(t('copyFailed'), 'error');
        return;
      }
    }

    toast(t('copyFailed'), 'error');
  };

  const label = ariaLabel ?? t('share');

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors',
        variant === 'default'
          ? 'bg-black/5 text-fg hover:bg-dahong/10 hover:text-dahong'
          : 'bg-misek/15 text-misek hover:bg-misek/30'
      )}
    >
      <Share2 className="h-3.5 w-3.5" aria-hidden />
    </button>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd "C:\Users\cfman\OneDrive\바탕 화면\클로드코드\1일차" && npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
"C:\Users\cfman\MinGit\cmd\git.exe" add components/menu/ShareButton.tsx
"C:\Users\cfman\MinGit\cmd\git.exe" commit -m "feat: add ShareButton (Web Share + clipboard fallback)"
```

---

### Task 5: `ShareLikeActions` wrapper

**Files:**
- Create: `components/menu/ShareLikeActions.tsx`

- [ ] **Step 1: Create the wrapper**

Write `components/menu/ShareLikeActions.tsx`:

```tsx
'use client';

import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import { LikeButton } from './LikeButton';
import { ShareButton } from './ShareButton';
import { cn } from '@/lib/utils';

export function ShareLikeActions({
  targetId,
  shareTitle,
  shareText,
  anchor,
  variant = 'default',
  position = 'corner'
}: {
  targetId: string;
  shareTitle: string;
  shareText?: string;
  /** If set, share URL is `${origin}/${locale}#${anchor}`. If undefined, just `${origin}/${locale}`. */
  anchor?: string;
  variant?: 'default' | 'inverse';
  /** `corner` = absolute top-2 right-2 (rows). `hero` = absolute top-4 right-4 (hero). */
  position?: 'corner' | 'hero';
}) {
  const locale = useLocale();

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const base = `${window.location.origin}/${locale}`;
    return anchor ? `${base}#${anchor}` : base;
  }, [locale, anchor]);

  return (
    <div
      className={cn(
        'absolute z-10 flex gap-1 opacity-100 transition-opacity md:opacity-60 md:group-hover:opacity-100 md:group-focus-within:opacity-100',
        position === 'corner' ? 'right-2 top-2' : 'right-4 top-4'
      )}
    >
      <ShareButton title={shareTitle} text={shareText} url={shareUrl} variant={variant} />
      <LikeButton targetId={targetId} variant={variant} />
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd "C:\Users\cfman\OneDrive\바탕 화면\클로드코드\1일차" && npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
"C:\Users\cfman\MinGit\cmd\git.exe" add components/menu/ShareLikeActions.tsx
"C:\Users\cfman\MinGit\cmd\git.exe" commit -m "feat: add ShareLikeActions wrapper (corner placement)"
```

---

### Task 6: Integrate into `MenuRow`

**Files:**
- Modify: `components/menu/MenuRow.tsx`

The current root is a `<div className="group grid grid-cols-[56px_1fr_auto] gap-3.5 rounded-xl p-3 transition-colors hover:bg-muted/40">`. It needs `relative` and an anchor `id`, plus the actions wrapper at the top-right. Padding on the right grows slightly so the price never collides with the buttons.

- [ ] **Step 1: Add import for ShareLikeActions**

Open `components/menu/MenuRow.tsx`. After the existing imports, add:

```tsx
import { ShareLikeActions } from './ShareLikeActions';
```

- [ ] **Step 2: Update the root element**

Replace the opening tag:

```tsx
    <div className="group grid grid-cols-[56px_1fr_auto] gap-3.5 rounded-xl p-3 transition-colors hover:bg-muted/40">
```

With:

```tsx
    <div
      id={`menu-${item.slug}`}
      className="group relative grid grid-cols-[56px_1fr_auto] gap-3.5 rounded-xl p-3 pr-16 transition-colors hover:bg-muted/40"
    >
      <ShareLikeActions
        targetId={`menu-${item.slug}`}
        shareTitle={item.name[locale]}
        shareText={item.shortDesc[locale]}
        anchor={`menu-${item.slug}`}
      />
```

Leave the rest of the file as-is.

- [ ] **Step 3: Typecheck**

Run: `cd "C:\Users\cfman\OneDrive\바탕 화면\클로드코드\1일차" && npm run typecheck`
Expected: no errors.

- [ ] **Step 4: Visual smoke**

If dev server is not running: `npm run dev`.
Open http://localhost:3000/ko. Each menu row should show two faint circular buttons at the top-right that go fully opaque on hover. Clicking the heart toggles the filled dahong color and the state persists across reload.

- [ ] **Step 5: Commit**

```bash
"C:\Users\cfman\MinGit\cmd\git.exe" add components/menu/MenuRow.tsx
"C:\Users\cfman\MinGit\cmd\git.exe" commit -m "feat: embed share/like actions in each MenuRow"
```

---

### Task 7: Integrate into `MenuShowcase` hero

**Files:**
- Modify: `components/sections/MenuShowcase.tsx`

The hero `<div>` already has `relative overflow-hidden`. Add the actions wrapper inside it. `overflow-hidden` won't clip the buttons because they sit inside the hero's visible area.

- [ ] **Step 1: Add import**

Open `components/sections/MenuShowcase.tsx`. After the existing component imports, add:

```tsx
import { ShareLikeActions } from '@/components/menu/ShareLikeActions';
```

Note: the hero `<div>` does not have a `group` class; add it so the actions can use `md:group-hover:opacity-100` consistently with the rows.

- [ ] **Step 2: Add `group` to the hero root and embed actions**

Find this line:

```tsx
        <div
          className="relative mb-7 overflow-hidden rounded-[20px] px-10 py-14 text-misek"
```

Change `className` to add `group`:

```tsx
        <div
          className="group relative mb-7 overflow-hidden rounded-[20px] px-10 py-14 text-misek"
```

Then, immediately after the opening `<div ...>` tag of the hero (before the decorative `<span aria-hidden ...>`), add:

```tsx
          <ShareLikeActions
            targetId="brand"
            shareTitle={t('hero.brand')}
            shareText={t('hero.lead')}
            variant="inverse"
            position="hero"
          />
```

- [ ] **Step 3: Typecheck**

Run: `cd "C:\Users\cfman\OneDrive\바탕 화면\클로드코드\1일차" && npm run typecheck`
Expected: no errors.

- [ ] **Step 4: Visual smoke**

Reload http://localhost:3000/ko. The dark red hero now shows the share + like buttons in its top-right corner with cream-colored icons. Clicking share on desktop should toast "링크가 복사됐어요" and copy the URL to the clipboard. Clicking like should toggle the heart fill.

- [ ] **Step 5: Commit**

```bash
"C:\Users\cfman\MinGit\cmd\git.exe" add components/sections/MenuShowcase.tsx
"C:\Users\cfman\MinGit\cmd\git.exe" commit -m "feat: embed share/like actions in MenuShowcase hero"
```

---

### Task 8: Final verification

- [ ] **Step 1: Typecheck**

Run: `cd "C:\Users\cfman\OneDrive\바탕 화면\클로드코드\1일차" && npm run typecheck`
Expected: no errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: `✔ No ESLint warnings or errors`.

- [ ] **Step 3: Smoke checklist (manual)**

Open http://localhost:3000/ko and verify:
- [ ] Each of the 25 menu rows shows two small circular buttons in the top-right.
- [ ] Buttons are visible (semi-transparent) without hover on mobile widths; fade in on hover at md+ widths.
- [ ] Clicking the heart on row "불고기만두" fills it with dahong. Reload — still filled.
- [ ] Clicking the heart again unfills. Reload — still unfilled.
- [ ] Clicking the share icon on a row triggers either the OS share sheet (mobile) or shows a success toast with "링크가 복사됐어요" (desktop). The clipboard then contains `http://localhost:3000/ko#menu-bulgogi-mandu`.
- [ ] Hero shows the same two buttons in its top-right corner with cream icons. Liked state persists. Share URL is `http://localhost:3000/ko`.
- [ ] Switch to `/en` — labels become "Share" / "Like" / "Link copied". Heart fill state is preserved across locales (same localStorage key).

- [ ] **Step 4: Verify no lingering uncommitted changes**

Run: `"C:\Users\cfman\MinGit\cmd\git.exe" status --short`
Expected: empty (or only unrelated files).

---

## Notes for the implementing engineer

- **Stop propagation on button clicks.** Both LikeButton and ShareButton call `e.stopPropagation()` to prevent any future row-level click handler (e.g., opening a detail modal) from firing. Preserve this.
- **`useLike` is per-component state.** If two `useLike('menu-bulgogi')` exist on the same page, toggling one will not update the other until next mount/click. Acceptable because each menu row renders one instance.
- **`group` class.** Both the row and hero must have `group` on the parent for `md:group-hover:opacity-100` to work on the actions wrapper. Tailwind's `group-focus-within:` is also covered for keyboard users.
- **`useLocale()` vs raw URL.** The wrapper builds `${origin}/${locale}` — do not introduce a hardcoded `/ko`. next-intl is the source of truth.
- **Hero share URL.** The brand share has no anchor — it should land on the page top. If you add an anchor like `#top`, the browser will scroll, which is not what we want.
- **Korean spec language.** All commit messages stay in conventional-commit English style consistent with existing history (`feat:`, `i18n:`, `docs:`, `refactor:`).
