import React from 'react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

interface FoodCardProps {
  item: FoodItem;
}

export function FoodCard({ item }: FoodCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };
  
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
    <Card className="overflow-hidden hover:shadow-lg transition duration-200">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex justify-between">
          <h3 className="font-poppins font-semibold text-lg">{item.name}</h3>
          <span className="text-primary font-medium">₹{item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {renderRatingStars(item.rating)}
          </div>
          <span className="text-xs text-gray-500 ml-2">({item.reviews})</span>
        </div>
        <button 
          className="w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition duration-200 flex items-center justify-center"
          onClick={handleAddToCart}
        >
          <i className="fas fa-cart-plus mr-2"></i> Add to Cart
        </button>
      </CardContent>
    </Card>
  );
}
