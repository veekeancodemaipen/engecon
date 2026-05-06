'use client';

import { useState, useMemo } from 'react';
import { NumberInput, fmt } from './ui';

export default function BreakevenCalculator() {
  const [FC, setFC] = useState(50000);
  const [r, setR] = useState(50);
  const [v, setV] = useState(30);

  const valid = r > v;
  const margin = r - v;
  const Q_BE = valid ? FC / margin : null;

  // Sample profit at various Q
  const data = useMemo(() => {
    if (!valid) return [];
    const maxQ = Math.ceil((Q_BE || 100) * 2.4);
    const stepCount = 50;
    const step = maxQ / stepCount;
    const out = [];
    for (let i = 0; i <= stepCount; i++) {
      const q = step * i;
      out.push({
        q,
        revenue: r * q,
        cost: FC + v * q,
        profit: (r - v) * q - FC,
      });
    }
    return out;
  }, [FC, r, v, Q_BE, valid]);

  return (
    <div>
      {/* Input panel */}
      <div className="bg-white/60 border border-ink-200/60 p-6 md:p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NumberInput
            label="Fixed Cost — FC"
            value={FC}
            onChange={setFC}
            prefix="$"
            step={1000}
          />
          <NumberInput
            label="Revenue / unit — r"
            value={r}
            onChange={setR}
            prefix="$"
            step={1}
          />
          <NumberInput
            label="Variable cost / unit — v"
            value={v}
            onChange={setV}
            prefix="$"
            step={1}
          />
        </div>
      </div>

      {/* Result + chart */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Result panel */}
        <div className="bg-clay-50/50 border border-clay-200 p-6 md:p-8">
          <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-600 mb-2">
            Break-even quantity
          </div>
          {valid ? (
            <>
              <div className="font-display italic text-5xl text-clay-700 tabular leading-none mb-1">
                {Math.ceil(Q_BE).toLocaleString()}
              </div>
              <div className="text-xs text-clay-700/70 italic">
                exact: {Q_BE.toFixed(2)} units
              </div>

              <div className="mt-6 pt-6 border-t border-clay-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-clay-700/80">Contribution margin</span>
                  <span className="font-mono tabular text-clay-800">{fmt(margin)}/unit</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-clay-700/80">Total revenue at Qᴮᴱ</span>
                  <span className="font-mono tabular text-clay-800">{fmt(r * Q_BE, { decimals: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-clay-700/80">Total cost at Qᴮᴱ</span>
                  <span className="font-mono tabular text-clay-800">{fmt(FC + v * Q_BE, { decimals: 0 })}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="font-display italic text-2xl text-clay-700 leading-snug">
              No break-even point.
              <span className="block text-sm text-clay-600 mt-2 normal-case not-italic font-sans">
                Revenue per unit must exceed variable cost.
              </span>
            </div>
          )}
        </div>

        {/* Chart panel */}
        <div className="md:col-span-2 bg-white/60 border border-ink-200/60 p-6 md:p-8">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-1">
                Cost / Revenue / Profit
              </div>
              <h4 className="font-display italic text-xl text-ink-900">
                Q = FC / (r − v)
              </h4>
            </div>
          </div>

          {valid ? (
            <BreakEvenChart data={data} Q_BE={Q_BE} FC={FC} r={r} v={v} />
          ) : (
            <div className="h-64 flex items-center justify-center text-ink-400 italic font-display">
              Adjust inputs to display chart
            </div>
          )}
        </div>
      </div>

      {/* Sensitivity table */}
      {valid && (
        <div className="bg-white/60 border border-ink-200/60 overflow-x-auto">
          <table className="w-full tabular text-sm">
            <thead className="bg-ink-100/40">
              <tr>
                <th className="px-4 py-3 text-left font-mono text-[10px] tracking-widest-2 uppercase text-ink-500">
                  Quantity
                </th>
                <th className="px-4 py-3 text-right font-mono text-[10px] tracking-widest-2 uppercase text-ink-500">
                  Revenue
                </th>
                <th className="px-4 py-3 text-right font-mono text-[10px] tracking-widest-2 uppercase text-ink-500">
                  Total Cost
                </th>
                <th className="px-4 py-3 text-right font-mono text-[10px] tracking-widest-2 uppercase text-ink-500">
                  Profit / Loss
                </th>
              </tr>
            </thead>
            <tbody>
              {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((mult) => {
                const q = Q_BE * mult;
                const rev = r * q;
                const cost = FC + v * q;
                const profit = rev - cost;
                const isBE = mult === 1.0;
                return (
                  <tr
                    key={mult}
                    className={`border-b border-ink-200/40 ${
                      isBE ? 'bg-clay-50/30' : ''
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <span className="font-display italic text-ink-700">
                        {Math.round(q).toLocaleString()}
                      </span>
                      <span className="text-xs text-ink-500 ml-2">
                        ({(mult * 100).toFixed(0)}% of Qᴮᴱ)
                      </span>
                      {isBE && (
                        <span className="ml-2 font-mono text-[9px] tracking-widest-2 uppercase text-clay-600">
                          ◆ break-even
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-ink-700">
                      {fmt(rev, { decimals: 0 })}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-ink-700">
                      {fmt(cost, { decimals: 0 })}
                    </td>
                    <td
                      className={`px-4 py-2.5 text-right font-mono font-semibold ${
                        profit > 0
                          ? 'text-sage-700'
                          : profit < 0
                          ? 'text-clay-700'
                          : 'text-ink-700'
                      }`}
                    >
                      {profit >= 0 ? '+' : ''}
                      {fmt(profit, { decimals: 0 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── SVG break-even chart ────────────────────────────────────────────────────
function BreakEvenChart({ data, Q_BE, FC, r, v }) {
  const W = 640, H = 320;
  const pad = { top: 16, right: 80, bottom: 40, left: 70 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  if (data.length === 0) return null;

  const maxQ = data[data.length - 1].q;
  const maxY = Math.max(
    data[data.length - 1].revenue,
    data[data.length - 1].cost
  );

  const x = (q) => (q / maxQ) * innerW;
  const y = (val) => innerH - (val / maxY) * innerH;

  const revenuePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(d.q).toFixed(2)} ${y(d.revenue).toFixed(2)}`)
    .join(' ');

  const costPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(d.q).toFixed(2)} ${y(d.cost).toFixed(2)}`)
    .join(' ');

  // Loss area (cost > revenue, q < Q_BE)
  const lossData = data.filter((d) => d.q <= Q_BE);
  const lossArea = lossData.length >= 2
    ? `M ${x(lossData[0].q)} ${y(lossData[0].revenue)} ${
        lossData.map((d) => `L ${x(d.q)} ${y(d.revenue)}`).join(' ')
      } ${
        [...lossData].reverse().map((d) => `L ${x(d.q)} ${y(d.cost)}`).join(' ')
      } Z`
    : '';

  // Profit area (revenue > cost, q > Q_BE)
  const profitData = data.filter((d) => d.q >= Q_BE);
  const profitArea = profitData.length >= 2
    ? `M ${x(profitData[0].q)} ${y(profitData[0].cost)} ${
        profitData.map((d) => `L ${x(d.q)} ${y(d.cost)}`).join(' ')
      } ${
        [...profitData].reverse().map((d) => `L ${x(d.q)} ${y(d.revenue)}`).join(' ')
      } Z`
    : '';

  // Y-axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1.0].map((t) => t * maxY);
  // X-axis ticks
  const xTicks = [0, 0.25, 0.5, 0.75, 1.0].map((t) => t * maxQ);

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

        {/* Loss & profit areas */}
        {lossArea && <path d={lossArea} fill="#b8492e" fillOpacity="0.08" />}
        {profitArea && <path d={profitArea} fill="#5a6e5a" fillOpacity="0.1" />}

        {/* BE vertical line */}
        <line
          x1={x(Q_BE)}
          x2={x(Q_BE)}
          y1={0}
          y2={innerH}
          stroke="#b8492e"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Revenue line */}
        <path d={revenuePath} fill="none" stroke="#1a1612" strokeWidth="1.8" />
        {/* Cost line */}
        <path d={costPath} fill="none" stroke="#cd6a4d" strokeWidth="1.8" />

        {/* BE point */}
        <circle cx={x(Q_BE)} cy={y(r * Q_BE)} r="5" fill="#b8492e" stroke="#faf7f2" strokeWidth="2" />

        {/* End-point labels */}
        <text
          x={x(maxQ) + 6}
          y={y(data[data.length - 1].revenue) + 4}
          fontSize="10"
          fill="#1a1612"
          className="font-mono"
        >
          R = r·Q
        </text>
        <text
          x={x(maxQ) + 6}
          y={y(data[data.length - 1].cost) + 4}
          fontSize="10"
          fill="#cd6a4d"
          className="font-mono"
        >
          TC
        </text>

        {/* BE label */}
        <text
          x={x(Q_BE)}
          y={-4}
          textAnchor="middle"
          fontSize="9"
          fill="#b8492e"
          className="font-mono"
        >
          Qᴮᴱ
        </text>

        {/* FC point on y-axis */}
        <circle cx={0} cy={y(FC)} r="3" fill="#cd6a4d" />
        <text
          x={-8}
          y={y(FC) - 6}
          textAnchor="end"
          fontSize="9"
          fill="#cd6a4d"
          className="font-mono"
        >
          FC
        </text>

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
            ${t >= 1000 ? `${(t / 1000).toFixed(0)}k` : t.toFixed(0)}
          </text>
        ))}

        {/* X-axis labels */}
        {xTicks.map((t, i) => (
          <text
            key={`xl-${i}`}
            x={x(t)}
            y={innerH + 16}
            textAnchor="middle"
            fontSize="9"
            fill="#8c7e63"
            className="font-mono"
          >
            {Math.round(t).toLocaleString()}
          </text>
        ))}

        {/* Axes */}
        <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="#1a1612" strokeWidth="1" />
        <line x1={0} y1={0} x2={0} y2={innerH} stroke="#1a1612" strokeWidth="1" />

        {/* Axis titles */}
        <text
          x={innerW / 2}
          y={innerH + 32}
          textAnchor="middle"
          fontSize="10"
          fill="#5e5240"
          className="font-mono"
          letterSpacing="2"
        >
          QUANTITY · Q
        </text>
      </g>
    </svg>
  );
}
