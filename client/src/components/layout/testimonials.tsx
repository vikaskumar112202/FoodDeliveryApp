import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  initials: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Doe",
      role: "Customer",
      rating: 5,
      text: "\"The food arrived hot and fresh. The delivery was faster than I expected. Will definitely order again!\"",
      initials: "JD"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Customer",
      rating: 4.5,
      text: "\"Love the cash on delivery option. Makes ordering food so much more convenient. The food quality is consistently good.\"",
      initials: "JS"
    },
    {
      id: 3,
      name: "Robert Johnson",
      role: "Customer",
      rating: 5,
      text: "\"The app is so easy to use. I can quickly find my favorite restaurants and order in just a few taps. Great service!\"",
      initials: "RJ"
    }
  ];
  
  // Generate rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    // Add half star if needed
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-poppins font-semibold text-center mb-10">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex text-yellow-400 mb-3">
              {renderRatingStars(testimonial.rating)}
            </div>
            <p className="text-gray-600 mb-4">{testimonial.text}</p>
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <span className="font-medium text-dark">{testimonial.initials}</span>
              </div>
              <div>
                <h4 className="font-medium">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
