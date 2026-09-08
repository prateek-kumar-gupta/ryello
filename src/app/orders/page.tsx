import Link from "next/link";
import { ArrowLeft, ShoppingBag, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import type { Order, OrderStatus } from "@/types";
import { MOCK_VENDORS } from "@/lib/mock-data";

// ---------------------------------------------------------------------------
// Inline mock orders
// ---------------------------------------------------------------------------
const MOCK_ORDERS: Order[] = [
  {
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
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
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
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updated_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
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
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

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

export default function OrdersPage() {
  const orders = MOCK_ORDERS;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-xl font-bold">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag className="size-12 text-gray-400" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              No orders yet
            </h2>
            <p className="mb-6 max-w-xs text-sm text-muted-foreground">
              When you place an order, it will show up here so you can track
              it.
            </p>
            <Button render={<Link href="/vendors" />} nativeButton={false}>
              Browse Vendors
            </Button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const itemsSummary = order.items
                .map(
                  (i) =>
                    `${i.name}${i.variant_name ? ` (${i.variant_name})` : ""} ×${i.quantity}`
                )
                .join(", ");

              return (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          {/* Order ID & Status */}
                          <div className="mb-2 flex items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground">
                              {order.id}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.color}`}
                            >
                              {statusConfig.label}
                            </span>
                          </div>

                          {/* Vendor Name */}
                          <p className="text-sm font-semibold">
                            {order.vendor?.name ?? "Unknown Vendor"}
                          </p>

                          {/* Items Summary */}
                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            {itemsSummary}
                          </p>

                          {/* Total & Date */}
                          <div className="mt-2 flex items-center gap-3 text-xs">
                            <span className="font-semibold text-primary">
                              {formatPrice(order.grand_total)}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">
                              {formatDate(order.created_at)}
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="mt-3 size-5 shrink-0 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
