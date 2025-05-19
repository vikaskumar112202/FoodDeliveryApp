import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  foods, type Food, type InsertFood,
  orders, type Order, type InsertOrder,
  OrderItem
} from "@shared/schema";
import bcrypt from "bcryptjs";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyUserPassword(username: string, password: string): Promise<User | undefined>;
  
  // Food methods
  getAllFoods(): Promise<Food[]>;
  getFoodById(id: number): Promise<Food | undefined>;
  getFoodsByCategory(category: string): Promise<Food[]>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private foods: Map<number, Food>;
  private categories: Map<number, Category>;
  private orders: Map<number, Order>;
  
  private userIdCounter: number;
  private foodIdCounter: number;
  private categoryIdCounter: number;
  private orderIdCounter: number;
  
  constructor() {
    this.users = new Map();
    this.foods = new Map();
    this.categories = new Map();
    this.orders = new Map();
    
    this.userIdCounter = 1;
    this.foodIdCounter = 1;
    this.categoryIdCounter = 1;
    this.orderIdCounter = 1;
    
    // Seed data
    this.seedData();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      password: hashedPassword
    };
    this.users.set(id, user);
    return { ...user, password: '[HIDDEN]' } as User;
  }
  
  async verifyUserPassword(username: string, password: string): Promise<User | undefined> {
    const user = await this.getUserByUsername(username);
    if (!user) return undefined;
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return undefined;
    
    return { ...user, password: '[HIDDEN]' } as User;
  }
  
  // Food methods
  async getAllFoods(): Promise<Food[]> {
    return Array.from(this.foods.values());
  }
  
  async getFoodById(id: number): Promise<Food | undefined> {
    return this.foods.get(id);
  }
  
  async getFoodsByCategory(category: string): Promise<Food[]> {
    return Array.from(this.foods.values()).filter(
      (food) => food.category === category
    );
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const now = new Date();
    
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: now.toISOString(),
    };
    
    this.orders.set(id, order);
    return order;
  }
  
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    ).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = await this.getOrderById(id);
    if (!order) return undefined;
    
    const updatedOrder: Order = {
      ...order,
      status
    };
    
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Seed initial data
  private seedData() {
    // Seed categories
    const categoryData: InsertCategory[] = [
      {
        name: 'Pizza',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
      },
      {
        name: 'Burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
      },
      {
        name: 'Noodles',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
      },
      {
        name: 'Salads',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
      }
    ];
    
    categoryData.forEach(category => {
      const id = this.categoryIdCounter++;
      this.categories.set(id, { ...category, id });
    });
    
    // Seed foods
    const foodData: InsertFood[] = [
      {
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni pizza with mozzarella cheese and tomato sauce',
        price: 1299, // $12.99
        image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
        rating: 45, // 4.5 stars
        reviews: 245,
        category: 'Pizza'
      },
      {
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
        price: 949, // $9.49
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
        rating: 40, // 4.0 stars
        reviews: 189,
        category: 'Burgers'
      },
      {
        name: 'Pad Thai Noodles',
        description: 'Stir-fried rice noodles with eggs, tofu, bean sprouts, and peanuts',
        price: 1199, // $11.99
        image: 'https://images.unsplash.com/photo-1626804475297-41608ea89f86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
        rating: 40, // 4.0 stars
        reviews: 156,
        category: 'Noodles'
      },
      {
        name: 'Crispy Fried Chicken',
        description: 'Crunchy fried chicken with secret blend of herbs and spices',
        price: 1049, // $10.49
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cee6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
        rating: 45, // 4.5 stars
        reviews: 203,
        category: 'Burgers'
      },
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
        price: 899, // $8.99
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
        rating: 40, // 4.0 stars
        reviews: 142,
        category: 'Salads'
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Rich and creamy chocolate milkshake topped with whipped cream',
        price: 599, // $5.99
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
        rating: 50, // 5.0 stars
        reviews: 178,
        category: 'Drinks'
      }
    ];
    
    foodData.forEach(food => {
      const id = this.foodIdCounter++;
      this.foods.set(id, { ...food, id });
    });
  }
}

export const storage = new MemStorage();
