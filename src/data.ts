import { asset } from './asset';

export interface Category {
  key: string;
  label: string;
  short: string;
  color: string;
  tint: string;
  desc: string;
  sampleImg: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  weight: string;
  price: number;
  gi: number;
  img: string;
  bestSeller?: boolean;
  blurb: string;
  benefits: string[];
  moderation?: boolean;
}

export interface CartItem {
  id: number;
  qty: number;
}

export interface CartItemDetailed extends CartItem {
  product: Product;
}

export interface CartTotals {
  items: CartItemDetailed[];
  subtotal: number;
  discount: number;
  total: number;
  count: number;
}

const RAW_CATEGORIES: Category[] = [
  { key: 'flours', label: 'Flours & Roti Premixes', short: 'Flours', color: 'oklch(0.47 0.09 145)', tint: 'oklch(0.94 0.03 145)', desc: 'Low-GI atta and roti mixes for everyday rotis', sampleImg: '/uploads/Lite/01_PRD-AH-001_Low_GI_Multigrain_Atta.jpg' },
  { key: 'millets', label: 'Millets & Whole Grains', short: 'Millets & Grains', color: 'oklch(0.52 0.1 160)', tint: 'oklch(0.94 0.03 160)', desc: 'Whole grains to swap in for polished rice and refined wheat', sampleImg: '/uploads/Lite/03_PRD-AH-004_Foxtail_Millet.jpg' },
  { key: 'breakfast', label: 'Breakfast & Meal Mixes', short: 'Breakfast Mixes', color: 'oklch(0.64 0.14 45)', tint: 'oklch(0.95 0.035 45)', desc: 'Dosa, idli, poha, upma and porridge, ready in minutes', sampleImg: '/uploads/lite/product (10).jpg' },
  { key: 'pulses', label: 'Pulses & Plant Protein', short: 'Pulses & Protein', color: 'oklch(0.4 0.1 22)', tint: 'oklch(0.93 0.025 22)', desc: 'Dals, chana and sprouts for slow-release plant protein', sampleImg: '/uploads/Lite/08_PRD-AH-015_Mixed_Dal_Blend.jpg' },
  { key: 'snacks', label: 'Roasted Snacks & Dry Fruits', short: 'Snacks & Dry Fruits', color: 'oklch(0.42 0.09 320)', tint: 'oklch(0.93 0.025 320)', desc: "Roasted, not fried — snacking that won't spike you", sampleImg: '/uploads/Lite/12_PRD-AH-023_Roasted_Almonds.jpg' },
  { key: 'seeds', label: 'Seeds & Functional Superfoods', short: 'Seeds & Superfoods', color: 'oklch(0.46 0.07 55)', tint: 'oklch(0.94 0.025 55)', desc: 'Fibre, omega-3 and spices that work quietly in the background', sampleImg: '/uploads/lite/product (22).jpg' },
  { key: 'mealkits', label: 'Ready Meal Kits', short: 'Meal Kits', color: 'oklch(0.72 0.13 85)', tint: 'oklch(0.95 0.04 85)', desc: 'Complete one-pot meals, just add water', sampleImg: '/uploads/lite/product (29).jpg' },
];

export const CATEGORIES: Category[] = RAW_CATEGORIES.map((c) => ({ ...c, sampleImg: asset(c.sampleImg) }));

