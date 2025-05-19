import { pgTable, text, serial, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Category schema
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories);

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Food schema
export const foods = pgTable("foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Store price in cents
  image: text("image").notNull(),
  rating: integer("rating").notNull().default(0), // Rating * 10 (e.g. 4.5 = 45)
  reviews: integer("reviews").notNull().default(0),
  category: text("category").notNull(),
});

export const insertFoodSchema = createInsertSchema(foods);

export type InsertFood = z.infer<typeof insertFoodSchema>;
export type Food = typeof foods.$inferSelect;

// OrderItem type for inside orders
export const orderItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

// Order schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  items: jsonb("items").notNull().$type<OrderItem[]>(),
  total: integer("total").notNull(), // Store total in cents
  status: text("status").notNull().default("pending"),
  paymentMethod: text("payment_method").notNull().default("COD"),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderInsertSchema = z.object({
  userId: z.number(),
  items: z.array(orderItemSchema),
  total: z.number(),
  status: z.string().default("pending"),
  paymentMethod: z.string().default("COD"),
  address: z.string(),
  phone: z.string(),
});

export type InsertOrder = z.infer<typeof orderInsertSchema>;
export type Order = typeof orders.$inferSelect;
