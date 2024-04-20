import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Import custom middleware and utilities
import errorHandler from './middleware/errorHandlingMiddleware'; 
import logger from './config/logger';
import { dbConnection } from './config/database';
import { clearAndGenerateData } from './config/scripts/generateFakeData';

import setupRoutes from './routes/routes';

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Establish database connection and clear/generate data
dbConnection();
clearAndGenerateData();

// Initialize the express application
const app = express();

// Setup request logging using Morgan
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json({ limit: '20kb' }));

// Enable CORS with default options for all routes
app.use(cors());
app.options('*', cors());  // Enable pre-flight request for DELETE, PUT, etc.

// Setup rate limiting to prevent abuse and to control load on the server
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Time window in milliseconds (15 minutes here)
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after a while',
});

// Apply the rate limiter middleware to all incoming requests
app.use(limiter);

// Setup API routes with a base path, adding them to the Express app
setupRoutes(app);

// Add a universal error handler to handle any uncaught errors in the middleware chain
app.use(errorHandler);

// Set the port number either from environment variable or default to 8000
const PORT = process.env.PORT || 8000;

// Start the server and listen on the configured port
dbConnection().then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Your App running on port ${PORT}`);
      console.log(`Your App is running in ${process.env.NODE_ENV} mode`);
    });
}).catch(err => {
    console.error("Failed to make database connection!", err);
});