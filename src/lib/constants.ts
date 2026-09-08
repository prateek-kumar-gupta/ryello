// ============================================================
// Ryello — Constants
// ============================================================

export const DELIVERY_FEE = 30; // ₹30 flat

export const ORDER_SLOT = {
  start: "13:00",
  end: "16:30",
  label: "1:00 PM – 4:30 PM",
};

export const DELIVERY_TIME = {
  start: "17:45",
  end: "18:00",
  label: "5:45 PM – 6:00 PM",
};

export const WHATSAPP_NUMBER = "+919251030358";

// Campus Hostels
export const HOSTELS = [
  "BH 1",
  "BH 2",
  "BH 3",
  "BH 4",
  "BH 5",
  "BH 6",
  "BH 7",
  "MBH Block A",
  "MBH Block B",
  "MBH Block E",
  "MBH Block F",
  "GH",
  "MGH",
] as const;

export const LISTING_CATEGORIES = [
  { value: "books", label: "📚 Books" },
  { value: "electronics", label: "💻 Electronics" },
  { value: "clothing", label: "👕 Clothing" },
  { value: "stationery", label: "✏️ Stationery" },
  { value: "furniture", label: "🪑 Furniture" },
  { value: "sports", label: "⚽ Sports" },
  { value: "other", label: "📦 Other" },
] as const;

export const LISTING_CONDITIONS = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
] as const;

export const ORDER_STATUSES = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  { value: "preparing", label: "Preparing", color: "bg-orange-100 text-orange-800" },
  { value: "out_for_delivery", label: "Out for Delivery", color: "bg-purple-100 text-purple-800" },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
] as const;

export const BRAND = {
  name: "Ryello",
  tagline: "Craving Delivered",
  description: "Delivering your favorite meals, snacks & essentials right to your hostel room.",
  colors: {
    primary: "#0D7377",       // Teal from logo
    primaryDark: "#095557",
    accent: "#C4883A",        // Gold/Copper from logo
    accentLight: "#D4A45A",
  },
};