const RAW_PRODUCTS: Product[] = [
  { id: 1, name: 'Low GI Multigrain Atta', category: 'flours', weight: '5 kg', price: 449, gi: 48, img: '/uploads/Lite/01_PRD-AH-001_Low_GI_Multigrain_Atta.jpg', bestSeller: true,
    blurb: 'Everyday rotis made from 7 super grains instead of refined wheat.',
    benefits: ['Low GI — helps manage blood sugar', 'High in fibre — supports digestion', 'Rich in protein — keeps you fuller for longer'] },
  { id: 2, name: 'High Protein Atta', category: 'flours', weight: '5 kg', price: 479, gi: 45, img: '/uploads/Lite/02_PRD-AH-002_High_Protein_Atta.jpg',
    blurb: "Extra protein in the same soft roti you're used to.",
    benefits: ['High in protein — supports muscle health', 'Low GI — helps manage blood sugar', 'Rich in fibre — supports digestion'] },
  { id: 3, name: 'Diabetic Roti Premix', category: 'flours', weight: '1 kg', price: 249, gi: 42, img: '/uploads/lite/product (3).jpg', bestSeller: true,
    blurb: 'Our lowest-GI flour, built with 7 super grains and seeds for daily use.',
    benefits: ['Low GI — helps manage blood sugar', 'High in protein — maintains muscle mass', 'No maida, no added sugar'] },
  { id: 4, name: 'Foxtail Millet', category: 'millets', weight: '500 g', price: 159, gi: 50, img: '/uploads/Lite/03_PRD-AH-004_Foxtail_Millet.jpg',
    blurb: 'A smart, gluten-free swap for polished rice.',
    benefits: ['Low GI — helps manage blood sugar', 'High in fibre — supports digestion', 'Good source of iron'] },
  { id: 5, name: 'Little Millet', category: 'millets', weight: '500 g', price: 149, gi: 49, img: '/uploads/Lite/04_PRD-AH-005_Little_Millet.jpg',
    blurb: 'Easy to digest, easy to cook into your weekly rotation.',
    benefits: ['Low GI — helps manage blood sugar', 'High in fibre — supports digestion', 'Rich in protein'] },
  { id: 6, name: 'Barnyard Millet', category: 'millets', weight: '500 g', price: 159, gi: 46, img: '/uploads/Lite/05_PRD-AH-006_Barnyard_Millet.jpg',
    blurb: 'A traditional grain for modern blood-sugar goals.',
    benefits: ['Low GI — helps manage blood sugar', 'High in fibre — supports digestion', 'Good source of iron'] },
  { id: 7, name: 'Steel Cut Oats', category: 'millets', weight: '500 g', price: 219, gi: 52, img: '/uploads/Lite/06_PRD-AH-007_Steel_Cut_Oats.jpg',
    blurb: 'Slow-cooked oats for a slower glucose curve.',
    benefits: ['Low GI — helps manage blood sugar', 'High in fibre — supports digestion', 'Rich in protein'] },
  { id: 8, name: 'Brown Rice', category: 'millets', weight: '1 kg', price: 199, gi: 55, img: '/uploads/Lite/07_PRD-AH-008_Brown_Rice.jpg',
    blurb: 'The unpolished, higher-fibre rice for everyday meals.',
    benefits: ['High in fibre — supports digestion', 'Rich in minerals', 'Naturally gluten free'] },
  { id: 9, name: 'Protein Chilla Mix', category: 'breakfast', weight: '500 g', price: 199, gi: 46, img: '/uploads/lite/product (9).jpg',
    blurb: 'A high-protein breakfast chilla, batter to plate in minutes.',
    benefits: ['High in protein — supports muscle health', 'Low GI — sustained energy release', 'Rich in fibre'] },
  { id: 10, name: 'Multigrain Dosa Mix', category: 'breakfast', weight: '500 g', price: 179, gi: 54, img: '/uploads/lite/product (10).jpg', bestSeller: true,
    blurb: 'Crisp, everyday dosa without the refined-rice batter.',
    benefits: ['High in protein — supports muscle health', 'Rich in fibre — supports digestion', 'Good source of iron'] },
  { id: 11, name: 'Multigrain Idli Mix', category: 'breakfast', weight: '500 g', price: 179, gi: 51, img: '/uploads/lite/product (11).jpg',
    blurb: 'Soft, fluffy idlis with a gentler carb load.',
    benefits: ['High in protein — supports muscle health', 'Rich in fibre — supports digestion', 'Good source of iron'] },
  { id: 12, name: 'Low GI Poha Mix', category: 'breakfast', weight: '500 g', price: 169, gi: 48, img: '/uploads/lite/product (12).jpg',
    blurb: 'Light, whole-grain poha for a steady mid-morning.',
    benefits: ['Low GI — sustained energy release', 'Rich in fibre — supports digestion', 'Made with whole grains'] },
  { id: 13, name: 'Vegetable Upma Mix', category: 'breakfast', weight: '500 g', price: 179, gi: 50, img: '/uploads/lite/product (13).jpg',
    blurb: 'A wholesome upma, ready in minutes with real vegetables.',
    benefits: ['High in fibre — supports digestion', 'Good source of protein', 'Low GI — sustained energy'] },
  { id: 14, name: 'Ragi Porridge Mix', category: 'breakfast', weight: '500 g', price: 189, gi: 45, img: '/uploads/lite/product (14).jpg',
    blurb: 'A warm, calcium-rich porridge to start the day slow.',
    benefits: ['Rich in calcium — supports strong bones', 'High in fibre — supports digestion', 'Low GI — sustained energy'] },
  { id: 15, name: 'Mixed Dal Blend', category: 'pulses', weight: '1 kg', price: 229, gi: 30, img: '/uploads/Lite/08_PRD-AH-015_Mixed_Dal_Blend.jpg', bestSeller: true,
    blurb: 'A blend of unpolished pulses for a complete daily dal.',
    benefits: ['High in protein — supports muscle health', 'Rich in fibre — supports digestion', 'Clean, unpolished pulses'] },
  { id: 16, name: 'Protein Khichdi Mix', category: 'pulses', weight: '1 kg', price: 249, gi: 44, img: '/uploads/lite/product (16).jpg',
    blurb: 'Millets, pulses and spices — a complete meal in one bowl.',
    benefits: ['High in protein — supports muscle health', 'Rich in fibre — supports digestion', 'Low GI — sustained energy'] },
  { id: 17, name: 'Sprouted Moong', category: 'pulses', weight: '500 g', price: 129, gi: 25, img: '/uploads/lite/product (17).jpg',
    blurb: 'Naturally sprouted for easier digestion and plant protein.',
    benefits: ['High in protein — supports muscle health', 'Naturally sprouted — easier to digest', 'Rich in fibre'] },
  { id: 18, name: 'Kabuli Chana', category: 'pulses', weight: '1 kg', price: 159, gi: 28, img: '/uploads/Lite/09_PRD-AH-018_Kabuli_Chana.jpg',
    blurb: 'Premium whole chickpeas for curries, salads and snacking.',
    benefits: ['High in protein — supports muscle health', 'Rich in fibre — supports digestion', 'Source of iron'] },
  { id: 19, name: 'Kala Chana', category: 'pulses', weight: '1 kg', price: 149, gi: 22, img: '/uploads/Lite/10_PRD-AH-019_Kala_Chana.jpg',
    blurb: 'Dense, earthy chana for slow-release everyday protein.',
    benefits: ['High in protein — supports muscle health', 'Rich in fibre — supports digestion', 'Source of iron'] },
  { id: 20, name: 'Roasted Chana', category: 'snacks', weight: '500 g', price: 149, gi: 27, img: '/uploads/lite/product (20).jpg',
    blurb: 'Roasted, not fried — a crunchy snack that behaves itself.',
    benefits: ['High in protein — supports muscle health', 'Roasted, not fried — light & crunchy', 'Rich in fibre'] },
  { id: 21, name: 'Roasted Makhana', category: 'snacks', weight: '100 g', price: 149, gi: 32, img: '/uploads/Lite/11_PRD-AH-021_Roasted_Makhana.jpg',
    blurb: 'Light, low-calorie fox nuts roasted to a crunch.',
    benefits: ['Light & low calorie — good for snacking', 'Rich in antioxidants', 'Gluten free — easy to digest'] },
  { id: 22, name: 'Super Seed Mix', category: 'seeds', weight: '250 g', price: 299, gi: 15, img: '/uploads/lite/product (22).jpg', bestSeller: true,
    blurb: 'A power-packed blend of seeds to sprinkle over anything.',
    benefits: ['Rich in omega-3 — supports heart health', 'High in fibre & protein', 'Loaded with antioxidants'] },
  { id: 23, name: 'Roasted Almonds', category: 'snacks', weight: '200 g', price: 329, gi: 15, img: '/uploads/Lite/12_PRD-AH-023_Roasted_Almonds.jpg',
    blurb: 'Premium California almonds, roasted to perfection.',
    benefits: ['High in protein — supports muscle health', 'Rich in healthy fats — supports heart health', 'Good source of vitamin E'] },
  { id: 24, name: 'Roasted Cashews', category: 'snacks', weight: '200 g', price: 309, gi: 22, img: '/uploads/lite/product (24).jpg',
    blurb: 'Rich, roasted cashews for a satisfying handful.',
    benefits: ['Rich in protein — supports muscle health', 'Good source of healthy fats', 'Loaded with minerals'] },
  { id: 25, name: 'Black Raisins', category: 'snacks', weight: '200 g', price: 179, gi: 55, img: '/uploads/lite/product (25).jpg',
    blurb: 'Naturally sweet dried grapes — best enjoyed in small portions.',
    benefits: ['Rich in iron — supports healthy blood', 'High in antioxidants', 'Naturally sweet — portion mindfully'], moderation: true },
  { id: 26, name: 'Flaxseed Powder', category: 'seeds', weight: '250 g', price: 199, gi: 10, img: '/uploads/lite/product (26).jpg',
    blurb: 'Stir into atta, curd or smoothies for daily omega-3.',
    benefits: ['Rich in omega-3 — supports heart health', 'High in dietary fibre', 'Plant-based protein'] },
  { id: 27, name: 'Psyllium Husk', category: 'seeds', weight: '200 g', price: 249, gi: 5, img: '/uploads/lite/product (27).jpg',
    blurb: 'A spoonful in water, daily, for gentle regularity.',
    benefits: ['High in soluble fibre — supports digestion', 'Helps manage cholesterol', 'Supports weight management'] },
  { id: 28, name: 'Cinnamon Powder', category: 'seeds', weight: '100 g', price: 149, gi: 5, img: '/uploads/lite/product (28).jpg',
    blurb: 'A warm daily spice traditionally used to support blood sugar.',
    benefits: ['Supports heart health — helps regulate blood sugar', 'Rich in antioxidants', 'Boosts metabolism'] },
  { id: 29, name: 'Millet Khichdi Meal Kit', category: 'mealkits', weight: 'Serves 2', price: 199, gi: 46, img: '/uploads/lite/product (29).jpg', bestSeller: true,
    blurb: 'Millets, dal, masala and tempering — ready in 25 minutes.',
    benefits: ['Goodness of millets — high in fibre & protein', 'Ready in 25 minutes', 'No preservatives'] },
  { id: 30, name: 'Millet Upma Meal Kit', category: 'mealkits', weight: 'Serves 2', price: 189, gi: 48, img: '/uploads/lite/product (30).jpg',
    blurb: 'A complete millet upma kit, ready in 20 minutes.',
    benefits: ['Goodness of millets — high in fibre & protein', 'Ready in 20 minutes', 'No preservatives'] },
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({ ...p, img: asset(p.img) }));

