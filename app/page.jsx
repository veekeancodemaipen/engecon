'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Overview from '@/components/Overview';
import Module1Sensitivity from '@/components/Module1Sensitivity';
import Module2Replacement from '@/components/Module2Replacement';
import Module3AfterTax from '@/components/Module3AfterTax';
import Module4Breakeven from '@/components/Module4Breakeven';

const MODULES = [
  {
    id: 'overview',
    number: '00',
    label: 'Overview',
    subtitle: 'Start here',
    description: 'Map of the four modules and a notation cheatsheet.',
  },
  {
    id: 'sensitivity',
    number: '01',
    label: 'Sensitivity & Decisions',
    subtitle: 'Lec 11',
    description:
      'Three-estimate scenarios (P, ML, O), expected value calculations, and decision trees with both decision and probability nodes.',
    tags: ['scenarios', 'expected value', 'decision trees'],
  },
  {
    id: 'replacement',
    number: '02',
    label: 'Replacement & Depreciation',
    subtitle: 'Lec 12',
    description:
      'Defender vs. Challenger framework, economic service life via marginal cost, and a four-method depreciation calculator.',
    tags: ['ESL', 'SL', 'DDB', 'SYD'],
  },
  {
    id: 'aftertax',
    number: '03',
    label: 'After-Tax Analysis & Bonds',
    subtitle: 'Lec 9',
    description:
      'Net Operating Income, Taxable Income, NOPAT, and an interactive bond valuator pricing coupons + face value.',
    tags: ['CFAT', 'tax shield', 'YTM'],
  },
  {
    id: 'breakeven',
    number: '04',
    label: 'Break-Even & ROR',
    subtitle: 'Lec 8 + 10',
    description:
      'Linear and non-linear break-even, rate of return as the i* where NPV = 0, and incremental analysis for mutually exclusive alternatives.',
    tags: ['break-even', 'IRR', 'incremental'],
  },
];

export default function Home() {
  const [active, setActive] = useState('overview');

  // Sync with URL hash so refresh keeps you on the same module
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (MODULES.some((m) => m.id === hash)) setActive(hash);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.replaceState(null, '', `#${active}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [active]);

  return (
    <div className="min-h-screen flex">
      <Sidebar modules={MODULES} active={active} onSelect={setActive} />
      <main className="flex-1 ml-72 paper-texture min-h-screen">
        <div className="max-w-5xl mx-auto px-8 lg:px-16 py-12 lg:py-16">
          {active === 'overview'    && <Overview modules={MODULES} onSelect={setActive} />}
          {active === 'sensitivity' && <Module1Sensitivity />}
          {active === 'replacement' && <Module2Replacement />}
          {active === 'aftertax'    && <Module3AfterTax />}
          {active === 'breakeven'   && <Module4Breakeven />}

          {/* Footer nav */}
          <FooterNav active={active} modules={MODULES} onSelect={setActive} />
        </div>
      </main>
    </div>
  );
}

function FooterNav({ active, modules, onSelect }) {
  const idx = modules.findIndex((m) => m.id === active);
  const prev = idx > 0 ? modules[idx - 1] : null;
  const next = idx < modules.length - 1 ? modules[idx + 1] : null;

  return (
    <nav className="mt-24 pt-8 rule-double flex justify-between items-baseline gap-4">
      <div>
        {prev && (
          <button onClick={() => onSelect(prev.id)} className="group text-left">
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 mb-1">
              ← Previous · {prev.number}
            </div>
            <div className="font-display italic text-lg text-ink-700 group-hover:text-clay-600 transition-colors">
              {prev.label}
            </div>
          </button>
        )}
      </div>
      <div className="text-right">
        {next && (
          <button onClick={() => onSelect(next.id)} className="group text-right">
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 mb-1">
              Next · {next.number} →
            </div>
            <div className="font-display italic text-lg text-ink-700 group-hover:text-clay-600 transition-colors">
              {next.label}
            </div>
          </button>
        )}
      </div>
    </nav>
  );
}
