'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditCourse() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', instructor: '', description: '', price: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({ ...data, price: data.price.toString() });
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseInt(form.price) })
    });
    if (res.ok) router.push(`/courses/${id}`);
    else alert('خطا در ویرایش');
  };

  if (loading) return <div className="text-center py-20">...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">ویرایش دوره</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="عنوان" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="مدرس" value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})} className="w-full p-2 border rounded" required />
        <textarea placeholder="توضیحات" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 border rounded" rows="3" required />
        <input type="number" placeholder="قیمت" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full p-2 border rounded" required />
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">ذخیره</button>
          <Link href={`/courses/${id}`} className="flex-1 bg-gray-500 text-white py-2 rounded text-center hover:bg-gray-600">انصراف</Link>
        </div>
      </form>
    </div>
  );
}