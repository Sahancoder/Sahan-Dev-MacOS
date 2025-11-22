import { create } from 'zustand';

export const useWindowStore = create((set) => ({
  windows: [
    { id: 'welcome', title: 'Welcome', type: 'welcome', isOpen: true, isMin: false, x: 100, y: 100, z: 10 }
  ],
  activeId: 'welcome',
  zIndexCounter: 20,
  theme: 'light',

  openWindow: (id, title, type, initX = 50, initY = 50) => set((state) => {
    const existing = state.windows.find(w => w.id === id);
    if (existing) {
      return {
        windows: state.windows.map(w =>
          w.id === id ? { ...w, isOpen: true, isMin: false, z: state.zIndexCounter } : w
        ),
        zIndexCounter: state.zIndexCounter + 1,
        activeId: id
      };
    }
    return {
      windows: [...state.windows, {
        id, title, type, isOpen: true, isMin: false, x: initX, y: initY, z: state.zIndexCounter
      }],
      zIndexCounter: state.zIndexCounter + 1,
      activeId: id
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isOpen: false } : w)
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMin: true } : w),
    activeId: null
  })),

  focusWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, z: state.zIndexCounter } : w),
    zIndexCounter: state.zIndexCounter + 1,
    activeId: id
  })),

  updateWindowPos: (id, x, y) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, x, y } : w)
  })),

  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  }))
}));

