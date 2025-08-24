import { create } from "zustand";

interface AlertStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
