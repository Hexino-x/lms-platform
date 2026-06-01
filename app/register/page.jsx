// app/register/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'نام و نام خانوادگی الزامی است';
    else if (form.name.length < 3) newErrors.name = 'حداقل ۳ کاراکتر';
    
    if (!form.email) newErrors.email = 'ایمیل الزامی است';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'ایمیل نامعتبر است';
    
    if (!form.password) newErrors.password = 'رمز عبور الزامی است';
    else if (form.password.length < 6) newErrors.password = 'حداقل ۶ کاراکتر';
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور با تکرار آن مطابقت ندارد';
    }
    
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
    setTimeout(() => {
      console.log('Register data:', { name: form.name, email: form.email, password: form.password });
      setIsLoading(false);
      router.push('/login');
    }, 1000);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>ثبت‌نام</h1>
        <p className={styles.subtitle}>
          همین الان عضو شوید و یادگیری را شروع کنید
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              نام و نام خانوادگی
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="علی رضایی"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          
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
          
          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              تکرار رمز عبور
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              placeholder="••••••"
            />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={styles.button}
          >
            {isLoading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
          </button>
        </form>
        
        <p className={styles.footer}>
          قبلاً ثبت‌نام کرده‌اید؟{' '}
          <Link href="/login" className={styles.link}>
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
}