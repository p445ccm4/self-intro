import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Briefcase, Code, GraduationCap, Clock, Mail, Linkedin, Github, FileText, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ThemeToggle } from '../components/ThemeToggle';
import './mockup.css';

type Palette = 'cyberpunk' | 'vice' | 'neon' | 'monokai' | 'aurora' | 'ice' | 'bea';
type Filter = 'all' | 'work' | 'project' | 'education';

const isPalette = (v: string | null): v is Palette =>
  !!v && ['cyberpunk', 'vice', 'neon', 'monokai', 'aurora', 'ice', 'bea'].includes(v);

const DEFAULT_TUNE = {
  mist: 70,      // mist brightness %
  blur: 16,      // glass blur px
  opacity: 16,   // glass fill opacity % (higher = less see-through)
  tint: 0,       // glass accent color intensity % (0 = clearest)
} as const;

const DEFAULT_TEXT = '#ffffff';

const PALETTES: {
  id: Palette;
  label: string;
  note: string;
  bg: string;
  text: string;
  swatches: string[];
}[] = [
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    note: 'Cyan + hot magenta + holo purple on void black (neon megacity).',
    bg: '#0a0a0f',
    text: DEFAULT_TEXT,
    swatches: ['#00f0ff', '#ff0080', '#b000ff'],
  },
  {
    id: 'vice',
    label: 'Vice City',
    note: 'Miami neon — pink, teal, violet. Strong multi-color mists.',
    bg: '#0b0614',
    text: DEFAULT_TEXT,
    swatches: ['#ff2e97', '#00e5ff', '#c084fc'],
  },
  {
    id: 'neon',
    label: 'Neon Lights',
    note: 'Signage triad: electric cyan, hot pink, yellow.',
    bg: '#020408',
    text: DEFAULT_TEXT,
    swatches: ['#00f5ff', '#ff006e', '#ffe600'],
  },
  {
    id: 'monokai',
    label: 'Monokai',
    note: 'Editor classic — pink / green / cyan (+ orange & violet in the mist).',
    bg: '#272822',
    text: DEFAULT_TEXT,
    swatches: ['#f92672', '#a6e22e', '#66d9ef'],
  },
  {
    id: 'aurora',
    label: 'Aurora',
    note: 'Night sky glass — cyan, violet, pink pools.',
    bg: '#070b14',
    text: DEFAULT_TEXT,
    swatches: ['#22d3ee', '#a78bfa', '#f472b6'],
  },
  {
    id: 'ice',
    label: 'Ice',
    note: 'Cool multi-blue glass — closer to Apple liquid glass.',
    bg: '#07090f',
    text: DEFAULT_TEXT,
    swatches: ['#7dd3fc', '#67e8f9', '#a5b4fc'],
  },
  {
    id: 'bea',
    label: 'BEA Solar',
    note: 'Warm solar red→orange→yellow (kept for comparison).',
    bg: '#10080a',
    text: DEFAULT_TEXT,
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
  const [tint, setTint] = useState<number>(DEFAULT_TUNE.tint);
  const initialPalette = isPalette(param) ? param : 'cyberpunk';
  const [bgColor, setBgColor] = useState<string>(
    () => PALETTES.find((x) => x.id === initialPalette)!.bg
  );
  const [textColor, setTextColor] = useState<string>(
    () => PALETTES.find((x) => x.id === initialPalette)!.text
  );
  const [colorA, setColorA] = useState<string>(
    () => PALETTES.find((x) => x.id === initialPalette)!.swatches[0]
  );
  const [colorB, setColorB] = useState<string>(
    () => PALETTES.find((x) => x.id === initialPalette)!.swatches[1]
  );
  const [colorC, setColorC] = useState<string>(
    () => PALETTES.find((x) => x.id === initialPalette)!.swatches[2]
  );
  const { personal } = portfolioData;

  useEffect(() => {
    setSearchParams({ palette }, { replace: true });
  }, [palette, setSearchParams]);

  const applyPaletteColors = (id: Palette) => {
    const preset = PALETTES.find((p) => p.id === id)!;
    setBgColor(preset.bg);
    setTextColor(preset.text);
    setColorA(preset.swatches[0]);
    setColorB(preset.swatches[1]);
    setColorC(preset.swatches[2]);
  };

  const selectPalette = (id: Palette) => {
    setPalette(id);
    applyPaletteColors(id);
  };

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
    '--mg-glass-tint': String(tint / 100),
    '--mg-bg': bgColor,
    '--mg-text': textColor,
    '--mg-a': colorA,
    '--mg-b': colorB,
    '--mg-c': colorC,
  } as CSSProperties;

  const resetTune = () => {
    setMist(DEFAULT_TUNE.mist);
    setBlur(DEFAULT_TUNE.blur);
    setOpacity(DEFAULT_TUNE.opacity);
    setTint(DEFAULT_TUNE.tint);
    applyPaletteColors(palette);
  };

  const readablePreset = () => {
    setMist(45);
    setBlur(20);
    setOpacity(28);
    setTint(0);
  };

  return (
    <div className="mockup-root" data-palette={palette} style={rootStyle}>
      <div className="mockup-mist" aria-hidden />
      <div className="relative z-[1] mx-auto max-w-3xl px-4 py-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="mockup-btn !min-w-0 px-4 text-sm">
            ← Live site
          </Link>
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--mg-muted)]">
              /mockup · multi-color dark glass
            </p>
            <ThemeToggle />
          </div>
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
                  onClick={() => selectPalette(p.id)}
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
              Background & words
            </h3>
            <p className="mt-1 text-xs text-[color:var(--mg-muted)]">
              Adjust page background and word color independently. Palette chips reset both.
            </p>
            <div className="mockup-color-row">
              <label className="mockup-color-picker" htmlFor="bg-color">
                <span>Background</span>
                <input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
                <span className="mockup-color-hex">{bgColor}</span>
              </label>
              <label className="mockup-color-picker" htmlFor="text-color">
                <span>Words</span>
                <input
                  id="text-color"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
                <span className="mockup-color-hex">{textColor}</span>
              </label>
            </div>

            <h3 className="mt-5 text-sm font-semibold text-[color:var(--mg-text)]">
              Accent colors
            </h3>
            <p className="mt-1 text-xs text-[color:var(--mg-muted)]">
              Pick A / B / C for mist, rim, title, and CTA. Palette chips reset these.
            </p>
            <div className="mockup-color-row">
              <label className="mockup-color-picker" htmlFor="accent-a">
                <span>A</span>
                <input
                  id="accent-a"
                  type="color"
                  value={colorA}
                  onChange={(e) => setColorA(e.target.value)}
                />
                <span className="mockup-color-hex">{colorA}</span>
              </label>
              <label className="mockup-color-picker" htmlFor="accent-b">
                <span>B</span>
                <input
                  id="accent-b"
                  type="color"
                  value={colorB}
                  onChange={(e) => setColorB(e.target.value)}
                />
                <span className="mockup-color-hex">{colorB}</span>
              </label>
              <label className="mockup-color-picker" htmlFor="accent-c">
                <span>C</span>
                <input
                  id="accent-c"
                  type="color"
                  value={colorC}
                  onChange={(e) => setColorC(e.target.value)}
                />
                <span className="mockup-color-hex">{colorC}</span>
              </label>
            </div>

            <h3 className="mt-5 text-sm font-semibold text-[color:var(--mg-text)]">
              Tune visibility
            </h3>
            <p className="mt-1 text-xs text-[color:var(--mg-muted)]">
              If text is hard to read: lower mist, raise glass opacity, or keep tint at 0%.
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

            <div className="mockup-tune-row">
              <label htmlFor="glass-tint">
                <span>Glass color tint</span>
                <span>{tint}%</span>
              </label>
              <input
                id="glass-tint"
                type="range"
                min={0}
                max={100}
                value={tint}
                onChange={(e) => setTint(Number(e.target.value))}
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
