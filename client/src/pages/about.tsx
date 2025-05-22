import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CartSidebar from '@/components/layout/cart-sidebar';
import { Helmet } from 'react-helmet';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Foolivery</title>
        <meta name="description" content="Learn about Foolivery, our mission, values, and the team behind our food delivery service." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-4">About Foolivery</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're on a mission to make food delivery simple, fast, and affordable for everyone.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl font-poppins font-semibold mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Foolivery was founded in 2025 with a simple goal: to make food delivery accessible to everyone.
                </p>
                <p className="text-gray-600 mb-4">
                  Our team of developers wanted to create a platform that was easy to use, reliable, and focused on customer satisfaction. We understand the challenges of balancing studies and finding time to cook, which is why we created a service that brings delicious food right to your doorstep.
                </p>
                <p className="text-gray-600">
                  Today, Foolivery partners with local restaurants to deliver quality meals at affordable prices, with a simple cash-on-delivery payment option that works for everyone.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1484659619207-9165d119dafe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team of food delivery professionals" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h2 className="text-2xl font-poppins font-semibold text-center mb-8">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                    <i className="fas fa-handshake text-primary text-2xl"></i>
                  </div>
                  <h3 className="font-poppins font-semibold text-lg mb-2">Reliability</h3>
                  <p className="text-gray-600">We promise on-time deliveries and excellent service every time you order.</p>
                </div>
                <div className="text-center p-6">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                    <i className="fas fa-heart text-primary text-2xl"></i>
                  </div>
                  <h3 className="font-poppins font-semibold text-lg mb-2">Quality</h3>
                  <p className="text-gray-600">We partner only with restaurants that share our commitment to quality food.</p>
                </div>
                <div className="text-center p-6">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                    <i className="fas fa-users text-primary text-2xl"></i>
                  </div>
                  <h3 className="font-poppins font-semibold text-lg mb-2">Community</h3>
                  <p className="text-gray-600">We support local businesses and create jobs for delivery partners in our community.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-poppins font-semibold mb-4">Ready to Try Foolivery?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied customers who enjoy delicious meals delivered to their doorstep.
              </p>
              <a href="/" className="inline-block bg-primary text-white font-medium py-3 px-8 rounded-full hover:bg-primary/90 transition duration-200">
                Order Now
              </a>
            </div>
          </div>
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </>
  );
}
