# Refactor Plan: Timeline & Project Pages

## Objective
Simplify the landing page by moving technical project details to separate pages and refactoring the timeline to focus on projects.

## 1. Dependencies
- Install `react-router-dom` for client-side routing.

## 2. Data Structure Updates (`src/data/portfolio.ts`)
- Modify `projects` array:
    - Add unique `id` (string or number).
    - Add `role` (Job Title) to each project.
    - Ensure `company` is present (already is).
    - Ensure `description` is a short summary.
    - `details` will be used for the detailed project page.

## 3. Component Architecture

### 3.1 New Pages
- **`src/pages/Home.tsx`**:
    - Contains: `Hero`, `Timeline` (Refactored), `Skills`, `Education`.
    - Removes: Standalone `Projects` grid.
- **`src/pages/ProjectPage.tsx`**:
    - Dynamic route: `/project/:id`.
    - Displays:
        - Project Title (Header)
        - Role & Company (Sub-header)
        - Tech Stack (Tags)
        - Detailed Description (`details` array)
        - Demo Video / Images (Placeholder for now)
        - Back button to Home.

### 3.2 Refactored `Timeline.tsx`
- **Data Source**: Switch from `experience` to `projects`.
- **Layout**:
    - Vertical timeline.
    - Items are smaller by default.
- **Interaction**:
    - **Center Focus**: Use `framer-motion` (likely `useScroll` and `useTransform` or `WhileInView` with specific viewports) to scale up the item currently in the center of the viewport.
    - **Click**: Clicking a timeline card navigates to `/project/:id`.
- **Card Content**:
    - **Header**: Project Title.
    - **Sub-header**: Role | Company.
    - **Date**: Year.
    - **Description**: Short, One-line description.
    - **Tech**: Tech Stacks/Tags/Fields

### 3.3 App Routing (`src/App.tsx`)
- Wrap application in `BrowserRouter`.
- Define Routes:
    - `/` -> `Home`
    - `/project/:id` -> `ProjectPage`

## 4. Implementation Steps
1.  **Install**: `npm install react-router-dom`
2.  **Data**: Update `portfolio.ts` with IDs and Roles.
3.  **Pages**: Create `src/pages/Home.tsx` and `src/pages/ProjectPage.tsx`.
4.  **Routing**: Update `src/App.tsx`.
5.  **Timeline**: Rewrite `Timeline.tsx` to implement the new design and logic.
6.  **Cleanup**: Remove unused components (old `Projects` grid if no longer needed).
