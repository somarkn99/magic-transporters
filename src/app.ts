import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandlingMiddleware'; 
import logger from './config/logger';
import {dbConnection} from './config/database';
import {clearAndGenerateData} from './config/scripts/generateFakeData';
import moverRoutes from './routes/moverRoutes';
import itemRoutes from './routes/itemRoutes';

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


app.use('/movers', limiter, moverRoutes);
app.use('/items', limiter, itemRoutes);

app.all('*', (req: Request, res: Response) => {
  logger.warn(`404 - Not Found: ${req.originalUrl}`);
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

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
  