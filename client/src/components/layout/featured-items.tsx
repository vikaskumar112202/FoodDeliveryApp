import React, { useState } from 'react';
import { FoodCard, FoodItem } from '@/components/ui/food-card';
import { CategoryCard, Category } from '@/components/ui/category-card';
import { FoodFilter } from '@/components/ui/food-filter';
import { useQuery } from '@tanstack/react-query';

export function FoodCategories() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category.name);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-poppins font-semibold mb-6">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            onClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  );
}

export function FoodItems() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: foods = [], isLoading } = useQuery<FoodItem[]>({
    queryKey: ['/api/foods'],
  });
  
  // Extract unique categories from food items
  const categories = Array.from(
    new Set(foods.map((food) => food.category))
  );
  
  // Filter food items by selected category
  const filteredFoods = selectedCategory === "all"
    ? foods
    : foods.filter((food) => food.category === selectedCategory);
  
  return (
    <div id="food-items" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-poppins font-semibold">Popular Items</h2>
        <FoodFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 h-96 animate-pulse">
              <div className="bg-gray-200 w-full h-48 rounded-md mb-4"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-1/4 rounded mb-4"></div>
              <div className="bg-gray-200 h-3 w-full rounded mb-4"></div>
              <div className="bg-gray-200 h-10 w-full rounded mt-auto"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} item={food} />
            ))}
          </div>
          
          {filteredFoods.length > 6 && (
            <div className="flex justify-center mt-8">
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-dark font-medium py-2 px-6 rounded-md shadow-sm transition duration-200">
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
