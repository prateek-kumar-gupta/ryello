"use client";

import { useState, useMemo } from "react";
import { Search, LeafyGreen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VendorCard } from "@/components/vendor/vendor-card";
import { MOCK_VENDORS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_VENDORS.filter((v) => {
      const matchesSearch = v.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesVeg = vegOnly ? v.is_veg : true;
      return matchesSearch && matchesVeg;
    });
  }, [search, vegOnly]);

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          All Vendors
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Explore restaurants delivering to NIT Jalandhar campus
        </p>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Veg toggle */}
          <Button
            variant={vegOnly ? "default" : "outline"}
            onClick={() => setVegOnly(!vegOnly)}
            className={cn(
              "gap-2 shrink-0",
              vegOnly && "bg-green-600 hover:bg-green-700 text-white"
            )}
          >
            <LeafyGreen className="h-4 w-4" />
            {vegOnly ? "Veg Only" : "All"}
          </Button>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              No vendors found matching your search.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
