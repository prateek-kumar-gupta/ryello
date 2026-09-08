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
import { TiltCard } from "@/components/ui/tilt-card";
import { Hero3DShowcase } from "@/components/home/hero-3d-showcase";
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
      {/* ─── Hero Section with Modern 3D Mesh Gradient & Interactive 3D Showcase ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#073B3D] via-[#0D7377] to-[#0A575A] text-white pt-12 pb-24 sm:pt-16 sm:pb-32">
        {/* Glow Spheres & Depth Atmosphere */}
        <div className="absolute top-1/4 left-1/4 size-[450px] rounded-full bg-emerald-400/15 blur-[120px] pointer-events-none" />
        <div className="absolute -top-12 -right-12 size-[420px] rounded-full bg-amber-400/15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 size-96 rounded-full bg-teal-300/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Brand, Headline, Value Props & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* 3D Floating Pure Emblem Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform duration-300 hover:scale-105 mb-6">
                <div className="relative size-7 shrink-0 flex items-center justify-center">
                  <Image
                    src="/ryello-logo.png"
                    alt="Ryello"
                    width={28}
                    height={36}
                    className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                    priority
                  />
                </div>
                <span className="text-xl font-black tracking-tight text-white drop-shadow-sm">
                  Ryello
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-gray-950 ml-1 shadow-sm">
                  Hostel Delivery
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white drop-shadow-md">
                Craving something <br />
                <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-amber-300 bg-clip-text text-transparent">
                  delicious &amp; fresh?
                </span>
              </h1>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-sm">
                Order directly from top restaurants. Authentic hot meals, sweets &amp; evening snacks delivered together right to your hostel gate at flat ₹30.
              </p>

              {/* Action Buttons with 3D tactile elevation */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Button
                  render={<Link href="/vendors" />}
                  nativeButton={false}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/95 font-bold text-base px-8 h-12 rounded-xl shadow-[0_12px_28px_-5px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_18px_35px_-5px_rgba(0,0,0,0.45)] hover:-translate-y-1 active:translate-y-0.5 transition-all"
                >
                  Browse Restaurants
                </Button>
                <Button
                  render={<Link href="#popular" />}
                  nativeButton={false}
                  variant="outline"
                  size="lg"
                  className="border-white/50 bg-white/15 text-white hover:bg-white/25 font-semibold text-base px-6 h-12 rounded-xl backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
                >
                  View Popular Picks
                </Button>
              </div>

              {/* Quick Category Pills with 3D tactile buttons */}
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 max-w-xl">
                {QUICK_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    href={`/vendors/${cat.vendorId}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all hover:bg-white/30 hover:border-white/50 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] active:scale-95"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive 3D Platter Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <Hero3DShowcase />
            </div>
          </div>
        </div>

        {/* Curved Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-background [clip-path:polygon(0_100%,100%_100%,100%_0)]" />
      </section>

      {/* ─── 3D Order Info Cards ─── */}
      <section className="relative -mt-6 sm:-mt-10 mx-auto max-w-5xl px-4 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white/95 p-4.5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_35px_-6px_rgba(13,115,119,0.18)] hover:border-primary/30">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border border-primary/20 group-hover:scale-105 transition-transform">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Daily Order Slot</p>
              <p className="text-sm font-black text-foreground">{ORDER_SLOT.label}</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white/95 p-4.5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_35px_-6px_rgba(196,136,58,0.22)] hover:border-amber-500/30">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border border-amber-500/20 group-hover:scale-105 transition-transform">
              <Truck className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Evening Hostel Delivery</p>
              <p className="text-sm font-black text-foreground">{DELIVERY_TIME.label}</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white/95 p-4.5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_35px_-6px_rgba(16,185,129,0.22)] hover:border-emerald-500/30">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border border-emerald-500/20 group-hover:scale-105 transition-transform">
              <IndianRupee className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Affordable Pricing</p>
              <p className="text-sm font-black text-foreground">₹{DELIVERY_FEE} Flat Fee to Room</p>
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
                  className="group block h-full"
                >
                  <TiltCard maxTilt={8} scaleOnHover={1.03} className="h-full">
                    <div className="relative h-full flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-10px_rgba(13,115,119,0.25)] transition-all duration-300">
                      <div className="relative h-44 w-full overflow-hidden bg-muted">
                        {dish.image_url && (
                          <Image
                            src={dish.image_url}
                            alt={dish.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-108"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Price Badge */}
                        <span className="absolute bottom-2.5 right-2.5 rounded-lg bg-white/95 px-2.5 py-0.5 text-xs font-black text-primary shadow-sm backdrop-blur-sm">
                          {formatPrice(dish.price)}
                        </span>

                        {/* Veg indicator */}
                        <span className="absolute top-2.5 left-2.5 rounded-full bg-white/95 p-1.5 shadow-sm">
                          <span className={`inline-block size-2 rounded-full ${dish.is_veg ? "bg-green-600 shadow-[0_0_6px_rgba(22,163,74,0.8)]" : "bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.8)]"}`} />
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-1">
                            {dish.name}
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {dish.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-medium truncate max-w-[120px]">
                            {vendor?.name}
                          </span>
                          <span className="font-bold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            Order →
                          </span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
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

