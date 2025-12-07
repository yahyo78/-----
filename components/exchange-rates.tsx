"use client"

import { type CurrencyRate, CURRENT_RATES, formatRate } from "@/lib/currency-data"

export default function ExchangeRates() {
  return (
    <div className="exchange-rates-section">
      <div className="section-header">
        <h2>📊 Текущие курсы валют</h2>
        <p className="section-subtitle">Обновляются в режиме реального времени (1 TJS = X валюта)</p>
      </div>

      <div className="rates-grid">
        {CURRENT_RATES.map((rate: CurrencyRate) => (
          <div key={rate.code} className="rate-card">
            <div className="rate-header">
              <div className="rate-code-wrapper">
                <span className="rate-code">{rate.code}</span>
                {rate.code === "TJS" && <span className="base-badge">Базовая</span>}
              </div>
            </div>
            <p className="currency-name">{rate.name}</p>
            <div className="rate-value">{rate.code === "TJS" ? "1.0000" : formatRate(rate.rate)}</div>
            {rate.code !== "TJS" && (
              <div className="rate-change">
                <span className="badge-up">↑ 0.5%</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .exchange-rates-section {
          margin-bottom: 2rem;
          animation: slideUp 0.6s ease-out;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          color: var(--text);
          font-weight: 700;
        }

        .section-subtitle {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .rates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .rate-card {
          background: white;
          border: 1.5px solid var(--border-light);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .rate-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .rate-card:hover {
          border-color: var(--primary);
          box-shadow: 0 8px 24px rgba(0, 80, 200, 0.12);
          transform: translateY(-4px);
        }

        .rate-card:hover::before {
          transform: scaleX(1);
        }

        .rate-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .rate-code-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .rate-code {
          font-weight: 800;
          font-size: 1.35rem;
          color: var(--primary);
          letter-spacing: -0.5px;
        }

        .base-badge {
          background: var(--primary-light);
          color: var(--primary);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.35rem 0.65rem;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .currency-name {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 600;
        }

        .rate-value {
          font-size: 1.65rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.5px;
        }

        .rate-change {
          margin-top: 0.75rem;
          display: flex;
          gap: 0.5rem;
        }

        .badge-up {
          background: var(--success-light);
          color: var(--success);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        @media (max-width: 640px) {
          .rates-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .rate-card {
            padding: 1.25rem;
          }

          .rate-code {
            font-size: 1.1rem;
          }

          .rate-value {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </div>
  )
}
