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
  // --- Super Cremica Sweets ---
  {
    id: "m1", vendor_id: "v1", category_id: "c1", name: "Milk Cake Burfi", description: "Traditional granular milk cake burfi made from pure reduced milk",
    price: 204, image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m2", vendor_id: "v1", category_id: "c1", name: "Desi Ghee Gulab Jamun", description: "Soft melt-in-mouth dumplings soaked in saffron-cardamom syrup",
    price: 189, image_url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m3", vendor_id: "v1", category_id: "c1", name: "Patisa Desi Ghee", description: "Flaky ribbon-like traditional patisa made with pure desi ghee",
    price: 204, image_url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m4", vendor_id: "v1", category_id: "c1", name: "Desi Ghee Atta Biscuits", description: "Crisp and wholesome bakery biscuits made with pure ghee",
    price: 259, image_url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "500 Gm (1 Packet)", created_at: new Date().toISOString(),
  },
  {
    id: "m5", vendor_id: "v1", category_id: "c1", name: "Rasmalai", description: "Soft spongy chenna cakes floating in thick pistachio-saffron milk",
    price: 179, image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "2 Pcs", created_at: new Date().toISOString(),
  },
  {
    id: "m6", vendor_id: "v1", category_id: "c1", name: "Kesar Gulab Jamun [Mini]", description: "Bite-sized fragrant gulab jamuns infused with premium Kashmiri saffron",
    price: 204, image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "250 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m7", vendor_id: "v1", category_id: "c1", name: "Ghewar (Small)", description: "Traditional honeycombed Rajasthani dessert topped with dry fruits",
    price: 139, image_url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "1 Piece, 100G", created_at: new Date().toISOString(),
  },
  {
    id: "m8", vendor_id: "v1", category_id: "c1", name: "Ghewar (500 Gm)", description: "Large festive crispy ghewar immersed in sugar syrup and rabri",
    price: 554, image_url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "500 Gm", created_at: new Date().toISOString(),
  },
  {
    id: "m9", vendor_id: "v1", category_id: "c1", name: "Ghewar (1 Kg)", description: "Grand festive royal ghewar loaded with pistachios and almonds",
    price: 1109, image_url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "1 Kg", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Asian Street Food ---
  {
    id: "m10", vendor_id: "v2", category_id: "c2", name: "Chilly Paneer", description: "Crisp cottage cheese cubes tossed with bell peppers and tangy chili sauce",
    price: 304, image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m11", vendor_id: "v2", category_id: "c2", name: "Veg Manchurian", description: "Fried vegetable balls tossed in savoury garlic and soya sauce",
    price: 249, image_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m12", vendor_id: "v2", category_id: "c2", name: "Spring Roll", description: "Golden crispy fried rolls stuffed with seasoned shredded veggies",
    price: 224, image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m13", vendor_id: "v2", category_id: "c2", name: "Paneer Momos", description: "Steamed Himalayan dumplings packed with spiced fresh paneer filling",
    price: 174, image_url: "https://images.unsplash.com/photo-1625242662367-a89c8989b537?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m14", vendor_id: "v2", category_id: "c2", name: "Veg Momos", description: "Fresh steamed vegetable dumplings served with spicy red chili chutney",
    price: 134, image_url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Chaat ---
  {
    id: "m15", vendor_id: "v2", category_id: "c3", name: "Sev Puri", description: "Crispy flat puris topped with potatoes, onions, chutneys and lots of sev",
    price: 129, image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m16", vendor_id: "v2", category_id: "c3", name: "Dahi Puri", description: "Puffed puris stuffed with potatoes and drowned in creamy sweetened curd",
    price: 169, image_url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m17", vendor_id: "v2", category_id: "c3", name: "Raj Kachori", description: "Crispy king-size kachori filled with spiced sprouts, curd and chutneys",
    price: 169, image_url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Global Bites ---
  {
    id: "m18", vendor_id: "v2", category_id: "c4", name: "Veg Burger", description: "Crisp vegetable patty with lettuce, tomatoes and house special burger sauce",
    price: 129, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m19", vendor_id: "v2", category_id: "c4", name: "French Fries", description: "Deep-fried golden potato fingers dusted with sea salt and peri-peri",
    price: 109, image_url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m20", vendor_id: "v2", category_id: "c4", name: "Veggie Pizza", description: "Hand-tossed crust topped with rich mozzarella, capsicum, onion & corn",
    price: 309, image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Chole Bhature ---
  {
    id: "m21", vendor_id: "v2", category_id: "c5", name: "Chole Bhature", description: "Two piping hot puffed bhature with Punjabi pindi chole, pickle and onion",
    price: 199, image_url: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Chatpati Chaat ---
  {
    id: "m22", vendor_id: "v2", category_id: "c6", name: "Pao Bhaji", description: "Buttery Mumbai-style mashed spiced vegetable bhaji with toasted buttered pav",
    price: 189, image_url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m23", vendor_id: "v2", category_id: "c6", name: "Golgappe", description: "6 crispy semolina puris served with spicy mint water and sweet tamarind water",
    price: 69, image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Ice Cream ---
  {
    id: "m24", vendor_id: "v2", category_id: "c7", name: "Matka Kulfi", description: "Authentic slow-reduced rabri kulfi served in an earthen clay pot",
    price: 149, image_url: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m25", vendor_id: "v2", category_id: "c7", name: "Kulfi Falooda", description: "Dense malai kulfi served with rose syrup, basil seeds and sweet falooda noodles",
    price: 159, image_url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Bikanervala: Snacks ---
  {
    id: "m26", vendor_id: "v2", category_id: "c9", name: "Samosa", description: "Crisp golden triangular pastry loaded with spicy potato and green pea filling",
    price: 44, image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Chicken ---
  {
    id: "m30", vendor_id: "v3", category_id: "c10", name: "Chicken Biryani", description: "Royal Awadhi long-grain basmati rice layered with succulent chicken pieces",
    price: 150, image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80", is_veg: false, is_available: true,
    variants: [{ name: "Half", price: 150 }, { name: "Full", price: 285 }],
    unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m31", vendor_id: "v3", category_id: "c10", name: "Butter Chicken", description: "Tender tandoori chicken cooked in velvety tomato, butter and cashew gravy",
    price: 275, image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80", is_veg: false, is_available: true,
    variants: [{ name: "Half", price: 275 }, { name: "Full", price: 525 }],
    unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m32", vendor_id: "v3", category_id: "c10", name: "Chicken Korma", description: "Slow-braised chicken cooked in an aromatic, rich Mughlai spiced yogurt gravy",
    price: 230, image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80", is_veg: false, is_available: true,
    variants: [{ name: "Half", price: 230 }, { name: "Full", price: 420 }],
    unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Mutton ---
  {
    id: "m33", vendor_id: "v3", category_id: "c11", name: "Mutton Korma", description: "Authentic Purani Dilli style mutton korma with melt-in-mouth tender cuts",
    price: 360, image_url: "https://images.unsplash.com/photo-1545247181-516773ca838b?w=600&auto=format&fit=crop&q=80", is_veg: false, is_available: true,
    variants: [{ name: "Half (4 Pcs)", price: 360 }, { name: "Full (8 Pcs)", price: 650 }],
    unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m34", vendor_id: "v3", category_id: "c11", name: "Mutton Biryani", description: "Rich dum cooked biryani infused with saffron, kewra and juicy spiced mutton",
    price: 265, image_url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80", is_veg: false, is_available: true,
    variants: [{ name: "Half (2 Pcs)", price: 265 }, { name: "Full (4 Pcs)", price: 475 }],
    unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Rolls ---
  {
    id: "m35", vendor_id: "v3", category_id: "c13", name: "Malai Tikka Roll", description: "Creamy tandoori chicken malai tikka rolled in a fresh flaky paratha",
    price: 125, image_url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80", is_veg: false, is_available: true, variants: [], unit: "1 Pc", created_at: new Date().toISOString(),
  },
  {
    id: "m36", vendor_id: "v3", category_id: "c13", name: "Chicken Tikka Roll", description: "Char-grilled smoky chicken tikka with onions, lemon & mint chutney in paratha",
    price: 105, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80", is_veg: false, is_available: true, variants: [], unit: "1 Pc", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Roti ---
  {
    id: "m37", vendor_id: "v3", category_id: "c14", name: "Butter Naan", description: "Clay oven baked leavened flatbread brushed with generous dairy butter",
    price: 55, image_url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },
  {
    id: "m38", vendor_id: "v3", category_id: "c14", name: "Rumali Roti", description: "Paper-thin soft handkerchief bread tossed and cooked on an inverted kadhai",
    price: 10, image_url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "", created_at: new Date().toISOString(),
  },

  // --- Shahi Daawat: Beverages ---
  {
    id: "m39", vendor_id: "v3", category_id: "c15", name: "Water", description: "Packaged mineral drinking water (Chilled)",
    price: 20, image_url: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "1 Litre", created_at: new Date().toISOString(),
  },
  {
    id: "m40", vendor_id: "v3", category_id: "c15", name: "Cold Drink", description: "Chilled 750ml pet bottle of assorted carbonated soda",
    price: 55, image_url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80", is_veg: true, is_available: true, variants: [], unit: "750ml", created_at: new Date().toISOString(),
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
