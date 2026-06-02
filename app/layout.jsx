import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
        {children}
      </body>
    </html>
  );
}

import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
        <header className="bg-white shadow p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="text-xl font-bold">فروشگاه</Link>
            <Link href="/cart">🛒 سبد خرید</Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}