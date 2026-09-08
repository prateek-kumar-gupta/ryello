"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  MapPin,
  Clock,
  Truck,
  Plus,
  Minus,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_VENDORS, MOCK_CATEGORIES, MOCK_MENU_ITEMS } from "@/lib/mock-data";
import { ORDER_SLOT, DELIVERY_TIME } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";
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
  const [activeCategory, setActiveCategory] = useState<string>("");

  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const getTotal = useCartStore((s) => s.getTotal);
  const getItemCount = useCartStore((s) => s.getItemCount);

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

  const totalCartCount = getItemCount();
  const totalCartTotal = getTotal();
  const showCartBar = totalCartCount > 0;

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
    <main className="flex-1 pb-28">
      {/* ─── Hero Banner with Cover Photo & 3D Depth ─── */}
      <div className="relative overflow-hidden bg-muted">
        {/* Cover Photo Background */}
        <div className="relative h-64 sm:h-80 w-full">
          {vendor.image_url ? (
            <Image
              src={vendor.image_url}
              alt={vendor.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="size-full bg-primary" />
          )}
          {/* Rich Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        {/* Back Link & Info Floating over Hero */}
        <div className="absolute inset-0 flex flex-col justify-between mx-auto max-w-4xl px-4 py-6 sm:py-8 text-white">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/90 hover:text-white bg-black/40 hover:bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md transition-all self-start"
          >
            <ChevronLeft className="size-4" />
            All Restaurants
          </Link>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className="gap-1.5 bg-white/90 text-gray-900 backdrop-blur-md px-2.5 py-1 text-xs font-bold"
              >
                <span
                  className={`inline-block size-2 rounded-full ${
                    vendor.is_veg
                      ? "bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.8)]"
                      : "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                  }`}
                />
                {vendor.is_veg ? "100% Pure Veg" : "Non-Veg Available"}
              </Badge>

              <div className="flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-gray-950 shadow-sm">
                <Star className="size-3 fill-gray-950 text-gray-950" />
                <span>{vendor.rating}</span>
                <span className="font-normal text-[11px] opacity-80">
                  ({vendor.total_ratings}+)
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
              {vendor.name}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-white/85 max-w-xl line-clamp-2 drop-shadow">
              {vendor.description}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-white/80">
              <MapPin className="size-3.5 text-amber-300 shrink-0" />
              <span className="truncate">{vendor.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Order Slot Info Bar ─── */}
      <div className="border-b bg-card/60 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 py-3 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <span className="text-muted-foreground font-medium">Order Slot:</span>
            <span className="font-bold text-foreground">{ORDER_SLOT.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="size-4 text-primary" />
            <span className="text-muted-foreground font-medium">Delivery:</span>
            <span className="font-bold text-foreground">{DELIVERY_TIME.label}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-600 font-semibold">
            <ShieldCheck className="size-4" />
            <span>Delivered directly to NITJ hostel</span>
          </div>
        </div>
      </div>

      {/* ─── Sticky Category Pills ─── */}
      <div className="sticky top-14 z-20 border-b bg-background/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0",
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* ─── Menu Categories & Food Cards (Swiggy / Zomato Modern Style) ─── */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        {categories.map((category) => {
          const items = itemsByCategory[category.id] || [];
          if (items.length === 0) return null;

          return (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="mb-10 scroll-mt-32"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-foreground">
                  {category.name}
                </h3>
                <span className="text-xs font-bold text-muted-foreground/80 bg-muted px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>

              <div className="space-y-4">
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
                        "group relative flex flex-col sm:flex-row justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-border/70 bg-card shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.08)] hover:border-primary/30 transition-all duration-300",
                        !item.is_available && "opacity-60"
                      )}
                    >
                      {/* Left: Item Information */}
                      <div className="flex-1 min-w-0 pr-2">
                        {/* Veg / Non-veg dot & Unit Tag */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={cn(
                              "inline-flex items-center justify-center size-4 rounded-sm border",
                              item.is_veg
                                ? "border-green-600 bg-green-50"
                                : "border-red-600 bg-red-50"
                            )}
                          >
                            <span
                              className={cn(
                                "size-2 rounded-full",
                                item.is_veg ? "bg-green-600" : "bg-red-600"
                              )}
                            />
                          </span>

                          {item.unit && (
                            <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              {item.unit}
                            </span>
                          )}
                        </div>

                        {/* Item Name */}
                        <h4 className="font-bold text-base sm:text-lg text-foreground leading-snug group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>

                        {/* Price */}
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-black text-primary">
                            {formatPrice(displayPrice)}
                          </span>
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        {/* Variant Selector Pills */}
                        {item.variants.length > 0 && (
                          <div className="mt-3 flex gap-2 flex-wrap">
                            {item.variants.map((variant) => (
                              <button
                                key={variant.name}
                                onClick={() =>
                                  handleSelectVariant(item.id, variant.name)
                                }
                                className={cn(
                                  "text-xs px-3 py-1 rounded-full border transition-all font-medium",
                                  selectedVariantName === variant.name
                                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                                    : "border-border text-muted-foreground hover:border-primary/40 bg-background"
                                )}
                              >
                                {variant.name} · {formatPrice(variant.price)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Real Dish Image + Floating 3D Action Button */}
                      <div className="relative shrink-0 self-center sm:self-start flex flex-col items-center">
                        <div className="relative size-28 sm:size-32 rounded-2xl overflow-hidden shadow-md bg-muted border border-border/40">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.name}
                              fill
                              sizes="(max-width: 640px) 112px, 128px"
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center text-xs text-muted-foreground bg-muted">
                              Food
                            </div>
                          )}
                        </div>

                        {/* Floating 3D Action Button */}
                        <div className="absolute -bottom-3 shadow-[0_6px_16px_rgba(0,0,0,0.15)] rounded-xl bg-white border border-primary/20 overflow-hidden">
                          {item.is_available ? (
                            qtyInCart > 0 ? (
                              <div className="flex items-center h-8 px-1 bg-white">
                                <button
                                  onClick={() =>
                                    useCartStore
                                      .getState()
                                      .updateQuantity(
                                        item.id,
                                        qtyInCart - 1,
                                        selectedVariantName
                                      )
                                  }
                                  className="size-7 flex items-center justify-center text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="size-3.5 stroke-[2.5]" />
                                </button>
                                <span className="w-7 text-center text-sm font-black text-primary">
                                  {qtyInCart}
                                </span>
                                <button
                                  onClick={() => handleAddItem(item)}
                                  className="size-7 flex items-center justify-center text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="size-3.5 stroke-[2.5]" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAddItem(item)}
                                className="h-8 px-5 flex items-center gap-1 font-extrabold text-xs sm:text-sm text-primary hover:bg-primary/5 active:bg-primary/10 transition-colors tracking-wide"
                              >
                                <Plus className="size-3.5 stroke-[2.5]" />
                                ADD
                              </button>
                            )
                          ) : (
                            <span className="h-8 px-3 flex items-center text-[11px] font-medium text-muted-foreground bg-muted/90">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Separator className="mt-10 opacity-60" />
            </section>
          );
        })}
      </div>

      {/* ─── 3D Sticky Cart Bar ─── */}
      {showCartBar && (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto">
          <div className="rounded-2xl border border-primary/30 bg-card/95 p-3.5 shadow-[0_12px_35px_-10px_rgba(13,115,119,0.35)] backdrop-blur-md flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground rounded-xl size-9 flex items-center justify-center text-sm font-black shadow-md">
                {totalCartCount}
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-muted-foreground font-medium">
                  {totalCartCount} {totalCartCount === 1 ? "item" : "items"} in cart
                </span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="font-extrabold text-foreground text-sm sm:text-base">
                  {formatPrice(totalCartTotal)}
                </span>
              </div>
            </div>
            <Button
              render={<Link href="/cart" />}
              nativeButton={false}
              size="sm"
              className="gap-2 font-bold px-5 h-9 rounded-xl shadow-md"
            >
              View Cart <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
