import { create } from 'zustand';

interface IMobileMenuState {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

export const useMobileMenuStore = create<IMobileMenuState>((set) => ({
  open: false,
  toggle: () => set((s) => ({ open: !s.open })),
  close: () => set({ open: false }),
}));