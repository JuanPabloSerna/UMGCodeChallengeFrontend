import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  mode: 'light',
  toggle: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' }))
}))
