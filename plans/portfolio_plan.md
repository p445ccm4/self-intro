# Portfolio Website Implementation Plan

## 1. Overview
Build a personal portfolio website to introduce "Chan Chun Ming, Michael". The core feature is a vertical, animated timeline for work experiences. The site will be built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 2. Tech Stack
-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS (for rapid, responsive styling)
-   **Animations**: Framer Motion (for scroll-triggered timeline animations)
-   **Icons**: Lucide React (clean, modern icons)

## 3. Architecture & Components

### 3.1 Directory Structure
```
src/
├── assets/          # Images, SVGs
├── components/      # Reusable components
│   ├── Layout.tsx   # Main page wrapper
│   ├── Hero.tsx     # Introduction section
│   ├── Timeline.tsx # Vertical experience timeline
│   ├── Projects.tsx # Projects grid (video placeholders)
│   ├── Skills.tsx   # Skills & Tech stack
│   └── Education.tsx # Education section
├── data/            # Content data
│   └── portfolio.ts # Structured data extracted from CV
├── hooks/           # Custom hooks (if needed)
└── App.tsx          # Main entry
```

### 3.2 Component Details

#### `Hero.tsx`
-   **Content**: Name, Title ("AI Agent Engineer"), Summary, Social Links (LinkedIn, GitHub, Email, Phone).
-   **Design**: Clean typography, centered or split layout.

#### `Timeline.tsx` (Core Feature)
-   **Layout**: Vertical line running down the center (or left on mobile).
-   **Items**: Work experience nodes attached to the line.
-   **Animation**: As the user scrolls, items fade in and slide in from the side using `framer-motion` (`WhileInView`).
-   **Data Source**: `employmentHistory` from `portfolio.ts`.

#### `Projects.tsx`
-   **Layout**: Grid of cards.
-   **Content**: Project Title, Role/Company, Year, Description, Tech Stack tags.
-   **Future-Proofing**: Add a placeholder area for "Demo Video" in each card.

#### `Skills.tsx`
-   **Layout**: Categorized lists (Generative AI, MLOps, Database, Web, DevOps).
-   **Design**: Badges or progress bars.

## 4. Data Structure (`src/data/portfolio.ts`)

We will extract the content from the provided CV images to populate this file.

```typescript
export const portfolioData = {
  personal: {
    name: "Chan Chun Ming, Michael",
    title: "AI Agent Engineer",
    email: "michaelchan@ymail.com",
    // ... other contact info
    summary: "AI Agent Engineer with over 3 years of experience..."
  },
  experience: [
    {
      id: 1,
      role: "Senior AI Application Developer",
      company: "Hong Kong Telecom",
      period: "November 2025 – Now",
      description: [
        "Developing and maintaining Generative AI solutions...",
        "Collaborating with cross-functional teams...",
        "Adhering to strict GitLab CI/CD workflows..."
      ]
    },
    // ... other experiences
  ],
  projects: [
    {
      title: "AI Meeting Summary App",
      company: "HKT",
      year: "2026",
      description: "A platform to generate summary and insights...",
      tech: ["Whisper", "BullMQ", "React", "Nest.js"]
    },
    // ... other projects
  ],
  education: [
    {
      degree: "Master of Science (Computer Science)",
      school: "University of Hong Kong",
      period: "September 2021 – November 2023"
    },
    // ... other education
  ],
  skills: {
    genAI: ["Agentic Workflows", "RAG", "Prompt Engineering", "MCP"],
    mlOps: ["Python", "PyTorch", "TensorFlow", "FastMCP", "LangChain"],
    // ... other categories
  }
}
```

## 5. Implementation Steps

1.  **Setup**: Install Tailwind CSS, Framer Motion, Lucide React.
2.  **Data Entry**: Create `portfolio.ts` and transcribe data from CV images.
3.  **Base UI**: Configure Tailwind and global styles.
4.  **Hero Section**: Implement `Hero` component.
5.  **Timeline Feature**: Implement `Timeline` component with scroll animations.
6.  **Projects & Others**: Implement `Projects`, `Skills`, and `Education` components.
7.  **Review**: Verify responsiveness and animations.
