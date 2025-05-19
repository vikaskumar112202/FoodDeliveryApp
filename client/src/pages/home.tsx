import React from 'react';
import Header from '@/components/layout/header';
import HeroSection from '@/components/layout/hero-section';
import { FoodCategories, FoodItems } from '@/components/layout/featured-items';
import FeaturesSection from '@/components/layout/features-section';
import Testimonials from '@/components/layout/testimonials';
import CTASection from '@/components/layout/cta-section';
import Footer from '@/components/layout/footer';
import CartSidebar from '@/components/layout/cart-sidebar';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Foolivery - Food Delivery</title>
        <meta name="description" content="Order delicious food from the comfort of your home with Foolivery. Fast delivery, quality food, and cash on delivery available." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <FoodCategories />
          <FoodItems />
          <FeaturesSection />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </>
  );
}
