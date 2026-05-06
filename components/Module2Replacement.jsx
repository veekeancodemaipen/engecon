'use client';

import { SectionHead, Card, Formula, Pill } from './ui';
import DepreciationCalculator from './DepreciationCalculator';

export default function Module2Replacement() {
  return (
    <article className="fade-up">
      <header className="mb-16 pt-4">
        <Pill color="clay">Module 02</Pill>
        <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] text-ink-900 max-w-3xl">
          Replacement Analysis
          <br />
          <em className="text-clay-600">& Depreciation</em>
        </h1>
        <p className="lead mt-6 max-w-2xl">
          When to replace an existing asset, how to compute its economic
          service life, and how to allocate its cost across the years it
          serves.
        </p>
      </header>

      {/* ─── Defender vs Challenger ─────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead
          kicker="1 · Replacement"
          title="Defender vs. Challenger"
        >
          The current asset (Defender) is compared against a new one
          (Challenger). Adopt the consultant's viewpoint — assume neither is
          owned, and judge each on its forward-looking cash flows.
        </SectionHead>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-ink-100/40 border border-ink-200 p-6 md:p-8">
            <div className="flex items-baseline justify-between mb-4">
              <Pill color="ink">Defender</Pill>
              <span className="font-display italic text-ink-600 text-sm">
                keep the current asset
              </span>
            </div>
            <h3 className="font-display text-2xl text-ink-900 mb-4">
              The current asset
            </h3>
            <ul className="space-y-2 text-sm text-ink-700">
              <li className="flex justify-between border-b border-ink-200/60 pb-1.5">
                <span>First cost</span>
                <span className="font-mono italic text-ink-600">current MV</span>
              </li>
              <li className="flex justify-between border-b border-ink-200/60 pb-1.5">
                <span>AOC</span>
                <span className="font-mono">AOC<sub>D</sub></span>
              </li>
              <li className="flex justify-between border-b border-ink-200/60 pb-1.5">
                <span>Salvage value</span>
                <span className="font-mono">MV — varies by year</span>
              </li>
              <li className="flex justify-between border-b border-ink-200/60 pb-1.5">
                <span>Life</span>
                <span className="font-mono">ESL<sub>D</sub></span>
              </li>
            </ul>
            <p className="text-xs text-ink-500 mt-4 italic">
              Original purchase price is a sunk cost — irrelevant to the
              decision.
            </p>
          </div>

          <div className="bg-clay-50/50 border border-clay-200 p-6 md:p-8">
            <div className="flex items-baseline justify-between mb-4">
              <Pill color="clay">Challenger</Pill>
              <span className="font-display italic text-clay-700 text-sm">
                replace it now
              </span>
            </div>
            <h3 className="font-display text-2xl text-clay-800 mb-4">
              The replacement
            </h3>
            <ul className="space-y-2 text-sm text-clay-900/80">
              <li className="flex justify-between border-b border-clay-200/60 pb-1.5">
                <span>First cost</span>
                <span className="font-mono">P<sub>C</sub> − (TIV − MV<sub>D</sub>)</span>
              </li>
              <li className="flex justify-between border-b border-clay-200/60 pb-1.5">
                <span>AOC</span>
                <span className="font-mono">AOC<sub>C</sub></span>
              </li>
              <li className="flex justify-between border-b border-clay-200/60 pb-1.5">
                <span>Salvage value</span>
                <span className="font-mono">MV — varies by year</span>
              </li>
              <li className="flex justify-between border-b border-clay-200/60 pb-1.5">
                <span>Life</span>
                <span className="font-mono">ESL<sub>C</sub></span>
              </li>
            </ul>
            <p className="text-xs text-clay-700 mt-4 italic">
              If trade-in offered: adjust first cost by (TIV − MV<sub>D</sub>).
            </p>
          </div>
        </div>

        <Formula label="Replacement decision">
          If AW<sub>D</sub> &lt; AW<sub>C</sub> → retain Defender. Otherwise → replace with Challenger.
        </Formula>
      </section>

      {/* ─── ESL ────────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead
          kicker="2 · ESL"
          title="Economic Service Life"
        >
          The number of years that minimizes the AW of total cost. Found by
          computing AW for each candidate life n and picking the n where AW
          bottoms out.
        </SectionHead>

        <Formula label="EUAC at year n">
          AW<sub>n</sub> = CR<sub>n</sub> + AW of AOC<sub>1..n</sub>
        </Formula>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-2">
              EUAC approach
            </div>
            <p className="text-sm text-ink-700 leading-relaxed mb-3">
              For each candidate life n, compute capital recovery from first
              cost and salvage, plus the AW of all AOCs through year n.
            </p>
            <div className="font-mono text-xs text-ink-600 leading-loose bg-paper/40 p-3">
              EUAC<sub>k</sub> = P(A/P, i, k) − S<sub>k</sub>(A/F, i, k)
              <br />
              + [Σ AOC<sub>j</sub>(P/F, i, j)](A/P, i, k)
            </div>
          </Card>

          <Card>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-2">
              Marginal cost approach
            </div>
            <p className="text-sm text-ink-700 leading-relaxed mb-3">
              Build year-by-year marginal cost from three components, then take
              the AW.
            </p>
            <ul className="text-xs text-ink-700 space-y-1.5 leading-relaxed">
              <li>· Loss in market value during the year</li>
              <li>· Forgone interest on MV at year start</li>
              <li>· AOC for the year</li>
            </ul>
          </Card>
        </div>

        <div className="border-l-2 border-sage-500 pl-6 py-2 text-sm text-ink-700 leading-relaxed">
          <span className="font-display italic text-ink-900">
            Visualizing ESL:
          </span>{' '}
          plot CR (decreasing in n) and AW of AOC (increasing in n) on the same
          axes. Their sum — total AW — is U-shaped, and the minimum point is
          the ESL.
        </div>
      </section>

      {/* ─── Depreciation Calculator ───────────────────────────────────── */}
      <section className="mb-12">
        <SectionHead
          kicker="3 · Depreciation"
          title="Method comparison"
        >
          Plug in any first cost, salvage, and life — see how Straight Line,
          150% DB, Double Declining Balance, and Sum-of-Years-Digits stack up.
        </SectionHead>

        <DepreciationCalculator />
      </section>

      {/* ─── Method formulas reference ─────────────────────────────────── */}
      <section className="mb-12">
        <SectionHead kicker="Reference" title="The four formulas">
        </SectionHead>

        <div className="grid md:grid-cols-2 gap-4">
          <MethodCard
            tag="SL"
            name="Straight Line"
            formula="Dₜ = (B − S) / n"
            note="Constant deduction. The standard against which others are compared."
          />
          <MethodCard
            tag="DB"
            name="150% Declining Balance"
            formula="d = 1.5 / n  ·  Dₜ = d · BVₜ₋₁"
            note="Accelerated. Cannot drop below stated salvage."
          />
          <MethodCard
            tag="DDB"
            name="Double Declining Balance"
            formula="d = 2 / n  ·  Dₜ = d · BVₜ₋₁"
            note="Maximum DB rate allowed. Twice the SL rate."
          />
          <MethodCard
            tag="SYD"
            name="Sum-of-Years-Digits"
            formula="dₜ = (n − t + 1) / [n(n+1)/2]"
            note="Accelerated. Dₜ = dₜ(B − S). Always ends exactly at S."
          />
        </div>
      </section>
    </article>
  );
}

function MethodCard({ tag, name, formula, note }) {
  return (
    <div className="bg-white/60 border border-ink-200/60 p-6">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-xs font-bold text-clay-600 tracking-wider">
          {tag}
        </span>
        <span className="font-display italic text-lg text-ink-900">
          {name}
        </span>
      </div>
      <div className="font-mono text-sm text-ink-700 bg-paper/40 px-3 py-2 mb-3">
        {formula}
      </div>
      <p className="text-xs text-ink-600 leading-relaxed">{note}</p>
    </div>
  );
}
