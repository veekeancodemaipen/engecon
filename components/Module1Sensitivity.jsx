'use client';

import { useState, useMemo } from 'react';
import { SectionHead, Card, Formula, NumberInput, Pill, fmt } from './ui';
import DecisionTree from './DecisionTree';

export default function Module1Sensitivity() {
  return (
    <article className="fade-up">
      {/* Title block */}
      <header className="mb-16 pt-4">
        <Pill color="clay">Module 01</Pill>
        <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] text-ink-900 max-w-3xl">
          Sensitivity Analysis
          <br />
          <em className="text-clay-600">& Decision Trees</em>
        </h1>
        <p className="lead mt-6 max-w-2xl">
          When parameters are uncertain, scenarios bracket the span of possible
          outcomes — and decision trees stage choices across time.
        </p>
      </header>

      {/* ─── Three-Estimate Scenarios ──────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead kicker="1 · Scenarios" title="Three-Estimate Sensitivity">
          Make three parallel estimates for each uncertain parameter — the best
          way to see how an alternative behaves across the full span from worst
          to best case.
        </SectionHead>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <ScenarioCard
            tag="P"
            name="Pessimistic"
            color="clay"
            desc="Worst possible value. Higher costs, shorter life, lower salvage."
          />
          <ScenarioCard
            tag="ML"
            name="Most Likely"
            color="ink"
            desc="Base case. The estimate you'd default to with no other info."
          />
          <ScenarioCard
            tag="O"
            name="Optimistic"
            color="sage"
            desc="Most favorable. Lower costs, longer life, higher salvage."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-3">
              Procedure
            </div>
            <ol className="space-y-3 text-sm text-ink-700 leading-relaxed">
              <li className="flex gap-3">
                <span className="font-mono text-ink-400 tabular">01</span>
                <span>
                  Hold known parameters constant (typically first cost is fixed
                  — only AOC, salvage, and life vary by scenario).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-ink-400 tabular">02</span>
                <span>
                  Compute <span className="math">AW</span> (or{' '}
                  <span className="math">PW</span>) for each scenario of each
                  alternative — three values per alternative.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-ink-400 tabular">03</span>
                <span>
                  Plot the AW values at <span className="math">P</span>,{' '}
                  <span className="math">ML</span>, <span className="math">O</span>{' '}
                  side-by-side. If one alternative dominates at all three
                  levels, the choice is robust.
                </span>
              </li>
            </ol>
          </Card>

          <Formula label="AW under scenario k">
            AWₖ = −P(A/P, i, nₖ) + Sₖ(A/F, i, nₖ) − AOCₖ
          </Formula>
        </div>
      </section>

      {/* ─── Expected Value Calculator ─────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead kicker="2 · Expected value" title="Probability-Weighted Outcomes">
          When P, ML, O have probabilities attached, collapse the three
          scenarios into a single expected value.
        </SectionHead>
        <ExpectedValueCalc />
      </section>

      {/* ─── Decision Trees ─────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead kicker="3 · Staged decisions" title="Decision Trees">
          Multistage problems where today's choice determines tomorrow's
          options. Build the tree forward; evaluate it backward.
        </SectionHead>

        <div className="mb-8">
          <DecisionTree />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-sage-600 mb-2">
              Forward construction
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">
              Draw nodes left-to-right. From a decision node, branch one line
              per alternative. From a probability node, branch one line per
              outcome and label each with its probability — they must sum to 1.
            </p>
          </Card>
          <Card>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-600 mb-2">
              Backward evaluation
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">
              Start at the rightmost leaves. At probability nodes, compute{' '}
              <span className="math">E(PW) = Σ Pᵢ · PWᵢ</span>. At decision
              nodes, choose the alternative with the best{' '}
              <span className="math">E(PW)</span>. Carry that value back left.
            </p>
          </Card>
        </div>
      </section>

      {/* ─── Worked example ─────────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHead
          kicker="Worked example"
          title="Decision D₄ at year 3"
        >
          Three alternatives x, y, z each with high/low outcomes. MARR = 15%,
          study period = 6 years. Pick the one that maximizes{' '}
          <span className="math">E(PW)</span>.
        </SectionHead>

        <div className="overflow-x-auto bg-white/60 border border-ink-200/60">
          <table className="w-full tabular text-sm">
            <thead className="bg-ink-100/50">
              <tr className="text-left">
                <th className="px-4 py-3 font-mono text-[10px] tracking-widest-2 uppercase text-ink-500">Alt</th>
                <th className="px-4 py-3 font-mono text-[10px] tracking-widest-2 uppercase text-ink-500">Branch</th>
                <th className="px-4 py-3 font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 text-right">PW</th>
                <th className="px-4 py-3 font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 text-right">P</th>
                <th className="px-4 py-3 font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 text-right">E(PW)</th>
              </tr>
            </thead>
            <tbody className="text-ink-800">
              {[
                ['x', 'High', -85838.74, 0.7, null],
                ['x', 'Low',  -129382.76, 0.3, -98901.95],
                ['y', 'High', 14208.51,   0.45, null],
                ['y', 'Low',  -6503.25,   0.55, 2817.05],
                ['z', 'High', 42389.25,   0.7, null],
                ['z', 'Low', -418496.75,  0.3, -95876.55],
              ].map(([alt, branch, pw, p, epw], i, arr) => {
                const isAltStart = i === 0 || arr[i-1][0] !== alt;
                const altClass = alt === 'y' ? 'text-sage-700 font-semibold' : 'text-ink-700';
                return (
                  <tr key={i} className={`${isAltStart ? 'border-t border-ink-200/60' : ''}`}>
                    <td className={`px-4 py-2 font-display italic ${altClass}`}>
                      {isAltStart ? alt : ''}
                    </td>
                    <td className="px-4 py-2 text-ink-600">{branch}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmt(pw)}</td>
                    <td className="px-4 py-2 text-right font-mono">{p}</td>
                    <td className={`px-4 py-2 text-right font-mono font-semibold ${epw && epw > 0 ? 'text-sage-700' : 'text-ink-800'}`}>
                      {epw !== null ? fmt(epw) : ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-ink-600 italic font-display max-w-2xl">
          → Alternative y wins, with the only positive E(PW) of $2,817. Both x
          and z look attractive in their high-outcome branches but their
          downside risk drags the expected value into deep loss.
        </p>
      </section>
    </article>
  );
}

function ScenarioCard({ tag, name, color, desc }) {
  const colors = {
    clay: 'bg-clay-50 border-clay-200 text-clay-700',
    ink:  'bg-ink-100/40 border-ink-200 text-ink-700',
    sage: 'bg-sage-100/50 border-sage-200 text-sage-700',
  };
  return (
    <div className={`p-6 border ${colors[color]}`}>
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-2xl font-bold tabular">{tag}</span>
        <span className="font-mono text-[10px] tracking-widest-2 uppercase opacity-70">
          {name}
        </span>
      </div>
      <p className="text-sm leading-relaxed opacity-90">{desc}</p>
    </div>
  );
}

// ─── Mini interactive: expected value of three estimates ─────────────────────
function ExpectedValueCalc() {
  const [pVal, setPVal]   = useState(-25000);
  const [mlVal, setMlVal] = useState(50000);
  const [oVal, setOVal]   = useState(300000);
  const [pP, setPp]       = useState(0.2);
  const [pML, setPml]     = useState(0.6);
  const [pO, setPo]       = useState(0.2);

  const probSum = useMemo(() => pP + pML + pO, [pP, pML, pO]);
  const valid   = Math.abs(probSum - 1) < 0.001;
  const ev      = useMemo(() => pP * pVal + pML * mlVal + pO * oVal, [pP, pML, pO, pVal, mlVal, oVal]);

  return (
    <Card>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <Pill color="clay">Pessimistic</Pill>
          <div className="mt-3 space-y-3">
            <NumberInput label="FW value" value={pVal}  onChange={setPVal} prefix="$" step={1000} />
            <NumberInput label="Probability" value={pP} onChange={setPp}   step={0.05} min={0} max={1} />
          </div>
        </div>
        <div>
          <Pill color="ink">Most Likely</Pill>
          <div className="mt-3 space-y-3">
            <NumberInput label="FW value" value={mlVal} onChange={setMlVal} prefix="$" step={1000} />
            <NumberInput label="Probability" value={pML} onChange={setPml}   step={0.05} min={0} max={1} />
          </div>
        </div>
        <div>
          <Pill color="sage">Optimistic</Pill>
          <div className="mt-3 space-y-3">
            <NumberInput label="FW value" value={oVal} onChange={setOVal} prefix="$" step={1000} />
            <NumberInput label="Probability" value={pO} onChange={setPo}   step={0.05} min={0} max={1} />
          </div>
        </div>
      </div>

      <div className="border-t border-ink-200/60 pt-6 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 mb-2">
            Σ probabilities {valid ? '✓' : '⚠'}
          </div>
          <div className={`font-mono text-2xl tabular ${valid ? 'text-sage-700' : 'text-clay-600'}`}>
            {probSum.toFixed(2)}
          </div>
          {!valid && (
            <div className="text-xs text-clay-600 mt-1">Must sum to 1.00</div>
          )}
        </div>

        <div className="text-right">
          <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-2">
            Expected FW
          </div>
          <div className={`font-display italic text-4xl tabular ${ev >= 0 ? 'text-sage-700' : 'text-clay-600'}`}>
            {fmt(ev, { decimals: 0 })}
          </div>
        </div>
      </div>
    </Card>
  );
}
