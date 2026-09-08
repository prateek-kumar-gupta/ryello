"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Flame, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Button } from "@/components/ui/button";

const SHOWCASE_DISHES = [
  {
    id: "m30",
    name: "Dum Chicken Biryani",
    vendor: "Shahi Daawat Dhaba",
    vendorId: "v3",
    price: "₹210",
    isVeg: false,
    image: "/menu/shahi-daawat/chicken-biryani.jpg",
    tag: "Most Ordered",
    rating: "4.8",
    prep: "Dum Handi Slow-Cooked",
  },
  {
    id: "m2",
    name: "Desi Ghee Gulab Jamun",
    vendor: "Super Cremica Sweets",
    vendorId: "v1",
    price: "₹440/kg",
    isVeg: true,
    image: "/menu/super-cremica/gulab-jamun.jpg",
    tag: "Pure Desi Ghee",
    rating: "4.9",
    prep: "Mawa & Desi Ghee",
  },
  {
    id: "m10",
    name: "Chilly Paneer Dry",
    vendor: "Super Cremica Sweets",
    vendorId: "v1",
    price: "₹320",
    isVeg: true,
    image: "/menu/super-cremica/chilly-paneer.jpg",
    tag: "Chef Special",
    rating: "4.9",
    prep: "Wok-Tossed Cottage Cheese",
  },
  {
    id: "m21",
    name: "Chole Bhature",
    vendor: "Bikanervala",
    vendorId: "v2",
    price: "₹150",
    isVeg: true,
    image: "/menu/bikanervala/chole-bhature.jpg",
    tag: "Campus Classic",
    rating: "4.7",
    prep: "Pindi Chole & Fluffy Bhature",
  },
  {
    id: "m12",
    name: "Veg Steamed Momos",
    vendor: "Bikanervala",
    vendorId: "v2",
    price: "₹160",
    isVeg: true,
    image: "/menu/bikanervala/veg-momos.jpg",
    tag: "Evening Snack",
    rating: "4.6",
    prep: "Handcrafted Dimsums",
  },
];

export function Hero3DShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle dishes smoothly every 5.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % SHOWCASE_DISHES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeDish = SHOWCASE_DISHES[selectedIndex];

  return (
    <div
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient Pulsing 3D Radial Glows Behind the Stage */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-primary/25 to-emerald-400/20 rounded-3xl blur-2xl -z-10 animate-pulse-glow" />
      <div className="absolute -top-10 -right-8 size-40 bg-amber-400/25 rounded-full blur-2xl -z-10 animate-float-slow" />
      <div className="absolute -bottom-8 -left-8 size-36 bg-emerald-400/20 rounded-full blur-2xl -z-10 animate-float-reverse" />

      {/* 3D Tilt Card Container */}
      <TiltCard
        maxTilt={12}
        perspective={1200}
        scaleOnHover={1.03}
        className="w-full cursor-pointer"
      >
        <div className="relative rounded-3xl border border-white/30 bg-gradient-to-b from-white/20 via-white/10 to-white/5 p-4 sm:p-5 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)] overflow-hidden transform-style-3d">
          
          {/* Floating Top Floating Chip (TranslateZ 20px) */}
          <div className="flex items-center justify-between gap-2 mb-3 transform-style-3d">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 border border-white/25 px-3 py-1 text-xs font-bold text-white shadow-md backdrop-blur-md translate-z-20">
              <span
                className={`inline-block size-2 rounded-full ${
                  activeDish.isVeg
                    ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]"
                    : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.9)]"
                }`}
              />
              <span>{activeDish.tag}</span>
            </div>

            <div className="inline-flex items-center gap-1 rounded-full bg-amber-400/90 text-gray-950 font-black px-2.5 py-0.5 text-xs shadow-md backdrop-blur-md translate-z-20">
              <Star className="size-3 fill-gray-950 text-gray-950" />
              <span>{activeDish.rating}</span>
            </div>
          </div>

          {/* 3D Food Platter Stage with Levitation Shadow */}
          <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.35)] border border-white/20 group transform-style-3d">
            <Image
              key={activeDish.id}
              src={activeDish.image}
              alt={activeDish.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-cover transition-all duration-700 ease-out group-hover:scale-108 animate-fade-in"
            />

            {/* Depth Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            {/* 3D Floating Platter Badge on the image */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white translate-z-30">
              <div>
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block drop-shadow">
                  {activeDish.vendor}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow-md">
                  {activeDish.name}
                </h3>
                <span className="text-xs text-white/80 font-normal drop-shadow">
                  {activeDish.prep}
                </span>
              </div>

              <div className="text-right">
                <span className="inline-block rounded-xl bg-primary/95 text-white font-black text-sm sm:text-base px-3 py-1 shadow-[0_4px_12px_rgba(13,115,119,0.5)] backdrop-blur-md border border-white/20">
                  {activeDish.price}
                </span>
              </div>
            </div>
          </div>

          {/* 3D Floating Delivery Banner Under Plate */}
          <div className="mt-3 flex items-center justify-between text-xs text-white/90 bg-white/10 rounded-xl px-3 py-2 border border-white/15 backdrop-blur-md">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Clock className="size-3.5 text-amber-300" />
              <span>Evening Hostel Delivery (5:45 PM)</span>
            </span>
            <span className="font-bold text-amber-300">₹30 Flat</span>
          </div>

          {/* Interactive Dish Selector Tabs */}
          <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
            {SHOWCASE_DISHES.map((dish, idx) => (
              <button
                key={dish.id}
                onClick={() => setSelectedIndex(idx)}
                className={`relative flex-1 min-w-[58px] py-1 px-1.5 rounded-lg text-center transition-all duration-200 text-[11px] font-bold ${
                  selectedIndex === idx
                    ? "bg-white text-primary shadow-[0_4px_12px_rgba(0,0,0,0.25)] scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="truncate block">
                  {dish.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Direct Order Button */}
          <div className="mt-3.5">
            <Button
              render={<Link href={`/vendors/${activeDish.vendorId}`} />}
              nativeButton={false}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-gray-950 hover:from-amber-300 hover:to-amber-200 font-black text-sm h-10 rounded-xl shadow-[0_6px_20px_rgba(245,158,11,0.4),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.5)] active:scale-98 transition-all gap-1.5"
            >
              Order from {activeDish.vendor.split(" ")[0]} <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </TiltCard>

      {/* Floating 3D Accent Badge (Hostel Gate Delivery) */}
      <div className="absolute -bottom-4 -left-3 hidden sm:flex items-center gap-2 rounded-2xl bg-white/95 text-gray-900 px-3.5 py-2 shadow-[0_12px_28px_rgba(0,0,0,0.25)] border border-slate-200/90 backdrop-blur-md animate-float-slow z-20">
        <div className="size-7 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
          <ShieldCheck className="size-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Campus Delivery</p>
          <p className="text-xs font-extrabold text-foreground">Direct to Hostel Gate</p>
        </div>
      </div>

      {/* Floating 3D Accent Badge (Freshly Prepared) */}
      <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 text-xs font-black shadow-[0_10px_20px_rgba(249,115,22,0.4)] animate-float-reverse z-20">
        <Flame className="size-3.5" />
        <span>Hot &amp; Fresh</span>
      </div>
    </div>
  );
}
