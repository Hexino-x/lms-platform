// 'use client';

// import { createContext, useContext, useReducer, useEffect } from 'react';

// const CartContext = createContext();

// function cartReducer(state, action) {
//   switch (action.type) {
//     case 'ADD': {
//       const existing = state.items.find(item => item._id === action.payload._id);
//       if (existing) {
//         return {
//           ...state,
//           items: state.items.map(item =>
//             item._id === action.payload._id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         };
//       }
//       return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
//     }
//     case 'REMOVE':
//       return { ...state, items: state.items.filter(item => item._id !== action.payload) };
//     case 'UPDATE_QUANTITY':
//       if (action.payload.quantity <= 0) {
//         return { ...state, items: state.items.filter(item => item._id !== action.payload.id) };
//       }
//       return {
//         ...state,
//         items: state.items.map(item =>
//           item._id === action.payload.id
//             ? { ...item, quantity: action.payload.quantity }
//             : item
//         )
//       };
//     case 'CLEAR':
//       return { ...state, items: [] };
//     default:
//       return state;
//   }
// }

// export function CartProvider({ children }) {
//   const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem('cart');
//       return saved ? JSON.parse(saved) : { items: [] };
//     }
//     return { items: [] };
//   });

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(state));
//   }, [state]);

//   const addToCart = (product) => dispatch({ type: 'ADD', payload: product });
//   const removeFromCart = (id) => dispatch({ type: 'REMOVE', payload: id });
//   const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
//   const clearCart = () => dispatch({ type: 'CLEAR' });

//   const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   return (
//     <CartContext.Provider value={{
//       cart: state.items,
//       addToCart,
//       removeFromCart,
//       updateQuantity,
//       clearCart,
//       totalItems,
//       totalPrice
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   // if (!context) throw new Error('useCart must be used within CartProvider');
//   return context;
// }