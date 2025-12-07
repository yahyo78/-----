"use client"

import { RATE_HISTORY, calculateForecast, formatRate } from "@/lib/currency-data"

export default function RateForecast() {
  return (
    <div className="forecast-section">
      <div className="section-header">
        <h2>📈 Прогноз на 7 дней</h2>
        <p className="section-subtitle">Простой средний прогноз курсов</p>
      </div>

      <div className="forecast-grid">
        {RATE_HISTORY.map((history) => {
          const forecast = calculateForecast(history.rates)
          const currentRate = history.rates[history.rates.length - 1]
          const trend = forecast > currentRate ? "up" : forecast < currentRate ? "down" : "stable"

          return (
            <div key={history.currency} className="forecast-card">
              <div className="card-header">
                <h3>{history.currency}</h3>
                <div className={`trend-badge trend-${trend}`}>
                  {trend === "up" ? "↗ Рост" : trend === "down" ? "↘ Падение" : "→ Стабильно"}
                </div>
              </div>

              <div className="forecast-highlight">
                <div className="forecast-item">
                  <span className="label">Текущий курс</span>
                  <span className="value">{formatRate(currentRate)}</span>
                </div>
                <div className="forecast-item">
                  <span className="label">Прогноз</span>
                  <span className="value forecast-value">{formatRate(forecast)}</span>
                </div>
              </div>

              <div className="recent-rates">
                <p className="rates-label">Последние 7 дней</p>
                <div className="rates-sparkline">
                  {history.rates.map((rate, index) => {
                    const minRate = Math.min(...history.rates)
                    const maxRate = Math.max(...history.rates)
                    const range = maxRate - minRate || 1
                    const height = ((rate - minRate) / range) * 100

                    return (
                      <div
                        key={index}
                        className="spark-bar"
                        style={{ height: `${Math.max(10, height)}%` }}
                        title={`${history.dates[index]}: ${formatRate(rate)}`}
                      />
                    )
                  })}
                </div>
              </div>

              <div className="rates-detail">
                {history.dates.map((date, index) => (
                  <div key={index} className="date-rate">
                    <span className="date">{date}</span>
                    <span className="rate">{formatRate(history.rates[index])}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .forecast-section {
          margin-bottom: 2rem;
          animation: slideUp 0.7s ease-out;
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

        .forecast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .forecast-card {
          background: white;
          border: 1.5px solid var(--border-light);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .forecast-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s ease;
        }

        .forecast-card:hover {
          border-color: var(--primary);
          box-shadow: 0 8px 24px rgba(0, 80, 200, 0.12);
          transform: translateY(-4px);
        }

        .forecast-card:hover::before {
          left: 100%;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1.5px solid var(--border-light);
        }

        .card-header h3 {
          margin: 0;
          color: var(--primary);
          font-size: 1.3rem;
          font-weight: 700;
        }

        .trend-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .trend-up {
          background: var(--success-light);
          color: var(--success);
        }

        .trend-down {
          background: var(--error-light);
          color: var(--error);
        }

        .trend-stable {
          background: var(--primary-light);
          color: var(--primary);
        }

        .forecast-highlight {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
          background: var(--background-light);
          padding: 1rem;
          border-radius: 10px;
        }

        .forecast-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .forecast-item .label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .forecast-item .value {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text);
        }

        .forecast-item .forecast-value {
          color: var(--primary);
        }

        .recent-rates {
          margin-bottom: 1rem;
        }

        .rates-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          font-weight: 600;
          margin: 0 0 0.75rem 0;
        }

        .rates-sparkline {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 40px;
          gap: 0.35rem;
          background: var(--background-light);
          padding: 0.5rem;
          border-radius: 8px;
        }

        .spark-bar {
          flex: 1;
          background: linear-gradient(180deg, var(--primary) 0%, var(--primary-light) 100%);
          border-radius: 3px;
          transition: all 0.2s ease;
          cursor: pointer;
          min-height: 10%;
        }

        .spark-bar:hover {
          opacity: 0.8;
          filter: brightness(1.1);
        }

        .rates-detail {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.4rem;
        }

        .date-rate {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          padding: 0.5rem;
          background: var(--background-light);
          border-radius: 6px;
          font-size: 0.7rem;
        }

        .date-rate .date {
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2px;
        }

        .date-rate .rate {
          color: var(--primary);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .forecast-grid {
            grid-template-columns: 1fr;
          }

          .forecast-highlight {
            grid-template-columns: 1fr;
          }

          .date-rate {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </div>
  )
}
