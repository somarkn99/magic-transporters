import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';
import { LoggerInterface } from '../interfaces/LoggerInterface';

export default function errorHandlingMiddleware(logger: LoggerInterface) {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
            logger.error(err.message, {
                statusCode: err.statusCode,
                isOperational: err.isOperational,
                stack: err.stack
            });
            res.status(err.statusCode).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}
