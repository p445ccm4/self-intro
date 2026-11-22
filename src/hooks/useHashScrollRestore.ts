import { useEffect, useRef } from 'react';

type UseHashScrollRestoreOptions = {
  /** Hash target without leading `#`. Empty string means no restore. */
  hash: string;
  /** True once timeline layout has measured cards. */
  layoutReady: boolean;
  /** When false, skip restore (e.g. during intentional sort). */
  enabled?: boolean;
  delayMs?: number;
  /** Clear the URL hash after a successful one-shot restore. */
  onRestored: () => void;
};

/**
 * One-shot scroll restore for deep links like `/#proj-…`.
 *
 * Layout churn (cardSpacers recalculation) must not cancel the pending scroll,
 * and must not re-trigger after the hash has already been handled.
 */
export const useHashScrollRestore = ({
  hash,
  layoutReady,
  enabled = true,
  delayMs = 100,
  onRestored,
}: UseHashScrollRestoreOptions) => {
  const restoredForRef = useRef<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const onRestoredRef = useRef(onRestored);
  onRestoredRef.current = onRestored;

  // Cancel only on unmount — not on every layoutReady / hash dependency pass.
  useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!hash) {
      restoredForRef.current = null;
      return;
    }

    if (!enabled) return;
    if (restoredForRef.current === hash) return;
    if (!layoutReady) return;

    const element = document.getElementById(hash);
    if (!element) return;

    // Claim this hash before the timer so subsequent layout updates are no-ops
    // without clearing the in-flight timeout.
    restoredForRef.current = hash;

    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      onRestoredRef.current();
    }, delayMs);
  }, [hash, layoutReady, enabled, delayMs]);
};
