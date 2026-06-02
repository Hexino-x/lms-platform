'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function CourseDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setLoading(false);
        // چک کن آیا این دوره در سبد هست یا نه
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setIsInCart(cart.some(item => item._id === data._id));
      });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.some(item => item._id === course._id)) {
      cart.push({ ...course, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      setIsInCart(true);
      alert('به سبد خرید اضافه شد');
    } else {
      alert('این دوره قبلاً به سبد اضافه شده است');
    }
  };

  const handleDelete = async () => {
    if (!confirm('آیا از حذف این دوره مطمئنی؟')) return;
    const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
    if (res.ok) router.push('/');
    else alert('خطا در حذف');
  };

  if (loading) return <div className="text-center py-20">...</div>;
  if (!course) return <div>پیدا نشد</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/courses/${id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 inline-block mr-2">
        ویرایش
      </Link>
      <button 
        onClick={addToCart}
        disabled={isInCart}
        className={`px-4 py-2 rounded mr-2 ${isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white`}
      >
        {isInCart ? 'در سبد خرید' : 'افزودن به سبد'}
      </button>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        حذف
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-2">مدرس: {course.instructor}</p>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          {course.price.toLocaleString()} تومان
        </p>
      </div>
    </div>
  );
}