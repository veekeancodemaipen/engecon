'use client';

import { SectionHead, Card, Formula, Pill } from './ui';
import BreakevenCalculator from './BreakevenCalculator';

export default function Module4Breakeven() {
  return (
    <article className="fade-up">
      <header className="mb-16 pt-4">
        <Pill color="clay">Module 04</Pill>
        <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] text-ink-900 max-w-3xl">
          Break-Even
          <br />
          <em className="text-clay-600">& Rate of Return</em>
        </h1>
        <p className="lead mt-6 max-w-2xl">
          The two ways to ask "is it worth it?" — find the volume where you
          stop losing money, and find the rate where the project is exactly
          worth its cost.
        </p>
      </header>

      {/* ─── Break-even calculator ─────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead
          kicker="1 · Break-even"
          title="Linear Break-Even Analysis"
        >
          The point at which total cost equals total revenue. Below this
          quantity you're losing money; above it, every additional unit is
          profit equal to the contribution margin.
        </SectionHead>

        <Formula label="Linear break-even quantity">
          Q<sub>BE</sub> = FC / (r − v)
          <span className="block text-sm not-italic font-sans text-ink-600 mt-2">
            valid only when r &gt; v
          </span>
        </Formula>

        <BreakevenCalculator />
      </section>

      {/* ─── Non-linear ────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead
          kicker="2 · Non-linear"
          title="When the curves don't agree"
        >
          With non-linear revenue or cost (price elasticity, returns to scale),
          the curves can intersect twice — defining a profitable range
          bracketed by two break-even points.
        </SectionHead>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-3">
              Profitable range
            </div>
            <p className="text-sm text-ink-700 leading-relaxed mb-4">
              Two intersections of R and TC define lower and upper break-even
              quantities. The project is profitable only when{' '}
              <span className="math">Q<sub>BE1</sub> &lt; Q &lt; Q<sub>BE2</sub></span>.
            </p>
            <div className="font-mono text-xs text-ink-600 bg-paper/40 p-3">
              Profitable: P(Q) &gt; 0
              <br />
              Boundary: P(Q) = 0 → R(Q) = TC(Q)
            </div>
          </Card>

          <Card>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-3">
              Maximum profit
            </div>
            <p className="text-sm text-ink-700 leading-relaxed mb-4">
              Found inside the profitable range where the slopes of R and TC
              are equal — the classical{' '}
              <span className="font-display italic">marginal revenue = marginal cost</span>{' '}
              condition.
            </p>
            <div className="font-mono text-xs text-ink-600 bg-paper/40 p-3">
              dP/dQ = dR/dQ − dTC/dQ = 0
              <br />
              ⟹ MR = MC at Q<sub>max</sub>
            </div>
          </Card>
        </div>

        <NonLinearVisual />
      </section>

      {/* ─── ROR ───────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead
          kicker="3 · ROR"
          title="Rate of Return"
        >
          The interest rate at which the project's net present worth equals
          zero. The benchmark for whether an investment beats your minimum
          required return.
        </SectionHead>

        <Formula label="Internal rate of return">
          NPV(i*) = 0
          <span className="block text-sm not-italic font-sans text-ink-600 mt-2 leading-relaxed">
            equivalently: PW of inflows = PW of outflows at <em>i</em>*
          </span>
        </Formula>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <DecisionCard
            symbol="i* > MARR"
            verdict="Accept"
            color="sage"
            note="Project return exceeds the hurdle. Invest."
          />
          <DecisionCard
            symbol="i* = MARR"
            verdict="Indifferent"
            color="ink"
            note="Project return matches the hurdle exactly."
          />
          <DecisionCard
            symbol="i* < MARR"
            verdict="Reject"
            color="clay"
            note="Project return falls short. Don't invest."
          />
        </div>

        <div className="border-l-2 border-sage-500 pl-6 py-2 text-sm text-ink-700 leading-relaxed">
          <span className="font-display italic text-ink-900">
            Three ways to find i*:
          </span>{' '}
          (1) direct algebra when n is small, (2) trial-and-error with linear
          interpolation between bracketing rates, (3) Excel's{' '}
          <code className="font-mono text-xs bg-paper/60 px-1">=IRR()</code> or
          a financial calculator. For real projects, expect to use option 3.
        </div>
      </section>

      {/* ─── Incremental ROR ───────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHead
          kicker="4 · Incremental ROR"
          title="Comparing mutually-exclusive alternatives"
        >
          When choosing between alternatives, the alternative with the highest
          standalone ROR isn't always the best. The right question: is the{' '}
          <em>extra</em> investment justified?
        </SectionHead>

        <div className="bg-white/60 border border-ink-200/60 p-6 md:p-8 mb-8">
          <ol className="space-y-5">
            {[
              {
                step: '00',
                title: 'Screen each alternative',
                body: (
                  <>
                    Reject any alternative whose standalone{' '}
                    <span className="math">ROR</span> &lt; MARR. They can never
                    win — and shouldn't pollute the comparison.
                  </>
                ),
              },
              {
                step: '01',
                title: 'Order by increasing investment',
                body: (
                  <>
                    Sort surviving alternatives smallest-to-largest by initial
                    capital. Call the cheapest A and the next B.
                  </>
                ),
              },
              {
                step: '02',
                title: 'Compute incremental cash flow',
                body: (
                  <>
                    For each year, take{' '}
                    <span className="math">Δ(B − A)</span>. The incremental
                    investment is positive (extra capital required); the
                    incremental savings or revenues should also be positive.
                  </>
                ),
              },
              {
                step: '03',
                title: 'Solve for ΔROR',
                body: (
                  <>
                    Set up <span className="math">PW</span> of the incremental
                    cash flow = 0 and solve for{' '}
                    <span className="math">i*<sub>Δ</sub></span>.
                  </>
                ),
              },
              {
                step: '04',
                title: 'Compare ΔROR to MARR',
                body: (
                  <>
                    If <span className="math">i*<sub>Δ</sub> ≥</span> MARR, the
                    extra investment is justified — the larger alternative
                    wins. Otherwise stick with the smaller one.
                  </>
                ),
                highlight: true,
              },
              {
                step: '05',
                title: 'Iterate',
                body: (
                  <>
                    The current winner becomes the new baseline. Compare
                    against the next-larger alternative and repeat until you've
                    exhausted the list. The last winner is the chosen
                    alternative.
                  </>
                ),
              },
            ].map(({ step, title, body, highlight }) => (
              <li
                key={step}
                className={`flex gap-6 pl-4 ${
                  highlight ? 'border-l-2 border-clay-500' : 'border-l-2 border-ink-200'
                }`}
              >
                <div className="font-mono text-xs tabular text-ink-400 pt-0.5 min-w-[24px]">
                  {step}
                </div>
                <div className="flex-1">
                  <h4 className="font-display italic text-lg text-ink-900 mb-1">
                    {title}
                  </h4>
                  <p className="text-sm text-ink-700 leading-relaxed">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-l-2 border-clay-500 pl-6 py-2 text-sm text-ink-700 leading-relaxed">
          <span className="font-display italic text-ink-900">
            The classic gotcha:
          </span>{' '}
          alternative B might have lower individual ROR than A (e.g., 13% vs
          17%), yet still win — if the extra capital required to step from A
          to B earns more than MARR. The "best ROR" alternative is{' '}
          <em>not</em> automatically the right pick.
        </div>
      </section>
    </article>
  );
}

// ─── Decision card ──────────────────────────────────────────────────────────
function DecisionCard({ symbol, verdict, color, note }) {
  const colors = {
    sage: { bg: 'bg-sage-100/50', border: 'border-sage-300', text: 'text-sage-700' },
    ink:  { bg: 'bg-ink-100/40', border: 'border-ink-300', text: 'text-ink-700' },
    clay: { bg: 'bg-clay-50/60', border: 'border-clay-300', text: 'text-clay-700' },
  };
  const c = colors[color];
  return (
    <div className={`${c.bg} ${c.border} border p-6`}>
      <div className={`font-display italic text-2xl ${c.text} mb-2`}>
        {symbol}
      </div>
      <div className={`font-mono text-[10px] tracking-widest-2 uppercase ${c.text} mb-3`}>
        {verdict}
      </div>
      <p className="text-xs text-ink-700 leading-relaxed">{note}</p>
    </div>
  );
}

// ─── Non-linear visual ──────────────────────────────────────────────────────
function NonLinearVisual() {
  // Quadratic illustration: R = -0.007Q² + 32Q, TC = 0.004Q² + 2.2Q + 8
  // Range Q = 0..3500
  const W = 720, H = 320;
  const pad = { top: 16, right: 24, bottom: 44, left: 70 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const Qmax = 3500;
  const yMaxVal = 50000;
  const x = (q) => (q / Qmax) * innerW;
  const y = (val) => innerH - (val / yMaxVal) * innerH;

  const points = [];
  for (let q = 0; q <= Qmax; q += 50) {
    const R = -0.007 * q * q + 32 * q;
    const TC = 0.004 * q * q + 2.2 * q + 8;
    points.push({ q, R, TC, profit: R - TC });
  }

  const Rpath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.q).toFixed(2)} ${y(p.R).toFixed(2)}`).join(' ');
  const TCpath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.q).toFixed(2)} ${y(p.TC).toFixed(2)}`).join(' ');

  // Find break-evens
  // 0.011Q² - 29.8Q + 8 = 0
  const a = 0.011, b = -29.8, c = 8;
  const disc = Math.sqrt(b * b - 4 * a * c);
  const Q1 = (-b - disc) / (2 * a);
  const Q2 = (-b + disc) / (2 * a);
  const Qmaxprofit = 29.8 / (2 * 0.011); // ≈ 1354

  // Profit area (between curves where Q1<q<Q2)
  const profitPts = points.filter((p) => p.q >= Q1 && p.q <= Q2);
  const profitArea = profitPts.length >= 2
    ? `M ${x(profitPts[0].q)} ${y(profitPts[0].R)} ${
        profitPts.map((p) => `L ${x(p.q)} ${y(p.R)}`).join(' ')
      } ${
        [...profitPts].reverse().map((p) => `L ${x(p.q)} ${y(p.TC)}`).join(' ')
      } Z`
    : '';

  return (
    <div className="bg-white/60 border border-ink-200/60 p-6 md:p-8">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-1">
            Quadratic example
          </div>
          <h4 className="font-display italic text-xl text-ink-900">
            R = −0.007Q² + 32Q · TC = 0.004Q² + 2.2Q + 8
          </h4>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <g transform={`translate(${pad.left},${pad.top})`}>
          {/* Profit area */}
          {profitArea && <path d={profitArea} fill="#5a6e5a" fillOpacity="0.12" />}

          {/* Break-even verticals */}
          <line x1={x(Q1)} x2={x(Q1)} y1={0} y2={innerH} stroke="#b8492e" strokeWidth="1" strokeDasharray="2 3" />
          <line x1={x(Q2)} x2={x(Q2)} y1={0} y2={innerH} stroke="#b8492e" strokeWidth="1" strokeDasharray="2 3" />

          {/* Max profit line */}
          <line x1={x(Qmaxprofit)} x2={x(Qmaxprofit)} y1={0} y2={innerH} stroke="#5a6e5a" strokeWidth="1" strokeDasharray="3 2" />

          {/* TC and R curves */}
          <path d={TCpath} fill="none" stroke="#cd6a4d" strokeWidth="1.8" />
          <path d={Rpath} fill="none" stroke="#1a1612" strokeWidth="1.8" />

          {/* BE points */}
          <circle cx={x(Q1)} cy={y(-0.007 * Q1 * Q1 + 32 * Q1)} r="4" fill="#b8492e" stroke="#faf7f2" strokeWidth="2" />
          <circle cx={x(Q2)} cy={y(-0.007 * Q2 * Q2 + 32 * Q2)} r="4" fill="#b8492e" stroke="#faf7f2" strokeWidth="2" />

          {/* Labels */}
          <text x={x(Q1)} y={-4} textAnchor="middle" fontSize="9" fill="#b8492e" className="font-mono">
            Q<tspan fontSize="7" baselineShift="sub">BE1</tspan>
          </text>
          <text x={x(Q2)} y={-4} textAnchor="middle" fontSize="9" fill="#b8492e" className="font-mono">
            Q<tspan fontSize="7" baselineShift="sub">BE2</tspan>
          </text>
          <text x={x(Qmaxprofit)} y={-4} textAnchor="middle" fontSize="9" fill="#5a6e5a" className="font-mono">
            Q<tspan fontSize="7" baselineShift="sub">max</tspan>
          </text>

          <text x={innerW - 4} y={y(points[points.length - 1].TC) + 4} textAnchor="end" fontSize="10" fill="#cd6a4d" className="font-mono">TC</text>
          <text x={innerW - 4} y={y(points[points.length - 1].R) - 4} textAnchor="end" fontSize="10" fill="#1a1612" className="font-mono">R</text>

          {/* Axes */}
          <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="#1a1612" strokeWidth="1" />
          <line x1={0} y1={0} x2={0} y2={innerH} stroke="#1a1612" strokeWidth="1" />

          {/* X labels */}
          {[0, 750, 1500, 2250, 3000].map((q) => (
            <text key={q} x={x(q)} y={innerH + 16} textAnchor="middle" fontSize="9" fill="#8c7e63" className="font-mono">
              {q}
            </text>
          ))}
          <text x={innerW / 2} y={innerH + 32} textAnchor="middle" fontSize="10" fill="#5e5240" className="font-mono" letterSpacing="2">
            QUANTITY · Q
          </text>
        </g>
      </svg>

      <div className="mt-4 pt-4 border-t border-ink-200/60 grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500">Q<sub>BE1</sub></div>
          <div className="font-mono tabular text-ink-800">{Q1.toFixed(0)} units</div>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-widest-2 uppercase text-sage-600">Q<sub>max profit</sub></div>
          <div className="font-mono tabular text-ink-800">{Qmaxprofit.toFixed(0)} units</div>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500">Q<sub>BE2</sub></div>
          <div className="font-mono tabular text-ink-800">{Q2.toFixed(0)} units</div>
        </div>
      </div>
    </div>
  );
}
