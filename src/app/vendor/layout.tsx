"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Settings,
  Menu,
} from "lucide-react";
import { cn } from "cn";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";

const NAV_ITEMS = [
  { href: "/vendor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendor/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/vendor/orders", label: "Orders", icon: ShoppingBag },
  { href: "/vendor/settings", label: "Settings", icon: Settings },
] as const;

function NavLink({
  item,
  active,
  className,
}: {
  item: (typeof NAV_ITEMS)[number];
  active: boolean;
  className?: string;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <Icon className="size-5 shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/vendor") return pathname === "/vendor";
    return pathname.startsWith(href);
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Desktop Header ── */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="lg:hidden" />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="border-b px-4 py-3">
                <SheetTitle>
                  <span className="text-primary font-bold">{BRAND.name}</span>{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    Vendor
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-3">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    active={isActive(item.href)}
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{BRAND.name}</span>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Vendor Dashboard
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
              <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                B
              </div>
              <span className="hidden text-sm font-medium sm:inline">
                Bikanervala
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden w-56 shrink-0 border-r bg-muted/30 lg:block">
          <nav className="sticky top-14 flex flex-col gap-1 p-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={isActive(item.href)}
              />
            ))}
          </nav>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 overflow-x-hidden pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur lg:hidden supports-backdrop-filter:bg-background/60">
        <div className="flex items-center justify-around py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <Toaster />
    </div>
  );
}
