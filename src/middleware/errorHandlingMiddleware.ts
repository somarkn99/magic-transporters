import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';
import { LoggerInterface } from '../interfaces/LoggerInterface';

/**
 * Creates a middleware function for handling errors that occur in the Express application.
 * This middleware helps to differentiate between operational errors (handled ApiError instances)
 * and unexpected errors, logging them accordingly and responding to the client with appropriate
 * HTTP status codes and messages.
 * 
 * @param {LoggerInterface} logger - A logging service that follows the LoggerInterface.
 * @returns {Function} An Express error-handling middleware.
 */
export default function errorHandlingMiddleware(logger: LoggerInterface) {
    /**
     * Error-handling middleware function.
     * @param {Error} err - The error object caught by Express.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @param {NextFunction} next - The next middleware function in the stack.
     */
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
            // Log the operational error details using the provided logger.
            logger.error(err.message, {
                statusCode: err.statusCode,
                isOperational: err.isOperational,
                stack: err.stack
            });
            // Respond to the client with the specific error details and HTTP status code.
            res.status(err.statusCode).json({ message: err.message });
        } else {
            // If the error is not an expected operational error, log it as a critical system error.
            logger.error('Internal Server Error', {
                error: err,
                path: req.path,
                stack: err.stack
            });
            // Respond to the client with a generic 500 Internal Server Error message.
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}
