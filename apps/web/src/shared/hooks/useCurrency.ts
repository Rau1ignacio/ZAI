import { useMemo } from "react";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { useExchangeRates } from "./useExchangeRates";
import { formatCurrency } from "../utils/formatCurrency";

export function useCurrency() {
  const currency = useCurrencyStore((state) => state.currency);
  const { data, isLoading } = useExchangeRates();

  const rate = useMemo(() => {
    if (currency === "CLP") {
      return 1;
    }
    return data?.rates?.USD ?? 1;
  }, [currency, data]);

  const convert = (value: number) => value * rate;
  const formatValue = (value: number) => formatCurrency(value, currency);

  return {
    currency,
    convert,
    format: Object.assign(formatValue, { format: formatValue }) as ((
      value: number
    ) => string) & { format: (value: number) => string },
    isLoading,
    updatedAt: data?.date ?? null,
  };
}
