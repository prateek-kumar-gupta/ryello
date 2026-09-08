import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Truck,
  IndianRupee,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Flame,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VendorCard } from "@/components/vendor/vendor-card";
import { MOCK_VENDORS, MOCK_MENU_ITEMS } from "@/lib/mock-data";
import { ORDER_SLOT, DELIVERY_TIME, DELIVERY_FEE, BRAND } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

const QUICK_CATEGORIES = [
  { label: "Biryani & Non-Veg", emoji: "🍗", vendorId: "v3" },
  { label: "Asian Street Food", emoji: "🥟", vendorId: "v2" },
  { label: "Pure Desi Mithai", emoji: "🍧", vendorId: "v1" },
  { label: "Chaat & Pav Bhaji", emoji: "🥘", vendorId: "v2" },
  { label: "Chole Bhature", emoji: "🫓", vendorId: "v2" },
  { label: "Rolls & Tandoori", emoji: "🌯", vendorId: "v3" },
];

// Highlight 4 top customer favourite dishes
const POPULAR_DISHES = [
  MOCK_MENU_ITEMS.find((i) => i.id === "m30")!, // Chicken Biryani
  MOCK_MENU_ITEMS.find((i) => i.id === "m10")!, // Chilly Paneer
  MOCK_MENU_ITEMS.find((i) => i.id === "m2")!,  // Desi Ghee Gulab Jamun
  MOCK_MENU_ITEMS.find((i) => i.id === "m21")!, // Chole Bhature
].filter(Boolean);

export default function HomePage() {
  return (
    <main className="flex-1 overflow-x-hidden">
      {/* ─── Hero Section with Modern 3D Mesh Gradient ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#094D50] via-[#0D7377] to-[#0A575A] text-white pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
        <div className="absolute -top-12 -right-12 size-80 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-md shadow-inner mb-6 animate-fade-in">
            <Sparkles className="size-3.5 text-amber-300 animate-pulse" />
            <span>Your Campus Food &amp; Delivery Network</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-[1.15] text-white drop-shadow-sm">
            Craving something <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-amber-300 bg-clip-text text-transparent">
              delicious &amp; fresh?
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed font-normal">
            Order directly from top restaurants. Hot meals, sweets &amp; snacks delivered right to your hostel gate.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              render={<Link href="/vendors" />}
              nativeButton={false}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold text-base px-8 h-12 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all"
            >
              Browse Restaurants
            </Button>
            <Button
              render={<Link href="#popular" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 font-semibold text-base px-6 h-12 rounded-xl backdrop-blur-sm"
            >
              View Popular Picks
            </Button>
          </div>

          {/* Quick Category Pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={`/vendors/${cat.vendorId}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md transition-all hover:bg-white/25 hover:border-white/40 hover:scale-105"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Curved Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-background [clip-path:polygon(0_100%,100%_100%,100%_0)]" />
      </section>

      {/* ─── 3D Order Info Cards ─── */}
      <section className="relative -mt-6 sm:-mt-10 mx-auto max-w-5xl px-4 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3.5 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform hover:-translate-y-0.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-inner">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Daily Order Slot</p>
              <p className="text-sm font-bold text-foreground">{ORDER_SLOT.label}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform hover:-translate-y-0.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shadow-inner">
              <Truck className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Evening Hostel Delivery</p>
              <p className="text-sm font-bold text-foreground">{DELIVERY_TIME.label}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform hover:-translate-y-0.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 shadow-inner">
              <IndianRupee className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Affordable Pricing</p>
              <p className="text-sm font-bold text-foreground">₹{DELIVERY_FEE} Flat Fee to Room</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Restaurants ─── */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              <Flame className="size-3.5 text-orange-500" />
              Verified Campus Partners
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Featured Restaurants
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hand-picked iconic eateries delivering to your hostel
            </p>
          </div>
          <Button
            variant="ghost"
            render={<Link href="/vendors" />}
            nativeButton={false}
            className="hidden sm:flex gap-1 font-semibold text-primary"
          >
            View all restaurants <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_VENDORS.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Button
            variant="outline"
            render={<Link href="/vendors" />}
            nativeButton={false}
            className="w-full gap-1.5 font-semibold"
          >
            View all restaurants <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>

      {/* ─── Popular Dishes Spotlight (Real Photography) ─── */}
      <section id="popular" className="border-t bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
                <Star className="size-3.5 fill-amber-500 text-amber-500" />
                Student Favourites
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Top Ordered Campus Dishes
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                The most popular treats ordered across BH &amp; GH hostels
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {POPULAR_DISHES.map((dish) => {
              const vendor = MOCK_VENDORS.find((v) => v.id === dish.vendor_id);
              return (
                <Link
                  key={dish.id}
                  href={`/vendors/${dish.vendor_id}`}
                  className="group block"
                >
                  <div className="relative h-full flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_-10px_rgba(13,115,119,0.2)] hover:-translate-y-1.5 transition-all duration-300">
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      {dish.image_url && (
                        <Image
                          src={dish.image_url}
                          alt={dish.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Price Badge */}
                      <span className="absolute bottom-2.5 right-2.5 rounded-lg bg-white/95 px-2 py-0.5 text-xs font-extrabold text-primary shadow-sm backdrop-blur-sm">
                        {formatPrice(dish.price)}
                      </span>

                      {/* Veg indicator */}
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 p-1 shadow-sm">
                        <span className={`inline-block size-2 rounded-full ${dish.is_veg ? "bg-green-600" : "bg-red-600"}`} />
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-1">
                          {dish.name}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {dish.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium truncate max-w-[120px]">
                          {vendor?.name}
                        </span>
                        <span className="font-bold text-primary">
                          Order →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Marketplace CTA ─── */}
      <section className="border-t bg-gradient-to-b from-background to-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-[#C4883A]/20 bg-gradient-to-r from-[#C4883A]/10 via-primary/5 to-primary/10 p-8 sm:p-12 shadow-[0_12px_36px_-10px_rgba(196,136,58,0.15)] flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#C4883A]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9E651E] mb-4">
                <ShoppingBag className="size-3.5" />
                <span>{BRAND.name} Peer Marketplace</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Buy &amp; Sell on Campus
              </h3>
              <p className="mt-2.5 text-muted-foreground text-sm sm:text-base max-w-lg leading-relaxed">
                Need second-hand textbooks, scientific calculators, gym gear or room essentials? Connect directly with fellow students.
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-center sm:items-end gap-2">
              <Button
                disabled
                size="lg"
                className="font-bold px-8 h-12 rounded-xl shadow-sm cursor-not-allowed"
              >
                Launching Soon
              </Button>
              <span className="text-xs text-muted-foreground">Peer-to-peer campus verified</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

