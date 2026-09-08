// ============================================================
// Ryello — Mock / Seed Data for Development
// ============================================================
// This data will be replaced by Supabase queries once connected.

import type { Vendor, MenuCategory, MenuItem, Listing } from "@/types";

export const MOCK_VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "Super Cremica Sweets",
    description: "Pure Desi Ghee Goodness — Premium quality sweets, traditional taste, always fresh. 100% Veg.",
    image_url: "/images/vendors/cremica.jpg",
    rating: 4.5,
    total_ratings: 2000,
    is_veg: true,
    is_active: true,
    order_slot_start: "13:00",
    order_slot_end: "16:30",
    delivery_time: "5:45 PM – 6:00 PM",
    delivery_fee: 30,
    whatsapp: "+919251030358",
    address: "Shastri Nagar, Jalandhar (Near Model Town)",
    owner_id: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "v2",
    name: "Bikanervala",
    description: "Tradition, Taste, Trust — Asian street food, chaat, global bites, ice cream & more. 100% Veg.",
    image_url: "/images/vendors/bikanervala.jpg",
    rating: 4.3,
    total_ratings: 1500,
    is_veg: true,
    is_active: true,
    order_slot_start: "13:00",
    order_slot_end: "16:30",
    delivery_time: "5:45 PM – 6:00 PM",
    delivery_fee: 30,
    whatsapp: "+919251030358",
    address: "Model Town, Jalandhar",
    owner_id: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "v3",
    name: "Shahi Daawat Dhaba",
    description: "Authentic Flavours, Royal Taste — Chicken, Mutton, Rolls & more. Non-veg thali ₹295.",
    image_url: "/images/vendors/shahidaawat.jpg",
    rating: 4.1,
    total_ratings: 235,
    is_veg: false,
    is_active: true,
    order_slot_start: "13:00",
    order_slot_end: "16:30",
    delivery_time: "5:45 PM – 6:00 PM",
    delivery_fee: 30,
    whatsapp: "+919251030358",
    address: "Jyothi Chowk, Skylark Road, Shastri Nagar, Jalandhar 144008",
    owner_id: "",
    created_at: new Date().toISOString(),
  },
];

// --- Super Cremica Sweets Categories & Items ---

