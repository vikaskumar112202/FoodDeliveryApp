import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FoodFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FoodFilter({ categories, selectedCategory, onSelectCategory }: FoodFilterProps) {
  return (
    <div className="relative">
      <Select value={selectedCategory} onValueChange={onSelectCategory}>
        <SelectTrigger className="w-32 md:w-40 bg-white border border-gray-300">
          <SelectValue placeholder="All Items" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Items</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
