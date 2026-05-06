'use client';

// ─── Section header w/ kicker ────────────────────────────────────────────────
export function SectionHead({ kicker, title, children }) {
  return (
    <header className="mb-10">
      {kicker && (
        <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-3">
          {kicker}
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-ink-900 leading-tight">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-base text-ink-600 max-w-2xl leading-relaxed">
          {children}
        </p>
      )}
    </header>
  );
}

// ─── Bordered card — used for explanatory blocks ─────────────────────────────
export function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white/60 border border-ink-200/60 p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Two-column key/value (e.g. P / ML / O comparisons) ──────────────────────
export function KeyVal({ k, v, mono = true, accent = false }) {
  return (
    <div className="flex justify-between items-baseline border-b border-ink-200/50 py-2">
      <span className="text-sm text-ink-600">{k}</span>
      <span
        className={`${mono ? 'font-mono' : 'font-display italic'} ${
          accent ? 'text-clay-600' : 'text-ink-800'
        } tabular`}
      >
        {v}
      </span>
    </div>
  );
}

// ─── Highlighted formula box ─────────────────────────────────────────────────
export function Formula({ children, label }) {
  return (
    <div className="my-6 border-l-2 border-clay-500 pl-6 py-2">
      {label && (
        <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 mb-2">
          {label}
        </div>
      )}
      <div className="font-display italic text-xl md:text-2xl text-ink-900 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// ─── Number input w/ label ───────────────────────────────────────────────────
export function NumberInput({ label, value, onChange, min, max, step = 1, prefix, suffix }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 block mb-2">
        {label}
      </span>
      <div className="flex items-center bg-white/80 border border-ink-200 focus-within:border-clay-500 transition-colors">
        {prefix && (
          <span className="px-3 font-mono text-sm text-ink-400 border-r border-ink-200">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = e.target.value === '' ? 0 : Number(e.target.value);
            onChange(v);
          }}
          className="flex-1 px-3 py-2.5 bg-transparent font-mono text-base text-ink-900 outline-none w-full"
        />
        {suffix && (
          <span className="px-3 font-mono text-sm text-ink-400 border-l border-ink-200">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

// ─── Pill / tag ──────────────────────────────────────────────────────────────
export function Pill({ children, color = 'ink' }) {
  const colors = {
    ink:  'bg-ink-100 text-ink-700 border-ink-200',
    clay: 'bg-clay-50 text-clay-700 border-clay-200',
    sage: 'bg-sage-100 text-sage-700 border-sage-200',
  };
  return (
    <span
      className={`inline-block font-mono text-[10px] tracking-widest-2 uppercase px-2 py-1 border ${colors[color]}`}
    >
      {children}
    </span>
  );
}

// ─── Money formatter ─────────────────────────────────────────────────────────
export const fmt = (n, opts = {}) => {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  const { decimals = 0, prefix = '$' } = opts;
  return (
    prefix +
    n.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
};

export const fmtPct = (n, decimals = 1) => {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return (n * 100).toFixed(decimals) + '%';
};
