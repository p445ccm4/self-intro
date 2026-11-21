import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Code, GraduationCap, Clock, Mail, Linkedin, Github, FileText, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './mockup.css';

type Palette = 'ice' | 'aurora' | 'mint' | 'silver' | 'bea';
type Filter = 'all' | 'work' | 'project' | 'education';

const PALETTES: { id: Palette; label: string; note: string; swatch: string }[] = [
  { id: 'ice', label: 'Ice', note: 'Cool cyan — closest to Apple liquid glass', swatch: '#7dd3fc' },
  { id: 'aurora', label: 'Aurora', note: 'Violet + cyan mists — expressive night UI', swatch: '#a78bfa' },
  { id: 'mint', label: 'Mint', note: 'Teal glass — calm, fintech-friendly', swatch: '#5eead4' },
  { id: 'silver', label: 'Silver', note: 'Near-neutral — accent is light itself', swatch: '#e2e8f0' },
  { id: 'bea', label: 'BEA Solar', note: 'Warm red/orange — clashes more on dark glass', swatch: '#ff8f00' },
];

const FILTERS: { id: Filter; label: string; icon: typeof Clock }[] = [
  { id: 'all', label: 'All', icon: Clock },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'project', label: 'Project', icon: Code },
  { id: 'education', label: 'Education', icon: GraduationCap },
];

const SAMPLE_ITEMS = [
  {
    id: 'w1',
    kind: 'work' as const,
    title: 'Senior AI Application Developer',
    company: 'Hong Kong Telecom',
    period: 'Nov 2025 – Now',
    duration: '1 yr',
    blurb: 'Enterprise GenAI platform for internal use.',
  },
  {
    id: 'p1',
    kind: 'project' as const,
    title: 'AI Meeting Summary App',
    company: 'HKT',
    period: 'Jan 2026 – Now',
    duration: '10 mos',
    blurb: 'Whisper + BullMQ + React meeting assistant.',
  },
  {
    id: 'e1',
    kind: 'education' as const,
    title: portfolioData.education[0]?.degree ?? 'BEng',
    company: portfolioData.education[0]?.school ?? 'University',
    period: portfolioData.education[0]?.period ?? '',
    duration: '',
    blurb: 'Academic foundation for AI & systems work.',
  },
];

export const MockupPage = () => {
  const [palette, setPalette] = useState<Palette>('ice');
  const [filter, setFilter] = useState<Filter>('all');
  const { personal } = portfolioData;

  const filterIndex = FILTERS.findIndex((f) => f.id === filter);
  const items = useMemo(
    () => SAMPLE_ITEMS.filter((item) => filter === 'all' || item.kind === filter),
    [filter]
  );

  const activePalette = PALETTES.find((p) => p.id === palette)!;

  return (
    <div className="mockup-root" data-palette={palette}>
      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="mockup-btn !min-w-0 px-4 text-sm">
            ← Live site
          </Link>
          <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--mg-muted)]">
            /mockup · dark liquid glass
          </p>
        </div>

        {/* Palette explorer */}
        <section className="mockup-glass mb-8 p-4 md:p-5">
          <div className="relative z-[1]">
            <h2 className="text-sm font-semibold text-[color:var(--mg-text)]">Color systems on dark glass</h2>
            <p className="mt-1 text-sm text-[color:var(--mg-muted)]">
              Cool / neutral accents usually sit better than warm solar reds. Switch and compare.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="mockup-palette-chip"
                  aria-pressed={palette === p.id}
                  onClick={() => setPalette(p.id)}
                >
                  <span className="mockup-swatch" style={{ ['--swatch' as string]: p.swatch }} />
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-[color:var(--mg-muted)]">
              <span className="font-semibold text-[color:var(--mg-accent-text)]">{activePalette.label}:</span>{' '}
              {activePalette.note}
            </p>
          </div>
        </section>

        {/* Hero — aligned glass buttons */}
        <section className="mockup-glass mb-10 px-5 py-8 text-center md:px-10 md:py-10">
          <h1 className="relative z-[1] text-3xl font-extrabold leading-tight md:text-5xl">
            <span className="mockup-title-grad">{personal.name}</span>
          </h1>
          <p className="relative z-[1] mt-3 text-lg font-semibold text-[color:var(--mg-text)] md:text-xl">
            {personal.title}
          </p>
          <p className="relative z-[1] mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--mg-muted)] md:text-base">
            Dark liquid glass mockup. All hero actions share one control size and glass treatment —
            only the primary CTA uses the palette accent fill.
          </p>

          <div className="relative z-[1] mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <a href={`mailto:${personal.email}`} className="mockup-btn">
              <Mail size={16} /> Email
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="mockup-btn">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="mockup-btn">
              <Github size={16} /> GitHub
            </a>
            <a href={personal.whatsapp} target="_blank" rel="noopener noreferrer" className="mockup-btn">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mockup-btn mockup-btn-accent"
            >
              <FileText size={16} /> Resume
            </a>
          </div>
        </section>

        {/* Journey + liquid glass toggle */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold">
            <span className="mockup-title-grad">My Journey</span>
          </h2>
        </div>

        <div
          className="mockup-toggle mb-8"
          role="group"
          aria-label="Filter timeline"
        >
          <span
            className="mockup-toggle-thumb"
            style={{ transform: `translateX(${filterIndex * 100}%)` }}
            aria-hidden
          />
          {FILTERS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className="mockup-toggle-btn"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <div className="relative space-y-3 pl-5">
          <div
            className="absolute bottom-2 left-[0.45rem] top-2 w-0.5 rounded-full opacity-60"
            style={{
              background: `linear-gradient(180deg, var(--mg-accent), #60a5fa, #34d399)`,
            }}
          />
          {items.map((item) => (
            <article key={item.id} className="mockup-glass mockup-card relative">
              <span
                className="absolute -left-[1.18rem] top-5 h-2.5 w-2.5 rounded-full border-2 border-[color:var(--mg-bg)]"
                style={{ background: 'var(--mg-accent)' }}
              />
              <div className="relative z-[1] mb-1.5 flex flex-wrap items-center gap-2 font-mono text-[0.7rem] text-[color:var(--mg-muted)]">
                <span>{item.period}</span>
                {item.duration && <span className="mockup-tag">{item.duration}</span>}
                <span className="mockup-tag capitalize">{item.kind}</span>
              </div>
              <h3 className="relative z-[1] text-base font-bold text-[color:var(--mg-text)]">{item.title}</h3>
              <p
                className="relative z-[1] mt-1 text-sm font-semibold"
                style={{ color: 'var(--mg-accent)' }}
              >
                {item.company}
              </p>
              <p className="relative z-[1] mt-2 text-sm leading-relaxed text-[color:var(--mg-muted)]">
                {item.blurb}
              </p>
            </article>
          ))}
          {items.length === 0 && (
            <p className="relative z-[1] py-8 text-center text-sm text-[color:var(--mg-muted)]">
              No items in this filter.
            </p>
          )}
        </div>

        <aside className="mockup-glass mt-10 p-4 text-sm leading-relaxed text-[color:var(--mg-muted)] md:p-5">
          <p className="relative z-[1]">
            <strong className="text-[color:var(--mg-accent-text)]">Takeaway:</strong> dark liquid glass
            reads best with cool or neutral accents (Ice / Aurora / Mint / Silver). Warm BEA solar
            works as a brand mark, but as the main accent it fights the cool glass material.
          </p>
        </aside>
      </div>
    </div>
  );
};
