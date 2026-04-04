import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminSidebarState = {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapsed: () => void;
  openMobile: () => void;
  closeMobile: () => void;
};

export const useAdminSidebarStore = create<AdminSidebarState>()(
  persist(
    (set, get) => ({
      collapsed: false,
      mobileOpen: false,
      toggleCollapsed: () => set({ collapsed: !get().collapsed }),
      openMobile: () => set({ mobileOpen: true }),
      closeMobile: () => set({ mobileOpen: false }),
    }),
    {
      name: "zai-admin-sidebar",
      partialize: (state) => ({ collapsed: state.collapsed }),
    }
  )
);
