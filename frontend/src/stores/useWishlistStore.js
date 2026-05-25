// stores/useWishlistStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product) => {
        const exists = get().wishlist.find((item) => item.id === product.id);
        if (exists) return;
        set((state) => ({ wishlist: [...state.wishlist, product] }));
      },

      removeFromWishlist: (id) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        }));
      },

      isWishlisted: (id) => {
        return get().wishlist.some((item) => item.id === id);
      },
    }),
    {
      name: "wishlist", // localStorage key — matches your old key
    }
  )
);