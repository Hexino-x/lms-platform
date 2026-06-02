import { CartProvider } from './contexts/CartContext';
import './styles/global.scss';

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