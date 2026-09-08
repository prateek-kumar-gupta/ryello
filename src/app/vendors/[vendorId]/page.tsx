"use client";

import { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  Clock,
  Truck,
  ShoppingCart,
  Plus,
  Minus,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_VENDORS, MOCK_CATEGORIES, MOCK_MENU_ITEMS } from "@/lib/mock-data";
import { ORDER_SLOT, DELIVERY_TIME } from "@/lib/constants";
import { formatPrice, isOrderSlotOpen, cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import type { MenuItem, MenuItemVariant } from "@/types";

// Track which variant is selected per menu item
type VariantSelection = Record<string, string>;

export default function VendorMenuPage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  const { vendorId } = use(params);
  const vendor = MOCK_VENDORS.find((v) => v.id === vendorId);

  const [variantSelections, setVariantSelections] = useState<VariantSelection>(
    {}
  );

  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const getTotal = useCartStore((s) => s.getTotal);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const getVendorId = useCartStore((s) => s.getVendorId);

  // Categories for this vendor, sorted
  const categories = useMemo(
    () =>
      MOCK_CATEGORIES.filter((c) => c.vendor_id === vendorId).sort(
        (a, b) => a.sort_order - b.sort_order
      ),
    [vendorId]
  );

  // Menu items grouped by category
  const itemsByCategory = useMemo(() => {
    const map: Record<string, MenuItem[]> = {};
    for (const cat of categories) {
      map[cat.id] = MOCK_MENU_ITEMS.filter(
        (mi) => mi.vendor_id === vendorId && mi.category_id === cat.id
      );
    }
    return map;
  }, [vendorId, categories]);

  if (!vendor) {
    return (
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Vendor not found</h1>
          <p className="mt-2 text-muted-foreground">
            The vendor you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button render={<Link href="/vendors" />} nativeButton={false} className="mt-6">
            Go back to Vendors
          </Button>
        </div>
      </main>
    );
  }

  const cartVendorId = getVendorId();
  const vendorCartCount = cartItems
    .filter((ci) => ci.vendor.id === vendorId)
    .reduce((sum, ci) => sum + ci.quantity, 0);
  const vendorCartTotal = cartItems
    .filter((ci) => ci.vendor.id === vendorId)
    .reduce(
      (sum, ci) => sum + (ci.variant?.price || ci.menu_item.price) * ci.quantity,
      0
    );
  const showCartBar = cartVendorId === vendorId && vendorCartCount > 0;

  function handleSelectVariant(menuItemId: string, variantName: string) {
    setVariantSelections((prev) => ({ ...prev, [menuItemId]: variantName }));
  }

  function handleAddItem(item: MenuItem) {
    if (!vendor) return;
    if (item.variants.length > 0) {
      const selectedName =
        variantSelections[item.id] || item.variants[0].name;
      const variant = item.variants.find((v) => v.name === selectedName);
      addItem(item, vendor, variant);
    } else {
      addItem(item, vendor);
    }
  }

  function getItemQuantityInCart(item: MenuItem, variantName?: string): number {
    return cartItems
      .filter(
        (ci) =>
          ci.menu_item.id === item.id &&
          ci.vendor.id === vendorId &&
          (variantName
            ? ci.variant?.name === variantName
            : ci.variant === null)
      )
      .reduce((sum, ci) => sum + ci.quantity, 0);
  }

  return (
    <main className="flex-1 pb-24">
      {/* ─── Vendor Header ─── */}
      <div className="bg-primary text-white">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            All Vendors
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold">{vendor.name}</h1>
              <p className="mt-1 text-sm text-white/80 max-w-lg">
                {vendor.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{vendor.rating}</span>
                  <span className="text-white/70">
                    ({vendor.total_ratings.toLocaleString("en-IN")}+)
                  </span>
                </div>

                <span className="text-white/40">•</span>

                {/* Veg badge */}
                <Badge
                  variant="secondary"
                  className="gap-1 text-xs font-medium"
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      vendor.is_veg ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {vendor.is_veg ? "Pure Veg" : "Non-Veg"}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/70">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {vendor.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Order Slot Info ─── */}
      <div className="border-b bg-muted/50">
        <div className="mx-auto max-w-3xl px-4 py-3 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Order Slot:</span>
            <span className="font-medium">{ORDER_SLOT.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Delivery:</span>
            <span className="font-medium">{DELIVERY_TIME.label}</span>
          </div>
        </div>
      </div>

      {/* ─── Menu ─── */}
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
        <h2 className="text-xl font-bold mb-6">Menu</h2>

        {categories.map((category) => {
          const items = itemsByCategory[category.id] || [];
          if (items.length === 0) return null;

          return (
            <section key={category.id} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              <div className="space-y-3">
                {items.map((item) => {
                  const selectedVariantName =
                    item.variants.length > 0
                      ? variantSelections[item.id] || item.variants[0].name
                      : undefined;

                  const displayPrice =
                    item.variants.length > 0
                      ? item.variants.find(
                          (v) => v.name === selectedVariantName
                        )?.price || item.price
                      : item.price;

                  const qtyInCart = getItemQuantityInCart(
                    item,
                    selectedVariantName
                  );

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "flex gap-4 p-4 rounded-lg border bg-card",
                        !item.is_available && "opacity-50"
                      )}
                    >
                      {/* Left: info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          {/* Veg / non-veg indicator */}
                          <span
                            className={cn(
                              "mt-1.5 inline-block w-3 h-3 rounded-sm border-2 shrink-0",
                              item.is_veg
                                ? "border-green-600 bg-green-600"
                                : "border-red-600 bg-red-600"
                            )}
                          >
                            <span className="sr-only">
                              {item.is_veg ? "Vegetarian" : "Non-vegetarian"}
                            </span>
                          </span>
                          <div className="min-w-0">
                            <h4 className="font-medium text-sm sm:text-base leading-tight">
                              {item.name}
                            </h4>
                            {item.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.description}
                              </p>
                            )}
                            {item.unit && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.unit}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Variant selector */}
                        {item.variants.length > 0 && (
                          <div className="mt-2 flex gap-2 flex-wrap ml-5">
                            {item.variants.map((variant) => (
                              <button
                                key={variant.name}
                                onClick={() =>
                                  handleSelectVariant(item.id, variant.name)
                                }
                                className={cn(
                                  "text-xs px-3 py-1 rounded-full border transition-colors",
                                  selectedVariantName === variant.name
                                    ? "border-primary bg-primary/10 text-primary font-medium"
                                    : "border-border text-muted-foreground hover:border-primary/50"
                                )}
                              >
                                {variant.name} · {formatPrice(variant.price)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: price + add */}
                      <div className="flex flex-col items-end justify-between shrink-0 gap-2">
                        <span className="font-semibold text-sm">
                          {formatPrice(displayPrice)}
                        </span>

                        {item.is_available ? (
                          qtyInCart > 0 ? (
                            <div className="flex items-center gap-1">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() =>
                                  useCartStore
                                    .getState()
                                    .updateQuantity(
                                      item.id,
                                      qtyInCart - 1,
                                      selectedVariantName
                                    )
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center text-sm font-medium">
                                {qtyInCart}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => handleAddItem(item)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1 text-primary border-primary hover:bg-primary hover:text-white"
                              onClick={() => handleAddItem(item)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Add
                            </Button>
                          )
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Separator className="mt-8" />
            </section>
          );
        })}
      </div>

      {/* ─── Sticky Cart Bar ─── */}
      {showCartBar && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                {vendorCartCount}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">
                  {vendorCartCount} {vendorCartCount === 1 ? "item" : "items"}
                </span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="font-semibold">
                  {formatPrice(vendorCartTotal)}
                </span>
              </div>
            </div>
            <Button render={<Link href="/cart" />} nativeButton={false} size="sm" className="gap-2">
              View Cart <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
