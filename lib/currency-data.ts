// Currency data types
export interface CurrencyRate {
  code: string
  name: string
  rate: number
}

export interface RateHistory {
  currency: string
  rates: number[]
  dates: string[]
}

// Current exchange rates (TJS as base currency)
// All rates are per 1 TJS
export const CURRENT_RATES: CurrencyRate[] = [
  { code: "TJS", name: "Tajikistani Somoni", rate: 1.0 },
  { code: "USD", name: "US Dollar", rate: 0.0926 },
  { code: "EUR", name: "Euro", rate: 0.0879 },
  { code: "RUB", name: "Russian Ruble", rate: 9.15 },
]

// Historical rate data for forecast (last 7 days)
export const RATE_HISTORY: RateHistory[] = [
  {
    currency: "USD",
    rates: [0.092, 0.0923, 0.0925, 0.0924, 0.0926, 0.0927, 0.0926],
    dates: ["Dec 1", "Dec 2", "Dec 3", "Dec 4", "Dec 5", "Dec 6", "Today"],
  },
  {
    currency: "EUR",
    rates: [0.0875, 0.0876, 0.0878, 0.0877, 0.0879, 0.088, 0.0879],
    dates: ["Dec 1", "Dec 2", "Dec 3", "Dec 4", "Dec 5", "Dec 6", "Today"],
  },
  {
    currency: "RUB",
    rates: [9.1, 9.12, 9.13, 9.14, 9.15, 9.16, 9.15],
    dates: ["Dec 1", "Dec 2", "Dec 3", "Dec 4", "Dec 5", "Dec 6", "Today"],
  },
]

// Calculate average (simple forecast) for given rates
export const calculateForecast = (rates: number[]): number => {
  const sum = rates.reduce((acc, rate) => acc + rate, 0)
  return sum / rates.length
}

// Format rate to 4 decimal places
export const formatRate = (rate: number): string => {
  return rate.toFixed(4)
}

// Format currency amount to 2 decimal places
export const formatAmount = (amount: number): string => {
  return amount.toFixed(2)
}