export function getProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => Number(p.id) === Number(id));
}
export function getCategory(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}
export function related(product: Product, count = 4): Product[] {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}

export const SUBSCRIBE_DISCOUNT = 0.15;
const CART_KEY = 'aaharva_cart';
export const CART_UPDATED_EVENT = 'aaharva-cart-updated';

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]') || [];
  } catch {
    return [];
  }
}
export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}
export function addToCart(id: number, qty = 1): CartItem[] {
  const cart = getCart();
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  return cart;
}
export function updateQty(id: number, qty: number): CartItem[] {
  let cart = getCart();
  if (qty <= 0) cart = cart.filter((i) => i.id !== id);
  else {
    const it = cart.find((i) => i.id === id);
    if (it) it.qty = qty;
    else cart.push({ id, qty });
  }
  saveCart(cart);
  return cart;
}
export function clearCart(): void {
  saveCart([]);
}
export function cartCount(): number {
  return getCart().reduce((s, i) => s + i.qty, 0);
}
export function cartWithDetails(): CartItemDetailed[] {
  return getCart()
    .map((i) => ({ ...i, product: getProduct(i.id) }))
    .filter((i): i is CartItemDetailed => !!i.product);
}
export function cartTotals(subscribe: boolean): CartTotals {
  const items = cartWithDetails();
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const discount = subscribe ? Math.round(subtotal * SUBSCRIBE_DISCOUNT) : 0;
  return { items, subtotal, discount, total: subtotal - discount, count: items.reduce((s, i) => s + i.qty, 0) };
}
