'use client';

import { useState, useMemo } from 'react';
import { NumberInput, Pill, fmt } from './ui';

// ─── Calculation engines ─────────────────────────────────────────────────────
function calcSL(B, S, n) {
  const D = (B - S) / n;
  const rows = [];
  let bv = B;
  for (let t = 1; t <= n; t++) {
    bv -= D;
    rows.push({ year: t, dep: D, bv });
  }
  return rows;
}

function calcDB(B, S, n, rate) {
  // rate is the multiplier on (1/n). 1.5 → 150% DB. 2 → DDB.
  const d = rate / n;
  const rows = [];
  let bv = B;
  for (let t = 1; t <= n; t++) {
    let dep = d * bv;
    // Cannot depreciate below stated salvage
    if (bv - dep < S) dep = Math.max(0, bv - S);
    bv -= dep;
    rows.push({ year: t, dep, bv });
  }
  return rows;
}

function calcSYD(B, S, n) {
  const SYD = (n * (n + 1)) / 2;
  const rows = [];
  let bv = B;
  for (let t = 1; t <= n; t++) {
    const d_t = (n - t + 1) / SYD;
    const dep = d_t * (B - S);
    bv -= dep;
    rows.push({ year: t, dep, bv });
  }
  return rows;
}

const METHOD_COLORS = {
  SL:  '#1a1612',
  DB:  '#5a6e5a',
  DDB: '#b8492e',
  SYD: '#3d3527',
};

const METHOD_LABELS = {
  SL:  'Straight Line',
  DB:  '150% DB',
  DDB: 'Double DB',
  SYD: 'Sum-of-Years',
};

