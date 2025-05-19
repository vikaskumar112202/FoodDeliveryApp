import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import MemoryStore from "memorystore";
import bodyParser from "express";

// Controllers
import * as authController from './controllers/auth.controller';
import * as foodController from './controllers/food.controller';
import * as orderController from './controllers/order.controller';

// Middleware
import { isAuthenticated } from './middleware/auth';

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session
  const MemoryStoreSession = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "foolivery-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
      store: new MemoryStoreSession({
        checkPeriod: 86400000, // 24 hours
      }),
    })
  );

  // Setup Passport
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.verifyUserPassword(username, password);
        if (!user) {
          return done(null, false, { message: "Invalid username or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());

  // ===== Authentication Routes =====
  app.post('/api/auth/register', authController.register);
  app.post('/api/auth/login', authController.login);
  app.post('/api/auth/logout', authController.logout);

  // ===== User Routes =====
  app.get('/api/user/profile', isAuthenticated, authController.getProfile);

  // ===== Food & Category Routes =====
  app.get('/api/foods', foodController.getAllFoods);
  app.get('/api/foods/:id', foodController.getFoodById);
  app.get('/api/foods/category/:category', foodController.getFoodsByCategory);
  app.get('/api/categories', foodController.getAllCategories);

  // ===== Order Routes =====
  app.post('/api/orders', isAuthenticated, orderController.createOrder);
  app.get('/api/orders', isAuthenticated, orderController.getUserOrders);
  app.get('/api/orders/:id', isAuthenticated, orderController.getOrderById);
  app.patch('/api/orders/:id/status', isAuthenticated, orderController.updateOrderStatus);

  const httpServer = createServer(app);

  return httpServer;
}
