import React from 'react';
import { useCart, useCartUtils } from '@/hooks/use-cart';
import { CartItemRow, EmptyCart } from '@/components/ui/cart-items';
import { Link } from 'wouter';

export default function CartSidebar() {
  const { items, isOpen, closeCart } = useCart();
  const { subtotal, deliveryFee, total } = useCartUtils();
  
  return (
    <div className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-poppins font-semibold text-xl">Your Cart</h2>
          <button 
            className="text-gray-500 hover:text-primary p-2"
            onClick={closeCart}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-600">₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₹{total.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <button 
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition duration-200"
                onClick={closeCart}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
