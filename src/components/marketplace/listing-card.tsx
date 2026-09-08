"use client";

import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, timeAgo } from "@/lib/utils";
import { LISTING_CATEGORIES, LISTING_CONDITIONS } from "@/lib/constants";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const categoryLabel =
    LISTING_CATEGORIES.find((c) => c.value === listing.category)?.label ??
    listing.category;

  const conditionLabel =
    LISTING_CONDITIONS.find((c) => c.value === listing.condition)?.label ??
    listing.condition;

  return (
    <Link href={`/marketplace/${listing.id}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
        {/* Image placeholder */}
        <div className="relative aspect-square w-full bg-muted flex items-center justify-center overflow-hidden">
          {listing.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="size-10" />
              <span className="text-xs">No image</span>
            </div>
          )}

          {/* Price overlay */}
          <div className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-sm font-bold text-white">
            {formatPrice(listing.price)}
          </div>
        </div>

        <CardContent className="space-y-2 p-3">
          {/* Title */}
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
            {listing.title}
          </h3>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary" className="text-[10px]">
              {categoryLabel}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {conditionLabel}
            </Badge>
          </div>

          {/* Time ago */}
          <p className="text-xs text-muted-foreground">
            {timeAgo(listing.created_at)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
