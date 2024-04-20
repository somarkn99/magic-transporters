import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandlingMiddleware'; 
import logger from './config/logger';
import {dbConnection} from './config/database';
import {clearAndGenerateData} from './config/scripts/generateFakeData';

import setupRoutes from './routes/routes';

dotenv.config({ path: './.env' });

dbConnection();
clearAndGenerateData();

const app = express();
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json({ limit: '20kb' }));
app.use(cors());
app.options('*', cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    'Too many requests from this IP, please try again after a while',
});

// Apply the rate limiter to all requests
app.use(limiter);

// Set a global prefix for all routes
setupRoutes(app);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

dbConnection().then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Your App running on port ${PORT}`);
      console.log(`Your App is running in ${process.env.NODE_ENV} mode`);
    });
  }).catch(err => {
    console.error("Failed to make database connection!", err);
  });
  