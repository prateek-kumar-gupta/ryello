"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Clock,
  ArrowLeft,
  MapPin,
  ChevronDown,
  Phone,
  User
} from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatPrice, isOrderSlotOpen } from "@/lib/utils";
import { ORDER_SLOT, DELIVERY_TIME, HOSTELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// WhatsApp icon SVG component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M9.5 13.5c1.5 1 3.5 1 5 0" />
    </svg>
  );
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotal = useCartStore((s) => s.getTotal);
  const getDeliveryFee = useCartStore((s) => s.getDeliveryFee);
  const getGrandTotal = useCartStore((s) => s.getGrandTotal);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hostel, setHostel] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);
  const vendorName = items.length > 0 ? items[0].vendor.name : "";

  function handlePlaceOrder() {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!hostel) {
      toast.error("Please select your hostel");
      return;
    }
    if (!roomNumber.trim()) {
      toast.error("Please enter your room number");
      return;
    }

    setIsPlacing(true);

    const orderItemsString = items
      .map((item) => {
        const itemPrice = item.variant?.price ?? item.menu_item.price;
        const variantText = item.variant ? ` (${item.variant.name})` : "";
        const unitText = item.menu_item.unit ? ` (${item.menu_item.unit})` : "";
        return `- ${item.quantity}x ${item.menu_item.name}${variantText}${unitText} = ₹${itemPrice * item.quantity}`;
      })
      .join("\n");

    const message = `Hello Ryello! Here is my order:

• *Name:* ${name.trim()}
• *Phone:* ${phone.trim()}
• *Address:* ${hostel}, Room ${roomNumber.trim()}
${notes.trim() ? `• *Notes:* ${notes.trim()}\n` : ""}
• *Vendor:* ${vendorName}

• *Order Details:*
${orderItemsString}

*Subtotal:* ₹${getTotal()}
*Delivery:* ₹${getDeliveryFee()}
*Total:* ₹${getGrandTotal()}`;

    const whatsappUrl = `https://wa.me/919251030358?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    toast.success("Redirecting to WhatsApp...", {
      description: "Send the pre-filled message to confirm your order!"
    });
    
    // Don't clear cart immediately in case they want to come back and modify
    // They can clear it manually later or it clears on next vendor selection
    setTimeout(() => {
      setIsPlacing(false);
    }, 1000);
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-lg px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-5" />
            </Link>
            <h1 className="text-xl font-bold">Your Cart</h1>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart className="size-12 text-gray-400" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="mb-6 max-w-xs text-sm text-muted-foreground">
              Looks like you haven&apos;t added anything yet. Browse our vendors
              and find something delicious!
            </p>
            <Button render={<Link href="/vendors" />} nativeButton={false}>
              Browse Vendors
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="mx-auto max-w-lg px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-xl font-bold">Your Cart</h1>
        </div>

        {/* Order Slot Notice */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
          <Clock className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div className="text-sm">
            <p className="font-medium text-amber-800">
              Order Slot: {ORDER_SLOT.label}
            </p>
            <p className="mt-0.5 text-amber-700">
              Delivery by {DELIVERY_TIME.label}
            </p>
          </div>
        </div>

        {/* Vendor Name */}
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Ordering from{" "}
          <span className="font-semibold text-foreground">{vendorName}</span>
        </p>

        {/* Cart Items */}
        <Card className="mb-6">
          <CardContent className="divide-y p-0">
            {items.map((item) => {
              const itemPrice = item.variant?.price ?? item.menu_item.price;
              const itemKey = `${item.menu_item.id}-${item.variant?.name ?? "default"}`;

              return (
                <div key={itemKey} className="flex items-start gap-3 p-4">
                  {/* Veg/Non-veg Indicator */}
                  <span className="mt-1 text-sm leading-none">
                    {item.menu_item.is_veg ? "🟢" : "🔴"}
                  </span>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight">
                      {item.menu_item.name}
                    </p>
                    {item.variant && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.variant.name}
                      </p>
                    )}
                    {item.menu_item.unit && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.menu_item.unit}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {formatPrice(itemPrice)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-0">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.menu_item.id,
                          item.quantity - 1,
                          item.variant?.name
                        )
                      }
                      className="flex size-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="flex h-8 min-w-[32px] items-center justify-center border-y border-gray-300 bg-white px-2 text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.menu_item.id,
                          item.quantity + 1,
                          item.variant?.name
                        )
                      }
                      className="flex size-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeItem(item.menu_item.id, item.variant?.name)
                    }
                    className="mt-1 p-1 text-gray-400 hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-0">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">
                {formatPrice(getDeliveryFee())}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>Grand Total</span>
              <span className="text-primary">
                {formatPrice(getGrandTotal())}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Details */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-4" />
              Delivery Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9"
                />
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9"
                />
                <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Hostel Select */}
            <div className="space-y-2">
              <Label htmlFor="hostel">Hostel *</Label>
              <div className="relative">
                <select
                  id="hostel"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className="flex h-10 w-full appearance-none rounded-lg border border-input bg-transparent px-3 py-2 pr-9 text-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select your hostel
                  </option>
                  {HOSTELS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Room Number */}
            <div className="space-y-2">
              <Label htmlFor="room">Room Number *</Label>
              <Input
                id="room"
                placeholder="e.g. 204"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <Label htmlFor="notes">Special Instructions</Label>
              <Textarea
                id="notes"
                placeholder="Any special requests? (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Place Order Button */}
        <Button
          size="lg"
          className="w-full text-base font-semibold bg-[#25D366] hover:bg-[#20B056] text-white gap-2"
          onClick={handlePlaceOrder}
          disabled={isPlacing}
        >
          {isPlacing ? (
            "Redirecting..."
          ) : (
            <>
              <WhatsAppIcon className="size-5" />
              Order on WhatsApp — {formatPrice(getGrandTotal())}
            </>
          )}
        </Button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          You will be redirected to WhatsApp to confirm and send your order.
        </p>
      </div>
    </div>
  );
}
