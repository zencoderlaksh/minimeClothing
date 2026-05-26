// stores/useCartStore.js
import { create } from "zustand";

const isSameItem = (i, id, size, color) =>
  i.id === id && i.size === size && i.color?.name === color?.name;

export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product, quantity, size, color) => {
    set((state) => {
      const existing = state.cart.find((i) =>
        isSameItem(i, product.id, size, color)
      );

      if (existing) {
        return {
          cart: state.cart.map((i) =>
            isSameItem(i, product.id, size, color)
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }

      return { cart: [...state.cart, { ...product, quantity, size, color }] };
    });
  },

  removeFromCart: (id, size, color) => {
    set((state) => ({
      cart: state.cart.filter((i) => !isSameItem(i, id, size, color)),
    }));
  },

  updateQuantity: (id, size, color, newQty) => {
    set((state) => ({
      cart: state.cart.map((i) =>
        isSameItem(i, id, size, color) ? { ...i, quantity: newQty } : i
      ),
    }));
  },
}));