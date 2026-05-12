import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, qty: 1 }] });
    }
  },

  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

  updateQty: (id, qty) => {
    if (qty < 1) return get().removeItem(id);
    set({ items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)) });
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));
