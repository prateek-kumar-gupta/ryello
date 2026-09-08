import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Truck, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Vendor } from "@/types";

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link href={`/vendors/${vendor.id}`} className="block h-full">
      <Card className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_22px_45px_-10px_rgba(13,115,119,0.25)] hover:-translate-y-2 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
        {/* Real Cover Image Container */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-muted">
          {vendor.image_url ? (
            <Image
              src={vendor.image_url}
              alt={vendor.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold text-2xl">
              {vendor.name.charAt(0)}
            </div>
          )}

          {/* Gradient Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Floating Rating Pill (Top Left) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-gray-900 shadow-md backdrop-blur-md">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span>{vendor.rating}</span>
            <span className="text-muted-foreground font-normal text-[11px]">
              ({vendor.total_ratings > 999 ? `${(vendor.total_ratings / 1000).toFixed(1)}k` : vendor.total_ratings})
            </span>
          </div>

          {/* Veg / Non-veg Badge (Top Right) */}
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 gap-1.5 border border-white/30 bg-white/90 px-2.5 py-1 text-xs font-semibold shadow-md backdrop-blur-md"
          >
            <span
              className={`inline-block size-2 rounded-full ${
                vendor.is_veg ? "bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.6)]" : "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]"
              }`}
            />
            <span className={vendor.is_veg ? "text-green-800" : "text-red-800"}>
              {vendor.is_veg ? "Pure Veg" : "Non-Veg"}
            </span>
          </Badge>

          {/* Bottom Overlay Info inside image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="inline-flex items-center gap-1 font-medium drop-shadow-md">
              <Clock className="size-3.5 text-amber-300" />
              {vendor.delivery_time}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-0.5 font-semibold text-[11px] shadow">
              <Truck className="size-3" />
              ₹{vendor.delivery_fee} Delivery
            </span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col justify-between p-4 sm:p-5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-base sm:text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
                {vendor.name}
              </h3>
              <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-1 transition-all">
                <ArrowUpRight className="size-4" />
              </div>
            </div>

            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {vendor.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span className="truncate max-w-[200px]">{vendor.address}</span>
            <span className="font-semibold text-primary shrink-0 group-hover:underline">
              Explore Menu →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
