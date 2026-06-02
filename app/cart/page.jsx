'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    const newTotal = savedCart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setTotal(newTotal);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = cart.map(item =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    const newTotal = newCart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setTotal(newTotal);
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item._id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    const newTotal = newCart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setTotal(newTotal);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">سبد خرید خالی است</h1>
        <Link href="/" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">سبد خرید</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item._id} className="flex items-center justify-between border p-4 rounded">
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p>{item.price.toLocaleString()} تومان</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity || 1}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                className="w-16 p-1 border rounded text-center"
              />
              <button onClick={() => removeItem(item._id)} className="text-red-500">
                حذف
              </button>
            </div>
          </div>
        ))}
        <div className="text-right border-t pt-4">
          <p className="text-xl font-bold">مجموع: {total.toLocaleString()} تومان</p>
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            پرداخت
          </button>
        </div>
      </div>
    </div>
  );
}