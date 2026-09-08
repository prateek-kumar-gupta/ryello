"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  User,
  LogOut,
  Package,
  LogIn,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { cn } from "cn";
import { useCartStore } from "@/stores/cart";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/vendors", label: "Vendors" },
  { href: "#", label: "Marketplace (Soon)", disabled: true },
];

// Mock auth state — swap with real auth later
const MOCK_USER: {
  name: string;
  email: string;
  avatar?: string;
} | null = null;

export function Navbar() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = MOCK_USER;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-[0_4px_20px_-4px_rgba(13,115,119,0.08)]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* ── 3D Logo & Tagline ── */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
        >
          {/* 3D Tactile Logo Container */}
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white via-slate-50 to-slate-100 p-1 shadow-[0_3px_10px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] border border-slate-200/90 group-hover:border-primary/50 group-hover:shadow-[0_6px_16px_rgba(13,115,119,0.25)] transition-all">
            <Image
              src="/ryello-logo.png"
              alt="Ryello Logo"
              width={34}
              height={34}
              className="object-contain drop-shadow-sm transition-transform group-hover:scale-105"
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-primary">
                {BRAND.name}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)]">
                <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Hostel Food Hub
              </span>
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground/90 tracking-wide -mt-0.5 hidden xs:inline">
              Craving Delivered
            </span>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.disabled ? (
                <span className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground/50 cursor-not-allowed">
                  {link.label}
                </span>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="size-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 flex size-5 items-center justify-center p-0 text-[10px]">
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* User dropdown — Desktop (Hidden for MVP) */}
          {/* 
          <div className="hidden md:block">
             ... auth code ...
          </div> 
          */}

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" />}>
                <Menu className="size-5" />
                <span className="sr-only">Menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <SheetHeader className="border-b px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-slate-100 p-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-slate-200">
                      <Image
                        src="/ryello-logo.png"
                        alt="Ryello Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <SheetTitle className="text-left">
                        <span className="text-lg font-bold text-primary">
                          {BRAND.name}
                        </span>
                      </SheetTitle>
                      <SheetDescription className="text-left text-xs font-semibold text-amber-600">
                        Craving Delivered • Hostel Food Hub
                      </SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                {/* Navigation links */}
                <div className="flex flex-col gap-1 px-3 py-4">
                  {NAV_LINKS.map((link) => (
                    link.disabled ? (
                      <div
                        key={link.label}
                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground/50 cursor-not-allowed"
                      >
                        {link.label}
                      </div>
                    ) : (
                      <SheetClose key={link.label} render={<Link href={link.href} />}>
                        <div
                          className={cn(
                            "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                            pathname === link.href
                              ? "bg-primary/5 text-primary"
                              : "text-foreground"
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </div>
                      </SheetClose>
                    )
                  ))}
                </div>

                <Separator />
                
                {/* Auth section (Hidden for MVP) */}
                {/*
                <div className="flex flex-col gap-2 px-5 py-4">
                   ...
                </div>
                */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
