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
        {/* ── Logo & Brand Name (Pure 3D R Emblem + Ryello) ── */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="relative size-9 shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
            <Image
              src="/ryello-logo.png"
              alt="Ryello Logo"
              width={32}
              height={40}
              className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>
          <span className="text-2xl font-black tracking-tight text-primary">
            {BRAND.name}
          </span>
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
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 shrink-0 flex items-center justify-center">
                      <Image
                        src="/ryello-logo.png"
                        alt="Ryello Logo"
                        width={28}
                        height={35}
                        className="object-contain drop-shadow-sm"
                      />
                    </div>
                    <SheetTitle className="text-left">
                      <span className="text-xl font-black tracking-tight text-primary">
                        {BRAND.name}
                      </span>
                    </SheetTitle>
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
