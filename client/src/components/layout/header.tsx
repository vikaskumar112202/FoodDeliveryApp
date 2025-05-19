import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart, useCartUtils } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart } = useCart();
  const { itemCount } = useCartUtils();
  const { isAuthenticated, user } = useAuth();
  const [location] = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <i className="fas fa-utensils text-primary text-2xl mr-2"></i>
              <span className="font-poppins font-bold text-xl text-primary">Foolivery</span>
            </Link>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                href={link.path} 
                className={`font-medium px-3 py-2 text-sm ${
                  location === link.path 
                    ? 'text-primary' 
                    : 'text-dark hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Link 
                href="/profile" 
                className={`font-medium px-3 py-2 text-sm ${
                  location === '/profile' 
                    ? 'text-primary' 
                    : 'text-dark hover:text-primary'
                }`}
              >
                {user?.username}
              </Link>
            ) : (
              <Link 
                href="/login" 
                className={`font-medium px-3 py-2 text-sm ${
                  location === '/login' 
                    ? 'text-primary' 
                    : 'text-dark hover:text-primary'
                }`}
              >
                Login
              </Link>
            )}
            
            <button 
              className="relative px-3 py-2 text-dark hover:text-primary"
              onClick={toggleCart}
            >
              <i className="fas fa-shopping-cart text-lg"></i>
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-500 hover:text-primary focus:outline-none focus:text-primary"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <button 
              className="ml-4 relative px-2 py-2 text-dark hover:text-primary"
              onClick={toggleCart}
            >
              <i className="fas fa-shopping-cart text-lg"></i>
              <span className="mobile-cart-count absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200 px-2 py-3`}>
        {navLinks.map((link) => (
          <Link 
            key={link.path}
            href={link.path} 
            className={`block px-3 py-2 text-base font-medium rounded-md ${
              location === link.path 
                ? 'text-primary bg-gray-50' 
                : 'text-dark hover:text-primary hover:bg-gray-50'
            }`}
          >
            {link.name}
          </Link>
        ))}
        
        {isAuthenticated ? (
          <Link 
            href="/profile" 
            className={`block px-3 py-2 text-base font-medium rounded-md ${
              location === '/profile' 
                ? 'text-primary bg-gray-50' 
                : 'text-dark hover:text-primary hover:bg-gray-50'
            }`}
          >
            {user?.username}
          </Link>
        ) : (
          <Link 
            href="/login" 
            className={`block px-3 py-2 text-base font-medium rounded-md ${
              location === '/login' 
                ? 'text-primary bg-gray-50' 
                : 'text-dark hover:text-primary hover:bg-gray-50'
            }`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
