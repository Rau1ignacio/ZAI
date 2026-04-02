import { create } from "zustand";

type UserState = {
  name: string;
  plan: "starter" | "pro";
  setName: (name: string) => void;
};

// Estado local simple para el MVP (perfil y plan).
export const useUserStore = create<UserState>((set) => ({
  name: "Ignacio",
  plan: "starter",
  setName: (name) => set({ name }),
}));
