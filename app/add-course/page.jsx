'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCourse() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    instructor: '',
    description: '',
    price: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseInt(form.price) })
    });
    
    if (res.ok) {
      router.push('/');
    } else {
      alert('خطا در ایجاد دوره');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">افزودن دوره جدید</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="عنوان دوره"
          value={form.title}
          onChange={(e) => setForm({...form, title: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="نام مدرس"
          value={form.instructor}
          onChange={(e) => setForm({...form, instructor: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="توضیحات"
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
          className="w-full p-2 border rounded"
          rows="3"
          required
        />
        <input
          type="number"
          placeholder="قیمت (تومان)"
          value={form.price}
          onChange={(e) => setForm({...form, price: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'در حال افزودن...' : 'افزودن دوره'}
        </button>
      </form>
    </div>
  );
}