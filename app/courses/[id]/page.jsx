'use client';



import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function CourseDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const addToCart = (product) => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const existing = cart.find(item => item._id === product._id);
    
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('به سبد خرید اضافه شد');
  };

  useEffect(() => {
    if (!id) return;
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setLoading(false);
      });
  }, [id]);

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
        onClick={() => addToCart(course)} 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
      >
        افزودن به سبد
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