import { useQuery } from "@tanstack/react-query";
import { fetchDailyRates } from "../../services/exchangeRates";
import type { CurrencyCode } from "../../store/useCurrencyStore";

const BASE_CURRENCY: CurrencyCode = "CLP";
const SYMBOLS: CurrencyCode[] = ["USD"];

export function useExchangeRates() {
  return useQuery({
    queryKey: ["exchange-rates", BASE_CURRENCY],
    queryFn: () => fetchDailyRates(BASE_CURRENCY, SYMBOLS),
    staleTime: 1000 * 60 * 60 * 6,
    refetchOnWindowFocus: false,
  });
}
