import React from 'react';

export interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryCardProps {
  category: Category;
  onClick: (category: Category) => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden cursor-pointer text-center"
      onClick={() => onClick(category)}
    >
      <img 
        src={category.image} 
        alt={category.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <h3 className="font-medium">{category.name}</h3>
      </div>
    </div>
  );
}
