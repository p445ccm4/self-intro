import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Briefcase, Code, GraduationCap, Clock, Mail, Linkedin, Github, FileText, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './mockup.css';

type Palette = 'cyberpunk' | 'vice' | 'neon' | 'monokai' | 'aurora' | 'ice' | 'bea';
type Filter = 'all' | 'work' | 'project' | 'education';

const isPalette = (v: string | null): v is Palette =>
  !!v && ['cyberpunk', 'vice', 'neon', 'monokai', 'aurora', 'ice', 'bea'].includes(v);

const DEFAULT_TUNE = {
  mist: 70,      // mist brightness %
  blur: 16,      // glass blur px
  opacity: 16,   // glass fill opacity % (higher = less see-through)
} as const;

const PALETTES: {
  id: Palette;
  label: string;
  note: string;
  swatches: string[];
}[] = [
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    note: 'Cyan + hot magenta + holo purple on void black (neon megacity).',
    swatches: ['#00f0ff', '#ff0080', '#b000ff'],
  },
  {
    id: 'vice',
    label: 'Vice City',
    note: 'Miami neon — pink, teal, violet. Strong multi-color mists.',
    swatches: ['#ff2e97', '#00e5ff', '#c084fc'],
  },
  {
    id: 'neon',
    label: 'Neon Lights',
    note: 'Signage triad: electric cyan, hot pink, yellow.',
    swatches: ['#00f5ff', '#ff006e', '#ffe600'],
  },
  {
    id: 'monokai',
    label: 'Monokai',
    note: 'Editor classic — pink / green / cyan (+ orange & violet in the mist).',
    swatches: ['#f92672', '#a6e22e', '#66d9ef'],
  },
  {
    id: 'aurora',
    label: 'Aurora',
    note: 'Night sky glass — cyan, violet, pink pools.',
    swatches: ['#22d3ee', '#a78bfa', '#f472b6'],
  },
  {
    id: 'ice',
    label: 'Ice',
    note: 'Cool multi-blue glass — closer to Apple liquid glass.',
    swatches: ['#7dd3fc', '#67e8f9', '#a5b4fc'],
  },
  {
    id: 'bea',
    label: 'BEA Solar',
    note: 'Warm solar red→orange→yellow (kept for comparison).',
    swatches: ['#ed171f', '#ff8f00', '#ffcc00'],
  },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('palette');
  const [palette, setPalette] = useState<Palette>(() => (isPalette(param) ? param : 'cyberpunk'));
  const [filter, setFilter] = useState<Filter>('all');
  const [mist, setMist] = useState<number>(DEFAULT_TUNE.mist);
  const [blur, setBlur] = useState<number>(DEFAULT_TUNE.blur);
  const [opacity, setOpacity] = useState<number>(DEFAULT_TUNE.opacity);
  const { personal } = portfolioData;

  useEffect(() => {
    setSearchParams({ palette }, { replace: true });
  }, [palette, setSearchParams]);

  const filterIndex = FILTERS.findIndex((f) => f.id === filter);
  const items = useMemo(
    () => SAMPLE_ITEMS.filter((item) => filter === 'all' || item.kind === filter),
    [filter]
  );

  const activePalette = PALETTES.find((p) => p.id === palette)!;

  const rootStyle = {
    '--mg-mist-brightness': String(mist / 100),
    '--mg-glass-blur': `${blur}px`,
    '--mg-glass-alpha': String(opacity / 100),
  } as CSSProperties;

  const resetTune = () => {
    setMist(DEFAULT_TUNE.mist);
    setBlur(DEFAULT_TUNE.blur);
    setOpacity(DEFAULT_TUNE.opacity);
  };

  const readablePreset = () => {
    setMist(45);
    setBlur(20);
    setOpacity(28);
  };

  return (
    <div className="mockup-root" data-palette={palette} style={rootStyle}>
      <div className="mockup-mist" aria-hidden />
      <div className="relative z-[1] mx-auto max-w-3xl px-4 py-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="mockup-btn !min-w-0 px-4 text-sm">
            ← Live site
          </Link>
          <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--mg-muted)]">
            /mockup · multi-color dark glass
          </p>
        </div>

        <section className="mockup-glass mb-8 p-4 md:p-5">
          <div className="relative z-[1]">
            <h2 className="text-sm font-semibold text-[color:var(--mg-text)]">
              Multi-color atmospheres
            </h2>
            <p className="mt-1 text-sm text-[color:var(--mg-muted)]">
              Glass stays neutral; color lives in the mist + A/B/C accents (rim, title, CTA).
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
                  <span className="mockup-swatches" aria-hidden>
                    {p.swatches.map((hex) => (
                      <span
                        key={hex}
                        className="mockup-swatch"
                        style={{ ['--swatch' as string]: hex }}
                      />
                    ))}
                  </span>
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-[color:var(--mg-muted)]">
              <span className="font-semibold text-[color:var(--mg-accent-text)]">
                {activePalette.label}:
              </span>{' '}
              {activePalette.note}
            </p>

            <h3 className="mt-5 text-sm font-semibold text-[color:var(--mg-text)]">
              Tune visibility
            </h3>
            <p className="mt-1 text-xs text-[color:var(--mg-muted)]">
              If text is hard to read: lower mist, raise glass opacity, or soften blur.
            </p>

            <div className="mockup-tune-row">
              <label htmlFor="mist-brightness">
                <span>Mist brightness</span>
                <span>{mist}%</span>
              </label>
              <input
                id="mist-brightness"
                type="range"
                min={0}
                max={120}
                value={mist}
                onChange={(e) => setMist(Number(e.target.value))}
              />
            </div>

            <div className="mockup-tune-row">
              <label htmlFor="glass-blur">
                <span>Glass blur</span>
                <span>{blur}px</span>
              </label>
              <input
                id="glass-blur"
                type="range"
                min={0}
                max={40}
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
              />
            </div>

            <div className="mockup-tune-row">
              <label htmlFor="glass-opacity">
                <span>Glass opacity</span>
                <span>{opacity}% fill</span>
              </label>
              <input
                id="glass-opacity"
                type="range"
                min={4}
                max={45}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
              />
            </div>

            <div className="mockup-tune-actions">
              <button type="button" className="mockup-btn !min-w-0 px-4 text-sm" onClick={readablePreset}>
                Readable preset
              </button>
              <button type="button" className="mockup-btn !min-w-0 px-4 text-sm" onClick={resetTune}>
                Reset
              </button>
            </div>
          </div>
        </section>

        <section className="mockup-glass mb-10 px-5 py-8 text-center md:px-10 md:py-10">
          <h1 className="relative z-[1] text-3xl font-extrabold leading-tight md:text-5xl">
            <span className="mockup-title-grad">{personal.name}</span>
          </h1>
          <p className="relative z-[1] mt-3 text-lg font-semibold text-[color:var(--mg-text)] md:text-xl">
            {personal.title}
          </p>
          <p className="relative z-[1] mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--mg-muted)] md:text-base">
            Stronger multi-color mists behind the glass. Hero buttons share one size; Resume uses the
            A→B→C accent gradient.
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

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold">
            <span className="mockup-title-grad">My Journey</span>
          </h2>
        </div>

        <div className="mockup-toggle mb-8" role="group" aria-label="Filter timeline">
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
          <div className="mockup-spine absolute bottom-2 left-[0.45rem] top-2 w-0.5 rounded-full opacity-70" />
          {items.map((item) => (
            <article key={item.id} className="mockup-glass mockup-card relative">
              <span className="mockup-dot absolute -left-[1.18rem] top-5 h-2.5 w-2.5 rounded-full border-2 border-[color:var(--mg-bg)]" />
              <div className="relative z-[1] mb-1.5 flex flex-wrap items-center gap-2 font-mono text-[0.7rem] text-[color:var(--mg-muted)]">
                <span>{item.period}</span>
                {item.duration && <span className="mockup-tag">{item.duration}</span>}
                <span className="mockup-tag capitalize">{item.kind}</span>
              </div>
              <h3 className="relative z-[1] text-base font-bold text-[color:var(--mg-text)]">{item.title}</h3>
              <p className="mockup-company relative z-[1] mt-1 text-sm">{item.company}</p>
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
            <strong className="text-[color:var(--mg-accent-text)]">Tip:</strong> keep panels frosted
            white/transparent; put saturated color in the backdrop mists and in 2–3 accent stops
            (title / CTA / rim). Single-hue accents look flat on dark glass.
          </p>
        </aside>
      </div>
    </div>
  );
};
