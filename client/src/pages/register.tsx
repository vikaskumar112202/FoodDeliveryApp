import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CartSidebar from '@/components/layout/cart-sidebar';
import RegisterForm from '@/components/auth/register-form';
import { useAuth } from '@/hooks/use-auth';
import { Helmet } from 'react-helmet';

export default function Register() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <>
      <Helmet>
        <title>Register - Foolivery</title>
        <meta name="description" content="Create a new Foolivery account to start ordering food for delivery to your doorstep." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-poppins font-bold">Create an Account</h1>
              <p className="text-gray-600 mt-2">Join Foolivery to start ordering your favorite food</p>
            </div>
            <RegisterForm />
          </div>
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </>
  );
}
