
'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.scss';



// داده موقت (بعداً از API می‌آید)
const featuredCourses = [
  { id: 1, title: 'React از صفر تا صد', instructor: 'علی رضایی', price: 499000, students: 1234, image: '/course-1.jpg' },
  { id: 2, title: 'Next.js پیشرفته', instructor: 'سارا کریمی', price: 599000, students: 856, image: '/course-2.jpg' },
  { id: 3, title: 'TypeScript پروژه محور', instructor: 'رضا احمدی', price: 399000, students: 2341, image: '/course-3.jpg' },
];

export default function Home() {
    const [search, setSearch] = useState('');
    const [priceRange, setPriceRange] = useState('all');
  
    // داده دوره‌ها (همان که داری)
    const featuredCourses = [
      { id: 1, title: 'React از صفر تا صد', instructor: 'علی رضایی', price: 499000, students: 1234 },
      { id: 2, title: 'Next.js پیشرفته', instructor: 'سارا کریمی', price: 599000, students: 856 },
      { id: 3, title: 'TypeScript پروژه محور', instructor: 'رضا احمدی', price: 399000, students: 2341 },
    ];

    // فیلتر کردن دوره‌ها بر اساس جستجو و قیمت
    const filteredCourses = featuredCourses.filter(course => {
      // فیلتر جستجو
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(search.toLowerCase());

      // فیلتر قیمت
      let matchesPrice = true;
      if (priceRange === 'under400') matchesPrice = course.price < 400000;
      else if (priceRange === '400to600') matchesPrice = course.price >= 400000 && course.price <= 600000;
      else if (priceRange === 'over600') matchesPrice = course.price > 600000;

      return matchesSearch && matchesPrice;
    });
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            به LMS خوش آمدید
          </h1>
          <p className="text-xl mb-8 opacity-90">
            یادگیری آنلاین با بهترین اساتید و به‌روزترین دوره‌ها
          </p>
          <Link 
            href="/courses" 
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            مشاهده دوره‌ها
            
          </Link>
        </div>
      </section>
      {/* بخش جستجو و فیلتر */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* جستجو */}
            <input
              type="text"
              placeholder="جستجوی دوره یا مدرس..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            
            {/* فیلتر قیمت */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">همه قیمت‌ها</option>
              <option value="under400">زیر ۴۰۰ هزار تومان</option>
              <option value="400to600">۴۰۰ تا ۶۰۰ هزار تومان</option>
              <option value="over600">بالای ۶۰۰ هزار تومان</option>
            </select>
            {search && (
                <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600"> ✕ </button>
            )}
          </div>
          
          {/* نمایش تعداد نتایج */}
          <p className="text-gray-500 mb-4">
            {filteredCourses.length} دوره یافت شد
          </p>
        </div>
     </section>
      
      {/* Featured courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            دوره‌های ویژه
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-400">تصویر</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/courses/${course.id}`} className="hover:text-primary transition">
                      {course.title}
                    </Link>
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">مدرس: {course.instructor}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-primary">
                      {course.price.toLocaleString()} تومان
                    </span>
                    <span className="text-gray-400 text-sm">{course.students} دانشجو</span>
                  </div>
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
                <div className="col-span-full text-center py-12">
                <p className="text-gray-500">هیچ دوره‌ای با این مشخصات پیدا نشد</p>
                </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Stats section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">۵۰+</div>
              <div>دوره تخصصی</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">۱۰۰۰۰+</div>
              <div>دانشجو فعال</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">۳۰+</div>
              <div>مدرس مجرب</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}