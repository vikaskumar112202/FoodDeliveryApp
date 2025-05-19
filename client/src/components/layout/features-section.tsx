import React from 'react';

export default function FeaturesSection() {
  const features = [
    {
      icon: "fas fa-truck",
      title: "Fast Delivery",
      description: "Get your food delivered in under 30 minutes or your next order is free."
    },
    {
      icon: "fas fa-utensils",
      title: "Quality Food",
      description: "We partner with only the best restaurants to ensure top quality meals."
    },
    {
      icon: "fas fa-wallet",
      title: "Cash on Delivery",
      description: "Pay when your food arrives. No need for online payments or cards."
    }
  ];
  
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-poppins font-semibold text-center mb-10">
          Why Choose Foolivery?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <i className={`${feature.icon} text-primary text-2xl`}></i>
              </div>
              <h3 className="font-poppins font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
