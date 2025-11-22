import { create } from 'zustand';

export const useStore = create((set) => ({
  windows: [
    {
      id: 'welcome',
      title: 'Welcome',
      component: 'Welcome',
      isOpen: true,
      isMin: false,
      position: { x: 100, y: 100 },
      size: { width: 800, height: 500 },
      zIndex: 10
    }
  ],
  activeId: 'welcome',
  zIndexCounter: 20,
  theme: 'light',

  openWindow: (windowConfig) => set((state) => {
    // Check if window already exists
    const exists = state.windows.find(w => w.id === windowConfig.id);
    if (exists) {
      return {
        windows: state.windows.map(w =>
          w.id === windowConfig.id
            ? { ...w, isOpen: true, isMin: false, zIndex: state.zIndexCounter }
            : w
        ),
        zIndexCounter: state.zIndexCounter + 1,
        activeId: windowConfig.id
      };
    }

    return {
      windows: [...state.windows, {
        ...windowConfig,
        isOpen: true,
        isMin: false,
        position: windowConfig.position || { x: 50, y: 50 },
        size: windowConfig.size || { width: 800, height: 500 },
        zIndex: state.zIndexCounter
      }],
      zIndexCounter: state.zIndexCounter + 1,
      activeId: windowConfig.id
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
    windows: state.windows.map(w => w.id === id ? { ...w, zIndex: state.zIndexCounter } : w),
    zIndexCounter: state.zIndexCounter + 1,
    activeId: id
  })),

  updateWindowPos: (id, position) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, position } : w)
  })),

  updateWindowSize: (id, size) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, size } : w)
  })),

  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  }))
}));

