import { useCallback, useEffect, useState } from 'react';
import { CART_UPDATED_EVENT, getCart, type CartItem } from '../data';

export function useCart(): [CartItem[], () => void] {
  const [cart, setCart] = useState<CartItem[]>(() => getCart());

  const refresh = useCallback(() => setCart(getCart()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(CART_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(CART_UPDATED_EVENT, refresh);
  }, [refresh]);

  return [cart, refresh];
}

export function useToast(durationMs = 2000): [string | null, (msg: string) => void] {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), durationMs);
    return () => clearTimeout(t);
  }, [toast, durationMs]);

  return [toast, setToast];
}
