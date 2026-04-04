import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
  collapsed: boolean;
  mobileOpen: boolean;
  setCollapsed: (value: boolean) => void;
  toggleCollapsed: () => void;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      collapsed: false,
      mobileOpen: false,
      setCollapsed: (value) => set({ collapsed: value }),
      toggleCollapsed: () => set({ collapsed: !get().collapsed }),
      openMobile: () => set({ mobileOpen: true }),
      closeMobile: () => set({ mobileOpen: false }),
      toggleMobile: () => set({ mobileOpen: !get().mobileOpen }),
    }),
    {
      name: "zai-sidebar-preferences",
      partialize: (state) => ({ collapsed: state.collapsed }),
    }
  )
);
