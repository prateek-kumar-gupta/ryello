import Link from "next/link";
import { Clock, Truck, IndianRupee, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VendorCard } from "@/components/vendor/vendor-card";
import { MOCK_VENDORS } from "@/lib/mock-data";
import { ORDER_SLOT, DELIVERY_TIME, DELIVERY_FEE, BRAND } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-gradient-to-br from-primary/95 to-primary overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Craving something delicious?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            Order from the best restaurants, delivered to your hostel at NIT
            Jalandhar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              render={<Link href="/vendors" />}
              nativeButton={false}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-8"
            >
              Browse Vendors
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Order Info Bar ─── */}
      <section className="border-b bg-muted/50">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">Order Slot:</span>
              <span className="font-semibold">{ORDER_SLOT.label}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">Delivery:</span>
              <span className="font-semibold">{DELIVERY_TIME.label}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <IndianRupee className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">Delivery Fee:</span>
              <span className="font-semibold">₹{DELIVERY_FEE} flat</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Vendors ─── */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Featured Vendors
            </h2>
            <p className="mt-1 text-muted-foreground text-sm">
              Your favourite restaurants, one tap away
            </p>
          </div>
          <Button variant="ghost" render={<Link href="/vendors" />} nativeButton={false} className="hidden sm:flex gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_VENDORS.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Button variant="outline" render={<Link href="/vendors" />} nativeButton={false} className="gap-1">
            View all vendors <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* ─── Marketplace CTA ─── */}
      <section className="bg-muted/40 border-t">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="rounded-xl bg-gradient-to-r from-[#C4883A]/10 to-primary/10 border p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <ShoppingBag className="h-6 w-6 text-[#C4883A]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#C4883A]">
                  {BRAND.name} Marketplace
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Browse Marketplace
              </h2>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-md">
                Buy &amp; sell textbooks, electronics &amp; more from fellow
                students at NIT Jalandhar.
              </p>
            </div>
            <Button
              disabled
              size="lg"
              className="shrink-0 font-semibold px-8"
            >
              Coming Soon
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
