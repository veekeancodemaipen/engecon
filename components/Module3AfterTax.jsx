'use client';

import { useState, useMemo } from 'react';
import { SectionHead, Card, Formula, NumberInput, Pill, fmt, fmtPct } from './ui';

export default function Module3AfterTax() {
  return (
    <article className="fade-up">
      <header className="mb-16 pt-4">
        <Pill color="clay">Module 03</Pill>
        <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] text-ink-900 max-w-3xl">
          After-Tax Analysis
          <br />
          <em className="text-clay-600">& Bonds</em>
        </h1>
        <p className="lead mt-6 max-w-2xl">
          Strip out depreciation to get taxable income, apply the rate, and
          arrive at after-tax cash flow. Then — value a bond as the present
          worth of a known stream of coupons plus face value.
        </p>
      </header>

      {/* ─── Income terminology ────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead
          kicker="1 · Tax terminology"
          title="From revenue to after-tax cash flow"
        >
          Each line strips one more deduction from the previous. The order
          matters: depreciation reduces taxes but is not a cash expense, so
          it's added back at the end.
        </SectionHead>

        <div className="space-y-3 mb-8">
          <Equation
            label="Net Operating Income"
            symbol="NOI = EBIT"
            formula="GI − OE"
            note="Gross income minus operating expenses. Earnings before interest and taxes."
          />
          <Equation
            label="Taxable Income"
            symbol="TI"
            formula="GI − OE − D"
            note="Subtract depreciation. This is what the tax rate is applied to."
            highlight
          />
          <Equation
            label="Income Tax"
            symbol="Tax"
            formula="Tᵣ · TI"
            note="Tax rate times taxable income."
          />
          <Equation
            label="Net Operating Profit After Tax"
            symbol="NOPAT"
            formula="TI(1 − Tᵣ)"
            note="What remains after tax — but still excludes depreciation as a cash item."
          />
          <Equation
            label="Cash Flow After Tax"
            symbol="CFAT"
            formula="GI − OE − D + D − (GI − OE − D)·Tᵣ"
            note="Add depreciation back in. The 'tax shield' from depreciation creates real cash savings."
            highlight
          />
        </div>

        <div className="border-l-2 border-clay-500 pl-6 py-3">
          <p className="text-sm text-ink-700 leading-relaxed">
            <span className="font-display italic text-ink-900">
              Why depreciation method matters:
            </span>{' '}
            total taxes paid are equal across all methods, but the{' '}
            <span className="math">PW</span> of taxes is lower under
            accelerated methods (DB, DDB, SYD) — because deductions arrive
            earlier and are more valuable in present-worth terms.
          </p>
        </div>
      </section>

      {/* ─── Bonds ─────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHead
          kicker="2 · Bonds"
          title="Anatomy of a bond"
        >
          A bond promises a stream of coupon payments plus the face value at
          maturity. To value it, discount that stream at the investor's
          required rate.
        </SectionHead>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-2">
              Face value
            </div>
            <h4 className="font-display text-2xl text-ink-900 italic mb-2">V</h4>
            <p className="text-sm text-ink-600">
              Repaid in full at the maturity date. The principal.
            </p>
          </Card>
          <Card>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-2">
              Coupon rate
            </div>
            <h4 className="font-display text-2xl text-ink-900 italic mb-2">b</h4>
            <p className="text-sm text-ink-600">
              The stated annual interest rate. Determines coupon size — but{' '}
              <em>not</em> the discount rate used in valuation.
            </p>
          </Card>
        </div>

        <Formula label="Periodic interest payment">
          I = (V · b) / c
        </Formula>
        <p className="text-sm text-ink-600 italic mb-8 -mt-4 ml-6">
          where c = number of coupon periods per year (annual: 1, semiannual:
          2, quarterly: 4)
        </p>

        <BondValuator />
      </section>

      {/* ─── Bond ROR ──────────────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHead
          kicker="3 · Bond ROR"
          title="The bond as an investment"
        >
          To find the yield on a bond purchased at any price, set up the PW
          equation: purchase price = PW of coupons + PW of face value, and
          solve for the periodic rate.
        </SectionHead>

        <div className="bg-white/60 border border-ink-200/60 p-6 md:p-8">
          <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 mb-3">
            Yield to maturity setup
          </div>
          <div className="font-display italic text-xl text-ink-900 leading-relaxed">
            −Price + I (P/A, i*, n) + V (P/F, i*, n) = 0
          </div>
          <p className="mt-4 text-sm text-ink-600 leading-relaxed">
            Solve for <span className="math">i*</span> by trial-and-error or
            with a financial calculator's IRR. The result is the periodic
            rate — multiply by c to get the annual nominal rate, or compound
            for the effective annual rate.
          </p>
        </div>
      </section>
    </article>
  );
}

// ─── Equation row ────────────────────────────────────────────────────────────
function Equation({ label, symbol, formula, note, highlight }) {
  return (
    <div
      className={`grid md:grid-cols-12 gap-4 items-baseline p-4 ${
        highlight
          ? 'bg-clay-50/40 border border-clay-200'
          : 'border-b border-ink-200/50'
      }`}
    >
      <div className="md:col-span-3">
        <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500">
          {label}
        </div>
        <div className="font-display italic text-lg text-ink-900 mt-1">
          {symbol}
        </div>
      </div>
      <div className="md:col-span-3 font-display italic text-base text-ink-800">
        = {formula}
      </div>
      <div className="md:col-span-6 text-sm text-ink-600 leading-relaxed">
        {note}
      </div>
    </div>
  );
}

// ─── Bond valuator ───────────────────────────────────────────────────────────
function BondValuator() {
  const [V, setV] = useState(500000);
  const [bRate, setBRate] = useState(4); // % per year
  const [yrs, setYrs] = useState(10);
  const [c, setC] = useState(2); // payments per year
  const [iRate, setIRate] = useState(6); // investor's required rate %

  const periodicRate = (iRate / 100) / c;
  const periodicCoupon = (V * (bRate / 100)) / c;
  const nPeriods = yrs * c;

  const pwCoupons = useMemo(() => {
    if (periodicRate === 0) return periodicCoupon * nPeriods;
    return periodicCoupon * (1 - Math.pow(1 + periodicRate, -nPeriods)) / periodicRate;
  }, [periodicCoupon, periodicRate, nPeriods]);

  const pwFace = V * Math.pow(1 + periodicRate, -nPeriods);
  const purchasePrice = pwCoupons + pwFace;

  const premium = purchasePrice > V;
  const discount = purchasePrice < V;

  return (
    <div className="bg-white/60 border border-ink-200/60 p-6 md:p-8">
      <div className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-500 mb-4">
        Bond Valuator
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <NumberInput label="Face value V" value={V} onChange={setV} prefix="$" step={1000} />
        <NumberInput label="Coupon rate b" value={bRate} onChange={setBRate} suffix="%/yr" step={0.25} />
        <NumberInput label="Years to maturity" value={yrs} onChange={setYrs} suffix="yrs" min={1} />
        <NumberInput label="Payments / year — c" value={c} onChange={setC} min={1} max={12} />
        <NumberInput label="Required rate i" value={iRate} onChange={setIRate} suffix="%/yr" step={0.25} />
      </div>

      <div className="border-t border-ink-200/60 pt-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 mb-1">
              Coupon per period
            </div>
            <div className="font-mono text-lg tabular text-ink-800">
              {fmt(periodicCoupon, { decimals: 2 })}
            </div>
            <div className="text-xs text-ink-500 mt-1">
              I = (V · b) / c
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-widest-2 uppercase text-ink-500 mb-1">
              Periodic discount rate
            </div>
            <div className="font-mono text-lg tabular text-ink-800">
              {fmtPct(periodicRate, 3)}
            </div>
            <div className="text-xs text-ink-500 mt-1">
              i / c
            </div>
          </div>
        </div>

        <div className="border border-ink-200 bg-paper/40 p-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-ink-600">PW of coupons (P/A)</span>
              <span className="font-mono tabular text-ink-800">
                {fmt(pwCoupons, { decimals: 0 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-600">PW of face value (P/F)</span>
              <span className="font-mono tabular text-ink-800">
                {fmt(pwFace, { decimals: 0 })}
              </span>
            </div>
          </div>

          <div className="border-t border-ink-300 pt-3 flex justify-between items-baseline">
            <span className="font-mono text-[10px] tracking-widest-2 uppercase text-clay-600">
              Fair Purchase Price
            </span>
            <span className="font-display italic text-3xl text-clay-700 tabular">
              {fmt(purchasePrice, { decimals: 0 })}
            </span>
          </div>

          <div className="mt-3 text-xs text-ink-600 italic">
            {premium && (
              <>
                Trades at a <span className="text-clay-600 font-semibold">premium</span> — coupon rate exceeds required rate.
              </>
            )}
            {discount && (
              <>
                Trades at a <span className="text-clay-600 font-semibold">discount</span> — coupon rate below required rate.
              </>
            )}
            {!premium && !discount && (
              <>Trades at <span className="font-semibold">par</span> — coupon equals required rate.</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
