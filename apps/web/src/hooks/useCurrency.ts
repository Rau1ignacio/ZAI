import { useMemo } from "react";
import { useCurrencyStore } from "../store/useCurrencyStore";
import { useExchangeRates } from "./useExchangeRates";

export function useCurrency() {
  const currency = useCurrencyStore((state) => state.currency);
  const { data, isLoading } = useExchangeRates();

  const rate = useMemo(() => {
    if (currency === "CLP") {
      return 1;
    }
    return data?.rates?.USD ?? 1;
  }, [currency, data]);

  const format = useMemo(() => {
    const fractionDigits = currency === "CLP" ? 0 : 2;
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  }, [currency]);

  const convert = (value: number) => value * rate;

  return {
    currency,
    convert,
    format,
    isLoading,
    updatedAt: data?.date ?? null,
  };
}
