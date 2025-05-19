import { Request, Response } from 'express';
import { storage } from '../storage';
import { insertUserSchema } from '@shared/schema';
import passport from 'passport';
import { z } from 'zod';

// Register new user
export async function register(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = insertUserSchema.safeParse(req.body);
    
    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Invalid input data',
        errors: validatedData.error.errors
      });
    }

    // Check if username already exists
    const existingUser = await storage.getUserByUsername(validatedData.data.username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new user
    const user = await storage.createUser(validatedData.data);

    // Login the user after registration
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during login after registration' });
      }

      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username
        }
      });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering new user' });
  }
}

// Login user
export function login(req: Request, res: Response) {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication error' });
    }
    
    if (!user) {
      return res.status(401).json({ message: info.message || 'Invalid credentials' });
    }
    
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during login' });
      }
      
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username
        }
      });
    });
  })(req, res);
}

// Logout user
export function logout(req: Request, res: Response) {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error destroying session' });
      }
      
      res.status(200).json({ message: 'Logout successful' });
    });
  });
}

// Get user profile
export async function getProfile(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const user = await storage.getUser(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      id: user.id,
      username: user.username
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Error retrieving user profile' });
  }
}
