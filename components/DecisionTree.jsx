'use client';

import { useState } from 'react';

// ─── A small, hand-drawn-feeling decision tree visualization ─────────────────
export default function DecisionTree() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bg-white/60 border border-ink-200/60 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-1">
            Tree structure
          </div>
          <h3 className="font-display text-xl text-ink-900 italic">
            Build left → right · evaluate right → left
          </h3>
        </div>
      </div>

      <svg viewBox="0 0 720 360" className="w-full h-auto">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#8c7e63" />
          </marker>
        </defs>

        {/* Branches — Decision D1 to two prob nodes */}
        <g stroke="#8c7e63" strokeWidth="1.2" fill="none">
          {/* D1 → Lease prob node */}
          <path d="M 80 180 L 200 90" />
          {/* D1 → Own prob node */}
          <path d="M 80 180 L 200 270" />

          {/* Lease → Good outcome (D2) */}
          <path d="M 220 90 L 360 50" />
          {/* Lease → Poor outcome (D3) */}
          <path d="M 220 90 L 360 130" />

          {/* Own → Good outcome (D4) */}
          <path d="M 220 270 L 360 230" />
          {/* Own → Poor outcome (D5) */}
          <path d="M 220 270 L 360 310" />

          {/* D2 → 3 alternatives */}
          <path d="M 380 50 L 540 25" />
          <path d="M 380 50 L 540 50" />
          <path d="M 380 50 L 540 75" />

          {/* D3 → 2 alternatives */}
          <path d="M 380 130 L 540 115" />
          <path d="M 380 130 L 540 145" />

          {/* D4 → 2 alternatives */}
          <path d="M 380 230 L 540 215" />
          <path d="M 380 230 L 540 245" />

          {/* D5 → 2 alternatives */}
          <path d="M 380 310 L 540 295" />
          <path d="M 380 310 L 540 325" />
        </g>

        {/* Branch labels */}
        <g className="font-mono" fontSize="9" fill="#5e5240">
          <text x="120" y="125" fontStyle="italic">Lease</text>
          <text x="120" y="230" fontStyle="italic">Own</text>

          <text x="280" y="60" fontStyle="italic" fill="#5a6e5a">Good · 0.5</text>
          <text x="280" y="115" fontStyle="italic" fill="#b8492e">Poor · 0.5</text>

          <text x="280" y="240" fontStyle="italic" fill="#5a6e5a">Good · 0.4</text>
          <text x="280" y="295" fontStyle="italic" fill="#b8492e">Poor · 0.6</text>

          <text x="455" y="22"  fill="#5e5240">2×</text>
          <text x="455" y="47"  fill="#5e5240">1×</text>
          <text x="455" y="72"  fill="#5e5240">0.5×</text>

          <text x="455" y="113" fill="#5e5240">0.5×</text>
          <text x="455" y="143" fill="#5e5240">0×</text>

          <text x="455" y="213" fill="#5e5240">4×</text>
          <text x="455" y="243" fill="#5e5240">2×</text>

          <text x="455" y="293" fill="#5e5240">1×</text>
          <text x="455" y="323" fill="#5e5240">0×</text>
        </g>

        {/* Decision nodes (squares) */}
        <DecisionNode x={60}  y={160} label="D1" hovered={hovered} setHovered={setHovered} />
        <DecisionNode x={360} y={30}  label="D2" small hovered={hovered} setHovered={setHovered} />
        <DecisionNode x={360} y={110} label="D3" small hovered={hovered} setHovered={setHovered} />
        <DecisionNode x={360} y={210} label="D4" small hovered={hovered} setHovered={setHovered} />
        <DecisionNode x={360} y={290} label="D5" small hovered={hovered} setHovered={setHovered} />

        {/* Probability nodes (circles) */}
        <ProbNode cx={210} cy={90}  hovered={hovered} setHovered={setHovered} />
        <ProbNode cx={210} cy={270} hovered={hovered} setHovered={setHovered} />

        {/* Outcome leaves */}
        {[25, 50, 75, 115, 145, 215, 245, 295, 325].map((y, i) => (
          <circle key={i} cx={555} cy={y} r="2.5" fill="#1a1612" />
        ))}

        {/* Stage labels */}
        <g className="font-mono" fontSize="9" fill="#b8492e" letterSpacing="1">
          <text x="40"  y="345" textAnchor="start">NOW</text>
          <text x="345" y="345" textAnchor="start">+ 2 YRS</text>
          <text x="540" y="345" textAnchor="start">OUTCOMES</text>
        </g>
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-ink-200/60">
        <div
          onMouseEnter={() => setHovered('decision')}
          onMouseLeave={() => setHovered(null)}
          className={`p-4 border transition-all cursor-help ${
            hovered === 'decision'
              ? 'border-clay-500 bg-clay-50/50'
              : 'border-ink-200/60'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <rect x="3" y="3" width="14" height="14" fill="none" stroke="#1a1612" strokeWidth="1.5" />
            </svg>
            <span className="font-display italic text-base text-ink-900">
              Decision node
            </span>
          </div>
          <p className="text-xs text-ink-600 leading-relaxed">
            Branches into <em>alternatives</em> the decision-maker chooses
            between. At evaluation, pick the alternative with the best{' '}
            <span className="math">E(PW)</span>.
          </p>
        </div>

        <div
          onMouseEnter={() => setHovered('probability')}
          onMouseLeave={() => setHovered(null)}
          className={`p-4 border transition-all cursor-help ${
            hovered === 'probability'
              ? 'border-clay-500 bg-clay-50/50'
              : 'border-ink-200/60'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="7" fill="none" stroke="#1a1612" strokeWidth="1.5" />
            </svg>
            <span className="font-display italic text-base text-ink-900">
              Probability node
            </span>
          </div>
          <p className="text-xs text-ink-600 leading-relaxed">
            Branches into <em>outcomes</em> with probabilities. At evaluation,
            compute the expected value{' '}
            <span className="math">E(X) = Σ xᵢ · P(xᵢ)</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

function DecisionNode({ x, y, label, small, hovered, setHovered }) {
  const size = small ? 20 : 30;
  const isHi = hovered === 'decision';
  return (
    <g
      onMouseEnter={() => setHovered('decision')}
      onMouseLeave={() => setHovered(null)}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        fill={isHi ? '#b8492e' : '#1a1612'}
        stroke={isHi ? '#b8492e' : '#1a1612'}
        strokeWidth="1.5"
        rx="1"
      />
      <text
        x={x + size / 2}
        y={y + size / 2 + 4}
        textAnchor="middle"
        className="font-mono"
        fontSize={small ? 9 : 11}
        fill="#faf7f2"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );
}

function ProbNode({ cx, cy, hovered, setHovered }) {
  const isHi = hovered === 'probability';
  return (
    <circle
      cx={cx}
      cy={cy}
      r="10"
      fill={isHi ? '#b8492e' : '#faf7f2'}
      stroke={isHi ? '#b8492e' : '#1a1612'}
      strokeWidth="1.5"
      onMouseEnter={() => setHovered('probability')}
      onMouseLeave={() => setHovered(null)}
      style={{ cursor: 'pointer' }}
    />
  );
}
