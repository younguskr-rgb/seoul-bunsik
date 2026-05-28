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
