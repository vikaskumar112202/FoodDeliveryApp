import React from 'react';

export default function CTASection() {
  return (
    <div className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-4">
          Ready to Order?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Download our mobile app to get exclusive deals and track your order in real time.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-md shadow-lg transition duration-200 flex items-center justify-center">
            <i className="fab fa-apple text-xl mr-2"></i> App Store
          </button>
          <button className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-md shadow-lg transition duration-200 flex items-center justify-center">
            <i className="fab fa-google-play text-xl mr-2"></i> Google Play
          </button>
        </div>
      </div>
    </div>
  );
}
