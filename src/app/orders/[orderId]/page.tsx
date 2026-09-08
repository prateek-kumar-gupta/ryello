import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUSES, WHATSAPP_NUMBER } from "@/lib/constants";
import type { Order, OrderStatus } from "@/types";
import { MOCK_VENDORS } from "@/lib/mock-data";

// ---------------------------------------------------------------------------
// Inline mock order data (mirrors the orders page)
// ---------------------------------------------------------------------------
const MOCK_ORDERS: Record<string, Order> = {
  "ORD-2409081": {
    id: "ORD-2409081",
    user_id: "u1",
    vendor_id: "v1",
    vendor: MOCK_VENDORS[0],
    items: [
      { menu_item_id: "m1", name: "Milk Cake Burfi", price: 204, quantity: 2, variant_name: null },
      { menu_item_id: "m5", name: "Rasmalai", price: 179, quantity: 1, variant_name: null },
    ],
    total_amount: 587,
    delivery_fee: 30,
    grand_total: 617,
    status: "delivered",
    payment_mode: "online",
    delivery_address: "Hostel 3 (BH-3), Room 204",
    notes: "",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  "ORD-2409082": {
    id: "ORD-2409082",
    user_id: "u1",
    vendor_id: "v3",
    vendor: MOCK_VENDORS[2],
    items: [
      { menu_item_id: "m30", name: "Chicken Biryani", price: 285, quantity: 1, variant_name: "Full" },
      { menu_item_id: "m37", name: "Butter Naan", price: 55, quantity: 2, variant_name: null },
    ],
    total_amount: 395,
    delivery_fee: 30,
    grand_total: 425,
    status: "preparing",
    payment_mode: "online",
    delivery_address: "Hostel 3 (BH-3), Room 204",
    notes: "Extra raita please",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
  },
  "ORD-2409083": {
    id: "ORD-2409083",
    user_id: "u1",
    vendor_id: "v2",
    vendor: MOCK_VENDORS[1],
    items: [
      { menu_item_id: "m10", name: "Chilly Paneer", price: 304, quantity: 1, variant_name: null },
      { menu_item_id: "m21", name: "Chole Bhature", price: 199, quantity: 1, variant_name: null },
      { menu_item_id: "m23", name: "Golgappe", price: 69, quantity: 2, variant_name: null },
    ],
    total_amount: 641,
    delivery_fee: 30,
    grand_total: 671,
    status: "cancelled",
    payment_mode: "online",
    delivery_address: "Girls Hostel 2 (GH-2), Room 112",
    notes: "",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
};

// ---------------------------------------------------------------------------
// Status timeline helpers
// ---------------------------------------------------------------------------
const TIMELINE_STEPS: { status: OrderStatus; label: string }[] = [
  { status: "pending", label: "Order Placed" },
  { status: "confirmed", label: "Confirmed" },
  { status: "preparing", label: "Preparing" },
  { status: "out_for_delivery", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" },
];

function getStepState(
  currentStatus: OrderStatus,
  stepStatus: OrderStatus
): "done" | "current" | "upcoming" {
  if (currentStatus === "cancelled") {
    // If cancelled, only "pending" is done-ish; rest are upcoming
    return stepStatus === "pending" ? "done" : "upcoming";
  }
  const currentIdx = TIMELINE_STEPS.findIndex((s) => s.status === currentStatus);
  const stepIdx = TIMELINE_STEPS.findIndex((s) => s.status === stepStatus);
  if (stepIdx < currentIdx) return "done";
  if (stepIdx === currentIdx) return "current";
  return "upcoming";
}

function getStatusConfig(status: OrderStatus) {
  return (
    ORDER_STATUSES.find((s) => s.value === status) ?? {
      value: status,
      label: status,
      color: "bg-gray-100 text-gray-800",
    }
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = MOCK_ORDERS[orderId];

  if (!order) {
    notFound();
  }

  const statusConfig = getStatusConfig(order.status);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(
    `Hi! I need help with my order ${order.id}`
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="mx-auto max-w-lg px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/orders"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Order Details</h1>
            <p className="text-xs font-mono text-muted-foreground">
              {order.id}
            </p>
          </div>
        </div>

        {/* Status Badge & Vendor */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  {order.vendor?.name ?? "Unknown Vendor"}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {formatDate(order.created_at)}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig.color}`}
              >
                {statusConfig.label}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Timeline */}
        {order.status !== "cancelled" && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="size-4" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-0">
                {TIMELINE_STEPS.map((step, idx) => {
                  const state = getStepState(order.status, step.status);
                  const isLast = idx === TIMELINE_STEPS.length - 1;

                  return (
                    <div key={step.status} className="flex gap-3">
                      {/* Icon + Line */}
                      <div className="flex flex-col items-center">
                        {state === "done" ? (
                          <CheckCircle2 className="size-5 shrink-0 text-green-600" />
                        ) : state === "current" ? (
                          <div className="flex size-5 items-center justify-center">
                            <div className="size-3.5 rounded-full border-[3px] border-primary bg-primary/20" />
                          </div>
                        ) : (
                          <Circle className="size-5 shrink-0 text-gray-300" />
                        )}
                        {!isLast && (
                          <div
                            className={`w-0.5 flex-1 min-h-6 ${
                              state === "done"
                                ? "bg-green-600"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>

                      {/* Label */}
                      <p
                        className={`pb-5 text-sm ${
                          state === "done"
                            ? "font-medium text-green-700"
                            : state === "current"
                              ? "font-semibold text-primary"
                              : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cancelled Notice */}
        {order.status === "cancelled" && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-sm font-medium text-red-800">
              This order was cancelled.
            </p>
          </div>
        )}

        {/* Items List */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Items</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y">
              {order.items.map((item, idx) => (
                <div
                  key={`${item.menu_item_id}-${idx}`}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">
                      {item.name}
                      {item.variant_name && (
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({item.variant_name})
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Breakdown */}
        <Card className="mb-6">
          <CardContent className="space-y-2.5 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">
                {formatPrice(order.total_amount)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">
                {formatPrice(order.delivery_fee)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>Grand Total</span>
              <span className="text-primary">
                {formatPrice(order.grand_total)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Payment</span>
              <span className="uppercase">{order.payment_mode}</span>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Delivery Address</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {order.delivery_address}
                </p>
                {order.notes && (
                  <p className="mt-1 text-xs text-muted-foreground italic">
                    Note: {order.notes}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Support */}
        <Button
          render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}
          nativeButton={false}
          variant="outline"
          className="w-full gap-2 text-green-700 border-green-200 hover:bg-green-50"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" />
            Need Help? Chat on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
