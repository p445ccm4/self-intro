import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useHashScrollRestore } from '../useHashScrollRestore';

describe('useHashScrollRestore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mountTarget = (id: string) => {
    const el = document.createElement('div');
    el.id = id;
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);
    return el;
  };

  it('waits until layout is ready before scrolling', () => {
    const target = mountTarget('proj-ask-ask-something');
    const onRestored = vi.fn();

    const { rerender } = renderHook(
      (props: { layoutReady: boolean }) =>
        useHashScrollRestore({
          hash: 'proj-ask-ask-something',
          layoutReady: props.layoutReady,
          onRestored,
        }),
      { initialProps: { layoutReady: false } }
    );

    vi.advanceTimersByTime(200);
    expect(target.scrollIntoView).not.toHaveBeenCalled();
    expect(onRestored).not.toHaveBeenCalled();

    rerender({ layoutReady: true });
    vi.advanceTimersByTime(100);

    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(onRestored).toHaveBeenCalledTimes(1);
  });

  it('survives repeated effect re-entry before the delay fires (sticky-scroll regression)', () => {
    const target = mountTarget('proj-ask-ask-something');
    const onRestored = vi.fn();

    // Force effect re-entry the way a changing cardSpacers Map used to, by
    // toggling an unused-but-stable layoutReady signal via remounting deps:
    // delayMs changes would cancel old timers; we instead re-render with the
    // same ready flag while the claimed-hash guard keeps a single timer.
    const { rerender } = renderHook(
      (props: { layoutReady: boolean }) =>
        useHashScrollRestore({
          hash: 'proj-ask-ask-something',
          layoutReady: props.layoutReady,
          onRestored,
        }),
      { initialProps: { layoutReady: true } }
    );

    // Flip ready false→true repeatedly (layout thrash) without clearing claim incorrectly.
    rerender({ layoutReady: false });
    rerender({ layoutReady: true });
    rerender({ layoutReady: false });
    rerender({ layoutReady: true });

    vi.advanceTimersByTime(100);

    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(onRestored).toHaveBeenCalledTimes(1);

    // Same hash + further ready churn must not re-scroll.
    rerender({ layoutReady: false });
    rerender({ layoutReady: true });
    vi.advanceTimersByTime(200);
    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('can restore again after hash is cleared then set to a new target', () => {
    const first = mountTarget('proj-one');
    const second = mountTarget('proj-two');
    const onRestored = vi.fn();

    const { rerender } = renderHook(
      (props: { hash: string; layoutReady: boolean }) =>
        useHashScrollRestore({
          hash: props.hash,
          layoutReady: props.layoutReady,
          onRestored,
        }),
      { initialProps: { hash: 'proj-one', layoutReady: true } }
    );

    vi.advanceTimersByTime(100);
    expect(first.scrollIntoView).toHaveBeenCalledTimes(1);

    rerender({ hash: '', layoutReady: true });
    rerender({ hash: 'proj-two', layoutReady: true });
    vi.advanceTimersByTime(100);

    expect(second.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(onRestored).toHaveBeenCalledTimes(2);
  });

  it('skips restore while disabled (e.g. sort toggle)', () => {
    const target = mountTarget('proj-ask-ask-something');
    const onRestored = vi.fn();

    renderHook(() =>
      useHashScrollRestore({
        hash: 'proj-ask-ask-something',
        layoutReady: true,
        enabled: false,
        onRestored,
      })
    );

    vi.advanceTimersByTime(200);
    expect(target.scrollIntoView).not.toHaveBeenCalled();
    expect(onRestored).not.toHaveBeenCalled();
  });
});
