import type { CurrencyCode } from "../store/useCurrencyStore";

interface ExchangeRatesResponse {
  base: CurrencyCode;
  date: string;
  rates: Record<CurrencyCode, number>;
}

/**
 * Obtiene tasas de cambio diarias desde API
 * Usa Open Exchange Rates o similar (puede integrarse con API real)
 */
export async function fetchDailyRates(
  baseCode: CurrencyCode,
  symbols: CurrencyCode[]
): Promise<ExchangeRatesResponse> {
  try {
    // TODO: Reemplazar con API real cuando esté disponible
    // const apiKey = import.meta.env.VITE_EXCHANGE_RATES_API_KEY;
    // const symbolsParam = symbols.join(",");
    // const response = await fetch(
    //   `https://api.exchangerate-api.com/v4/latest/${baseCode}?symbols=${symbolsParam}`
    // );

    // Por ahora, retornar tasas simuladas
    const mockRates: Record<CurrencyCode, number> = {
      CLP: 1,
      USD: 0.00115, // 1 CLP = 0.00115 USD (aproximado)
      EUR: 0.00106,
      MXN: 0.02,
      BRL: 0.0057,
      ARS: 0.1,
      COP: 0.00025,
      PEN: 0.0043,
      UYU: 0.045,
      BOB: 0.0079,
    };

    return {
      base: baseCode,
      date: new Date().toISOString().split("T")[0],
      rates: symbols.reduce(
        (acc, symbol) => {
          acc[symbol] = mockRates[symbol] || 1;
          return acc;
        },
        {} as Record<CurrencyCode, number>
      ),
    };
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    // Retornar tasas por defecto en caso de error
    return {
      base: baseCode,
      date: new Date().toISOString().split("T")[0],
      rates: symbols.reduce(
        (acc, symbol) => {
          acc[symbol] = symbol === "USD" ? 0.00115 : 1;
          return acc;
        },
        {} as Record<CurrencyCode, number>
      ),
    };
  }
}

/**
 * Convierte entre dos divisas
 */
export function convertCurrency(
  amount: number,
  fromRate: number,
  toRate: number
): number {
  if (fromRate === 0) return 0;
  return (amount / fromRate) * toRate;
}

/**
 * Formatea moneda según locale
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
  locale: string = "es-CL"
): string {
  const currencySymbols: Record<CurrencyCode, string> = {
    CLP: "$",
    USD: "US$",
    EUR: "€",
    MXN: "$",
    BRL: "R$",
    ARS: "$",
    COP: "$",
    PEN: "S/",
    UYU: "$U",
    BOB: "Bs.",
  };

  const symbol = currencySymbols[currencyCode] || currencyCode;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${symbol} ${formatted}`;
}
