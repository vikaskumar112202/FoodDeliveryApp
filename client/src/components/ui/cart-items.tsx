import React from 'react';
import { CartItem, useCart } from '@/hooks/use-cart';

interface CartItemsProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemsProps) {
  const { updateQuantity, removeItem } = useCart();
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <span className="text-primary">₹{item.price.toFixed(2)}</span>
      </div>
      <div className="flex items-center">
        <button 
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary border border-gray-300 rounded-l-md"
          onClick={handleDecrement}
        >
          <i className="fas fa-minus text-xs"></i>
        </button>
        <span className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300">
          {item.quantity}
        </span>
        <button 
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary border border-gray-300 rounded-r-md"
          onClick={handleIncrement}
        >
          <i className="fas fa-plus text-xs"></i>
        </button>
      </div>
    </div>
  );
}

export function EmptyCart() {
  const { closeCart } = useCart();
  
  return (
    <div className="flex flex-col items-center justify-center h-full py-8">
      <div className="text-gray-400 text-6xl mb-4">
        <i className="fas fa-shopping-cart"></i>
      </div>
      <p className="text-gray-500 text-center mb-4">Your cart is empty</p>
      <button 
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        onClick={closeCart}
      >
        Start Shopping
      </button>
    </div>
  );
}
