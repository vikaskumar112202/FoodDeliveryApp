import { Request, Response } from 'express';
import { storage } from '../storage';
import { orderInsertSchema, OrderItem } from '@shared/schema';
import { z } from 'zod';

// Create a schema for the frontend order request
const orderRequestSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  zipCode: z.string().min(5),
  additionalNotes: z.string().optional(),
  items: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().positive()
  })),
  total: z.number().positive(),
  paymentMethod: z.string().default('COD')
});

// Create new order
export async function createOrder(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Validate the request
    const validatedData = orderRequestSchema.safeParse(req.body);
    
    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Invalid order data',
        errors: validatedData.error.errors
      });
    }
    
    const data = validatedData.data;
    
    // Prepare the items (convert price from dollars to cents)
    const items: OrderItem[] = data.items.map(item => ({
      id: item.id,
      name: item.name,
      price: Math.round(item.price), // Convert to cents
      quantity: item.quantity
    }));
    
    // Calculate total in cents
    const total = Math.round(data.total);
    
    // Prepare the full address
    const fullAddress = `${data.address}, ${data.city}, ${data.zipCode}${data.additionalNotes ? ` (${data.additionalNotes})` : ''}`;
    
    // Create the order
    const order = await storage.createOrder({
      userId: req.user.id,
      items,
      total,
      status: 'pending',
      paymentMethod: data.paymentMethod,
      address: fullAddress,
      phone: data.phone
    });
    
    // Format the response (convert cents back to rupees)
    const formattedOrder = {
      ...order,
      total: (order.total / 100) * 83, // Convert to rupees (assuming 1 USD = 83 INR)
      items: order.items.map(item => ({
        ...item,
        price: (item.price / 100) * 83 // Convert to rupees
      }))
    };
    
    res.status(201).json(formattedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
}

// Get user orders
export async function getUserOrders(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const orders = await storage.getOrdersByUserId(req.user.id);
    
    // Format the orders (convert cents to rupees)
    const formattedOrders = orders.map(order => ({
      ...order,
      total: (order.total / 100) * 83, // Convert to rupees (assuming 1 USD = 83 INR)
      items: order.items.map(item => ({
        ...item,
        price: (item.price / 100) * 83 // Convert to rupees
      }))
    }));
    
    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
}

// Get order by ID
export async function getOrderById(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const orderId = parseInt(req.params.id);
    
    if (isNaN(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }
    
    const order = await storage.getOrderById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the order belongs to the current user
    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You can only access your own orders' });
    }
    
    // Format the order (convert cents to rupees)
    const formattedOrder = {
      ...order,
      total: (order.total / 100) * 83, // Convert to rupees (assuming 1 USD = 83 INR)
      items: order.items.map(item => ({
        ...item,
        price: (item.price / 100) * 83 // Convert to rupees
      }))
    };
    
    res.status(200).json(formattedOrder);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error retrieving order' });
  }
}

// Update order status
export async function updateOrderStatus(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const orderId = parseInt(req.params.id);
    
    if (isNaN(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }
    
    const { status } = req.body;
    
    if (!status || typeof status !== 'string') {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    // Validate status value
    const validStatuses = ['pending', 'processing', 'delivered', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status',
        validValues: validStatuses
      });
    }
    
    const order = await storage.getOrderById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the order belongs to the current user
    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own orders' });
    }
    
    const updatedOrder = await storage.updateOrderStatus(orderId, status);
    
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Format the order (convert cents to dollars)
    const formattedOrder = {
      ...updatedOrder,
      total: updatedOrder.total / 100,
      items: updatedOrder.items.map(item => ({
        ...item,
        price: item.price / 100
      }))
    };
    
    res.status(200).json(formattedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
}
