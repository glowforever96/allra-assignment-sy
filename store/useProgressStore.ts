import { create } from "zustand";

interface ProgressState {
  value: number;
  increase: (amount: number) => void;
  decrease: (amount: number) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  value: 0,
  increase: (amount) =>
    set((state) => ({ value: Math.min(state.value + amount, 100) })),
  decrease: (amount) =>
    set((state) => ({ value: Math.max(state.value - amount, 0) })),
  reset: () => set({ value: 0 }),
}));
