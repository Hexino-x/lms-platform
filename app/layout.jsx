import { CartProvider } from './contexts/CartContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
