import type { CurrencyCode } from "../../store/useCurrencyStore";

type RatesResponse = {
  base: string;
  date: string;
  rates: Record<string, number>;
};

// Frankfurter entrega tasas diarias sin necesidad de API key.
export async function fetchDailyRates(
  base: CurrencyCode,
  symbols: CurrencyCode[]
): Promise<RatesResponse> {
  const params = new URLSearchParams({
    base,
    symbols: symbols.join(","),
  });

  const response = await fetch(`https://api.frankfurter.dev/v2/latest?${params}`);
  if (!response.ok) {
    throw new Error("No se pudo obtener la cotizacion diaria.");
  }

  return response.json() as Promise<RatesResponse>;
}
