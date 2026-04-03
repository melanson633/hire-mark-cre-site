import { useState } from 'react';

function getInterpretation(dscr) {
  if (dscr >= 1.25) return { color: '#4caf50', label: 'Healthy coverage' };
  if (dscr >= 1.0) return { color: '#e8a839', label: 'Tight coverage' };
  return { color: '#e05252', label: 'Below breakeven' };
}

export default function DSCRCalculator() {
  const [noi, setNoi] = useState('');
  const [debtService, setDebtService] = useState('');

  const noiVal = parseFloat(noi);
  const dsVal = parseFloat(debtService);
  const canCalculate = !isNaN(noiVal) && !isNaN(dsVal) && dsVal > 0 && noiVal > 0;
  const dscr = canCalculate ? noiVal / dsVal : null;
  const interp = dscr !== null ? getInterpretation(dscr) : null;

  return (
    <div className="dscr-calculator">
      <div className="dscr-inputs">
        <div className="dscr-field">
          <label>Net Operating Income (NOI)</label>
          <input
            type="number"
            min="0"
            step="1000"
            placeholder="$500,000"
            value={noi}
            onChange={(e) => setNoi(e.target.value)}
          />
        </div>
        <div className="dscr-field">
          <label>Annual Debt Service</label>
          <input
            type="number"
            min="0"
            step="1000"
            placeholder="$400,000"
            value={debtService}
            onChange={(e) => setDebtService(e.target.value)}
          />
        </div>
      </div>
      <div className="dscr-result">
        {interp ? (
          <>
            <span className="dscr-value" style={{ color: interp.color }}>
              {dscr.toFixed(2)}
            </span>
            <span className="dscr-label">{interp.label}</span>
          </>
        ) : (
          <span className="dscr-label" style={{ color: '#999' }}>
            Enter values above to calculate
          </span>
        )}
      </div>
    </div>
  );
}
