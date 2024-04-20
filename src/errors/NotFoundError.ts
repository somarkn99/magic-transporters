import { ApiError } from './ApiError';

/**
 * Represents an error for when a requested resource is not found.
 * This class extends ApiError, setting the HTTP status code to 404.
 * It provides a default message but can be customized with a specific error message when thrown.
 */
export class NotFoundError extends ApiError {
    /**
     * Creates an instance of NotFoundError.
     * @param {string} message - Optional. Custom error message that describes the not found error.
     *                           Defaults to 'Not Found' if no message is provided.
     */
    constructor(message: string = 'Not Found') {
        super(404, message); // Calls the ApiError constructor with a 404 status code and a custom or default message.
    }
}
