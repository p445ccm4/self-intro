import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  parseDateStr,
  parsePeriod,
  calculateDuration,
  isPeriodRange,
  formatShortPeriod,
} from '../timeline';

describe('parseDateStr', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('parses Month Year without relying on Date.parse', () => {
    // Safari returns NaN for Date.parse("November 2025"); our parser must not.
    const spy = vi.spyOn(Date, 'parse').mockReturnValue(Number.NaN);

    const date = parseDateStr('November 2025');
    expect(date.getFullYear()).toBe(2025);
    expect(date.getMonth()).toBe(10); // November
    expect(date.getDate()).toBe(1);

    spy.mockRestore();
  });

  it('parses abbreviated months and year-only', () => {
    expect(parseDateStr('Jan 2026').getMonth()).toBe(0);
    expect(parseDateStr('2024').getFullYear()).toBe(2024);
    expect(parseDateStr('2024').getMonth()).toBe(0);
  });

  it('resolves now/present to current time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 21));
    expect(parseDateStr('Now').getFullYear()).toBe(2026);
    expect(parseDateStr('Present').getMonth()).toBe(10);
  });
});

describe('parsePeriod', () => {
  it('splits hyphen, en-dash, and em-dash ranges', () => {
    const hyphen = parsePeriod('January 2026 - Now');
    const en = parsePeriod('November 2025 – Now');
    const em = parsePeriod('November 2025 — Now');

    expect(hyphen.start.getFullYear()).toBe(2026);
    expect(hyphen.end).toBe('Present');
    expect(en.start.getMonth()).toBe(10);
    expect(en.end).toBe('Present');
    expect(em.start.getFullYear()).toBe(2025);
    expect(em.end).toBe('Present');
  });

  it('parses closed ranges', () => {
    const { start, end } = parsePeriod('October 2024 – October 2025');
    expect(start.getFullYear()).toBe(2024);
    expect(end).toBeInstanceOf(Date);
    expect((end as Date).getFullYear()).toBe(2025);
  });
});

describe('calculateDuration', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not report epoch-based durations for Month Year starts', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 21)); // Nov 21, 2026

    // Regression: Safari NaN → new Date(0) produced "56 yrs 10 mos"
    expect(calculateDuration(parseDateStr('November 2025'), 'Present')).toBe('1 yr');
    expect(calculateDuration(parseDateStr('January 2026'), 'Present')).toBe('10 mos');
  });
});

describe('isPeriodRange', () => {
  it('detects all dash types', () => {
    expect(isPeriodRange('January 2026 - Now')).toBe(true);
    expect(isPeriodRange('November 2025 – Now')).toBe(true);
    expect(isPeriodRange('November 2025 — Now')).toBe(true);
    expect(isPeriodRange('March 2025')).toBe(false);
  });
});

describe('formatShortPeriod', () => {
  it('abbreviates full month names in ranges and single dates', () => {
    expect(formatShortPeriod('November 2025 – September 2026')).toBe('Nov 2025 – Sep 2026');
    expect(formatShortPeriod('January 2026 - Now')).toBe('Jan 2026 - Now');
    expect(formatShortPeriod('March 2025')).toBe('Mar 2025');
  });
});
