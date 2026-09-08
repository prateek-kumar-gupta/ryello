"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartState, MenuItem, MenuItemVariant, Vendor } from "@/types";
import { DELIVERY_FEE } from "@/lib/constants";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: MenuItem, vendor: Vendor, variant?: MenuItemVariant | null) => {
        const { items } = get();

        const existingIndex = items.findIndex(
          (ci) =>
            ci.menu_item.id === item.id &&
            (ci.variant?.name || null) === (variant?.name || null)
        );

        if (existingIndex >= 0) {
          const newItems = [...items];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + 1,
          };
          set({ items: newItems });
        } else {
          set({
            items: [
              ...items,
              { menu_item: item, vendor, variant: variant || null, quantity: 1 },
            ],
          });
        }
      },

      removeItem: (menuItemId: string, variantName?: string) => {
        const { items } = get();
        set({
          items: items.filter(
            (ci) =>
              !(
                ci.menu_item.id === menuItemId &&
                (ci.variant?.name || undefined) === variantName
              )
          ),
        });
      },

      updateQuantity: (menuItemId: string, quantity: number, variantName?: string) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId, variantName);
          return;
        }
        const { items } = get();
        set({
          items: items.map((ci) =>
            ci.menu_item.id === menuItemId &&
            (ci.variant?.name || undefined) === variantName
              ? { ...ci, quantity }
              : ci
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      clearVendorItems: (vendorId: string) => {
        const { items } = get();
        set({ items: items.filter((ci) => ci.vendor.id !== vendorId) });
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce(
          (sum, ci) => sum + (ci.variant?.price || ci.menu_item.price) * ci.quantity,
          0
        );
      },

      getDeliveryFee: () => {
        const { items } = get();
        return items.length > 0 ? DELIVERY_FEE : 0;
      },

      getGrandTotal: () => {
        return get().getTotal() + get().getDeliveryFee();
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((sum, ci) => sum + ci.quantity, 0);
      },

      getVendorId: () => {
        const { items } = get();
        return items.length > 0 ? items[0].vendor.id : null;
      },
    }),
    {
      name: "ryello-cart",
    }
  )
);
