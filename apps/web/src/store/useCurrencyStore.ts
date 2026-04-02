import { create } from "zustand";

export type CurrencyCode = "CLP" | "USD";

type CurrencyState = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
};

// Preferencias de divisa para todo el MVP.
export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: "CLP",
  setCurrency: (currency) => set({ currency }),
}));
