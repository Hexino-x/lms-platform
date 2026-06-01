// app/login/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // پاک کردن خطای آن فیلد موقع تایپ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'ایمیل الزامی است';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'ایمیل نامعتبر است';
    
    if (!form.password) newErrors.password = 'رمز عبور الزامی است';
    else if (form.password.length < 6) newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    // بعداً به API متصل می‌شود
    setTimeout(() => {
      console.log('Login data:', form);
      setIsLoading(false);
      router.push('/dashboard'); // بعد از لاگین موفق
    }, 1000);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>ورود به حساب کاربری</h1>
        <p className={styles.subtitle}>
          خوش آمدید! لطفاً اطلاعات خود را وارد کنید
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              ایمیل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="example@email.com"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="••••••"
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          
          <div className={styles.extra}>
            <label className={styles.remember}>
              <input type="checkbox" /> مرا به خاطر بسپار
            </label>
            <Link href="/forgot-password" className={styles.forgotLink}>
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={styles.button}
          >
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
        
        <p className={styles.footer}>
          حساب کاربری ندارید؟{' '}
          <Link href="/register" className={styles.link}>
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}