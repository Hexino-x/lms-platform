'use client';

import Link from 'next/link';
import { useCart } from '../contexts/CartContext';

export default function CartIcon() {
  const { totalItems } = useCart(); // ✅ این درست است
  
  return (
    <Link href="/cart" className="relative">
      🛒
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}