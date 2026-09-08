"use client";

import {
  ShoppingBag,
  IndianRupee,
  Clock,
  ChefHat,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import type { OrderStatus } from "@/types";

// ── Stats ──
const STATS = [
  {
    label: "Today's Orders",
    value: "12",
    icon: ShoppingBag,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Revenue",
    value: formatPrice(4560),
    icon: IndianRupee,
    color: "text-green-600 bg-green-100",
  },
  {
    label: "Pending Orders",
    value: "3",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    label: "Active Menu Items",
    value: "25",
    icon: ChefHat,
    color: "text-primary bg-primary/10",
  },
] as const;

// ── Mock Recent Orders ──
interface RecentOrder {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: OrderStatus;
  time: string;
}

const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "ORD-1042",
    customer: "Rahul Sharma",
    items: "2× Chilly Paneer, 1× Chole Bhature",
    total: 807,
    status: "pending",
    time: "2 min ago",
  },
  {
    id: "ORD-1041",
    customer: "Priya Gupta",
    items: "1× Veg Manchurian, 1× Samosa",
    total: 293,
    status: "preparing",
    time: "12 min ago",
  },
  {
    id: "ORD-1040",
    customer: "Amit Kumar",
    items: "3× Paneer Momos, 1× French Fries",
    total: 631,
    status: "confirmed",
    time: "25 min ago",
  },
  {
    id: "ORD-1039",
    customer: "Sneha Patel",
    items: "1× Veggie Pizza, 2× Matka Kulfi",
    total: 607,
    status: "out_for_delivery",
    time: "1 hr ago",
  },
  {
    id: "ORD-1038",
    customer: "Vikram Singh",
    items: "1× Chole Bhature, 1× Golgappe",
    total: 268,
    status: "delivered",
    time: "2 hr ago",
  },
];

function getStatusStyle(status: OrderStatus) {
  return (
    ORDER_STATUSES.find((s) => s.value === status) ?? ORDER_STATUSES[0]
  );
}

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* ── Page Header ── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, Bikanervala! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate">
                    {stat.label}
                  </p>
                  <p className="text-lg font-bold leading-tight">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Recent Orders ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Customer
                </TableHead>
                <TableHead className="hidden md:table-cell">Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_ORDERS.map((order) => {
                const statusInfo = getStatusStyle(order.status);
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.customer}
                    </TableCell>
                    <TableCell className="hidden max-w-48 truncate md:table-cell">
                      {order.items}
                    </TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusInfo.color}
                      >
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {order.time}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
