import React from 'react';
import { Link } from 'wouter';

export default function HeroSection() {
  return (
    <div className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              Delicious Food Delivered to Your Doorstep
            </h1>
            <p className="text-lg mb-6">
              Order your favorite meals from the best restaurants near you and get them delivered in minutes.
            </p>
            <Link href="/#food-items">
              <button className="bg-white text-primary hover:bg-gray-100 font-medium py-2 px-6 rounded-full shadow-lg transition duration-200">
                Order Now
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
              alt="Delicious food ready for delivery" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