export const MOCK_CATEGORIES: MenuCategory[] = [
  { id: "c1", vendor_id: "v1", name: "Sweets", sort_order: 1 },
  { id: "c2", vendor_id: "v2", name: "Asian Street Food", sort_order: 1 },
  { id: "c3", vendor_id: "v2", name: "Chaat & Jugalbandi", sort_order: 2 },
  { id: "c4", vendor_id: "v2", name: "Global Bites", sort_order: 3 },
  { id: "c5", vendor_id: "v2", name: "Chole Bhature", sort_order: 4 },
  { id: "c6", vendor_id: "v2", name: "Chatpati Chaat", sort_order: 5 },
  { id: "c7", vendor_id: "v2", name: "Ice Cream & Kulfi", sort_order: 6 },
  { id: "c8", vendor_id: "v2", name: "Sweets", sort_order: 7 },
  { id: "c9", vendor_id: "v2", name: "Snacks & Dhokla", sort_order: 8 },
  { id: "c10", vendor_id: "v3", name: "Chicken", sort_order: 1 },
  { id: "c11", vendor_id: "v3", name: "Mutton", sort_order: 2 },
  { id: "c12", vendor_id: "v3", name: "Roasted", sort_order: 3 },
  { id: "c13", vendor_id: "v3", name: "Roll", sort_order: 4 },
  { id: "c14", vendor_id: "v3", name: "Roti", sort_order: 5 },
  { id: "c15", vendor_id: "v3", name: "Beverages", sort_order: 6 },
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
  // --- Super Cremica Sweets ---
  {
    id: "m1", vendor_id: "v1", category_id: "c1", name: "Milk Cake Burfi", description: "Traditional milk cake burfi",
    price: 204, image_url: null, is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m2", vendor_id: "v1", category_id: "c1", name: "Desi Ghee Gulab Jamun", description: "Made with pure desi ghee",
    price: 189, image_url: null, is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m3", vendor_id: "v1", category_id: "c1", name: "Patisa Desi Ghee", description: "Flaky patisa made with desi ghee",
    price: 204, image_url: null, is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m4", vendor_id: "v1", category_id: "c1", name: "Desi Ghee Atta Biscuits", description: "Wholesome atta biscuits",
    price: 259, image_url: null, is_veg: true, is_available: true, variants: [], unit: "500 Gm (1 Packet)", created_at: new Date().toISOString(),
  },
  {
    id: "m5", vendor_id: "v1", category_id: "c1", name: "Rasmalai", description: "Soft and creamy rasmalai",
    price: 179, image_url: null, is_veg: true, is_available: true, variants: [], unit: "2 Pcs", created_at: new Date().toISOString(),
  },
  {
    id: "m6", vendor_id: "v1", category_id: "c1", name: "Kesar Gulab Jamun [Mini]", description: "Mini gulab jamun with kesar flavour",
    price: 204, image_url: null, is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m7", vendor_id: "v1", category_id: "c1", name: "Ghewar (Small)", description: "Traditional ghewar",
    price: 139, image_url: null, is_veg: true, is_available: true, variants: [], unit: "1 Piece, 100G", created_at: new Date().toISOString(),
  },
  {
    id: "m8", vendor_id: "v1", category_id: "c1", name: "Ghewar (500 Gm)", description: "Traditional ghewar",
    price: 554, image_url: null, is_veg: true, is_available: true, variants: [], unit: "500 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m9", vendor_id: "v1", category_id: "c1", name: "Ghewar (1 Kg)", description: "Traditional ghewar",
    price: 1109, image_url: null, is_veg: true, is_available: true, variants: [], unit: "1 Kg", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Asian Street Food ---
  {
    id: "m10", vendor_id: "v2", category_id: "c2", name: "Chilly Paneer", description: "Dry or Gravy",
    price: 304, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m11", vendor_id: "v2", category_id: "c2", name: "Veg Manchurian", description: "Dry or Gravy",
    price: 249, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m12", vendor_id: "v2", category_id: "c2", name: "Spring Roll", description: "Crispy spring rolls",
    price: 224, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m13", vendor_id: "v2", category_id: "c2", name: "Paneer Momos", description: "Steamed paneer momos",
    price: 174, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m14", vendor_id: "v2", category_id: "c2", name: "Veg Momos", description: "Steamed veg momos",
    price: 134, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Chaat ---
  {
    id: "m15", vendor_id: "v2", category_id: "c3", name: "Sev Puri", description: "Classic sev puri",
    price: 129, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m16", vendor_id: "v2", category_id: "c3", name: "Dahi Puri", description: "Sweet & tangy dahi puri",
    price: 169, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m17", vendor_id: "v2", category_id: "c3", name: "Raj Kachori", description: "Crispy raj kachori",
    price: 169, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Global Bites ---
  {
    id: "m18", vendor_id: "v2", category_id: "c4", name: "Veg Burger", description: "Classic veg burger",
    price: 129, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m19", vendor_id: "v2", category_id: "c4", name: "French Fries", description: "Crispy golden fries",
    price: 109, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m20", vendor_id: "v2", category_id: "c4", name: "Veggie Pizza", description: "Onion, Tomato, Capsicum",
    price: 309, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Chole Bhature ---
  {
    id: "m21", vendor_id: "v2", category_id: "c5", name: "Chole Bhature", description: "A timeless favourite",
    price: 199, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Chatpati Chaat ---
  {
    id: "m22", vendor_id: "v2", category_id: "c6", name: "Pao Bhaji", description: "Mumbai style pao bhaji",
    price: 189, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m23", vendor_id: "v2", category_id: "c6", name: "Golgappe", description: "Chatpata golgappe",
    price: 69, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Ice Cream ---
  {
    id: "m24", vendor_id: "v2", category_id: "c7", name: "Matka Kulfi", description: "Traditional matka kulfi",
    price: 149, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m25", vendor_id: "v2", category_id: "c7", name: "Kulfi Falooda", description: "Rich kulfi with falooda",
    price: 159, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Snacks ---
  {
    id: "m26", vendor_id: "v2", category_id: "c9", name: "Samosa", description: "Classic crispy samosa",
    price: 44, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Chicken ---
  {
    id: "m30", vendor_id: "v3", category_id: "c10", name: "Chicken Biryani", description: "Dum Pukht style biryani",
    price: 150, image_url: null, is_veg: false, is_available: true,
    variants: [{ name: "Half", price: 150 }, { name: "Full", price: 285 }],
    unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m31", vendor_id: "v3", category_id: "c10", name: "Butter Chicken", description: "Creamy butter chicken",
    price: 275, image_url: null, is_veg: false, is_available: true,
    variants: [{ name: "Half", price: 275 }, { name: "Full", price: 525 }],
    unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m32", vendor_id: "v3", category_id: "c10", name: "Chicken Korma", description: "Rich chicken korma",
    price: 230, image_url: null, is_veg: false, is_available: true,
    variants: [{ name: "Half", price: 230 }, { name: "Full", price: 420 }],
    unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Mutton ---
  {
    id: "m33", vendor_id: "v3", category_id: "c11", name: "Mutton Korma", description: "Asli dum ka swaad",
    price: 360, image_url: null, is_veg: false, is_available: true,
    variants: [{ name: "Half (4 Pcs)", price: 360 }, { name: "Full (8 Pcs)", price: 650 }],
    unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m34", vendor_id: "v3", category_id: "c11", name: "Mutton Biryani", description: "Dum Pukht style",
    price: 265, image_url: null, is_veg: false, is_available: true,
    variants: [{ name: "Half (2 Pcs)", price: 265 }, { name: "Full (4 Pcs)", price: 475 }],
    unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Rolls ---
  {
    id: "m35", vendor_id: "v3", category_id: "c13", name: "Malai Tikka Roll", description: "1 piece roll",
    price: 125, image_url: null, is_veg: false, is_available: true, variants: [], unit: "1 Pc", created_at: new Date().toISOString(),
  },
  {
    id: "m36", vendor_id: "v3", category_id: "c13", name: "Chicken Tikka Roll", description: "1 piece roll",
    price: 105, image_url: null, is_veg: false, is_available: true, variants: [], unit: "1 Pc", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Roti ---
  {
    id: "m37", vendor_id: "v3", category_id: "c14", name: "Butter Naan", description: "Fresh butter naan",
    price: 55, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m38", vendor_id: "v3", category_id: "c14", name: "Rumali Roti", description: "Thin and soft",
    price: 10, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Beverages ---
  {
    id: "m39", vendor_id: "v3", category_id: "c15", name: "Water", description: "Packaged drinking water",
    price: 20, image_url: null, is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m40", vendor_id: "v3", category_id: "c15", name: "Cold Drink", description: "750ml bottle",
    price: 55, image_url: null, is_veg: true, is_available: true, variants: [], unit: "750ml", created_at: new Date().toISOString(),
  },
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "l1",
    seller_id: "u1",
    title: "Engineering Mathematics - B.S. Grewal",
    description: "3rd year textbook, lightly used. All pages intact, some highlighting.",
    price: 350,
    images: [],
    category: "books",
    condition: "good",
    status: "active",
    whatsapp: "+919876543210",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "l2",
    seller_id: "u2",
    title: "Scientific Calculator - Casio FX-991EX",
    description: "Barely used, works perfectly. Selling because I graduated.",
    price: 800,
    images: [],
    category: "electronics",
    condition: "like_new",
    status: "active",
    whatsapp: "+919876543211",
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: "l3",
    seller_id: "u3",
    title: "Study Table + Chair Set",
    description: "Wooden study table with cushioned chair. In great shape.",
    price: 2500,
    images: [],
    category: "furniture",
    condition: "good",
    status: "active",
    whatsapp: "+919876543212",
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
];
