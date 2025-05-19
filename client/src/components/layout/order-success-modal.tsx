import React from 'react';
import { Link } from 'wouter';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderNumber: string;
    total: number;
    estimatedDelivery: string;
  } | null;
}

export default function OrderSuccessModal({ isOpen, onClose, orderDetails }: OrderSuccessModalProps) {
  if (!isOpen || !orderDetails) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-8 max-w-md w-full z-10 relative">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <i className="fas fa-check text-2xl text-green-600"></i>
          </div>
          <h3 className="text-xl font-poppins font-semibold mb-2">Order Successful!</h3>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. You can track your order in your profile.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 text-left mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">#{orderDetails.orderNumber}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium">₹{orderDetails.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">{orderDetails.estimatedDelivery}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/">
              <button 
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition duration-200 w-full sm:w-auto"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </Link>
            <Link href="/profile">
              <button 
                className="bg-white border border-gray-300 text-dark py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200 w-full sm:w-auto"
                onClick={onClose}
              >
                View Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
