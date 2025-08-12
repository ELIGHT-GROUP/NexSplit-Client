// themeStore.ts
import {create} from 'zustand';

type BgColorState = {
    bgColor: string;
    setBgColor: (color: string) => void;
    resetBgColor: () => void;
};

export const useBgColor = create<BgColorState>((set) => ({
    bgColor: 'bg-light',
    setBgColor: (color: string) => set({bgColor: color}),
    resetBgColor: () => set({bgColor: 'bg-light'}),
}));