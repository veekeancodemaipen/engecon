'use client';

export default function Sidebar({ modules, active, onSelect }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-ink-800 text-ink-100 flex flex-col z-10">
      {/* Header */}
      <div className="p-8 border-b border-ink-700/60">
        <div className="font-mono text-[10px] tracking-widest-2 text-clay-400 uppercase">
          Final Exam · Review
        </div>
        <h1 className="mt-3 font-display text-3xl leading-[0.95] text-bone">
          Engineering
          <br />
          <em className="text-clay-400 font-medium">Economy</em>
        </h1>
        <div className="mt-4 font-mono text-[10px] text-ink-400 tracking-wider">
          MODULES 8 → 12
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {modules.map((m) => {
          const isActive = active === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={`w-full text-left px-8 py-4 flex items-baseline gap-4 transition-all border-l-2 group ${
                isActive
                  ? 'border-clay-500 bg-ink-900 text-bone'
                  : 'border-transparent hover:border-ink-500 hover:bg-ink-700/40 text-ink-300'
              }`}
            >
              <span
                className={`font-mono text-[10px] tabular tracking-wider ${
                  isActive ? 'text-clay-400' : 'text-ink-500'
                }`}
              >
                {m.number}
              </span>
              <div className="flex-1">
                <div className="font-display text-base leading-tight">
                  {m.label}
                </div>
                {m.subtitle && (
                  <div
                    className={`text-xs mt-0.5 ${
                      isActive ? 'text-ink-300' : 'text-ink-500'
                    }`}
                  >
                    {m.subtitle}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-ink-700/60 font-mono text-[10px] text-ink-500 tracking-wider leading-relaxed">
        <div className="text-ink-300">วี · Engineering Economy</div>
        <div className="mt-1">Built with Next.js</div>
      </div>
    </aside>
  );
}
