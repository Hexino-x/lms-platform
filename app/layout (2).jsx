import './styles/global.scss';
import Link from 'next/link';

export const metadata = {
  title: 'LMS - پلتفرم آموزش آنلاین',
  description: 'بهترین دوره‌های آموزشی با بهترین اساتید',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              LMS
            </Link>
            <nav className="flex gap-6">
              <Link href="/courses" className="hover:text-primary transition">
                دوره‌ها
              </Link>
              <Link href="/dashboard" className="hover:text-primary transition">
                پنل کاربری
              </Link>
              <Link href="/login" className="hover:text-primary transition">
                ورود
              </Link>
            </nav>
          </div>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; ۲۰۲۴ LMS - تمامی حقوق محفوظ است</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

import { CartProvider } from './contexts/CartContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}