'use client';

export default function Overview({ modules, onSelect }) {
  const items = modules.filter((m) => m.id !== 'overview');

  return (
    <div className="fade-up">
      {/* Hero */}
      <header className="mb-20 pt-8">
        <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-4">
          Course Companion · 2026
        </div>
        <h1 className="font-display text-6xl md:text-7xl leading-[0.95] text-ink-900 max-w-3xl">
          A field guide to the
          <br />
          <em className="text-clay-600">final stretch.</em>
        </h1>
        <p className="lead mt-8 max-w-2xl">
          Four modules covering everything from the back half of the syllabus —
          sensitivity scenarios, replacement studies, depreciation methods,
          after-tax cash flow, bonds, break-even analysis, and incremental rate
          of return.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px w-16 bg-clay-500" />
          <span className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500">
            Begin with module 01
          </span>
        </div>
      </header>

      {/* Module cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {items.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="group text-left bg-white/60 border border-ink-200/60 hover:border-clay-500 transition-all p-8 hover:shadow-[0_8px_30px_rgba(184,73,46,0.08)]"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500">
                Module {m.number}
              </span>
              <span className="font-mono text-xs text-ink-300 group-hover:text-clay-500 transition-colors">
                →
              </span>
            </div>
            <h3 className="font-display text-2xl text-ink-900 leading-tight mb-3">
              {m.label}
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              {m.description}
            </p>
            {m.tags && (
              <div className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-widest-2 uppercase text-ink-500"
                  >
                    · {tag}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </section>

      {/* Quick reference strip */}
      <section className="rule-double pt-10">
        <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 mb-6">
          Notation cheatsheet
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3 text-sm">
          {[
            ['P', 'Present worth'],
            ['F', 'Future worth'],
            ['A', 'Annual equivalent'],
            ['i', 'Interest rate'],
            ['n', 'Number of periods'],
            ['MARR', 'Min. attractive ROR'],
            ['CR', 'Capital recovery'],
            ['AOC', 'Annual operating cost'],
            ['SV', 'Salvage value'],
            ['BV', 'Book value'],
            ['ESL', 'Economic service life'],
            ['TI', 'Taxable income'],
          ].map(([sym, def]) => (
            <div key={sym} className="flex justify-between border-b border-ink-200/50 py-1.5">
              <span className="math text-ink-900">{sym}</span>
              <span className="text-ink-500 text-xs">{def}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
