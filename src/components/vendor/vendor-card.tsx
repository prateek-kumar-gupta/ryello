import Link from "next/link";
import { Star, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Vendor } from "@/types";
import { formatPrice, truncate, getInitials } from "@/lib/utils";

const VENDOR_COLORS = [
  "bg-teal-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-emerald-600",
  "bg-purple-600",
];

function getVendorColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return VENDOR_COLORS[Math.abs(hash) % VENDOR_COLORS.length];
}

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link href={`/vendors/${vendor.id}`}>
      <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {/* Image placeholder */}
        <div
          className={`${getVendorColor(vendor.id)} h-36 sm:h-40 flex items-center justify-center relative`}
        >
          <span className="text-4xl sm:text-5xl font-bold text-white/90 select-none">
            {getInitials(vendor.name)}
          </span>

          {/* Veg / Non-veg badge overlay */}
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 text-xs font-medium gap-1"
          >
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                vendor.is_veg ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {vendor.is_veg ? "Pure Veg" : "Non-Veg"}
          </Badge>
        </div>

        <CardContent className="p-4 space-y-2">
          {/* Name */}
          <h3 className="font-semibold text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
            {vendor.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-snug">
            {truncate(vendor.description, 80)}
          </p>

          {/* Rating + Delivery fee row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{vendor.rating}</span>
              <span className="text-muted-foreground">
                ({vendor.total_ratings.toLocaleString("en-IN")}+)
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Truck className="h-3.5 w-3.5" />
              <span>{formatPrice(vendor.delivery_fee)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
