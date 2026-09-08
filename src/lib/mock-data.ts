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
    image_url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80",
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
    image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80",
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
  // --- Super Cremica Sweets (Authentic Real Photos from Menu Flyer) ---
  {
    id: "m1", vendor_id: "v1", category_id: "c1", name: "Milk Cake Burfi", description: "Traditional granular milk cake burfi made from pure reduced milk",
    price: 204, image_url: "/menu/super-cremica/m1_milk_cake.jpg", is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m2", vendor_id: "v1", category_id: "c1", name: "Desi Ghee Gulab Jamun", description: "Soft melt-in-mouth dumplings soaked in saffron-cardamom syrup",
    price: 189, image_url: "/menu/super-cremica/m2_desi_jamun.jpg", is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m3", vendor_id: "v1", category_id: "c1", name: "Patisa Desi Ghee", description: "Flaky ribbon-like traditional patisa made with pure desi ghee",
    price: 204, image_url: "/menu/super-cremica/m3_patisa.jpg", is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m4", vendor_id: "v1", category_id: "c1", name: "Desi Ghee Atta Biscuits", description: "Crisp and wholesome bakery biscuits made with pure ghee",
    price: 259, image_url: "/menu/super-cremica/m4_atta_biscuits.jpg", is_veg: true, is_available: true, variants: [], unit: "500 Gm (1 Packet)", created_at: new Date().toISOString(),
  },
  {
    id: "m5", vendor_id: "v1", category_id: "c1", name: "Rasmalai", description: "Soft spongy chenna cakes floating in thick pistachio-saffron milk",
    price: 179, image_url: "/menu/super-cremica/m5_rasmalai.jpg", is_veg: true, is_available: true, variants: [], unit: "2 Pcs", created_at: new Date().toISOString(),
  },
  {
    id: "m6", vendor_id: "v1", category_id: "c1", name: "Kesar Gulab Jamun [Mini]", description: "Bite-sized fragrant gulab jamuns infused with premium Kashmiri saffron",
    price: 204, image_url: "/menu/super-cremica/m7_kesar_jamun.jpg", is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m7", vendor_id: "v1", category_id: "c1", name: "Ghewar (Small)", description: "Traditional honeycombed Rajasthani dessert topped with dry fruits",
    price: 139, image_url: "/menu/super-cremica/m9_ghewar_small.jpg", is_veg: true, is_available: true, variants: [], unit: "1 Piece, 100G", created_at: new Date().toISOString(),
  },
  {
    id: "m8", vendor_id: "v1", category_id: "c1", name: "Ghewar (500 Gm)", description: "Large festive crispy ghewar immersed in sugar syrup and rabri",
    price: 554, image_url: "/menu/super-cremica/m6_ghewar_500g.jpg", is_veg: true, is_available: true, variants: [], unit: "500 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m9", vendor_id: "v1", category_id: "c1", name: "Ghewar (1 Kg)", description: "Grand festive royal ghewar loaded with pistachios and almonds",
    price: 1109, image_url: "/menu/super-cremica/m8_ghewar_1kg.jpg", is_veg: true, is_available: true, variants: [], unit: "1 Kg", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Asian Street Food (Real Food Photos) ---
  {
    id: "m10", vendor_id: "v2", category_id: "c2", name: "Chilly Paneer", description: "Crisp cottage cheese cubes tossed with bell peppers and tangy chili sauce",
    price: 304, image_url: "/menu/bikanervala/chilly_paneer.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m11", vendor_id: "v2", category_id: "c2", name: "Veg Manchurian", description: "Fried vegetable balls tossed in savoury garlic and soya sauce",
    price: 249, image_url: "/menu/bikanervala/veg_manchurian.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m12", vendor_id: "v2", category_id: "c2", name: "Spring Roll", description: "Golden crispy fried rolls stuffed with seasoned shredded veggies",
    price: 224, image_url: "/menu/bikanervala/spring_roll.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m13", vendor_id: "v2", category_id: "c2", name: "Paneer Momos", description: "Steamed Himalayan dumplings packed with spiced fresh paneer filling",
    price: 174, image_url: "/menu/bikanervala/paneer_momos.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m14", vendor_id: "v2", category_id: "c2", name: "Veg Momos", description: "Fresh steamed vegetable dumplings served with spicy red chili chutney",
    price: 134, image_url: "/menu/bikanervala/veg_momos.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Chaat (Real Food Photos) ---
  {
    id: "m15", vendor_id: "v2", category_id: "c3", name: "Sev Puri", description: "Crispy flat puris topped with potatoes, onions, chutneys and lots of sev",
    price: 129, image_url: "/menu/bikanervala/sev_puri.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m16", vendor_id: "v2", category_id: "c3", name: "Dahi Puri", description: "Puffed puris stuffed with potatoes and drowned in creamy sweetened curd",
    price: 169, image_url: "/menu/bikanervala/dahi_puri.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m17", vendor_id: "v2", category_id: "c3", name: "Raj Kachori", description: "Crispy king-size kachori filled with spiced sprouts, curd and chutneys",
    price: 169, image_url: "/menu/bikanervala/raj_kachori.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Global Bites (Real Food Photos) ---
  {
    id: "m18", vendor_id: "v2", category_id: "c4", name: "Veg Burger", description: "Crisp vegetable patty with lettuce, tomatoes and house special burger sauce",
    price: 129, image_url: "/menu/bikanervala/veg_burger.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m19", vendor_id: "v2", category_id: "c4", name: "French Fries", description: "Deep-fried golden potato fingers dusted with sea salt and peri-peri",
    price: 109, image_url: "/menu/bikanervala/french_fries.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m20", vendor_id: "v2", category_id: "c4", name: "Veggie Pizza", description: "Hand-tossed crust topped with rich mozzarella, capsicum, onion & corn",
    price: 309, image_url: "/menu/bikanervala/veggie_pizza.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Chole Bhature (Real Food Photos) ---
  {
    id: "m21", vendor_id: "v2", category_id: "c5", name: "Chole Bhature", description: "Two piping hot puffed bhature with Punjabi pindi chole, pickle and onion",
    price: 199, image_url: "/menu/bikanervala/chole_bhature.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Chatpati Chaat (Real Food Photos) ---
  {
    id: "m22", vendor_id: "v2", category_id: "c6", name: "Pao Bhaji", description: "Buttery Mumbai-style mashed spiced vegetable bhaji with toasted buttered pav",
    price: 189, image_url: "/menu/bikanervala/pao_bhaji.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m23", vendor_id: "v2", category_id: "c6", name: "Golgappe", description: "6 crispy semolina puris served with spicy mint water and sweet tamarind water",
    price: 69, image_url: "/menu/bikanervala/golgappe.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Ice Cream (Real Food Photos) ---
  {
    id: "m24", vendor_id: "v2", category_id: "c7", name: "Matka Kulfi", description: "Authentic slow-reduced rabri kulfi served in an earthen clay pot",
    price: 149, image_url: "/menu/bikanervala/matka_kulfi.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m25", vendor_id: "v2", category_id: "c7", name: "Kulfi Falooda", description: "Dense malai kulfi served with rose syrup, basil seeds and sweet falooda noodles",
    price: 159, image_url: "/menu/bikanervala/kulfi_falooda.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Snacks (Real Food Photos) ---
  {
    id: "m26", vendor_id: "v2", category_id: "c9", name: "Samosa", description: "Crisp golden triangular pastry loaded with spicy potato and green pea filling",
    price: 44, image_url: "/menu/bikanervala/samosa.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Chicken (Real Food Photos) ---
  {
    id: "m30", vendor_id: "v3", category_id: "c10", name: "Chicken Biryani", description: "Royal Awadhi long-grain basmati rice layered with succulent chicken pieces",
    price: 150, image_url: "/menu/shahi-daawat/chicken_biryani.jpg", is_veg: false, is_available: true,
    variants: [{ name: "Half", price: 150 }, { name: "Full", price: 285 }],
    unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m31", vendor_id: "v3", category_id: "c10", name: "Butter Chicken", description: "Tender tandoori chicken cooked in velvety tomato, butter and cashew gravy",
    price: 275, image_url: "/menu/shahi-daawat/butter_chicken.jpg", is_veg: false, is_available: true,
    variants: [{ name: "Half", price: 275 }, { name: "Full", price: 525 }],
    unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m32", vendor_id: "v3", category_id: "c10", name: "Chicken Korma", description: "Slow-braised chicken cooked in an aromatic, rich Mughlai spiced yogurt gravy",
    price: 230, image_url: "/menu/shahi-daawat/chicken_korma.jpg", is_veg: false, is_available: true,
    variants: [{ name: "Half", price: 230 }, { name: "Full", price: 420 }],
    unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Mutton (Real Food Photos) ---
  {
    id: "m33", vendor_id: "v3", category_id: "c11", name: "Mutton Korma", description: "Authentic Purani Dilli style mutton korma with melt-in-mouth tender cuts",
    price: 360, image_url: "/menu/shahi-daawat/mutton_korma.jpg", is_veg: false, is_available: true,
    variants: [{ name: "Half (4 Pcs)", price: 360 }, { name: "Full (8 Pcs)", price: 650 }],
    unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m34", vendor_id: "v3", category_id: "c11", name: "Mutton Biryani", description: "Rich dum cooked biryani infused with saffron, kewra and juicy spiced mutton",
    price: 265, image_url: "/menu/shahi-daawat/mutton_biryani.jpg", is_veg: false, is_available: true,
    variants: [{ name: "Half (2 Pcs)", price: 265 }, { name: "Full (4 Pcs)", price: 475 }],
    unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Rolls (Real Food Photos) ---
  {
    id: "m35", vendor_id: "v3", category_id: "c13", name: "Malai Tikka Roll", description: "Creamy tandoori chicken malai tikka rolled in a fresh flaky paratha",
    price: 125, image_url: "/menu/shahi-daawat/malai_tikka_roll.jpg", is_veg: false, is_available: true, variants: [], unit: "1 Pc", created_at: new Date().toISOString(),
  },
  {
    id: "m36", vendor_id: "v3", category_id: "c13", name: "Chicken Tikka Roll", description: "Char-grilled smoky chicken tikka with onions, lemon & mint chutney in paratha",
    price: 105, image_url: "/menu/shahi-daawat/chicken_tikka_roll.jpg", is_veg: false, is_available: true, variants: [], unit: "1 Pc", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Roti (Real Food Photos) ---
  {
    id: "m37", vendor_id: "v3", category_id: "c14", name: "Butter Naan", description: "Clay oven baked leavened flatbread brushed with generous dairy butter",
    price: 55, image_url: "/menu/shahi-daawat/butter_naan.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m38", vendor_id: "v3", category_id: "c14", name: "Rumali Roti", description: "Paper-thin soft handkerchief bread tossed and cooked on an inverted kadhai",
    price: 10, image_url: "/menu/shahi-daawat/rumali_roti.jpg", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Beverages (Real Photos) ---
  {
    id: "m39", vendor_id: "v3", category_id: "c15", name: "Water", description: "Packaged mineral drinking water (Chilled)",
    price: 20, image_url: "/menu/shahi-daawat/water.jpg", is_veg: true, is_available: true, variants: [], unit: "1 Litre", created_at: new Date().toISOString(),
  },
  {
    id: "m40", vendor_id: "v3", category_id: "c15", name: "Cold Drink", description: "Chilled 750ml pet bottle of assorted carbonated soda",
    price: 55, image_url: "/menu/shahi-daawat/cold_drink.jpg", is_veg: true, is_available: true, variants: [], unit: "750ml", created_at: new Date().toISOString(),
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
