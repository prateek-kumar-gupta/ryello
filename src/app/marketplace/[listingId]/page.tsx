"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImageIcon,
  MessageCircle,
  User,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { LISTING_CATEGORIES, LISTING_CONDITIONS } from "@/lib/constants";
import { formatPrice, timeAgo } from "@/lib/utils";

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = use(params);
  const listing = MOCK_LISTINGS.find((l) => l.id === listingId);

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium text-muted-foreground">
          Listing not found
        </p>
        <Link href="/marketplace">
          <Button variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  const categoryLabel =
    LISTING_CATEGORIES.find((c) => c.value === listing.category)?.label ??
    listing.category;

  const conditionLabel =
    LISTING_CONDITIONS.find((c) => c.value === listing.condition)?.label ??
    listing.condition;

  const whatsappUrl = `https://wa.me/${listing.whatsapp.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(
    `Hi! I'm interested in your listing on Ryello: "${listing.title}" (${formatPrice(listing.price)})`
  )}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Back navigation */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Image gallery placeholder */}
        <div className="overflow-hidden rounded-xl bg-muted">
          {listing.images.length > 0 ? (
            <div className="grid grid-cols-1 gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <ImageIcon className="size-16" />
              <p className="text-sm">No images uploaded</p>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mt-6 space-y-6">
          {/* Title & price */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{categoryLabel}</Badge>
              <Badge variant="outline">{conditionLabel}</Badge>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">
              {listing.title}
            </h1>
            <p className="mt-1 text-3xl font-bold text-primary">
              {formatPrice(listing.price)}
            </p>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </h2>
            <p className="mt-2 leading-relaxed text-foreground/80">
              {listing.description}
            </p>
          </div>

          <Separator />

          {/* Seller info */}
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Seller
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="size-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">NIT Jalandhar Student</p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    <span>NIT Jalandhar Campus</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posted time */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>Posted {timeAgo(listing.created_at)}</span>
          </div>

          {/* Contact button */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full gap-2 text-base">
              <MessageCircle className="size-5" />
              Contact Seller on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
