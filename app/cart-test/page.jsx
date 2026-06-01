'use client';

import { useCart } from '../contexts/CartContext';

export default function CartTest() {
  const cart = useCart();
  return (
    <div className="p-8">
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
}