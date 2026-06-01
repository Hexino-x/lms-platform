'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20">در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">دوره‌های آموزشی</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-2">مدرس: {course.instructor}</p>
            <p className="text-lg font-bold text-blue-600 mb-4">
              {course.price.toLocaleString()} تومان
            </p>
            <Link href={`/courses/${course._id}`}>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                مشاهده دوره
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
