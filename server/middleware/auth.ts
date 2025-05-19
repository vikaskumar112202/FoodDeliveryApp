import { Request, Response, NextFunction } from 'express';

// Middleware to check if user is authenticated
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  
  res.status(401).json({ message: 'Unauthorized. Please login to continue.' });
}

// Add user info to request object type
declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
    }
  }
}
