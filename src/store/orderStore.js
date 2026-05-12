import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      placeOrder: (items, total, paymentMethod, userEmail) => {
        const order = {
          id: Date.now(),
          items,
          total,
          paymentMethod,
          userEmail,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        set({ orders: [order, ...get().orders] });
        return order.id;
      },

      updateStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === orderId ? { ...o, status } : o,
          ),
        });
      },

      getUserOrders: (email) =>
        get().orders.filter((o) => o.userEmail === email),
    }),
    { name: "food-orders" }, // saves to localStorage under this key
  ),
);
