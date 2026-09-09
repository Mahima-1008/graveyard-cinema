import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWatchlist = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        // Prevent duplicates
        if (state.items.find((i) => i.id === item.id)) return state;
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      isInWatchlist: (id) => {
        return !!get().items.find((i) => i.id === id);
      },
      clearWatchlist: () => set({ items: [] })
    }),
    {
      name: 'gc_watchlist', // unique name for localStorage key
    }
  )
);
