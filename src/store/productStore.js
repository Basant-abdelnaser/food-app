import { create } from "zustand";
import { persist } from "zustand/middleware";
import { menuItems } from "@/data/menu";

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: menuItems, // start with default menu

      addProduct: (product) =>
        set({
          products: [
            {
              ...product,
              id: Date.now(),
              nameAr: product.name,
              price: parseFloat(product.price),
            },
            ...get().products,
          ],
        }),

      deleteProduct: (id) =>
        set({ products: get().products.filter((p) => p.id !== id) }),

      updateProduct: (id, updates) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
        }),
    }),
    { name: "food-products" }, // persists to localStorage
  ),
);
