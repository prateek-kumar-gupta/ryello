"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LISTING_CATEGORIES } from "@/lib/constants";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { ListingCard } from "@/components/marketplace/listing-card";
import { cn } from "@/lib/utils";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => {
      // Only show active listings
      if (listing.status !== "active") return false;

      // Search filter
      if (
        search &&
        !listing.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (activeCategory && listing.category !== activeCategory) {
        return false;
      }

      return true;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Campus Marketplace
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Buy &amp; sell from fellow campus students
          </p>

          {/* Search */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search listings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category filter chips */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === null
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              All
            </button>
            {LISTING_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.value ? null : cat.value
                  )
                }
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  activeCategory === cat.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings grid */}
      <div className="mx-auto max-w-5xl px-4 py-6">
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-muted-foreground">
              No listings found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Floating action button */}
      <Link
        href="/marketplace/new"
        className="fixed bottom-6 right-6 z-20"
      >
        <Button
          size="lg"
          className="h-14 gap-2 rounded-full px-6 shadow-lg"
        >
          <Plus className="size-5" />
          <span className="hidden sm:inline">Sell Something</span>
        </Button>
      </Link>
    </div>
  );
}
