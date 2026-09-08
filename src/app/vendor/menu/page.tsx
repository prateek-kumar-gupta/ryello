"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MOCK_MENU_ITEMS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/types";

// Filter for Bikanervala (v2)
const VENDOR_ID = "v2";

export default function VendorMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    MOCK_MENU_ITEMS.filter((item) => item.vendor_id === VENDOR_ID)
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const vendorCategories = MOCK_CATEGORIES.filter(
    (c) => c.vendor_id === VENDOR_ID
  );

  function getCategoryName(categoryId: string) {
    return (
      MOCK_CATEGORIES.find((c) => c.id === categoryId)?.name ?? "Uncategorized"
    );
  }

  function toggleAvailability(itemId: string) {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, is_available: !item.is_available }
          : item
      )
    );
    const item = menuItems.find((i) => i.id === itemId);
    if (item) {
      toast.success(
        `${item.name} marked as ${item.is_available ? "unavailable" : "available"}`
      );
    }
  }

  function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newItem: MenuItem = {
      id: `m-new-${Date.now()}`,
      vendor_id: VENDOR_ID,
      category_id: formData.get("category") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      image_url: null,
      is_veg: formData.get("is_veg") === "true",
      is_available: true,
      variants: [],
      unit: (formData.get("unit") as string) || "",
      created_at: new Date().toISOString(),
    };

    setMenuItems((prev) => [...prev, newItem]);
    setDialogOpen(false);
    toast.success(`${newItem.name} added to menu!`);
  }

  // Group items by category
  const groupedItems = vendorCategories.map((cat) => ({
    category: cat,
    items: menuItems.filter((item) => item.category_id === cat.id),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Menu Management</h1>
          <p className="text-sm text-muted-foreground">
            {menuItems.length} items · {menuItems.filter((i) => i.is_available).length} available
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add New Item</span>
            <span className="sm:hidden">Add</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Add a new dish to your menu. It will be available for ordering
                immediately.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Paneer Tikka"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Short description..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min={1}
                    placeholder="299"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    name="unit"
                    placeholder="e.g. 250 Gm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  required
                  className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {vendorCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="is_veg"
                      value="true"
                      defaultChecked
                      className="accent-green-600"
                    />
                    🟢 Veg
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="is_veg"
                      value="false"
                      className="accent-red-600"
                    />
                    🔴 Non-Veg
                  </label>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Add Item</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ── Menu Items grouped by category ── */}
      {groupedItems.map(({ category, items }) => (
        <Card key={category.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{category.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 transition-opacity",
                    !item.is_available && "opacity-50"
                  )}
                >
                  {/* Veg/Non-veg indicator */}
                  <span className="shrink-0 text-sm" aria-label={item.is_veg ? "Vegetarian" : "Non-vegetarian"}>
                    {item.is_veg ? "🟢" : "🔴"}
                  </span>

                  {/* Item info */}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm leading-tight">
                      {item.name}
                    </p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-primary">
                        {formatPrice(item.price)}
                      </span>
                      {item.unit && (
                        <span className="text-xs text-muted-foreground">
                          · {item.unit}
                        </span>
                      )}
                      <Badge variant="secondary" className="text-[10px]">
                        {getCategoryName(item.category_id)}
                      </Badge>
                    </div>
                  </div>

                  {/* Availability toggle */}
                  <button
                    type="button"
                    onClick={() => toggleAvailability(item.id)}
                    className={cn(
                      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      item.is_available ? "bg-primary" : "bg-muted"
                    )}
                    role="switch"
                    aria-checked={item.is_available}
                    aria-label={`Toggle availability for ${item.name}`}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform",
                        item.is_available ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
