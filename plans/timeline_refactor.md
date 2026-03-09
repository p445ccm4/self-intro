# Timeline Refactoring Plan

## Objective
Refactor the `Timeline` component and related utilities to improve maintainability, performance, and code organization. The current implementation is a large monolithic component with mixed concerns (data transformation, rendering, styling).

## Goals
1.  **Separation of Concerns**: Move data logic to hooks, styling to a theme utility, and sub-components to their own files.
2.  **Single Source of Truth**: Move hardcoded milestones from `Timeline.tsx` to `src/data/portfolio.ts`.
3.  **Reusability**: Create reusable components for Cards, Milestones, and Filters.
4.  **Maintainability**: Make it easier to add new categories or change styles.

## Steps

### 1. Data Migration
- [*] Update `src/types.ts` (if exists) or `src/data/portfolio.ts` to include a `milestones` section.
- [*] Move hardcoded milestones from `src/components/Timeline.tsx` to `src/data/portfolio.ts`.

### 2. Utility Refactoring
- [*] Create `src/utils/timeline-theme.tsx`:
    - Define color maps for categories (text, bg, border, gradients).
    - Define icon mapping helper.
    - Define layout constants (spine width, gaps).

### 3. Hook Creation
- [*] Create `src/hooks/useTimelineData.ts`:
    - Accept `filter` state.
    - Handle data fetching (importing from `portfolio.ts`).
    - Perform data transformation (parsing dates, calculating durations).
    - Handle lane assignment (`assignLanes`).
    - Handle sorting and filtering.
    - Return `items`, `minDate`, `maxDate`, `laneCount`, `totalHeight`.

### 4. Component Extraction
- [*] Create `src/components/TimelineCard.tsx`:
    - Props: `item`, `isLeftTrack`, `onClick`.
    - Render the content card with hover effects.
- [*] Create `src/components/TimelineMilestone.tsx`:
    - Props: `item`.
    - Render the centered milestone badge.
- [*] Create `src/components/TimelineFilters.tsx`:
    - Props: `currentFilter`, `onFilterChange`.
    - Render the filter buttons.

### 5. Main Component Refactor
- [*] Refactor `src/components/Timeline.tsx`:
    - Use `useTimelineData`.
    - Use `TimelineFilters`.
    - Use `TimelineSpine` (existing, maybe minor updates).
    - Use `TimelineCard` and `TimelineMilestone`.
    - Keep the connector path logic (or move to a separate hook `useTimelineConnectors` if complex).

## File Structure Changes
```
src/
  components/
    Timeline.tsx (Refactored)
    TimelineCard.tsx (New)
    TimelineMilestone.tsx (New)
    TimelineFilters.tsx (New)
    TimelineSpine.tsx (Existing)
  data/
    portfolio.ts (Updated)
  hooks/
    useTimelineData.ts (New)
  utils/
    timeline.ts (Existing logic helpers)
    timeline-theme.tsx (New style helpers)
```
