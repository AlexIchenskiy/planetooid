import { NOISE_VARIANTS, type INoiseVariant } from '@/components/3d/utils/noise';
import { create } from 'zustand';

interface ISettingsState {
  seed: number;
  variant: INoiseVariant;
  generationTrigger: number;

  setSeed: (seed: number) => void;
  setVariant: (variant: INoiseVariant) => void;

  randomizeSeed: () => void;
  randomizeAll: () => void;
  generate: () => void;
}

export const useSettingsStore = create<ISettingsState>((set) => ({
  seed: Math.floor(Math.random() * 99999),
  variant: 'fbm',
  generationTrigger: 0,

  setSeed: (seed) => set({ seed }),
  setVariant: (variant) => set({variant}),

  randomizeSeed: () =>
    set({ seed: Math.floor(Math.random() * 99999) }),

  randomizeAll: () => set({
    seed: Math.floor(Math.random() * 99999),
    variant: NOISE_VARIANTS[Math.floor(NOISE_VARIANTS.length * Math.random())]
  }),

  generate: () =>
    set((state) => ({ generationTrigger: state.generationTrigger + 1 })),
}));