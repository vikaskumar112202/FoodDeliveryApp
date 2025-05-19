import { Request, Response } from 'express';
import { storage } from '../storage';

// Get all food items
export async function getAllFoods(req: Request, res: Response) {
  try {
    const foods = await storage.getAllFoods();
    
    // Convert prices from cents to dollars for the frontend
    const formattedFoods = foods.map(food => ({
      ...food,
      price: food.price / 100,
      rating: food.rating / 10
    }));
    
    res.status(200).json(formattedFoods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Error retrieving food items' });
  }
}

// Get food by ID
export async function getFoodById(req: Request, res: Response) {
  try {
    const foodId = parseInt(req.params.id);
    
    if (isNaN(foodId)) {
      return res.status(400).json({ message: 'Invalid food ID' });
    }
    
    const food = await storage.getFoodById(foodId);
    
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    
    // Convert price from cents to dollars
    const formattedFood = {
      ...food,
      price: food.price / 100,
      rating: food.rating / 10
    };
    
    res.status(200).json(formattedFood);
  } catch (error) {
    console.error('Error fetching food:', error);
    res.status(500).json({ message: 'Error retrieving food item' });
  }
}

// Get foods by category
export async function getFoodsByCategory(req: Request, res: Response) {
  try {
    const category = req.params.category;
    
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
    
    const foods = await storage.getFoodsByCategory(category);
    
    // Convert prices from cents to dollars
    const formattedFoods = foods.map(food => ({
      ...food,
      price: food.price / 100,
      rating: food.rating / 10
    }));
    
    res.status(200).json(formattedFoods);
  } catch (error) {
    console.error('Error fetching foods by category:', error);
    res.status(500).json({ message: 'Error retrieving food items by category' });
  }
}

// Get all categories
export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await storage.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error retrieving categories' });
  }
}