// ─── Main component ──────────────────────────────────────────────────────────
export default function DepreciationCalculator() {
  const [B, setB] = useState(50000);
  const [S, setS] = useState(10000);
  const [n, setN] = useState(5);
  const [visible, setVisible] = useState({ SL: true, DB: true, DDB: true, SYD: true });

  // Guard against bad inputs
  const validN = Math.max(1, Math.min(50, Math.floor(n)));
  const validB = Math.max(0, B);
  const validS = Math.max(0, Math.min(S, validB));

  const data = useMemo(
    () => ({
      SL:  calcSL(validB, validS, validN),
      DB:  calcDB(validB, validS, validN, 1.5),
      DDB: calcDB(validB, validS, validN, 2),
      SYD: calcSYD(validB, validS, validN),
    }),
    [validB, validS, validN]
  );

  return (
    <div>
      {/* Inputs */}
      <div className="bg-white/60 border border-ink-200/60 p-6 md:p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <NumberInput
            label="First Cost — B"
            value={B}
            onChange={setB}
            prefix="$"
            step={1000}
            min={0}
          />
          <NumberInput
            label="Salvage Value — S"
            value={S}
            onChange={setS}
            prefix="$"
            step={500}
            min={0}
          />
          <NumberInput
            label="Recovery Period — n"
            value={n}
            onChange={(v) => setN(Math.max(1, Math.min(50, Math.floor(v))))}
            suffix="yrs"
            min={1}
            max={50}
          />
        </div>

        {/* Toggle which methods to show */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-ink-200/60">
          <span className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 self-center mr-2">
            Compare:
          </span>
          {Object.keys(METHOD_LABELS).map((m) => (
            <button
              key={m}
              onClick={() => setVisible({ ...visible, [m]: !visible[m] })}
              className={`flex items-center gap-2 px-3 py-1.5 border font-mono text-xs transition-all ${
                visible[m]
                  ? 'border-ink-800 bg-ink-800 text-bone'
                  : 'border-ink-200 bg-transparent text-ink-500'
              }`}
            >
              <span
                className="w-2 h-2 inline-block"
                style={{ backgroundColor: visible[m] ? METHOD_COLORS[m] : '#d9d1c0' }}
              />
              {METHOD_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/60 border border-ink-200/60 p-6 md:p-8 mb-6">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-1">
              Book value over time
            </div>
            <h4 className="font-display italic text-xl text-ink-900">
              BV<sub>t</sub> = B − Σ Dⱼ
            </h4>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500">
              Salvage floor
            </div>
            <div className="font-mono text-sm text-ink-700 tabular">
              {fmt(validS)}
            </div>
          </div>
        </div>

        <BookValueChart data={data} B={validB} S={validS} n={validN} visible={visible} />
      </div>

      {/* Side-by-side year table */}
      <div className="bg-white/60 border border-ink-200/60 overflow-x-auto">
        <table className="w-full tabular text-sm min-w-[640px]">
          <thead>
            <tr className="bg-ink-100/40">
              <th
                rowSpan={2}
                className="px-4 py-3 text-left font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 border-b border-ink-200"
              >
                Year
              </th>
              {Object.keys(METHOD_LABELS).map((m) =>
                visible[m] ? (
                  <th
                    key={m}
                    colSpan={2}
                    className="px-4 py-2 text-center font-mono text-[10px] tracking-widest-2 uppercase border-b border-ink-200/60"
                    style={{ color: METHOD_COLORS[m] }}
                  >
                    {METHOD_LABELS[m]}
                  </th>
                ) : null
              )}
            </tr>
            <tr className="bg-ink-100/30">
              {Object.keys(METHOD_LABELS).map((m) =>
                visible[m] ? (
                  <>
                    <th
                      key={`${m}-d`}
                      className="px-3 py-2 text-right font-mono text-[10px] uppercase text-ink-500 border-b border-ink-200"
                    >
                      Dₜ
                    </th>
                    <th
                      key={`${m}-bv`}
                      className="px-3 py-2 text-right font-mono text-[10px] uppercase text-ink-500 border-b border-ink-200"
                    >
                      BVₜ
                    </th>
                  </>
                ) : null
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-ink-200/40 bg-paper/40">
              <td className="px-4 py-2 font-display italic text-ink-600">0</td>
              {Object.keys(METHOD_LABELS).map((m) =>
                visible[m] ? (
                  <>
                    <td key={`${m}-d0`} className="px-3 py-2 text-right text-ink-300">—</td>
                    <td key={`${m}-bv0`} className="px-3 py-2 text-right font-mono text-ink-700">
                      {fmt(validB)}
                    </td>
                  </>
                ) : null
              )}
            </tr>
            {Array.from({ length: validN }).map((_, i) => (
              <tr key={i} className="border-b border-ink-200/40 hover:bg-ink-100/20">
                <td className="px-4 py-2 font-display italic text-ink-700">{i + 1}</td>
                {Object.keys(METHOD_LABELS).map((m) =>
                  visible[m] ? (
                    <>
                      <td key={`${m}-d${i}`} className="px-3 py-2 text-right font-mono text-ink-700">
                        {fmt(data[m][i].dep, { decimals: 0 })}
                      </td>
                      <td
                        key={`${m}-bv${i}`}
                        className="px-3 py-2 text-right font-mono text-ink-900"
                      >
                        {fmt(data[m][i].bv, { decimals: 0 })}
                      </td>
                    </>
                  ) : null
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className="mt-6 grid md:grid-cols-2 gap-4 text-xs text-ink-600 leading-relaxed">
        <div className="border-l-2 border-ink-300 pl-4">
          <span className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 block mb-1">
            On accelerated methods
          </span>
          DB and DDB cannot depreciate below the stated salvage value — once
          BV approaches S, depreciation tapers off.
        </div>
        <div className="border-l-2 border-clay-500 pl-4">
          <span className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 block mb-1">
            On the time-value of taxes
          </span>
          All four methods deduct the same total amount, but accelerated
          methods (DB, DDB, SYD) shift deductions earlier — minimizing the PW
          of taxes paid.
        </div>
      </div>
    </div>
  );
}

// ─── SVG line chart (hand-rolled to avoid extra deps) ────────────────────────
function BookValueChart({ data, B, S, n, visible }) {
  const W = 720, H = 320;
  const pad = { top: 20, right: 24, bottom: 44, left: 70 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const xMax = n;
  const yMax = B;
  const yMin = 0;

  const x = (year) => (year / xMax) * innerW;
  const y = (val)  => innerH - ((val - yMin) / (yMax - yMin)) * innerH;

  // y-axis ticks
  const yTicks = [];
  for (let i = 0; i <= 4; i++) yTicks.push((B / 4) * i);
  // x-axis ticks
  const xTicks = [];
  for (let i = 0; i <= n; i++) {
    if (n <= 12 || i % Math.ceil(n / 8) === 0) xTicks.push(i);
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <g transform={`translate(${pad.left},${pad.top})`}>
        {/* Grid */}
        {yTicks.map((t, i) => (
          <line
            key={`gy-${i}`}
            x1={0}
            x2={innerW}
            y1={y(t)}
            y2={y(t)}
            stroke="#d9d1c0"
            strokeWidth="0.5"
            strokeDasharray="2 3"
          />
        ))}

        {/* Salvage floor */}
        {S > 0 && (
          <g>
            <line
              x1={0}
              x2={innerW}
              y1={y(S)}
              y2={y(S)}
              stroke="#cd6a4d"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text
              x={innerW + 4}
              y={y(S) + 4}
              fontSize="10"
              fill="#b8492e"
              className="font-mono"
            >
              S
            </text>
          </g>
        )}

        {/* Lines */}
        {Object.keys(METHOD_LABELS).map((m) => {
          if (!visible[m]) return null;
          const points = [{ year: 0, bv: B }, ...data[m].map((r) => ({ year: r.year, bv: r.bv }))];
          const path = points
            .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.year).toFixed(2)} ${y(p.bv).toFixed(2)}`)
            .join(' ');
          return (
            <g key={m}>
              <path
                d={path}
                fill="none"
                stroke={METHOD_COLORS[m]}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={x(p.year)}
                  cy={y(p.bv)}
                  r="2.5"
                  fill={METHOD_COLORS[m]}
                />
              ))}
              {/* End-point label */}
              <text
                x={x(n) - 4}
                y={y(points[points.length - 1].bv) - 6}
                fontSize="9"
                fill={METHOD_COLORS[m]}
                textAnchor="end"
                className="font-mono"
              >
                {m}
              </text>
            </g>
          );
        })}

        {/* Y-axis labels */}
        {yTicks.map((t, i) => (
          <text
            key={`yl-${i}`}
            x={-8}
            y={y(t) + 3}
            textAnchor="end"
            fontSize="9"
            fill="#8c7e63"
            className="font-mono"
          >
            {t >= 1000 ? `$${(t / 1000).toFixed(0)}k` : `$${t.toFixed(0)}`}
          </text>
        ))}

        {/* X-axis labels */}
        {xTicks.map((t) => (
          <text
            key={`xl-${t}`}
            x={x(t)}
            y={innerH + 16}
            textAnchor="middle"
            fontSize="9"
            fill="#8c7e63"
            className="font-mono"
          >
            {t}
          </text>
        ))}

        {/* Axes */}
        <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="#1a1612" strokeWidth="1" />
        <line x1={0} y1={0} x2={0} y2={innerH} stroke="#1a1612" strokeWidth="1" />

        {/* Axis titles */}
        <text
          x={innerW / 2}
          y={innerH + 36}
          textAnchor="middle"
          fontSize="10"
          fill="#5e5240"
          className="font-mono"
          letterSpacing="2"
        >
          YEAR · t
        </text>
        <text
          transform={`translate(-52, ${innerH / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize="10"
          fill="#5e5240"
          className="font-mono"
          letterSpacing="2"
        >
          BOOK VALUE
        </text>
      </g>
    </svg>
  );
}
