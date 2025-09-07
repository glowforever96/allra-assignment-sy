import { create } from "zustand";

type ProgressStep =
  | "policy"
  | "businessNumber"
  | "password"
  | "confirmPassword"
  | "companyName"
  | "userName"
  | "birthDate"
  | "phone"
  | "email";
interface ProgressState {
  value: number;
  steps: Record<ProgressStep, boolean>;
  stepWeights: Record<ProgressStep, number>;
  updateStep: (step: ProgressStep, isValid: boolean) => void;
  calculateProgress: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  value: 0,
  steps: {
    policy: false,
    businessNumber: false,
    password: false,
    confirmPassword: false,
    companyName: false,
    userName: false,
    birthDate: false,
    phone: false,
    email: false,
  },
  stepWeights: {
    policy: 15,
    businessNumber: 11,
    password: 11,
    confirmPassword: 10,
    companyName: 10,
    userName: 11,
    birthDate: 11,
    phone: 10,
    email: 11,
  },
  updateStep: (step: string, isValid: boolean) => {
    set((state) => ({
      steps: { ...state.steps, [step]: isValid },
    }));
    get().calculateProgress();
  },
  calculateProgress: () => {
    const { steps, stepWeights } = get();
    let totalProgress = 0;
    Object.entries(steps).forEach(([step, isValid]) => {
      if (isValid) {
        totalProgress += stepWeights[step as ProgressStep];
      }
    });
    set({ value: Math.min(totalProgress, 100) });
  },
  resetProgress: () => {
    set({
      value: 0,
      steps: {
        policy: false,
        businessNumber: false,
        password: false,
        confirmPassword: false,
        companyName: false,
        userName: false,
        birthDate: false,
        phone: false,
        email: false,
      },
    });
  },
}));
