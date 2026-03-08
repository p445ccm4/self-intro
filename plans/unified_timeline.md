# Unified Filterable Timeline Plan

## Objective
Merge `projects`, `experience`, and `education` from `portfolio.ts` into a single chronological stream with filtering capabilities.

## Data Normalization

We need a unified interface `TimelineItem` to handle different data sources.

```typescript
type Category = 'work' | 'project' | 'education';

interface TimelineItem {
  id: string | number;
  category: Category;
  title: string;       // Project Title / Job Role / Degree
  subtitle: string;    // Company / School
  date: string;        // Original date string for display (e.g., "Nov 2025", "2026")
  sortDate: number;    // Timestamp for sorting
  description?: string | string[];
  tags?: string[];     // Tech stack / Skills
  link?: string;       // Project link (if any)
}
```

### Date Parsing Strategy
We need a helper function `parseDate(dateStr: string): number` to convert various formats into a timestamp.
- "Now" -> Current timestamp
- "November 2025" -> Date.parse("November 1, 2025")
- "2026" -> Date.parse("January 1, 2026")
- "Sept 2021 - Nov 2023" -> Parse the *start* date ("Sept 2021") for sorting? Or end date? Usually timelines are sorted by start date or end date. Let's sort by **Start Date** descending (newest first).
    - Actually, for a "history" timeline, usually it's newest at the top.
    - If it's a range "Sept 2021 - Nov 2023", we should probably use the *end* date for sorting if we want to show "what I did most recently".
    - Let's use **Start Date** for sorting to keep it chronological in terms of "when it happened".
    - Wait, if I have a job from 2024-Now, and a project in 2025. The job started in 2024. The project is 2025.
    - If I sort by start date: Job (2024), Project (2025).
    - If I sort descending: Project (2025), Job (2024).
    - Let's stick to **Start Date Descending** (Newest things first).
    - "2026" -> 2026-01-01
    - "November 2025" -> 2025-11-01
    - "Sept 2021 - Nov 2023" -> 2021-09-01 (Start date)

    *Correction*: For a timeline, usually we want to see the most recent *activity*.
    - Job: Nov 2025 - Now. (Active)
    - Project: 2026. (Future/Active)
    - Project: 2025.
    - Job: Oct 2024 - Oct 2025.
    - If I sort by start date:
        1. Project 2026
        2. Job Nov 2025
        3. Project 2025
        4. Job Oct 2024
    - This looks correct.

## Component Structure (`src/components/Timeline.tsx`)

1.  **State**:
    - `filter`: `Category | 'all'` (default 'all')
    - `items`: `TimelineItem[]` (memoized and sorted)

2.  **Layout**:
    - **Container**: `relative max-w-6xl mx-auto`
    - **Central Line**:
        - Desktop: `absolute left-1/2 -translate-x-1/2`
        - Mobile: `absolute left-8` (to allow space for dots)
    - **Items**:
        - Map through sorted items.
        - Use `framer-motion` `AnimatePresence` and `layout` for smooth filtering.
        - **Desktop**:
            - Even index: Content Left, Date Right.
            - Odd index: Content Right, Date Left.
        - **Mobile**:
            - All Content Right of the line.
            - Date can be above the card or small next to it.

3.  **Item Card Design**:
    - **Icon**: Based on category (Briefcase, Code, GraduationCap).
    - **Content**:
        - Title (Bold)
        - Subtitle (Blue/Gray)
        - Date (Text)
        - Description (Truncated or full?) -> Full for now, or expandable.
        - Tags (Pills)

## New Data to Add
1.  **Project**: Renovation Simulation
    - Year: 2025 (inferred from Oodles tenure Oct 2024 - Oct 2025)
    - Company: Oodles Systems
    - Tech: Python, Local Hosting Open Source Models, Computer Vision, GenAI, OpenAI CLIP, Object Segmentation, Edge Detection, Stable Diffusion.
2.  **Project**: Realtime Drawing Detection System
    - Year: 2024 (inferred from HKU tenure Oct 2023 - Sept 2024)
    - Company: HKU Sports & AI Lab
    - Tech: Python, C++, OpenCV, Numpy, Nvidia Jetson, TensorRT, Object Detection.
3.  **Project**: Internal GenAI Platform Features
    - Year: 2025
    - Company: Hong Kong Telecom
    - Tech: React.js, Nest.js, Java Spring Boot, CI/CD, AWS, K8S.

## Implementation Steps
1.  Modify `src/data/portfolio.ts` to add new projects.
2.  Rewrite `src/components/Timeline.tsx`.
