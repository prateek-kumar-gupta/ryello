// ============================================================
// Ryello — Type Definitions
// ============================================================

// --- User / Auth ---

export type UserRole = "student" | "vendor" | "admin";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  hostel: string;
  room_number: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

// --- Vendor ---

export interface Vendor {
  id: string;
  name: string;
  description: string;
  image_url: string;
  rating: number;
  total_ratings: number;
  is_veg: boolean;
  is_active: boolean;
  order_slot_start: string; // "13:00"
  order_slot_end: string;   // "16:30"
  delivery_time: string;    // "17:45 - 18:00"
  delivery_fee: number;
  whatsapp: string;
  address: string;
  owner_id: string;
  created_at: string;
}

// --- Menu ---

export interface MenuCategory {
  id: string;
  vendor_id: string;
  name: string;
  sort_order: number;
}

export interface MenuItemVariant {
  name: string;   // e.g. "Half", "Full"
  price: number;
}

export interface MenuItem {
  id: string;
  vendor_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  is_veg: boolean;
  is_available: boolean;
  variants: MenuItemVariant[];
  unit: string;         // e.g. "250 Gm", "2 Pcs"
  created_at: string;
}

// --- Cart ---

export interface CartItem {
  menu_item: MenuItem;
  vendor: Vendor;
  variant: MenuItemVariant | null;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem, vendor: Vendor, variant?: MenuItemVariant | null) => void;
  removeItem: (menuItemId: string, variantName?: string) => void;
  updateQuantity: (menuItemId: string, quantity: number, variantName?: string) => void;
  clearCart: () => void;
  clearVendorItems: (vendorId: string) => void;
  getTotal: () => number;
  getDeliveryFee: () => number;
  getGrandTotal: () => number;
  getItemCount: () => number;
  getVendorId: () => string | null;
}

// --- Orders ---

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentMode = "online";

export interface OrderItem {
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
  variant_name: string | null;
}

export interface Order {
  id: string;
  user_id: string;
  vendor_id: string;
  vendor?: Vendor;
  items: OrderItem[];
  total_amount: number;
  delivery_fee: number;
  grand_total: number;
  status: OrderStatus;
  payment_mode: PaymentMode;
  delivery_address: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

// --- P2P Marketplace ---

export type ListingCategory =
  | "books"
  | "electronics"
  | "clothing"
  | "stationery"
  | "furniture"
  | "sports"
  | "other";

export type ListingCondition = "new" | "like_new" | "good" | "fair";
export type ListingStatus = "active" | "sold" | "removed";

export interface Listing {
  id: string;
  seller_id: string;
  seller?: Profile;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: ListingCategory;
  condition: ListingCondition;
  status: ListingStatus;
  whatsapp: string;
  created_at: string;
}
